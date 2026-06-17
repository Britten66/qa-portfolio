module.exports = {
  spec: [
    "apps/client-site/selenium/tests/landing.cjs",
    "apps/client-site/selenium/tests/product-page.cjs",
    "apps/client-site/selenium/tests/edge-cases.cjs",
    "apps/client-site/selenium/tests/forms.cjs",
  ],
  timeout: 30000,
  retries: 2,
  reporter: "allure-mocha",
  reporterOption: ["resultsDir=allure-results"],
};
