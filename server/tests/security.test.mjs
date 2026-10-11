// Security integration tests — black-box over HTTP against the running API.
// Prereq: backend running on http://localhost:5000 and the DB reachable.
// Run: npm test   (from the server/ directory)
//
// Uses Node's built-in test runner (no extra deps). Fixtures are synthetic
// accounts created/cleaned via Prisma; the seeded demo admin/customer are used
// read-only where a real role is needed.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE = "http://localhost:5000/api/v1";
const ORIGIN = "http://localhost:5000";
const TAG = "sectest_";

const api = (path, { method = "GET", token, body, raw } = {}) =>
  fetch(BASE + path, {
    method,
    headers: {
      ...(body && !raw ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: raw ? body : body ? JSON.stringify(body) : undefined,
  });

const login = async (email, password) => {
  const r = await api("/auth/login", { method: "POST", body: { email, password } });
  const j = await r.json();
  return { code: r.status, token: j?.data?.token, data: j?.data };
};

const ctx = {};

before(async () => {
  const customerRole = await prisma.role.upsert({
    where: { name: "customer" }, update: {}, create: { name: "customer" },
  });
  const hash = await bcrypt.hash("Passw0rd!23", 10);
  const mk = async (key) => {
    const email = `${TAG}${key}@local.test`;
    await prisma.user.deleteMany({ where: { email } });
    const u = await prisma.user.create({
      data: { name: `Sec ${key}`, email, password: hash, roleId: customerRole.id, isVerified: true },
    });
    await prisma.customer.create({ data: { id: u.id, phone: null } });
    const { token } = await login(email, "Passw0rd!23");
    return { id: u.id, email, token };
  };
  ctx.a = await mk("a");
  ctx.b = await mk("b");
  ctx.admin = await login("admin@shrestha.com", "admin123");
});

after(async () => {
  await prisma.user.deleteMany({ where: { email: { startsWith: TAG } } });
  await prisma.otp.deleteMany({ where: { email: { startsWith: TAG } } });
  await prisma.$disconnect();
});

// ── Authentication ────────────────────────────────────────────
test("login with wrong password returns a generic 401", async () => {
  const r = await api("/auth/login", { method: "POST", body: { email: "admin@shrestha.com", password: "wrong-pass-xyz" } });
  assert.equal(r.status, 401);
  const j = await r.json();
  assert.match(j.message, /invalid credentials/i); // does not reveal which field
});

test("registration is refused without a verified OTP", async () => {
  const r = await api("/auth/register", {
    method: "POST",
    body: { email: `${TAG}nootp@local.test`, password: "Passw0rd!23", name: "No OTP" },
  });
  assert.equal(r.status, 400);
});

test("weak passwords are rejected at registration", async () => {
  const r = await api("/auth/register", {
    method: "POST",
    body: { email: `${TAG}weak@local.test`, password: "weak", name: "Weak Pass" },
  });
  assert.equal(r.status, 400);
});

// ── Mass assignment ───────────────────────────────────────────
test("registration cannot self-assign a privileged role (mass assignment)", async () => {
  const email = `${TAG}massassign@local.test`;
  // Pre-create a verified OTP so register proceeds past email verification.
  await prisma.otp.create({ data: { email, otp: "000000", used: true, expiresAt: new Date(Date.now() + 6e5) } });
  const r = await api("/auth/register", {
    method: "POST",
    body: { email, password: "Passw0rd!23", name: "Mass Assign", role: "admin", isVerified: true, roleId: "x" },
  });
  assert.equal(r.status, 201);
  const created = await prisma.user.findUnique({ where: { email }, include: { role: true } });
  assert.equal(created?.role?.name, "customer"); // extra fields ignored
});

// ── Authorization / RBAC ──────────────────────────────────────
test("unauthenticated access to a protected route is 401", async () => {
  const r = await api("/files");
  assert.equal(r.status, 401);
});

test("a customer cannot reach admin APIs (403)", async () => {
  const r = await api("/admin/stats", { token: ctx.a.token });
  assert.equal(r.status, 403);
});

test("direct API call is gated the same as the UI (customer → admin users list)", async () => {
  const r = await api("/admin/users", { token: ctx.a.token });
  assert.equal(r.status, 403);
});

// ── IDOR / resource ownership ─────────────────────────────────
const uploadPng = async (token) => {
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(32, 1)]);
  const fd = new FormData();
  fd.append("file", new Blob([png], { type: "image/png" }), "proof.png");
  const r = await fetch(BASE + "/files", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
  return (await r.json())?.data?.file;
};

test("a customer cannot download another customer's private file (IDOR)", async () => {
  const file = await uploadPng(ctx.a.token);
  assert.ok(file?.id);
  assert.match(file.fileUrl, /^private:/); // stored privately, not a public URL

  const owner = await api(`/files/${file.id}/download`, { token: ctx.a.token });
  assert.equal(owner.status, 200);

  const other = await api(`/files/${file.id}/download`, { token: ctx.b.token });
  assert.equal(other.status, 403);

  const anon = await api(`/files/${file.id}/download`);
  assert.equal(anon.status, 401);

  // Not reachable via the static mount.
  const base = file.fileUrl.replace(/^private:/, "");
  const stat = await fetch(`${ORIGIN}/uploads/${base}`);
  assert.equal(stat.status, 404);

  await api(`/files/${file.id}`, { method: "DELETE", token: ctx.a.token });
});

test("oversized/disguised uploads are rejected (type mismatch)", async () => {
  // Declares image/png but the bytes are plain text → signature mismatch.
  const fd = new FormData();
  fd.append("file", new Blob([Buffer.from("not really a png")], { type: "image/png" }), "fake.png");
  const r = await fetch(BASE + "/files", { method: "POST", headers: { Authorization: `Bearer ${ctx.a.token}` }, body: fd });
  assert.equal(r.status, 400);
});

// ── Privilege escalation ──────────────────────────────────────
test("an admin cannot grant super-admin", async () => {
  const r = await api(`/admin/users/${ctx.a.id}/role`, { method: "PATCH", token: ctx.admin.token, body: { role: "superadmin" } });
  assert.equal(r.status, 403);
});

test("an admin cannot change their own role", async () => {
  const adminId = ctx.admin.data?.user?.id;
  const r = await api(`/admin/users/${adminId}/role`, { method: "PATCH", token: ctx.admin.token, body: { role: "customer" } });
  assert.equal(r.status, 403);
});

test("an admin cannot delete their own account", async () => {
  const adminId = ctx.admin.data?.user?.id;
  const r = await api(`/admin/users/${adminId}`, { method: "DELETE", token: ctx.admin.token });
  assert.equal(r.status, 403);
});

// ── Impersonation ─────────────────────────────────────────────
test("a non-super-admin cannot impersonate", async () => {
  const r = await api(`/admin/impersonate/${ctx.a.id}`, { method: "POST", token: ctx.admin.token });
  assert.equal(r.status, 403);
});

// ── MFA (TOTP) full cycle on the admin account, with cleanup ──
import crypto from "node:crypto";
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const b32decode = (s) => {
  let bits = "";
  for (const c of s.replace(/=+$/, "").toUpperCase()) { const i = B32.indexOf(c); if (i >= 0) bits += i.toString(2).padStart(5, "0"); }
  const out = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(out);
};
const totp = (secret) => {
  const buf = Buffer.alloc(8); buf.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 1000 / 30)));
  const h = crypto.createHmac("sha1", b32decode(secret)).update(buf).digest();
  const o = h[h.length - 1] & 0xf;
  const bin = ((h[o] & 0x7f) << 24) | ((h[o + 1] & 0xff) << 16) | ((h[o + 2] & 0xff) << 8) | (h[o + 3] & 0xff);
  return (bin % 1e6).toString().padStart(6, "0");
};

