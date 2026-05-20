# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app-under-test/e2e/profile.spec.js >> Profile >> help button opens help modal
- Location: apps/app-under-test/e2e/profile.spec.js:43:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.modal')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.modal')

```

```yaml
- banner:
  - button "Dark"
  - text: Wednesday, May 20
  - button "Refer a friend"
  - button "Notifications"
  - button "User menu": Q
- complementary:
  - button "Create new invoice": New Invoice
  - text: Revenue $0.00 Outstanding $0.00 inc. tax Invoices 0 View
  - button "All 0"
  - button "Draft 0"
  - button "Sent 0"
  - button "Paid 0"
  - button "Voided 0"
  - button "+ Add Business Profile"
  - group "Account actions":
    - button "Billing"
    - button "Terms"
    - button "Recently deleted": Trash
    - button "Help"
- main:
  - text: "Good morning, qa2 All: 0 invoices"
  - button "Switch to card grid" [pressed]
  - text: No invoices found
- text: How it works
- button "▼"
- button "✕"
- text: Getting started 1 Hit
- strong: + New Invoice
- text: "to create one 2 Add your client, line items, and date 3 Move status: Draft → Sent → Paid 4 Preview, download PDF, or send to client Voice AI Type a description and AI fills in the fields (Pro: 15/day, Voice AI: unlimited) Say \"web design and hosting\" to get two line items Detects currency from context (USD, CAD, EUR, GBP) Always review before sending Support"
- link "redacted@example.com":
  - /url: mailto:redacted@example.com
- link "Send Feedback":
  - /url: https://tally.so/r/2EJZRM
- link "Report Bug":
  - /url: mailto:redacted@example.com?subject=Bug%20Report&body=Hi%2C%0A%0AI%20found%20a%20bug%3A%0A%0A
- text: Policies
- button "Terms of Service"
- button "Privacy Policy"
- link "Send feedback":
  - /url: https://tally.so/r/2EJZRM
  - text: Feedback
```

# Test source

```ts
  1  | /*
  2  |   E2E: Profile: open, fields, close
  3  |   Suite: Profile
  4  | */
  5  | 
  6  | import { test, expect } from "@playwright/test";
  7  | 
  8  | test.describe("Profile", () => {
  9  |   test.beforeEach(async ({ page }) => {
  10 |     await page.goto("/");
  11 |     await page.locator(".sidebar").waitFor({ timeout: 15000 });
  12 |   });
  13 | 
  14 |   test("profile button is visible in sidebar", async ({ page }) => {
  15 |     const btn = page.locator(".sidebar .btn-ghost").first();
  16 |     await expect(btn).toBeVisible();
  17 |   });
  18 | 
  19 |   test("clicking profile button opens modal", async ({ page }) => {
  20 |     await page.locator(".sidebar .btn-ghost").first().click();
  21 |     await expect(page.locator(".modal-title")).toContainText("Profile");
  22 |   });
  23 | 
  24 |   test("profile modal has business name field", async ({ page }) => {
  25 |     await page.locator(".sidebar .btn-ghost").first().click();
  26 |     await page.locator(".modal").waitFor();
  27 |     await expect(page.locator(".modal .field").first()).toBeVisible();
  28 |   });
  29 | 
  30 |   test("profile modal has email field", async ({ page }) => {
  31 |     await page.locator(".sidebar .btn-ghost").first().click();
  32 |     await page.locator(".modal").waitFor();
  33 |     await expect(page.locator(".modal").getByLabel(/email/i)).toBeVisible();
  34 |   });
  35 | 
  36 |   test("profile modal closes on Escape", async ({ page }) => {
  37 |     await page.locator(".sidebar .btn-ghost").first().click();
  38 |     await page.locator(".modal").waitFor();
  39 |     await page.keyboard.press("Escape");
  40 |     await expect(page.locator(".modal")).not.toBeVisible();
  41 |   });
  42 | 
  43 |   test("help button opens help modal", async ({ page }) => {
  44 |     await page.locator(".help-btn").click();
> 45 |     await expect(page.locator(".modal")).toBeVisible();
     |                                          ^ Error: expect(locator).toBeVisible() failed
  46 |   });
  47 | });
  48 | 
```