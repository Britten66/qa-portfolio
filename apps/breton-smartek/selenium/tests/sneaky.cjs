const { By, logging } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";

describe("Breton Smartek: edge cases", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  beforeEach(async () => { await driver.get(BASE); });
  after(async () => { await driver.quit(); });

  it("title is not a WordPress default", async () => {
    const title = await driver.getTitle();
    assert.ok(!/^home$|^wordpress$/i.test(title.trim()), `Generic title: "${title}"`);
  });

  it("no nav links go to bare #", async () => {
    const links = await driver.findElements(By.css("nav a, .nav-menu a, .elementor-nav-menu a"));
    for (const link of links) {
      const href = await link.getAttribute("href");
      assert.ok(href && href.trim() !== "#" && href.trim() !== "", `Dead link: "${href}"`);
    }
  });

  it("no broken images", async () => {
    const broken = await driver.executeScript(`
      return Array.from(document.querySelectorAll("img"))
        .filter(img => img.complete && img.naturalWidth === 0 && img.src)
        .map(img => img.src);
    `);
    assert.deepStrictEqual(broken, [], `Broken: ${broken.join(", ")}`);
  });

  it("CTA buttons have real destinations", async () => {
    const buttons = await driver.findElements(
      By.css("a.elementor-button, .wp-block-button__link, .elementor-cta__button, a.btn")
    );
    for (const btn of buttons) {
      const href = await btn.getAttribute("href");
      assert.ok(href && href.trim() !== "#" && href.trim() !== "", `CTA goes nowhere: "${href}"`);
    }
  });

  it("HTTP redirects to HTTPS", async () => {
    await driver.get(BASE.replace("https://", "http://"));
    const url = await driver.getCurrentUrl();
    assert.ok(url.startsWith("https://"), `No HTTPS redirect: ${url}`);
  });

  it("no custom JS errors on page load", async () => {
    const logDriver = await buildDriver();
    try {
      await logDriver.get(BASE);
      const logs = await logDriver.manage().logs().get(logging.Type.BROWSER);
      const errors = logs.filter(l =>
        l.level.value >= logging.Level.SEVERE.value &&
        !l.message.includes("wp-includes") &&
        !l.message.includes("wp-content/plugins")
      );
      assert.strictEqual(errors.length, 0, errors.map(e => e.message).join(", "));
    } finally {
      await logDriver.quit();
    }
  });

  it("contact info is linked", async () => {
    const links = await driver.findElements(By.css("a[href^='tel:'], a[href^='mailto:']"));
    assert.ok(links.length > 0);
  });
});
