# QA Portfolio

![CI](https://github.com/Britten66/qa-portfolio/actions/workflows/e2e.yml/badge.svg)

**Live test report:** https://britten66.github.io/qa-portfolio

This is my working QA automation portfolio. It is not a demo or a tutorial copy. It is two real products that I test continuously against their live production sites, with the results published automatically after every run. The green badge above is the latest run. The link above is the report you can click through.

## What this shows I can do

- Build end to end UI tests with **Playwright** and **Selenium**, the two industry standards.
- Test real production systems black box, with no mocks, including logged in flows.
- Write **BDD** scenarios in plain Gherkin so non technical people can read what is tested.
- Cover **accessibility** (axe-core) and **API** health, not just clicking buttons.
- Run everything automatically in **CI** (GitHub Actions) and publish a shareable **Allure** report.
- Keep client and product details private while still showing the work in public.

## The two projects

**1. My SaaS app** (`apps/app-under-test`)
A full Playwright suite covering sign in and sessions, the dashboard, the invoice lifecycle, billing, profile settings, accessibility, and API smoke checks. BDD scenarios run on top for the invoice flow. The product is anonymized so nothing identifies it publicly.

**2. A client site** (`apps/client-site`)
A live marketing site I maintain, monitored with Selenium and Mocha. It checks that pages load, navigation works, images are not broken, links are not dead, the site stays on HTTPS, and there are no JavaScript errors. The client is kept anonymous. This runs as best effort monitoring, so a hiccup on their site never breaks my portfolio's status.

## How to walk through it

```
apps/
  app-under-test/     Playwright suite for my SaaS
    api/              API smoke tests
    e2e/              browser tests and page objects
    features/         BDD scenarios (Gherkin and step definitions)
  client-site/
    selenium/         Selenium and Mocha monitoring suite
.github/workflows/    the CI pipeline: test, build report, publish
scripts/              the script that anonymizes the public report
```

Each project folder has its own README that explains every file:
[app-under-test](apps/app-under-test/README.md) and [client-site](apps/client-site/README.md).

Good order to look: open the [live report](https://britten66.github.io/qa-portfolio) first to see passing results, then open a project README to see how the tests are organized, then open a test file to see how one is written.

## How it runs

Every push to `main`, and once a week on a schedule, GitHub Actions installs the tools, runs all the suites against production, generates the Allure report, anonymizes it, and publishes it to GitHub Pages. No manual steps.

## Tools

Playwright, Selenium WebDriver, Mocha, axe-core, Allure, playwright-bdd, Node 24, GitHub Actions.

## Running it yourself

The suite is wired to my own accounts and URLs through environment variables, so it is built to run as my portfolio rather than to be cloned and run as is.

```bash
npm install
npm run test:public          # public pages, auth, accessibility, API
npm run test:dashboard       # logged in flows
npm run test:bdd             # Gherkin scenarios
npm run test:client-site     # Selenium monitoring suite
```
