const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";
const FIREQ2 = `${BASE}/fireq-2/`;

describe("Breton Smartek: buttons and forms", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  after(async () => { await driver.quit(); });

  it("at least one button is visible on homepage", async () => {
    await driver.get(BASE);
    const all = await driver.findElements(By.css("a[href], button"));
    let found = false;
    for (const el of all) {
      if (await el.isDisplayed()) { found = true; break; }
    }
    assert.ok(found);
  });

  it.skip("form popup appears on CTA click", async () => {
    await driver.get(FIREQ2);
    const btn = await driver.wait(until.elementLocated(By.css(".cta-btn")), 10000);
    await btn.click();
    const form = await driver.wait(until.elementLocated(By.css("form, .elementor-popup-modal")), 5000);
    assert.ok(await form.isDisplayed());
  });

  it.skip("empty form submit shows validation error", async () => {
    await driver.get(FIREQ2);
    const submit = await driver.wait(until.elementLocated(By.css("form [type='submit'], form button")), 10000);
    await submit.click();
    const error = await driver.wait(
      until.elementLocated(By.css(".elementor-error, .wpcf7-not-valid-tip, [class*='error']")),
      5000
    );
    assert.ok(await error.isDisplayed());
  });
});
