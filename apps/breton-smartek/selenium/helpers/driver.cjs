const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function buildDriver() {
  const options = new chrome.Options();
  options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1280,800");
  const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  await driver.manage().setTimeouts({ implicit: 10000 });
  return driver;
}

module.exports = { buildDriver };
