# QA Portfolio

Black-box end-to-end suite. Runs nightly against live production. No mocks, no local servers, no source-code access.

![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/e2e.yml/badge.svg)

**[Live test report](https://britten66.github.io/qa-portfolio)** (anonymized public build)

## Behavioral coverage

Tests are grouped into 9 epics in the published Allure report:

| Epic | Coverage |
|------|----------|
| EP-01 Authentication & Session | Sign in, sign up, password reset, modal keyboard behaviour, session reuse |
| EP-02 Marketing Funnel & Acquisition | Landing CTAs, navigation, mock preview, footer integrity |
| EP-03 SEO Surfaces & Discoverability | Trade-targeted landing pages, heading hierarchy, canonical links |
| EP-04 Dashboard & Navigation | Sidebar, status filters, empty state, theme persistence |
| EP-05 Record Lifecycle (CRUD) | Create, edit, send, PDF download, soft delete, restore |
| EP-06 Subscription Billing & Payments | Plan modal, upgrade flow, payment redirect, plan-state display |
| EP-07 Account Settings & Profile | Profile persistence, password update, avatar / logo flows |
| EP-08 Accessibility Compliance | WCAG 2.1 AA via axe-core on every public and authed route |
| EP-09 API Health & Contract Smoke | Edge function uptime, response shape, auth boundary |

## Stack

Playwright 1.52, `@axe-core/playwright`, `allure-playwright`. Node 24. CI on GitHub Actions (nightly cron, `workflow_dispatch`, push to main). Allure HTML deployed to GitHub Pages on the `gh-pages` branch.

## Architecture decisions

**Live-target testing.** No staging environment, no test doubles. Production is the test target. Catches CDN, DNS, third-party service, and config-drift regressions that staging suites miss.

**Session reuse.** A single login runs in `global-setup.js`, persists storage state to `apps/<app>/.auth/user.json`, and replays across every authenticated suite. Avoids rate limits and saves ~3s per spec.

**Project partitioning.** Public, authenticated, and API-smoke suites are separate Playwright projects. Public regressions are visible independently of auth failures, which matters when third-party auth services flake.

**Anonymized public report.** A post-processing step (`scripts/anonymize-allure-portfolio.cjs`) strips product identifiers, hostnames, emails, and source paths from `allure-results/*.json` before the Allure CLI generates the public report. Epic / feature / story labels are re-derived from spec routing.

## Run locally

```bash
npm install
npx playwright install chromium

npm run test:public          # public + API smoke (no creds)
npm run test:dashboard       # authenticated suites (needs TEST_EMAIL / TEST_PASSWORD)

npm run report:portfolio     # anonymize, generate HTML report
```

## Repo layout

```
apps/<app>/
  api/       contract smoke specs
  e2e/       browser flow specs
  .auth/     gitignored, session storage
scripts/     CI tooling (Allure anonymizer)
.github/workflows/e2e.yml
```
