import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  readConsent,
  acceptAll as persistAcceptAll,
  rejectOptional as persistRejectOptional,
  writeConsent,
  type ConsentRecord,
  type ConsentCategory,
} from "@/lib/consent";
import CookieConsent from "@/components/consent/CookieConsent";

interface ConsentContextValue {
  consent: ConsentRecord | null;
  /** Reopen the preferences panel (e.g. from the footer link). */
  openSettings: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  save: (categories: Record<ConsentCategory, boolean>) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

export default function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(() => readConsent());
  // Open automatically on first visit (no stored record); otherwise closed
  // until the user reopens it from the footer.
  const [open, setOpen] = useState<boolean>(() => readConsent() === null);

  const openSettings = useCallback(() => setOpen(true), []);

  const acceptAll = useCallback(() => {
    setConsent(persistAcceptAll());
    setOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    setConsent(persistRejectOptional());
    setOpen(false);
  }, []);

  const save = useCallback((categories: Record<ConsentCategory, boolean>) => {
    setConsent(writeConsent(categories));
    setOpen(false);
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, openSettings, acceptAll, rejectOptional, save }}>
      {children}
      <CookieConsent
        open={open}
        consent={consent}
        onClose={() => setOpen(false)}
        onAcceptAll={acceptAll}
        onRejectOptional={rejectOptional}
        onSave={save}
      />
    </ConsentContext.Provider>
  );
}
