const { By, logging } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.CLIENT_SITE_URL || "https://example.com";

// noisy third-party/CMS error sources to ignore, supplied per site so the
// source stays generic. comma separated, e.g. "vendor/scripts,plugins"
const IGNORE_ERRORS = (process.env.CLIENT_IGNORE_ERROR_PATTERNS || "")
  .split(",").map(s => s.trim()).filter(Boolean);

describe("edge cases", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  beforeEach(async () => { await driver.get(BASE); });
  after(async () => { await driver.quit(); });

  it("title is not a placeholder default", async () => {
    assert.ok(!/^(home|untitled|new page)$/i.test((await driver.getTitle()).trim()));
  });

  it("no nav links go to #", async () => {
    for (const link of await driver.findElements(By.css("nav a"))) {
      const href = await link.getAttribute("href");
      assert.ok(href && href.trim() !== "#");
    }
  });

  it("no broken images", async () => {
    const broken = await driver.executeScript(
      `return Array.from(document.querySelectorAll("img"))
        .filter(i => i.complete && i.naturalWidth === 0 && i.src)
        .map(i => i.src);`
    );
    assert.deepStrictEqual(broken, []);
  });

  it("redirects http to https", async () => {
    await driver.get(BASE.replace("https://", "http://"));
    assert.ok((await driver.getCurrentUrl()).startsWith("https://"));
  });

  it("no custom JS errors", async () => {
    const logDriver = await buildDriver();
    try {
      await logDriver.get(BASE);
      const errors = (await logDriver.manage().logs().get(logging.Type.BROWSER))
        .filter(l => l.level.value >= logging.Level.SEVERE.value && !IGNORE_ERRORS.some(p => l.message.includes(p)));
      assert.strictEqual(errors.length, 0);
    } finally {
      await logDriver.quit();
    }
  });

  it("has a contact link", async () => {
    const links = await driver.findElements(By.css("a[href^='tel:'], a[href^='mailto:']"));
    assert.ok(links.length > 0);
  });
});
