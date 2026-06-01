const { By } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const PAGE = `${process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com"}/fireq-2/`;

describe("fireq-2 page", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  beforeEach(async () => { await driver.get(PAGE); });
  after(async () => { await driver.quit(); });

  it("has a title", async () => {
    assert.ok((await driver.getTitle()).trim().length > 0);
  });

  it("header is visible", async () => {
    assert.ok(await driver.findElement(By.css("header")).isDisplayed());
  });

  it("main content is visible", async () => {
    assert.ok(await driver.findElement(By.css("main, .elementor")).isDisplayed());
  });

  it("no 404", async () => {
    const body = await driver.findElement(By.css("body")).getText();
    assert.ok(!/404|not found/i.test(body.slice(0, 500)));
  });
});
