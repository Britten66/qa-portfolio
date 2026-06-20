# Client site (Selenium)

A marketing site I look after, checked live with Selenium and Mocha. The client and its URL stay anonymous: the target comes from the `CLIENT_SITE_URL` env var, and the report is scrubbed before it goes public.

Here's what each test covers:

| File | What it checks |
|---|---|
| [selenium/helpers/driver.cjs](selenium/helpers/driver.cjs) | Builds the headless Chrome driver with an implicit wait |
| [selenium/tests/landing.cjs](selenium/tests/landing.cjs) | Homepage loads: title, header, nav, footer, no 404 |
| [selenium/tests/product-page.cjs](selenium/tests/product-page.cjs) | A second page loads and renders |
| [selenium/tests/edge-cases.cjs](selenium/tests/edge-cases.cjs) | The stuff that slips past a manual check: placeholder titles, dead nav links, broken images, http to https redirect, console errors |
| [selenium/tests/forms.cjs](selenium/tests/forms.cjs) | Buttons and the contact form. The two form tests are stubbed until a deploy gives them stable selectors |

## Running it

```bash
npm run test:client-site
```

Set `CLIENT_SITE_URL` in the environment (and `CLIENT_PAGE_PATH` if you want to point the second page somewhere specific).
