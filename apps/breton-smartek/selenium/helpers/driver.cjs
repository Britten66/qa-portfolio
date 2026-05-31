const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

function buildDriver() {
  const options = new chrome.Options();
  options.addArguments(
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--window-size=1280,800"
  );
  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
}

module.exports = { buildDriver };
