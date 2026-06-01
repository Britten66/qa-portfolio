const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";
const PAGE = `${BASE}/fireq-2/`;

describe("Breton Smartek: fireq-2 page", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  beforeEach(async () => { await driver.get(PAGE); });
  after(async () => { await driver.quit(); });

  it("has a non-empty title", async () => {
    const title = await driver.getTitle();
    assert.ok(title.trim().length > 0);
  });

  it("no 404 in page body", async () => {
    const body = await driver.findElement(By.css("body")).getText();
    assert.ok(!/404|not found/i.test(body.slice(0, 500)));
  });

  it("main content area is visible", async () => {
    const el = await driver.wait(until.elementLocated(By.css("main, .elementor, #primary, .site-main")), 10000);
    assert.ok(await el.isDisplayed());
  });

  it("header is visible", async () => {
    const el = await driver.wait(until.elementLocated(By.css("header, .site-header, #masthead")), 10000);
    assert.ok(await el.isDisplayed());
  });
});
