module.exports = {
  spec: [
    "apps/breton-smartek/selenium/tests/landing.cjs",
    "apps/breton-smartek/selenium/tests/fireq2.cjs",
    "apps/breton-smartek/selenium/tests/sneaky.cjs",
    "apps/breton-smartek/selenium/tests/forms.cjs",
  ],
  timeout: 30000,
  reporter: "allure-mocha",
  reporterOption: ["resultsDir=allure-results"],
};
