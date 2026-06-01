const { By, until, logging } = require("selenium-webdriver");
const assert = require("assert");
const { buildDriver } = require("../helpers/driver.cjs");

const BASE = process.env.BRETON_SMARTEK_URL || "https://bretonsmartek.com";

describe("Breton Smartek — Sneaky slip-throughs", function () {
  this.timeout(30000);
  let driver;

  before(async () => { driver = await buildDriver(); });
  after(async () => { await driver.quit(); });

  it("page title is not generic WordPress default", async () => {
    await driver.get(BASE);
    const title = await driver.getTitle();
    assert.ok(
      !/^home$|^wordpress$/i.test(title.trim()),
      `Title looks like a default: "${title}"`
    );
  });

  it("no nav links point to bare #", async () => {
    await driver.get(BASE);
    const links = await driver.findElements(By.css("nav a, .nav-menu a, .elementor-nav-menu a"));
    for (const link of links) {
      const href = await link.getAttribute("href");
      assert.ok(
        href && href.trim() !== "#" && href.trim() !== "",
        `Nav link has no real destination: href="${href}"`
      );
    }
  });

  it("no broken images on homepage", async () => {
    await driver.get(BASE);
    const broken = await driver.executeScript(`
      return Array.from(document.querySelectorAll("img"))
        .filter(img => img.complete && img.naturalWidth === 0 && img.src)
        .map(img => img.src);
    `);
    assert.deepStrictEqual(broken, [], `Broken images found: ${broken.join(", ")}`);
  });

  it("CTA buttons have a real href or trigger an action", async () => {
    await driver.get(BASE);
    const buttons = await driver.findElements(
      By.css("a.elementor-button, .wp-block-button__link, .elementor-cta__button, a.btn")
    );
    for (const btn of buttons) {
      const href = await btn.getAttribute("href");
      assert.ok(
        href && href.trim() !== "#" && href.trim() !== "",
        `CTA button goes nowhere: href="${href}"`
      );
    }
  });

  it("HTTP redirects to HTTPS", async () => {
    const http = BASE.replace("https://", "http://");
    await driver.get(http);
    const url = await driver.getCurrentUrl();
    assert.ok(url.startsWith("https://"), `Expected HTTPS redirect, still on: ${url}`);
  });

  it("no JavaScript errors from site code on homepage", async () => {
    const driver2 = await buildDriver();
    try {
      await driver2.get(BASE);
      const logs = await driver2.manage().logs().get(logging.Type.BROWSER);
      const errors = logs.filter(l =>
        l.level.value >= logging.Level.SEVERE.value &&
        !l.message.includes("wp-includes") &&
        !l.message.includes("wp-content/plugins")
      );
      assert.strictEqual(errors.length, 0, `JS errors: ${errors.map(e => e.message).join(", ")}`);
    } finally {
      await driver2.quit();
    }
  });

  it("phone or email contact info is present and linked", async () => {
    await driver.get(BASE);
    const contactLinks = await driver.findElements(By.css("a[href^='tel:'], a[href^='mailto:']"));
    assert.ok(contactLinks.length > 0, "No clickable phone or email link found on page");
  });
});
