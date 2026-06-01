const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";

describe("Breton Smartek: landing page", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  beforeEach(async () => { await driver.get(BASE); });
  after(async () => { await driver.quit(); });

  it("has a non-empty title", async () => {
    const title = await driver.getTitle();
    assert.ok(title.trim().length > 0);
  });

  it("header is visible", async () => {
    const el = await driver.wait(until.elementLocated(By.css("header, .site-header, #masthead")), 10000);
    assert.ok(await el.isDisplayed());
  });

  it("nav has links", async () => {
    const nav = await driver.wait(until.elementLocated(By.css("nav, .nav-menu, .elementor-nav-menu")), 10000);
    const links = await nav.findElements(By.css("a"));
    assert.ok(links.length > 0);
  });

  it("footer is visible", async () => {
    const el = await driver.wait(until.elementLocated(By.css("footer, .site-footer, #colophon")), 10000);
    assert.ok(await el.isDisplayed());
  });

  it("no 404 in page body", async () => {
    const body = await driver.findElement(By.css("body")).getText();
    assert.ok(!/404|not found/i.test(body.slice(0, 500)));
  });
});
