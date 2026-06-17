const { By } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.CLIENT_SITE_URL || "https://example.com";
const PAGE = `${BASE}${process.env.CLIENT_PAGE_PATH || "/"}`;

describe("secondary page", function () {
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
    assert.ok(await driver.findElement(By.css("main, [role='main'], section")).isDisplayed());
  });

  it("no 404", async () => {
    const body = await driver.findElement(By.css("body")).getText();
    assert.ok(!/404|not found/i.test(body.slice(0, 500)));
  });
});
