# Client site (Selenium)

A small business marketing site I maintain, tested live with Selenium WebDriver and Mocha. The client and its URL are kept anonymous: the target comes from the `CLIENT_SITE_URL` env var, and the public Allure report is anonymized before publishing.

## Layout

| File | What it covers |
|---|---|
| [selenium/helpers/driver.cjs](selenium/helpers/driver.cjs) | Builds the Chrome driver (headless in CI) with an implicit wait |
| [selenium/tests/landing.cjs](selenium/tests/landing.cjs) | Homepage loads: title, header, nav, footer, no 404 |
| [selenium/tests/product-page.cjs](selenium/tests/product-page.cjs) | A secondary content page loads and renders |
| [selenium/tests/edge-cases.cjs](selenium/tests/edge-cases.cjs) | Things that slip through manual checks: default CMS titles, dead nav links, broken images, http to https redirect, console JS errors |
| [selenium/tests/forms.cjs](selenium/tests/forms.cjs) | Buttons and contact form. Two form tests are stubbed until a deploy adds stable selectors |

## Run

```bash
npm run test:client-site
```

Set `CLIENT_SITE_URL` (and optionally `CLIENT_PAGE_PATH` for the secondary page) in the environment.