test("admin MFA: enrol → login challenge → verify → disable", async () => {
  const fresh = await login("admin@shrestha.com", "admin123");
  const setup = await (await api("/auth/mfa/setup", { method: "POST", token: fresh.token })).json();
  const secret = setup?.data?.secret;
  assert.ok(secret, "setup returns a secret");

  const enable = await api("/auth/mfa/enable", { method: "POST", token: fresh.token, body: { token: totp(secret) } });
  assert.equal(enable.status, 200);

  // Password alone now yields a challenge, not a session.
  const challenged = await login("admin@shrestha.com", "admin123");
  assert.equal(challenged.data?.mfaRequired, true);
  assert.ok(!challenged.token);

  const verify = await api("/auth/mfa/login-verify", { method: "POST", body: { challengeToken: challenged.data.challengeToken, code: totp(secret) } });
  const vj = await verify.json();
  assert.equal(verify.status, 200);
  assert.ok(vj?.data?.token, "verify yields a session");

  // Cleanup: disable with re-auth so the demo admin is left MFA-free.
  const disable = await api("/auth/mfa/disable", { method: "POST", token: vj.data.token, body: { password: "admin123", token: totp(secret) } });
  assert.equal(disable.status, 200);
});

// ── Sessions, cookies & CSRF ──────────────────────────────────
const rawLogin = (email, password) =>
  fetch(BASE + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

const parseCookies = (resp) => {
  const jar = {};
  for (const c of resp.headers.getSetCookie?.() ?? []) {
    const [pair] = c.split(";");
    const i = pair.indexOf("=");
    jar[pair.slice(0, i)] = { value: pair.slice(i + 1), attrs: c.toLowerCase() };
  }
  return jar;
};
const cookieHeader = (jar) => Object.entries(jar).map(([k, v]) => `${k}=${v.value}`).join("; ");

test("login sets httpOnly, SameSite=Lax session cookies (csrf readable)", async () => {
  const jar = parseCookies(await rawLogin(ctx.a.email, "Passw0rd!23"));
  assert.ok(jar.access_token && jar.refresh_token && jar.csrf_token, "all three cookies set");
  assert.match(jar.access_token.attrs, /httponly/);
  assert.match(jar.access_token.attrs, /samesite=lax/);
  assert.match(jar.refresh_token.attrs, /httponly/);
  assert.match(jar.refresh_token.attrs, /path=\/api\/v1\/auth/);
  assert.doesNotMatch(jar.csrf_token.attrs, /httponly/); // JS must read it for double-submit
});

test("logout revokes the session server-side (token stops working)", async () => {
  const { token } = await login(ctx.a.email, "Passw0rd!23");
  assert.equal((await api("/auth/me", { token })).status, 200);
  await api("/auth/logout", { method: "POST", token });
  assert.equal((await api("/auth/me", { token })).status, 401); // revoked, not just expired
});

test("refresh rotates a session via the refresh cookie", async () => {
  const jar = parseCookies(await rawLogin(ctx.a.email, "Passw0rd!23"));
  const r = await fetch(BASE + "/auth/refresh", { method: "POST", headers: { Cookie: cookieHeader(jar), "X-CSRF-Token": jar.csrf_token.value } });
  const j = await r.json();
  assert.equal(r.status, 200);
  assert.ok(j?.data?.token, "a fresh access token is issued");
});

test("cookie-authenticated write without a CSRF header is blocked (403)", async () => {
  const jar = parseCookies(await rawLogin(ctx.a.email, "Passw0rd!23"));
  const r = await fetch(BASE + "/auth/profile", {
    method: "PUT",
    headers: { Cookie: cookieHeader(jar), "Content-Type": "application/json" },
    body: JSON.stringify({ name: "CSRF Test" }),
  });
  assert.equal(r.status, 403);
});

test("cookie-authenticated write WITH the CSRF header succeeds", async () => {
  const jar = parseCookies(await rawLogin(ctx.a.email, "Passw0rd!23"));
  const r = await fetch(BASE + "/auth/profile", {
    method: "PUT",
    headers: { Cookie: cookieHeader(jar), "Content-Type": "application/json", "X-CSRF-Token": jar.csrf_token.value },
    body: JSON.stringify({ name: "CSRF OK" }),
  });
  assert.equal(r.status, 200);
});

test("Bearer write is exempt from CSRF (no auth cookie present)", async () => {
  const { token } = await login(ctx.a.email, "Passw0rd!23");
  const r = await api("/auth/profile", { method: "PUT", token, body: { name: "Bearer OK" } });
  assert.equal(r.status, 200);
});




