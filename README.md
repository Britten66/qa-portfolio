# QA Portfolio

![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/e2e.yml/badge.svg)

Live report: https://britten66.github.io/qa-portfolio

I'm a QA engineer. This is the actual test suite I run, not a sample project. It tests two real apps against their live sites and publishes the results after every run, so the report above is always current.

There are two apps in here.

### My SaaS app

Lives in [apps/app-under-test](apps/app-under-test). I test it with Playwright: sign in and sessions, the dashboard, the invoice lifecycle, billing, profile, and accessibility, plus a few API smoke checks. There are also some BDD scenarios written in Gherkin for the invoice flow, so the test reads like plain English. The product is anonymized, so nothing public points back to it.

### A client site

Lives in [apps/client-site](apps/client-site). It's a marketing site I look after, checked with Selenium and Mocha. The tests make sure pages load, nav works, images aren't broken, links aren't dead, the site stays on HTTPS, and the console is clean. The client stays anonymous. These run as best effort, so if their site has a bad day it doesn't drag my badge down with it.

### Getting around

```
apps/
  app-under-test/     Playwright suite for my SaaS
    api/              API smoke tests
    e2e/              browser tests and page objects
    features/         BDD scenarios
  client-site/
    selenium/         Selenium and Mocha checks
.github/workflows/    the CI that runs everything and publishes the report
scripts/              the script that strips private details from the report
```

Each app folder has its own README explaining the files. If you're new to the repo, open the [live report](https://britten66.github.io/qa-portfolio) first, then a project README, then a test file.

### How it runs

Every push to `main`, and once a week, GitHub Actions runs all the suites against production, builds the Allure report, scrubs anything private out of it, and publishes it to GitHub Pages. Nothing manual.

### Running it locally

It's wired to my own accounts and URLs through environment variables, so it's set up to be my portfolio rather than something you clone and run.

```bash
npm install
npm run test:public          # public pages, auth, accessibility, API
npm run test:dashboard       # logged in flows
npm run test:bdd             # Gherkin scenarios
npm run test:client-site     # Selenium checks
```

Built with Playwright, Selenium, Mocha, axe-core, Allure, and GitHub Actions on Node 24.
