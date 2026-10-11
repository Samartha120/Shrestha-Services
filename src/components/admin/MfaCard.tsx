import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { ShieldCheck, ShieldAlert, Copy } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/authApi";

type Mode = "loading" | "off" | "setup" | "recovery" | "on";

export default function MfaCard() {
  const [mode, setMode] = useState<Mode>("loading");
  const [busy, setBusy] = useState(false);
  const [secret, setSecret] = useState("");
  const [otpauth, setOtpauth] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  useEffect(() => {
    authApi
      .mfaStatus()
      .then((s) => setMode(s.enabled ? "on" : "off"))
      .catch(() => setMode("off"));
  }, []);

  const beginSetup = async () => {
    setBusy(true);
    try {
      const data = await authApi.setupMfa();
      setSecret(data.secret);
      setOtpauth(data.otpauthUri);
      setMode("setup");
    } catch {
      toast.error("Could not start MFA setup.");
    } finally {
      setBusy(false);
    }
  };

  const confirmEnable = async () => {
    setBusy(true);
    try {
      const data = await authApi.enableMfa(code.trim());
      setRecoveryCodes(data.recoveryCodes);
      setCode("");
      setMode("recovery");
      toast.success("Two-factor authentication enabled.");
    } catch (e: any) {
      toast.error(e?.message || "Incorrect code. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const disable = async () => {
    setBusy(true);
    try {
      await authApi.disableMfa(password, code.trim());
      setPassword("");
      setCode("");
      setMode("off");
      toast.success("Two-factor authentication disabled.");
    } catch (e: any) {
      toast.error(e?.message || "Could not disable MFA.");
    } finally {
      setBusy(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success("Copied"),
      () => toast.error("Copy failed")
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent">
          {mode === "on" ? <ShieldCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-xl text-ink">Two-factor authentication</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Protect this administrator account with an authenticator app (TOTP).
            {mode === "on" ? " Status: enabled." : " Status: not enabled."}
          </p>

          {/* PLACEHOLDER_BODY */}
          {mode === "off" && (
            <Button
              onClick={beginSetup}
              loading={busy}
              className="mt-4 rounded-full bg-ink text-inverse hover:bg-accent"
            >
              Set up 2FA
            </Button>
          )}

          {mode === "setup" && (
            <div className="mt-4 space-y-4">
              <div className="rounded-sm border border-line bg-paper-dim/50 p-4 text-sm">
                <p className="text-ink-soft">
                  Add this account to your authenticator app by scanning the QR
                  in the app (paste the link), or enter the key manually:
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <code className="flex-1 break-all font-mono text-xs text-ink">{secret}</code>
                  <button type="button" onClick={() => copy(secret)} className="text-muted hover:text-ink" aria-label="Copy secret">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <code className="flex-1 break-all font-mono text-[11px] text-muted">{otpauth}</code>
                  <button type="button" onClick={() => copy(otpauth)} className="text-muted hover:text-ink" aria-label="Copy setup link">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-soft">
                  Enter the 6-digit code to confirm
                </label>
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
              </div>
              <div className="flex gap-3">
                <Button onClick={confirmEnable} loading={busy} className="rounded-full bg-ink text-inverse hover:bg-accent">
                  Enable
                </Button>
                <Button onClick={() => setMode("off")} className="rounded-full border border-line-strong bg-transparent text-ink">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {mode === "recovery" && (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-ink">
                Save your recovery codes — each works once if you lose your device.
              </p>
              <div className="grid grid-cols-2 gap-2 rounded-sm border border-line bg-paper-dim/50 p-4 font-mono text-sm text-ink">
                {recoveryCodes.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button onClick={() => copy(recoveryCodes.join("\n"))} className="rounded-full border border-line-strong bg-transparent text-ink">
                  Copy codes
                </Button>
                <Button onClick={() => setMode("on")} className="rounded-full bg-ink text-inverse hover:bg-accent">
                  Done
                </Button>
              </div>
            </div>
          )}

          {mode === "on" && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-err">Disable 2FA</summary>
              <div className="mt-3 space-y-3">
                <p className="text-xs text-muted">
                  Re-authenticate to turn off 2FA: enter your password and a current code.
                </p>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Current password" />
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Authenticator or recovery code" />
                <Button onClick={disable} loading={busy} className="rounded-full border border-err bg-transparent text-err hover:bg-accent-soft">
                  Disable 2FA
                </Button>
              </div>
            </details>
          )}
        </div>
      </div>
    </Card>
  );
}
