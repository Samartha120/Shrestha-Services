# Shrestha Services — Redesign Spec (authoritative)

Premium print & signage studio site. Editorial "ink & press-vermilion" system.
DO NOT make it look AI-generated. No purple/blue gradients, glowing blobs, glassmorphism,
huge rounded cards, heavy shadows, neon, floating elements, generic SaaS card grids,
repetitive 3-card rows, emoji UI. Prioritise typography, editorial composition, whitespace,
restraint, purposeful motion.

## Tokens (Tailwind semantic utilities — USE THESE, never raw hex/slate/blue)
- Surfaces: `bg-paper`, `bg-paper-dim`, `bg-surface`, `bg-surface-2`, `bg-ink` (dark section)
- Text: `text-ink`, `text-ink-soft`, `text-muted`, `text-faint`, `text-inverse` (on ink)
- Lines: `border-line`, `border-line-strong`
- Accent (press vermilion): `text-accent`, `bg-accent`, `border-accent`, `bg-accent-soft`, `hover:bg-accent-hover`, `text-accent-ink`
- State: `text-ok`, `text-warn`, `text-err`
- Fonts: `.font-display` (Fraunces serif — headings), default sans = Inter (UI/body), `font-mono` (numbers/labels)
- Helpers: `.eyebrow`, `.text-balance`, `.text-pretty`
- Dark mode auto via `.dark` — tokens already swap; never hardcode dark: colors.

## Primitives (src/components/marketing/primitives.tsx)
- `<Container>` — max-w-6xl px-5 sm:px-8
- `<Reveal delay y as>` — scroll reveal, respects reduced motion
- `<Eyebrow>` — label with accent rule
- `<PrimaryCTA to>` — ink pill → accent on hover, arrow slides
- `<GhostCTA to>` — text link, arrow slides
- `staggerParent` / `staggerChild` variants
Auth pages: `AuthShell` (src/components/auth/AuthShell.tsx) + exports `authFieldClass`, `authLabelClass`.

## Motion
framer-motion. Always `useReducedMotion()` and disable/short-circuit when true.
Ease `[0.22, 1, 0.36, 1]`, durations 0.4–0.7s. Stagger 0.06–0.1s. No bounce/spring on content.

## Editorial patterns to reuse
- Section heading: `<Eyebrow>` + Fraunces `text-[clamp(...)]` headline + `text-ink-soft` intro.
- Hairline dividers `border-line`, numbered index lists (mono numbers), asymmetric grids
  (`lg:grid-cols-[0.85fr_1.15fr]`), ink CTA bands, underline form fields
  (`border-b border-line focus:border-accent`), pill buttons `rounded-full`.
- Field style: `w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted focus:border-accent focus:outline-none`.
- Rounding: `rounded-sm` / `rounded-full` only. No `rounded-2xl/3xl`.

## HARD RULES
- NEVER invent facts: no stats, client names, testimonials, awards, years, certifications,
  printer brands, delivery promises, revenue. Only use what's in src/data/* or company.ts.
  If a section needs "proof", use qualitative process/capability language.
- Preserve ALL functionality: routes, stores (zustand), forms, supabase auth, data fetching,
  props/interfaces. Redesign presentation only.
- TypeScript strict: no unused imports/vars (tsc noUnusedLocals). Inline `type` imports.
- Respect prefers-reduced-motion everywhere.
- Real image paths already in data (/images/...). Use <img> with loading="lazy", real alt text,
  aspect-ratio boxes, object-cover. If an image 404s it's fine (placeholder structure).
- Verify with `npm run build` (tsc -b && vite build) — must pass clean.

## Company facts (only verified source)
Shrestha Services, Biratnagar Nepal. Phone +977-21-441234 / +9779800000000.
Email info@shresthaservices.com.np. Main Road, Biratnagar. Sun–Fri 9:30–7:00, Sat closed.
Team: Sanjeev Shrestha (MD), Jeetendra Pradhan (Ops), Santosh Kumar (Digital Print).
