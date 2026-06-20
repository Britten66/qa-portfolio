# App under test (Playwright)

My own SaaS, tested black box against production. I keep the product name and URL out of the repo: the target comes from the `TARGET_URL` env var, and the report is scrubbed before it goes public.

Here's what each folder holds:

| Folder | What's in it |
|---|---|
| [api/](api/) | API smoke tests that hit the backend functions directly |
| [e2e/](e2e/) | Browser tests: landing, auth, dashboard, invoices, billing, profile, accessibility (axe-core) |
| [e2e/pages/](e2e/pages/) | Page objects the specs share (AuthModal, InvoiceList, Sidebar) |
| [features/](features/) | Gherkin scenarios for the invoice lifecycle, run with playwright-bdd |
| [features/steps/](features/steps/) | The step definitions behind the feature file |
| .auth/ | Saved login state, written at run time (gitignored) |

`e2e/global-setup.js` logs in once and saves the session, so the authenticated specs don't each repeat the login.

## Running it

```bash
npm run test:public      # landing, auth, accessibility, API smoke
npm run test:dashboard   # authenticated flows
npm run test:bdd         # Gherkin scenarios
```

It reads `TARGET_URL`, `TEST_EMAIL`, `TEST_PASSWORD`, and `FUNCTIONS_BASE` from the environment, pointed at my own accounts.
