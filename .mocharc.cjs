module.exports = {
  spec: "apps/breton-smartek/selenium/tests/**/*.cjs",
  timeout: 30000,
  reporter: "allure-mocha",
  reporterOption: ["resultsDir=allure-results"],
};
