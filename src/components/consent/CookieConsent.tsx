import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Sliders, BarChart3, Megaphone } from "lucide-react";
import { DEFAULT_CATEGORIES, type ConsentCategory, type ConsentRecord } from "@/lib/consent";

type Props = {
  open: boolean;
  consent: ConsentRecord | null;
  onClose: () => void;
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onSave: (categories: Record<ConsentCategory, boolean>) => void;
};

const CATEGORY_META = [
  {
    key: "essential" as const,
    icon: ShieldCheck,
    label: "Essential",
    locked: true,
    desc: "Required for login, sessions and security. These are always on.",
  },
  {
    key: "functional" as const,
    icon: Sliders,
    label: "Functional",
    desc: "Remember preferences such as theme and saved form details.",
  },
  {
    key: "analytics" as const,
    icon: BarChart3,
    label: "Analytics",
    desc: "Anonymous usage statistics that help us improve the site.",
  },
  {
    key: "marketing" as const,
    icon: Megaphone,
    label: "Marketing",
    desc: "Measure and personalise promotions. Nothing loads without consent.",
  },
];

export default function CookieConsent({
  open,
  consent,
  onClose,
  onAcceptAll,
  onRejectOptional,
  onSave,
}: Props) {
  const reduce = useReducedMotion();
  const firstVisit = consent === null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={firstVisit ? undefined : onClose}
          />
          {/* Inner panel remounts each open, so its form state starts fresh. */}
          <ConsentPanel
            reduce={!!reduce}
            consent={consent}
            firstVisit={firstVisit}
            onClose={onClose}
            onAcceptAll={onAcceptAll}
            onRejectOptional={onRejectOptional}
            onSave={onSave}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConsentPanel({
  reduce,
  consent,
  firstVisit,
  onClose,
  onAcceptAll,
  onRejectOptional,
  onSave,
}: {
  reduce: boolean;
  consent: ConsentRecord | null;
  firstVisit: boolean;
  onClose: () => void;
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onSave: (categories: Record<ConsentCategory, boolean>) => void;
}) {
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState<Record<ConsentCategory, boolean>>(() => ({
    ...DEFAULT_CATEGORIES,
    ...(consent?.categories ?? {}),
    essential: true,
  }));
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc closes only when a prior choice exists (never on the first-visit gate).
  useEffect(() => {
    if (firstVisit) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [firstVisit, onClose]);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <motion.div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      initial={reduce ? false : { y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={reduce ? undefined : { y: 24, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg rounded-t-2xl border border-line bg-surface p-6 shadow-[var(--shadow-lg)] outline-none sm:rounded-2xl sm:p-7"
    >
      <p className="eyebrow text-accent">Your privacy</p>
      <h2 id="cookie-title" className="mt-2 font-display text-2xl text-ink">
        Cookies on this site
      </h2>
      <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">
        We use essential cookies to run the site securely. With your permission
        we also use optional cookies to improve it. You can change your choice
        anytime from the footer.
      </p>

      {customize && (
        <ul className="mt-5 space-y-3 border-t border-line pt-5">
          {CATEGORY_META.map((cat) => {
            const Icon = cat.icon;
            const checked = cat.locked ? true : prefs[cat.key];
            return (
              <li key={cat.key} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-ink">{cat.label}</span>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        disabled={cat.locked}
                        onChange={(e) => setPrefs((p) => ({ ...p, [cat.key]: e.target.checked }))}
                        aria-label={`${cat.label} cookies`}
                      />
                      <span
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          checked ? "bg-accent" : "bg-line-strong"
                        } ${cat.locked ? "opacity-50" : "cursor-pointer"} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-2`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                            checked ? "translate-x-4" : "translate-x-0.5"
                          }`}
                        />
                      </span>
                    </label>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{cat.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse sm:items-center">
        <button
          type="button"
          onClick={onAcceptAll}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent"
        >
          Accept all
        </button>
        {customize ? (
          <button
            type="button"
            onClick={() => onSave(prefs)}
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Save preferences
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCustomize(true)}
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Customise
          </button>
        )}
        <button
          type="button"
          onClick={onRejectOptional}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink sm:mr-auto"
        >
          Reject optional
        </button>
      </div>

      <p className="mt-4 text-xs text-muted">
        Read our{" "}
        <Link to="/privacy" className="font-medium text-accent underline-offset-2 hover:underline">
          Privacy Policy
        </Link>
        {" · "}
        <Link to="/privacy#cookies" className="font-medium text-accent underline-offset-2 hover:underline">
          Cookie Policy
        </Link>
        .
      </p>
    </motion.div>
  );
}
