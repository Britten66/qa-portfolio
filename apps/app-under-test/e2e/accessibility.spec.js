import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function finishAnimations(page) {
  await page.evaluate(() =>
    document.querySelectorAll("*").forEach((el) =>
      el.getAnimations().forEach((a) => a.finish())
    )
  );
}

test.describe("Accessibility: WCAG + best practice", () => {
  test("landing page has no violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("sign in modal has no violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.getByText("Welcome back").waitFor();
    await finishAnimations(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("sign up modal has no violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /^sign up$/i }).click();
    await page.getByText("Create your account").waitFor();
    await finishAnimations(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Accessibility: layout structure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // wait for React to hydrate before checking landmarks
    await page.locator("nav").first().waitFor({ timeout: 15000 });
  });

  test("page has exactly one h1", async ({ page }) => {
    expect(await page.locator("h1").count()).toBe(1);
  });

  test("heading hierarchy has no skipped levels", async ({ page }) => {
    const levels = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((el) =>
        parseInt(el.tagName[1])
      )
    );
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test("page has a navigation landmark", async ({ page }) => {
    await expect(page.locator("nav, [role='navigation']").first()).toBeVisible();
  });

  test("page has a main landmark", async ({ page }) => {
    expect(await page.locator("main, [role='main']").count()).toBeGreaterThanOrEqual(1);
  });

  test("all images have non-empty alt text", async ({ page }) => {
    for (const img of await page.locator("img").all()) {
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }
  });

  test("all buttons have an accessible name", async ({ page }) => {
    const unnamed = await page.evaluate(() =>
      Array.from(document.querySelectorAll("button")).filter(
        (el) => !(el.getAttribute("aria-label")?.trim() || el.getAttribute("title")?.trim() || el.textContent?.trim())
      ).length
    );
    expect(unnamed).toBe(0);
  });

  test("page title is set", async ({ page }) => {
    expect((await page.title()).trim().length).toBeGreaterThan(0);
  });
});

test.describe("Accessibility: form labels", () => {
  test("sign in form inputs all have labels", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.getByText("Welcome back").waitFor();
    await finishAnimations(page);
    for (const input of await page.locator("input:not([type='hidden']):not([aria-hidden='true'])").all()) {
      const id = await input.getAttribute("id");
      const hasLabel = id ? (await page.locator(`label[for="${id}"]`).count()) > 0 : false;
      const hasAriaLabel = !!(await input.getAttribute("aria-label")) || !!(await input.getAttribute("aria-labelledby"));
      const hasPlaceholder = !!(await input.getAttribute("placeholder"));
      expect(hasLabel || hasAriaLabel || hasPlaceholder).toBe(true);
    }
  });
});

test.describe("Accessibility: keyboard interaction", () => {
  test("Escape closes the sign in modal", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.getByText("Welcome back").waitFor();
    await finishAnimations(page);
    await page.keyboard.press("Escape");
    await expect(page.getByText("Welcome back")).not.toBeVisible();
  });

  test("Escape closes the sign up modal", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /^sign up$/i }).click();
    await page.getByText("Create your account").waitFor();
    await finishAnimations(page);
    await page.keyboard.press("Escape");
    await expect(page.getByText("Create your account")).not.toBeVisible();
  });

  test("auth modal receives focus on open", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.getByText("Welcome back").waitFor();
    await finishAnimations(page);
    const focused = await page.evaluate(() => document.activeElement?.closest(".auth-card") !== null);
    expect(focused).toBe(true);
  });
});
