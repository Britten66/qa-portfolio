# QA Portfolio


Live report: https://britten66.github.io/qa-portfolio

I'm a QA engineer. This is the actual test suite I run, not a sample project. It tests a real app against its live site and publishes the results after every run, so the report above is always current.

### My SaaS app

Lives in [apps/app-under-test](apps/app-under-test). I test it with Playwright: sign in and sessions, the dashboard, the invoice lifecycle, billing, profile, and accessibility, plus a few API smoke checks. There are also some BDD scenarios written in Gherkin for the invoice flow, so the test reads like plain English. The product is anonymized, so nothing public points back to it.

### Getting around

```
apps/
  app-under-test/     Playwright suite for my SaaS
    api/              API smoke tests
    e2e/              browser tests and page objects
    features/         BDD scenarios
.github/workflows/    the CI that runs everything and publishes the report
scripts/              the script that strips private details from the report
```

Each app folder has its own README explaining the files. If you're new to the repo, open the [live report](https://britten66.github.io/qa-portfolio) first, then a project README, then a test file. For a breakdown of what's covered and what isn't, see [docs/coverage.md](docs/coverage.md).

### How it runs

Every push to `main`, and once a week, GitHub Actions runs all the suites against production, builds the Allure report, scrubs anything private out of it, and publishes it to GitHub Pages. Nothing manual.

### Running it locally

It's wired to my own accounts and URLs through environment variables, so it's set up to be my portfolio rather than something you clone and run.

```bash
npm install
npm run test:public          # public pages, auth, accessibility, API
npm run test:dashboard       # logged in flows
npm run test:bdd             # Gherkin scenarios
```

Built with Playwright, axe-core, Allure, and GitHub Actions on Node 24.
