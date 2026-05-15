// landing page smoke
// top of the funnel, if any of these break signups die

import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page has a non empty title", async ({ page }) => {
    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
  });

  test("a hero CTA button is visible", async ({ page }) => {
    // there are multiple CTAs on the page, hero + pricing, just need one visible
    const cta = page.locator(".hero button, .hero a").first();
    await expect(cta).toBeVisible();
  });

  test("Sign In nav button is visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
  });

  test("Sign Up nav button is visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /^sign up$/i })).toBeVisible();
  });

  test("footer has Terms link", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer a[href='/terms']")).toBeVisible();
  });

  test("footer has Privacy link", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer a[href='/privacy']")).toBeVisible();
  });
});
