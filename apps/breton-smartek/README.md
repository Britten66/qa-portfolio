# Breton Smartek (Selenium)

A client WordPress/Elementor site, tested live with Selenium WebDriver and Mocha.

## Layout

| File | What it covers |
|---|---|
| [selenium/helpers/driver.cjs](selenium/helpers/driver.cjs) | Builds the Chrome driver (headless in CI) with an implicit wait |
| [selenium/tests/landing.cjs](selenium/tests/landing.cjs) | Homepage loads: title, header, nav, footer, no 404 |
| [selenium/tests/fireq2.cjs](selenium/tests/fireq2.cjs) | The /fireq-2/ product page loads and renders |
| [selenium/tests/edge-cases.cjs](selenium/tests/edge-cases.cjs) | Things that slip through manual checks: WordPress default titles, dead nav links, broken images, http to https redirect, console JS errors |
| [selenium/tests/forms.cjs](selenium/tests/forms.cjs) | Buttons and contact form. Two form tests are skipped until the client's next deploy adds stable selectors |

## Run

```bash
npm run test:breton-smartek
```

Targets `https://bretonsmartek.com` by default; override with `BRETON_SMARTEK_URL`.
