const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.CLIENT_SITE_URL || "https://example.com";
const PRODUCT_PAGE = `${BASE}${process.env.CLIENT_PAGE_PATH || "/"}`;

describe("buttons and forms", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  after(async () => { await driver.quit(); });

  it("homepage has visible buttons", async () => {
    await driver.get(BASE);
    const buttons = await driver.findElements(By.css("a[href], button"));
    let found = false;
    for (const el of buttons) {
      if (await el.isDisplayed()) { found = true; break; }
    }
    assert.ok(found);
  });

  it.skip("form opens on CTA click", async () => {
    await driver.get(PRODUCT_PAGE);
    await driver.findElement(By.css("[data-cta], .cta")).click();
    assert.ok(await driver.findElement(By.css("form, [role='dialog']")).isDisplayed());
  });

  it.skip("empty form shows validation error", async () => {
    await driver.get(PRODUCT_PAGE);
    await driver.findElement(By.css("form [type='submit']")).click();
    assert.ok(await driver.findElement(By.css("form [aria-invalid='true'], .field-error")).isDisplayed());
  });
});
