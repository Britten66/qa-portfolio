const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";
const FIREQ2 = `${BASE}/fireq-2/`;

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
    await driver.get(FIREQ2);
    await driver.findElement(By.css(".cta-btn")).click();
    assert.ok(await driver.findElement(By.css("form, .elementor-popup-modal")).isDisplayed());
  });

  it.skip("empty form shows validation error", async () => {
    await driver.get(FIREQ2);
    await driver.findElement(By.css("form [type='submit']")).click();
    assert.ok(await driver.findElement(By.css(".elementor-error, .wpcf7-not-valid-tip")).isDisplayed());
  });
});
