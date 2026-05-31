# QA Portfolio

Two live projects tested against production. No mocks, no local servers, no source code access. Runs nightly and on every push.

![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/e2e.yml/badge.svg)

**[Live test report](https://britten66.github.io/qa-portfolio)** (anonymized public build)

---

## Projects

### App Under Test — SaaS (anonymized)
Black-box Playwright suite against a production SaaS. Identifiers replaced under NDA.

| Epic | Coverage |
|------|----------|
| EP01 Authentication & Session | Sign in, sign up, password reset, modal keyboard behaviour, session reuse |
| EP02 Marketing Funnel & Acquisition | Landing CTAs, navigation, footer integrity |
| EP03 SEO Surfaces | Heading hierarchy, canonical links, page metadata |
| EP04 Dashboard & Navigation | Sidebar, status filters, empty state |
| EP05 Record Lifecycle | New record form open / fill / cancel, status filters, soft-delete UI |
| EP06 Subscription Billing | Plan modal, payment redirect, plan-state display |
| EP07 Account Settings & Profile | Profile persistence, password update |
| EP08 Accessibility Compliance | WCAG 2.1 AA via axe-core on every public and authed route |
| EP09 API Health & Contract Smoke | Edge function uptime, CORS preflight, auth boundary |

**Stack:** Playwright 1.52 · axe-core · Allure · playwright-bdd (Gherkin) · Node 24

---

### Breton Smartek — WordPress / Elementor
Selenium happy-path suite against a live WordPress + Elementor site.

| Suite | Coverage |
|-------|----------|
| Landing | Page load, header, navigation, footer, no 404 |
| FireQ-2 | Page load, content visible, no 404 |

**Stack:** Selenium WebDriver 4 · Mocha · Node 24

---

## How to run locally

```bash
# install
npm install

# SaaS — public pages + API smoke (no login needed)
npm run test:public

# SaaS — authenticated dashboard
npm run test:dashboard

# SaaS — BDD / Gherkin scenarios
npm run test:bdd

# Breton Smartek — Selenium
npm run test:breton-smartek
```

Copy `.env.example` to `.env` and fill in your values before running locally.

---

## CI / CD

GitHub Actions runs the full suite on every push to `main` and on a nightly cron (06:00 UTC). The Allure report is auto-deployed to GitHub Pages after every run.

```
push to main
  └── Public + API smoke
  └── Authenticated dashboard
  └── BDD scenarios
  └── Breton Smartek Selenium
  └── Allure report → GitHub Pages
```

---

## Repo layout

```
apps/
  app-under-test/        anonymized SaaS — Playwright specs
    api/                 contract smoke
    e2e/                 browser flows + page objects
    features/            Gherkin .feature files + step definitions
    .auth/               gitignored session storage
  breton-smartek/        WordPress/Elementor client — Selenium specs
    selenium/
      helpers/           WebDriver factory
      tests/             Mocha test files
scripts/                 Allure anonymizer (strips PII before publish)
.github/workflows/       CI pipeline
```
