# QA Portfolio

Production end-to-end test suite running against live deployed applications.
Tests run nightly and on demand via GitHub Actions. Results published after every run.

**[View Live Test Report →](https://britten66.github.io/qa-portfolio)**

---

## Coverage

| Suite | Tests |
|---|---|
| Landing page | CTA visibility, nav, mock preview, footer links |
| Authentication | Sign up, sign in, validation, modal keyboard behaviour |
| Dashboard | Invoice grid, status badges, empty state |
| Invoices | Create, edit, send, PDF download |
| Billing | Upgrade flow, plan modal, payment redirect |
| Profile | Settings persistence, password update |
| SEO pages | 12 trade-specific pages, heading structure, canonical links |
| Accessibility | WCAG 2.1 AA via axe-core on every route |

---

## Stack

- **Playwright** — E2E browser automation
- **axe-core** — WCAG 2.1 AA accessibility scanning
- **Allure** — test reporting, published to GitHub Pages
- **GitHub Actions** — nightly CI, manual trigger

---

## CI

![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/invoiceprepper.yml/badge.svg)

Tests run against a live production URL — no local server, no mocks.
Auth session is established once via global setup and reused across all authenticated suites.

---

## Run Locally

```bash
npm install
npx playwright install chromium
npm test
```
