module.exports = {
  spec: [
    "apps/breton-smartek/selenium/tests/landing.cjs",
    "apps/breton-smartek/selenium/tests/fireq2.cjs",
  ],
  timeout: 30000,
  reporter: "allure-mocha",
  reporterOption: ["resultsDir=allure-results"],
};
