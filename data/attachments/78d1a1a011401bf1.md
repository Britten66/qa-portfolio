# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app-under-test/e2e/landing.spec.js >> Landing page >> Sign In nav button is visible
- Location: apps/app-under-test/e2e/landing.spec.js:22:3

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://app.example.com/
Call log:
  - navigating to "https://app.example.com/", waiting until "load"

```

# Test source

```ts
  1  | // landing page smoke
  2  | // top of the funnel, if any of these break signups die
  3  | 
  4  | import { test, expect } from "@playwright/test";
  5  | 
  6  | test.describe("Landing page", () => {
  7  |   test.beforeEach(async ({ page }) => {
> 8  |     await page.goto("/");
     |                ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://app.example.com/
  9  |   });
  10 | 
  11 |   test("page has a non empty title", async ({ page }) => {
  12 |     const title = await page.title();
  13 |     expect(title.trim().length).toBeGreaterThan(0);
  14 |   });
  15 | 
  16 |   test("a hero CTA button is visible", async ({ page }) => {
  17 |     // there are multiple CTAs on the page, hero + pricing, just need one visible
  18 |     const cta = page.locator(".hero").getByRole("button").first();
  19 |     await expect(cta).toBeVisible();
  20 |   });
  21 | 
  22 |   test("Sign In nav button is visible", async ({ page }) => {
  23 |     await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
  24 |   });
  25 | 
  26 |   test("Sign Up nav button is visible", async ({ page }) => {
  27 |     await expect(page.getByRole("button", { name: /^sign up$/i })).toBeVisible();
  28 |   });
  29 | 
  30 |   test("footer has Terms link", async ({ page }) => {
  31 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  32 |     await expect(page.locator("footer a[href='/terms']")).toBeVisible();
  33 |   });
  34 | 
  35 |   test("footer has Privacy link", async ({ page }) => {
  36 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  37 |     await expect(page.locator("footer a[href='/privacy']")).toBeVisible();
  38 |   });
  39 | });
  40 | 
```