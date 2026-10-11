import api from "@/services/api";

/*
  Support impersonation (super-admin only, enforced server-side).

  The admin's own session is stashed under *_backup keys while a short-lived
  impersonation token drives the app as the target user. A persistent banner
  is shown while active, and "Exit" restores the original session. The backend
  issues/audits the token; it never trusts the client to pick an identity.
*/

const K = {
  token: "accessToken",
  user: "currentUser",
  backupToken: "impersonatorToken",
  backupUser: "impersonatorUser",
  active: "impersonationActive",
};

export interface ImpersonationState {
  targetName: string;
  targetId: string;
}

export function getImpersonation(): ImpersonationState | null {
  try {
    const raw = localStorage.getItem(K.active);
    return raw ? (JSON.parse(raw) as ImpersonationState) : null;
  } catch {
    return null;
  }
}

export async function startImpersonation(userId: string): Promise<void> {
  const res = await api.post(`/admin/impersonate/${userId}`);
  const { token, target } = res.data.data as {
    token: string;
    target: { id: string; name: string; email: string; role: string };
  };

  // Stash the admin session, then switch to the impersonation token.
  localStorage.setItem(K.backupToken, localStorage.getItem(K.token) || "");
  localStorage.setItem(K.backupUser, localStorage.getItem(K.user) || "");
  localStorage.setItem(K.token, token);
  localStorage.setItem(K.user, JSON.stringify(target));
  localStorage.setItem(K.active, JSON.stringify({ targetName: target.name, targetId: target.id }));

  // Full reload so all state re-hydrates cleanly as the target user.
  window.location.href = "/my-dashboard";
}

export async function stopImpersonation(): Promise<void> {
  // Audit the stop while the impersonation token is still active.
  try {
    await api.post("/auth/impersonate/stop");
  } catch {
    /* best-effort audit — proceed with restore regardless */
  }

  const backupToken = localStorage.getItem(K.backupToken);
  const backupUser = localStorage.getItem(K.backupUser);
  if (backupToken) localStorage.setItem(K.token, backupToken);
  if (backupUser) localStorage.setItem(K.user, backupUser);
  localStorage.removeItem(K.backupToken);
  localStorage.removeItem(K.backupUser);
  localStorage.removeItem(K.active);

  window.location.href = "/admin/users";
}
