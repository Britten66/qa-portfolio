# App under test (Playwright)

My own SaaS app, tested black-box against production. The product name and URL are kept out of the repo: the target comes from the `TARGET_URL` env var and the public Allure report is anonymized before publishing.

## Layout

| Folder | What it holds |
|---|---|
| [api/](api/) | API smoke tests hitting the backend functions directly |
| [e2e/](e2e/) | Browser tests: landing, auth, dashboard, invoices, billing, profile, accessibility (axe-core) |
| [e2e/pages/](e2e/pages/) | Page objects shared by the specs (AuthModal, InvoiceList, Sidebar) |
| [features/](features/) | Gherkin scenarios for the invoice lifecycle, run with playwright-bdd |
| [features/steps/](features/steps/) | Step definitions backing the feature file |
| .auth/ | Saved login state, written by global-setup at run time (gitignored) |

`e2e/global-setup.js` logs in once and saves the session so authenticated specs don't repeat the login flow.

## Run

```bash
npm run test:public      # landing, auth, accessibility, API smoke
npm run test:dashboard   # authenticated flows
npm run test:bdd         # Gherkin scenarios
```

Reads `TARGET_URL`, `TEST_EMAIL`, `TEST_PASSWORD`, and `FUNCTIONS_BASE` from the environment, pointed at my own accounts.
