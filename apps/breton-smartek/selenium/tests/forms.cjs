const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";
const FIREQ2 = BASE + "/fireq-2/";

describe("Breton Smartek — Buttons and forms", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  after(async () => { await driver.quit(); });

  it("at least one button or CTA link is visible on homepage", async () => {
    await driver.get(BASE);
    const btns = await driver.findElements(
      By.css("a[href], button")
    );
    const visible = [];
    for (const btn of btns) {
      if (await btn.isDisplayed()) visible.push(btn);
    }
    assert.ok(visible.length > 0, "No visible buttons or links found on homepage");
  });

  // TODO: add selector once form is live tonight
  it.skip("form popup appears when CTA is clicked", async () => {
    await driver.get(FIREQ2);
    const btn = await driver.wait(
      until.elementLocated(By.css("/* add button selector here */")),
      10000
    );
    await btn.click();
    const form = await driver.wait(
      until.elementLocated(By.css("form, .elementor-popup-modal")),
      5000
    );
    assert.ok(await form.isDisplayed(), "Form/popup should appear after button click");
  });

  // TODO: add selector once form is live tonight
  it.skip("empty form submit shows a validation error", async () => {
    await driver.get(FIREQ2);
    const submitBtn = await driver.wait(
      until.elementLocated(By.css("form [type='submit'], form button")),
      10000
    );
    await submitBtn.click();
    const error = await driver.wait(
      until.elementLocated(By.css(".elementor-error, .wpcf7-not-valid-tip, [class*='error']")),
      5000
    );
    assert.ok(await error.isDisplayed(), "Validation error should appear on empty submit");
  });
});
