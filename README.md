# QA Portfolio

End-to-end test suite running against live production apps.
Tests fire nightly and on demand. Results published to GitHub Pages after every run.

**[View Live Test Report →](https://britten66.github.io/qa-portfolio)**

---

## Apps Under Test

| App | Type | Stack | Status |
|---|---|---|---|
| [InvoicePrepper](https://invoiceprepper.com) | SaaS invoicing tool | React, Supabase, Stripe, Cloudflare Pages | ![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/invoiceprepper.yml/badge.svg) |

---

## InvoicePrepper Coverage

| Suite | What It Tests |
|---|---|
| Landing | Hero CTA, nav buttons, mock preview, footer links |
| Auth | Sign up, sign in, form validation, modal keyboard behaviour |
| Dashboard | Invoice grid loads, status badges, empty state |
| Invoices | Create, edit, send, download PDF |
| Billing | Upgrade flow, plan modal, Stripe redirect |
| Profile | Settings save, password update |
| SEO Pages | All 12 trade-specific pages load with correct headings |
| Accessibility | WCAG 2.1 AA via axe-core on every page |

---

## How It Works

Tests run against the deployed URL, not a local server.
No app source code is in this repo.

```
qa-portfolio/
  apps/
    invoiceprepper/
      e2e/        Playwright specs
      .auth/      saved login session (gitignored)
  shared/
    helpers/      reusable utilities across apps
  playwright.config.js
  .github/workflows/
    invoiceprepper.yml   nightly + manual trigger
```

---

## Run Locally

```bash
npm install
npx playwright install chromium
npm test
```
