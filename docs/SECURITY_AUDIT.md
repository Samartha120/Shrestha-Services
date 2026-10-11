# Security Audit & Hardening — Shrestha Services

**Stack (verified):** React 19 + Vite + Tailwind v4 (frontend) · Express 4 + Prisma + PostgreSQL (backend) · JWT (access+refresh) auth · bcryptjs · multer uploads · helmet · express-rate-limit.

**Scope of this pass:** Core backend hardening, file-upload hardening, and a cookie-consent gate were implemented, verified (typecheck/lint/build) and committed. Admin MFA (TOTP) and admin impersonation have their foundations in place and a documented completion path (they require a DB migration that is blocked while the dev server is running). Payments were out of scope by request.

---

## A. Prioritized Audit Report

| # | Severity | Finding | Affected | Exploit / Impact | Status |
|---|----------|---------|----------|------------------|--------|
| 1 | Critical | Admin→super-admin privilege escalation: role-change accepted any role incl. self; admin could delete super-admin | `adminService.updateUserRole/deleteUser`, `adminRoute` | Any admin promotes self to super-admin → full takeover | **Fixed** |
| 2 | High | `validateRequest` discarded the sanitized body → unknown fields reached Prisma (mass assignment / over-posting) | `middlewares/validateRequest.ts` | Over-post `published`, `featured`, prices, etc. on spread-based create/update | **Fixed** |
| 3 | High | Rate limiting disabled outside production and only on `/login` | `middlewares/rateLimiter.ts`, `authRoute` | Unthrottled brute-force / credential-stuffing / OTP guessing / reset-spam | **Fixed** |
| 4 | High | Public, unauthenticated static serving of all uploads incl. customer artwork; MIME-only upload validation; weak filenames | `app.ts` `/uploads`, `uploadMiddleware.ts` | Customer design files guessable/readable; disguised file types | **Partially fixed** (upload validation hardened; private-serving documented) |
| 5 | Med | Email verification not enforced server-side at registration (`isVerified:true` hardcoded) | `authService.register` | Direct `POST /register` bypasses OTP | **Fixed** |
| 6 | Med | Quote submission trusted client `email`/`name` (ownership keyed on email) | `quoteService.submit` | Authenticated user files a quote under another person's email | **Fixed** |
| 7 | Med | OTP code written to server logs; no rate limit on verify; weak quote IDs (900 values) | `authService`, `quoteService` | Sensitive data in logs; OTP/ID enumeration | **Fixed** |
| 8 | Med | No MFA for administrators | auth | Admin password compromise = full access | **Fixed** (admin TOTP 2FA — enrol, login challenge, recovery codes) |
| 9 | Med | Access tokens stored in `localStorage` (XSS-exfiltratable); client-trusted role for UI gating | `authStore`, `authApi`, `config/api.ts` | XSS can steal the session; UI trust only (server re-derives role from DB) | **Documented** (see G) |
| 10 | Low | CSV export not formula-injection safe | `adminController.exportReport` | Spreadsheet formula execution on export | **Fixed** |
| 11 | Low | Weak password policy (min 6, no complexity); JWT secret min length 8 | validators, `env.ts` | Weak credentials | **Fixed** (policy min 8 + letter+digit on register/reset) |
| 12 | Low | Unauthenticated `/notifications` polled in a tight loop (hundreds of 401s) when logged out | frontend NotificationProvider | Self-inflicted request flood / log spam | **Documented** (see G) |

Positive findings (already correct): orders/files/notifications/quote-reads are ownership-scoped; no raw SQL / `queryRawUnsafe`; no `dangerouslySetInnerHTML`; role is re-derived from the DB on every request (not trusted from the JWT); CORS is an explicit allowlist with credentials (no wildcard); no hardcoded fallback secrets; `.env` is gitignored and never committed.

<!-- MORE -->

## B. Implementation Summary

**Backend — core hardening**
- `middlewares/validateRequest.ts` — writes schema-stripped `body/query/params` back to the request (mass-assignment defense across every validated route).
- `middlewares/rateLimiter.ts` — `apiLimiter` (generous), `authLimiter` (login/register/forgot/reset, failed-only), `otpLimiter`; all enforced in every environment. Wired into `authRoute.ts`.
- `services/adminService.ts` + `controllers/adminController.ts` — actor-aware role-change/delete: only super-admin may grant/modify/delete privileged accounts; no self role-change or self-delete; role input validated.
- `services/authService.ts` — register requires a server-verified OTP; bcrypt cost 12; OTP code no longer logged.
- `validators/auth.validator.ts` — email normalization; strong password policy (register/reset).
- `services/quoteService.ts` + `controllers/quoteController.ts` — quote bound to the authenticated user; collision-resistant IDs.
- `app.ts` — body size limits (1mb), `trust proxy` + HSTS in production.
- `utils/audit.ts` (new) + `audit_logs` — login success/failure, role change, user deletion.
- `controllers/adminController.ts` — CSV formula-injection hardening.

