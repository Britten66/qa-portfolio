# Test coverage

62 automated tests across one app, all of them showing up on the [live Allure report](https://britten66.github.io/qa-portfolio).

## By area

| Area | File | Tests |
|---|---|---|
| Accessibility (axe-core scans) | `apps/app-under-test/e2e/accessibility.spec.js` | 14 |
| Auth (sign in/up, password rules, reset flow) | `apps/app-under-test/e2e/auth.spec.js` | 11 |
| API / backend health | `apps/app-under-test/api/smoke.spec.js` | 7 |
| Dashboard (authenticated) | `apps/app-under-test/e2e/dashboard.spec.js` | 6 |
| Landing / marketing page | `apps/app-under-test/e2e/landing.spec.js` | 6 |
| Invoices, unit-level checks | `apps/app-under-test/e2e/invoices.spec.js` | 5 |
| Invoices, full lifecycle (BDD/Gherkin) | `apps/app-under-test/features/invoice-lifecycle.feature` | 3 |
| Billing / subscription | `apps/app-under-test/e2e/billing.spec.js` | 5 |
| Profile / account settings | `apps/app-under-test/e2e/profile.spec.js` | 5 |
| **Total (Playwright + BDD)** | | **62** |

## Known gaps

- Everything runs on Chrome only. No cross-browser coverage anywhere.
- No visual regression testing. A layout break wouldn't fail any of these 62.
- Billing and invoices are reasonably covered (10 tests combined) but skew toward happy-path. No tests for a failed payment or editing an invoice after it's sent.

## What alerts on failure

`e2e.yml` pushes a phone notification (ntfy) when a run fails, on push to `main` and weekly.
