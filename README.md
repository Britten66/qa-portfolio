# QA Portfolio

Black-box end-to-end suite for a production SaaS. Identifiers replaced under NDA. Runs nightly against the live target. No mocks, no local servers, no source code access.

![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/e2e.yml/badge.svg)

**[Live test report](https://britten66.github.io/qa-portfolio)** (anonymized public build)

## Behavioral coverage

Tests are grouped into 9 epics in the published Allure report:

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

## Stack

Playwright 1.52, `@axe-core/playwright`, `allure-playwright`, `playwright-bdd` for the Gherkin scenarios. Node 24. CI on GitHub Actions (nightly cron, `workflow_dispatch`, push to main). Allure HTML deployed to GitHub Pages on the `gh-pages` branch.

BDD is used only on the record lifecycle feature, where stakeholder readability is worth the indirection. Everything else stays as plain Playwright specs.


**Behind The Project Idea .** Public, authenticated, API-smoke, and BDD suites are separate Playwright projects. Public regressions are visible independently of auth failures, which matters when third-party auth services flake.


## Repo layout

```
apps/app-under-test/
  api/                 contract smoke specs
  e2e/                 browser flow specs
  e2e/pages/           page objects (AuthModal, Sidebar, InvoiceList)
  features/            Gherkin .feature files
  features/steps/      step definitions
  .auth/               gitignored, session storage
scripts/               CI tooling (Allure anonymizer)
.github/workflows/e2e.yml
```