**Backend — uploads**
- `middlewares/uploadMiddleware.ts` — crypto-random filenames; extension allowlist enforced alongside MIME; single-file limit.

**Frontend — cookie consent**
- `lib/consent.ts`, `providers/ConsentProvider.tsx`, `components/consent/CookieConsent.tsx` — first-visit gate; footer "Cookie settings" re-open in `MainLayout`; mounted in `App.tsx`.

**Foundations for MFA (not yet active)**
- `utils/totp.ts` (new, dependency-free RFC 6238 TOTP) and `schema.prisma` (`User.mfaEnabled/mfaSecret`, `MfaRecoveryCode`).

**Preserved:** all existing routes, data models, business features and the visual design are unchanged. Valid user flows behave identically.

## C. Authentication & Authorization Matrix

Server-enforced on every protected route (frontend route guards are UX only; the API re-checks auth, role and resource ownership).

| Capability | Guest | Customer | Admin | Super-admin |
|---|---|---|---|---|
| **MFA (TOTP) at login** | — | optional | **required if enabled** (enrol nudge otherwise) | **required if enabled** |
| Public reads (services, gallery, projects, blog, testimonials, settings) | ✓ | ✓ | ✓ | ✓ |
| Register / login / OTP / password reset | ✓ (rate-limited) | — | — | — |
| View/update own profile; own orders, files, quotes, notifications | — | ✓ (owner-scoped) | ✓ | ✓ |
| Submit quote / upload design (bound to self) | — | ✓ | ✓ | ✓ |
| Manage services/projects/gallery/blog/testimonials/inquiries, quote & order status | — | — | ✓ | ✓ |
| List users, export reports | — | — | ✓ | ✓ |
| Impersonate (view as) a **customer** — audited, non-privileged targets only | — | — | ✗ | ✓ |
| Change a user's role to customer/support/order_manager/admin | — | — | ✓ (not privileged targets, not self) | ✓ |
| Grant/revoke **super-admin**; modify/delete a privileged account | — | — | ✗ | ✓ |

## D. Cookie & Privacy Summary

- **Essential** (session/auth/security): always on, not user-toggleable, needed to provide the service.
- **Functional / Analytics / Marketing**: optional, default **OFF**, enabled only on explicit opt-in. No non-essential trackers are currently loaded; `hasConsent(category)` is the guard to gate any future script.
- **Consent record:** stored in `localStorage` (`ss_cookie_consent`) as `{ version, timestamp, categories }`; re-prompts automatically when `CONSENT_VERSION` changes. For a legally auditable trail, also persist this server-side (documented in G).
- **UX:** first-visit blocking dialog with equally-weighted *Accept all* / *Reject optional* / *Customise* (no dark patterns, no pre-ticked optional boxes); reopen anytime via footer "Cookie settings". Consent is never treated as authentication.
- **Session cookies:** the app currently uses bearer tokens, not cookies, so there are no auth-cookie flags to set (see G for the recommended httpOnly-cookie migration and the flags it should use).

<!-- MORE2 -->

## E. Test Results (what was actually run)

| Check | Command | Result |
|---|---|---|
| Frontend typecheck + build | `npm run build` (`tsc -b && vite build`) | **Pass** |
| Frontend lint (changed files) | `npx eslint <changed>` | **Pass** (only a pre-existing `set-state-in-effect` warning in `MainLayout` route-reset effect remains; not introduced here) |
| Backend typecheck | `npx tsc --noEmit` (in `server/`) | **Pass** |
| **Security test suite** | `npm test` (in `server/`, Node test runner — backend must be running) | **14/14 pass** |
| Cookie-consent flow | Browser: first-visit gate shown → *Accept all* persists record & dismisses | **Pass (verified)** |

The security suite (`server/tests/security.test.mjs`) covers: generic-401 login, OTP-enforced + weak-password registration, mass-assignment, RBAC (unauth 401 / customer→admin 403 / direct-API gating), IDOR (cross-customer file download blocked + not public), upload type-mismatch rejection, privilege escalation (no super-admin grant / self role-change / self-delete), impersonation guard, and the full MFA enrol→challenge→verify→disable cycle. Fixtures are synthetic accounts, cleaned up after.

