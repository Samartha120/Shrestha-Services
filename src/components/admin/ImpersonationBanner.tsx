import { useState } from "react";
import { UserCog, X } from "lucide-react";
import { getImpersonation, stopImpersonation } from "@/lib/impersonation";

/*
  Persistent, unmissable indicator shown while a super-admin is impersonating
  a customer. Fixed to the top of the viewport with a safe "Exit" action.
*/
export default function ImpersonationBanner() {
  const state = getImpersonation();
  const [leaving, setLeaving] = useState(false);
  if (!state) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[95] flex items-center justify-center gap-3 bg-warn px-4 py-2 text-center text-sm font-medium text-black shadow-md"
    >
      <UserCog className="h-4 w-4 shrink-0" />
      <span>
        Viewing as <strong>{state.targetName}</strong> — actions are performed on their account.
      </span>
      <button
        type="button"
        disabled={leaving}
        onClick={() => {
          setLeaving(true);
          stopImpersonation();
        }}
        className="inline-flex items-center gap-1 rounded-full bg-black/85 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
      >
        <X className="h-3 w-3" />
        {leaving ? "Exiting…" : "Exit"}
      </button>
    </div>
  );
}
