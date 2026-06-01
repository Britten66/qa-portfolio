import { test, expect } from "@playwright/test";

test.describe("Auth modal: Sign In", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^sign in$/i }).click();
  });

  test("opens with Welcome back heading", async ({ page }) => {
    await expect(page.getByText("Welcome back")).toBeVisible();
  });

  test("shows email field", async ({ page }) => {
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
  });

  test("shows password field", async ({ page }) => {
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
  });

  test("shows Continue with Google button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
  });

  test("Sign Up tab switches to signup mode", async ({ page }) => {
    // two buttons named "Sign Up" exist — scope to the modal card
    await page.locator(".auth-card").getByRole("button", { name: /^sign up$/i }).click();
    await expect(page.getByText("Create your account")).toBeVisible();
  });
});

test.describe("Auth modal: Sign Up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^sign up$/i }).click();
  });

  test("opens with Create your account heading", async ({ page }) => {
    await expect(page.getByText("Create your account")).toBeVisible();
  });

  test("Sign In tab switches back to login mode", async ({ page }) => {
    // two buttons named "Sign In" exist — scope to the modal card
    await page.locator(".auth-card").getByRole("button", { name: /^sign in$/i }).click();
    await expect(page.getByText("Welcome back")).toBeVisible();
  });

  test("weak password shows an error", async ({ page }) => {
    await page.getByPlaceholder("you@example.com").fill("test@example.com");
    await page.locator('input[type="password"]').first().fill("weak");
    await page.locator('input[type="password"]').last().fill("weak");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.locator(".auth-error")).toBeVisible();
  });

  test("mismatched passwords shows an error", async ({ page }) => {
    await page.getByPlaceholder("you@example.com").fill("test@example.com");
    await page.locator('input[type="password"]').first().fill("StrongPass1!");
    await page.locator('input[type="password"]').last().fill("DifferentPass1!");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.getByText(/passwords don't match/i)).toBeVisible();
  });

  test("Forgot password link appears in login mode", async ({ page }) => {
    await page.locator(".auth-card").getByRole("button", { name: /^sign in$/i }).click();
    await expect(page.getByRole("button", { name: /forgot password/i })).toBeVisible();
  });
});

test.describe("Auth modal: Forgot password", () => {
  test("shows reset form with Send Reset Link button", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.getByRole("button", { name: /forgot password/i }).click();
    await expect(page.getByText("Reset your password")).toBeVisible();
    await expect(page.getByRole("button", { name: /send reset link/i })).toBeVisible();
  });

  test("Back to sign in returns to login mode", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.getByRole("button", { name: /forgot password/i }).click();
    await page.getByRole("button", { name: /back to sign in/i }).click();
    await expect(page.getByText("Welcome back")).toBeVisible();
  });
});
