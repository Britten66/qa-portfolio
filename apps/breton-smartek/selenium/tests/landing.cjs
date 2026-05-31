const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";

describe("Breton Smartek — Landing page", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  after(async () => { await driver.quit(); });

  it("page loads with a non-empty title", async () => {
    await driver.get(BASE);
    const title = await driver.getTitle();
    assert.ok(title.trim().length > 0, `Expected a page title, got: "${title}"`);
  });

  it("header is visible", async () => {
    await driver.get(BASE);
    const header = await driver.wait(
      until.elementLocated(By.css("header, .site-header, #masthead")),
      10000
    );
    assert.ok(await header.isDisplayed(), "Header should be visible");
  });

  it("navigation menu has links", async () => {
    await driver.get(BASE);
    const nav = await driver.wait(
      until.elementLocated(By.css("nav, .nav-menu, .elementor-nav-menu")),
      10000
    );
    const links = await nav.findElements(By.css("a"));
    assert.ok(links.length > 0, "Navigation should contain at least one link");
  });

  it("footer is present", async () => {
    await driver.get(BASE);
    const footer = await driver.wait(
      until.elementLocated(By.css("footer, .site-footer, #colophon")),
      10000
    );
    assert.ok(await footer.isDisplayed(), "Footer should be visible");
  });

  it("page does not show a 404 or error", async () => {
    await driver.get(BASE);
    const bodyText = await driver.findElement(By.css("body")).getText();
    assert.ok(
      !/404|not found/i.test(bodyText.slice(0, 500)),
      "Page should not show a 404 or error message"
    );
  });
});