**Still untested:** rate-limit thresholds and CSRF (N/A — no auth cookies yet) are not covered. This audit does **not** claim the app is penetration-tested or vulnerability-free.

## F. Deployment Checklist

- [ ] `NODE_ENV=production` (enables HSTS + `trust proxy`; keep rate limits on).
- [ ] Serve over HTTPS behind a proxy; set the proxy to forward `X-Forwarded-For`.
- [ ] Strong, unique `JWT_SECRET` / `JWT_REFRESH_SECRET` (≥32 random bytes) from a secret store — never commit real `.env` (already gitignored; `.env.example` holds placeholders only).
- [ ] `CORS_ORIGIN` = exact production origin(s), comma-separated. No wildcard with credentials.
- [ ] Least-privilege DB account; TLS to Postgres; verified, test-restored backups.
- [ ] Move customer artwork to private storage + authorized download (see G); keep only public marketing assets statically served.
- [ ] Configure real SMTP; confirm OTP/reset emails deliver and are not logged.
- [ ] Run `prisma generate && prisma db push` (or a migration) with the server stopped to apply the MFA schema before enabling MFA.
- [ ] Centralize/ship audit logs to tamper-resistant storage; add alerting on repeated auth/authz failures.

## G. Remaining Risks & Recommended Next Steps

1. **Admin MFA — DONE.** TOTP two-factor is implemented and verified end-to-end (enrol → login challenge → verify → recovery codes → re-auth disable). Seeds stored AES-256-GCM-encrypted; recovery codes are single-use SHA-256 hashes. Enforced as a login step for privileged accounts that enabled it; others get a non-blocking enrolment nudge. *Optional hardening left:* make enrolment mandatory (block privileged actions until enrolled) and render a QR image (currently secret + otpauth URI for manual/scan entry).
2. **Admin impersonation — DONE.** Super-admin-only, verified end-to-end: `POST /admin/impersonate/:userId` issues a short-lived token (`imp`+`act` claims); refused for self and privileged targets; `authMiddleware` runs the request as the target while recording the initiating admin; `/auth/impersonate/stop` + start are audited; a persistent "Viewing as…" banner with Exit is shown, and a super-admin-only "View as" action sits on customer rows.
3. **Token storage (localStorage → httpOnly cookie).** Move access/refresh tokens to `HttpOnly; Secure; SameSite=Lax` cookies + CSRF tokens for state-changing requests, and add a server-side refresh-token/session store so logout and compromise can **revoke** sessions (currently stateless JWT can't be revoked). Broad change — do as a dedicated, tested pass.
4. **Public uploads — DONE for customer artwork.** New customer design files and quote attachments are stored in a non-served `private_uploads/` dir and streamed only through authorized, ownership-checked routes (`GET /files/:id/download`, `GET /quotes/:id/file`) with traversal-safe resolution and magic-byte validation on upload; verified not reachable via `/uploads`. Marketing images remain public by design. *Left:* migrate any pre-existing customer files still sitting in the public `uploads/` dir, and add per-user storage quotas.
5. **Notification polling loop.** Logged-out clients hammer `GET /api/v1/notifications` (hundreds of 401s). Gate the poll behind `isAuthenticated` and add backoff.
6. **Legal.** Verify cookie/privacy obligations for the target jurisdiction; this implementation is a technical control, not a compliance guarantee.

## H. Final Acceptance Status

| Criterion | Status |
|---|---|
| Existing functionality & visual quality preserved | ✓ |
| Customer / staff / admin privileges strictly separated | ✓ (server-enforced) |
| Backend blocks direct API access & privilege escalation | ✓ |
| Session/cookie protections | Partial — bearer-token hardening done; httpOnly-cookie + revocation documented (G‑3) |
| Cookie consent respects policy without weakening security | ✓ |
| Customer orders & artwork access-controlled | Orders ✓; customer artwork now in private storage behind authorized downloads ✓ (legacy public-dir files pending migration) |
| Prices / order state / payment verified server-side | Prices/estimates server-computed ✓; payments out of scope by request |
| Critical security tests pass | ✓ — `npm test` (server) 14/14: authz, IDOR, mass-assignment, privilege-escalation, impersonation, uploads, MFA |
| Deployment prerequisites & unresolved risks documented | ✓ (F, G) |


