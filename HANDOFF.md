# Handoff Brief

## What This Repo Is

A standalone QA portfolio. Tests run against live production URLs.
No app source code lives here. Tests are black-box, same as a real user's browser.

## Live Report

https://britten66.github.io/qa-portfolio
Deployed automatically after every CI run via GitHub Pages (gh-pages branch).

## Apps Currently Tested

### InvoicePrepper (https://invoiceprepper.com)
- React + Vite frontend, Supabase auth/db, Stripe billing, Cloudflare Pages hosting
- Source repo: https://github.com/Britten66/receipt-generator (separate, private concern)
- Test location: apps/invoiceprepper/e2e/

## CI

- Workflow: .github/workflows/invoiceprepper.yml
- Trigger: nightly 6am UTC + manual (workflow_dispatch)
- Secrets needed in GitHub repo settings:
  - TEST_EMAIL — test account email for InvoicePrepper
  - TEST_PASSWORD — test account password for InvoicePrepper

## What Still Needs Doing

1. Add secrets to GitHub repo (Settings → Secrets → Actions)
   - TEST_EMAIL
   - TEST_PASSWORD

2. Enable GitHub Pages in repo settings
   - Source: Deploy from branch
   - Branch: gh-pages / root
   (Pages auto-enables after first successful deploy but worth checking)

3. Trigger first manual run to confirm everything is green
   - Actions tab → InvoicePrepper E2E → Run workflow

4. Once green: go to receipt-generator repo and slim its CI
   - Remove Playwright install + E2E run + Allure deploy from ci.yml
   - Keep: gitleaks, Semgrep, npm audit, Vitest, build
   - Then delete the e2e test files from receipt-generator/frontend/src/__tests__/e2e/

5. Add visual regression tests (Playwright snapshots) — biggest gap in current coverage

6. Add trades-followup app when it is built

## Playwright Config

baseURL: https://invoiceprepper.com
Auth: global-setup.js logs in once, saves session to apps/invoiceprepper/.auth/user.json
Two projects: invoiceprepper-public (no login) and invoiceprepper-dashboard (uses saved session)

## Stack

- Playwright 1.52
- @axe-core/playwright (a11y)
- allure-playwright (reporting)
- Node 24
