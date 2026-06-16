# QA Portfolio

![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/e2e.yml/badge.svg)

Live test report: **https://britten66.github.io/qa-portfolio**

---

Two real projects, tested against production. No mocks. The suite runs on every push and catches regressions before anyone notices.

**App under test** is my own SaaS, anonymized. Playwright covers auth, dashboard, invoices, billing, profile, accessibility, and API smoke tests. BDD scenarios run on top for the invoice lifecycle.

**Breton Smartek** is a client WordPress/Elementor site. Selenium covers page loads, navigation, broken images, dead links, HTTPS, JS errors, and contact info. Form tests are pending the next deploy.

---

## Where to look

```
apps/
  app-under-test/     Playwright suite for my SaaS
    api/              API smoke tests
    e2e/              browser tests + page objects
    features/         BDD scenarios (Gherkin + steps)
  breton-smartek/
    selenium/         Selenium + Mocha suite for the client site
.github/workflows/    CI pipeline (test, report, deploy to Pages)
scripts/              Allure report anonymizer
```

Each app folder has its own README explaining the files: [app-under-test](apps/app-under-test/README.md), [breton-smartek](apps/breton-smartek/README.md).

## Stack

Playwright, Selenium WebDriver, Mocha, axe-core, Allure, playwright-bdd. Node 24. GitHub Actions on push and weekly. Report auto-deploys to GitHub Pages.

## Run locally

Runs against my own accounts and target URLs, set through environment variables, so the suite is wired to my projects rather than meant to be cloned and run as-is.

```bash
npm install

npm run test:public          # landing, auth, smoke
npm run test:dashboard       # authenticated flows
npm run test:bdd             # Gherkin scenarios
npm run test:breton-smartek  # Selenium suite
```
