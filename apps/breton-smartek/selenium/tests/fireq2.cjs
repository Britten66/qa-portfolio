const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const FIREQ2 = (process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com") + "/fireq-2/";

describe("Breton Smartek — FireQ-2 page", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  after(async () => { await driver.quit(); });

  it("page loads with a non-empty title", async () => {
    await driver.get(FIREQ2);
    const title = await driver.getTitle();
    assert.ok(title.trim().length > 0, `Expected a page title, got: "${title}"`);
  });

  it("page does not show a 404 or error", async () => {
    await driver.get(FIREQ2);
    const bodyText = await driver.findElement(By.css("body")).getText();
    assert.ok(
      !/404|not found/i.test(bodyText.slice(0, 500)),
      "Page should not show a 404 or error"
    );
  });

  it("main content area is visible", async () => {
    await driver.get(FIREQ2);
    const main = await driver.wait(
      until.elementLocated(By.css("main, .elementor, #primary, .site-main")),
      10000
    );
    assert.ok(await main.isDisplayed(), "Main content should be visible");
  });

  it("header is visible", async () => {
    await driver.get(FIREQ2);
    const header = await driver.wait(
      until.elementLocated(By.css("header, .site-header, #masthead")),
      10000
    );
    assert.ok(await header.isDisplayed(), "Header should be visible");
  });

  // TODO: add form tests here once forms are live tonight
});
