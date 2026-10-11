/*
  Cookie-consent model (GDPR/ePrivacy-style, no dark patterns).

  - Essential cookies are always on and cannot be toggled (auth/session/security).
  - Functional, analytics and marketing default to OFF until the user opts in.
  - The consent record stores the policy version, the chosen categories and a
    timestamp so consent is auditable and can be re-prompted when the policy
    changes.

  Consent is NOT authentication: accepting cookies never signs a user in or
  grants any privilege. Reject-optional must never break essential features.
*/

export const CONSENT_VERSION = 1;
const STORAGE_KEY = "ss_cookie_consent";

export type ConsentCategory = "essential" | "functional" | "analytics" | "marketing";

export interface ConsentRecord {
  version: number;
  timestamp: string;
  categories: Record<ConsentCategory, boolean>;
}

export const OPTIONAL_CATEGORIES: ConsentCategory[] = [
  "functional",
  "analytics",
  "marketing",
];

export const DEFAULT_CATEGORIES: Record<ConsentCategory, boolean> = {
  essential: true, // always true, not user-toggleable
  functional: false,
  analytics: false,
  marketing: false,
};

export const CONSENT_CHANGED_EVENT = "ss:consent-changed";

export function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    // Re-prompt if the stored record predates the current policy version.
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    return {
      version: parsed.version,
      timestamp: parsed.timestamp,
      categories: { ...DEFAULT_CATEGORIES, ...parsed.categories, essential: true },
    };
  } catch {
    return null;
  }
}

export function writeConsent(categories: Record<ConsentCategory, boolean>): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: { ...categories, essential: true },
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: record }));
  } catch {
    /* storage unavailable — essential-only behaviour still applies */
  }
  return record;
}

export function acceptAll(): ConsentRecord {
  return writeConsent({ essential: true, functional: true, analytics: true, marketing: true });
}

export function rejectOptional(): ConsentRecord {
  return writeConsent({ ...DEFAULT_CATEGORIES });
}

/* Guard for conditionally loading non-essential scripts/trackers. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "essential") return true;
  const record = readConsent();
  return !!record?.categories[category];
}
