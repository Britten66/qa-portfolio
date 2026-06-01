import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".sidebar").waitFor({ timeout: 15000 });
  });

  test("sidebar is visible", async ({ page }) => {
    await expect(page.locator(".sidebar")).toBeVisible();
  });

  test("invoice list loads", async ({ page }) => {
    await expect(page.locator(".receipt-grid, .empty")).toBeVisible();
  });

  test("new invoice button is visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /new invoice/i })).toBeVisible();
  });

  test("new invoice button opens the form", async ({ page }) => {
    await page.getByRole("button", { name: /new invoice/i }).click();
    await expect(page.locator(".modal")).toBeVisible();
  });

  test("sidebar contains invoices link", async ({ page }) => {
    await expect(page.locator(".sidebar")).toContainText(/invoice/i);
  });

  test("page title is set", async ({ page }) => {
    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
  });
});
