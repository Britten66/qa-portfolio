# Test coverage

78 automated tests across two apps and two frameworks. 62 of them show up on the [live Allure report](https://britten66.github.io/qa-portfolio); the other 16 run in a separate daily monitor that doesn't publish a report, on purpose (see below).

## By area

| Area | File | Tests | On the public report? |
|---|---|---|---|
| Accessibility (axe-core scans) | `apps/app-under-test/e2e/accessibility.spec.js` | 14 | Yes |
| Auth (sign in/up, password rules, reset flow) | `apps/app-under-test/e2e/auth.spec.js` | 11 | Yes |
| API / backend health | `apps/app-under-test/api/smoke.spec.js` | 7 | Yes |
| Dashboard (authenticated) | `apps/app-under-test/e2e/dashboard.spec.js` | 6 | Yes |
| Landing / marketing page | `apps/app-under-test/e2e/landing.spec.js` | 6 | Yes |
| Invoices, unit-level checks | `apps/app-under-test/e2e/invoices.spec.js` | 5 | Yes |
| Invoices, full lifecycle (BDD/Gherkin) | `apps/app-under-test/features/invoice-lifecycle.feature` | 3 | Yes |
| Billing / subscription | `apps/app-under-test/e2e/billing.spec.js` | 5 | Yes |
| Profile / account settings | `apps/app-under-test/e2e/profile.spec.js` | 5 | Yes |
| **SaaS app subtotal (Playwright + BDD)** | | **62** | |
| Client site, landing page | `apps/client-site/selenium/tests/landing.cjs` | 5 | No |
| Client site, edge cases | `apps/client-site/selenium/tests/edge-cases.cjs` | 6 | No |
| Client site, secondary/product page | `apps/client-site/selenium/tests/product-page.cjs` | 4 | No |
| Client site, forms/buttons | `apps/client-site/selenium/tests/forms.cjs` | 1 | No |
| **Client-site subtotal (Selenium)** | | **16** | |
| **Grand total** | | **78** | |

## Why the public number is 62, not 78

The SaaS app suite runs from `.github/workflows/e2e.yml`, which builds and publishes the Allure report. The client-site monitor runs from a separate workflow, `.github/workflows/client-monitor.yml`, on its own daily schedule, and never generates or publishes an Allure report. That split is intentional: a bad day on the client's site fails their monitor and pages my phone (ntfy), without turning the portfolio's own badge or report red.

## Known gaps

- Client-site forms have exactly one test. Forms are usually the highest-value thing to protect on a marketing site (that's how leads come in), so this is thin.
- Everything runs on Chrome only. No cross-browser coverage anywhere.
- No visual regression testing. A layout break wouldn't fail any of these 78.
- Billing and invoices are reasonably covered (10 tests combined) but skew toward happy-path. No tests for a failed payment or editing an invoice after it's sent.

## What alerts on failure

Both CI workflows push a phone notification (ntfy) when a run fails:

- `e2e.yml` → SaaS app suite, runs on push to `main` and weekly
- `client-monitor.yml` → client site, runs daily
