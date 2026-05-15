import { chromium } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const AUTH_FILE = path.join(__dirname, "../.auth/user.json");

export default async function globalSetup() {
  const email    = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error("TEST_EMAIL and TEST_PASSWORD must be set.");
  }

  const browser = await chromium.launch();
  const page    = await browser.newPage();

  // target url comes from env, falls back to placeholder
  await page.goto(process.env.TARGET_URL || "https://app.example.com");

  // Open sign in modal
  await page.getByRole("button", { name: /^sign in$/i }).click();
  await page.getByText("Welcome back").waitFor({ timeout: 10000 });

  // Fill and submit
  await page.fill("#auth-email", email);
  await page.fill("#auth-password", password);
  await page.getByRole("button", { name: /^sign in$/i }).last().click();

  // wait for network to settle after auth
  await page.waitForLoadState("networkidle", { timeout: 30000 });

  // Dismiss modals if present
  for (const selector of [".welcome-modal", ".consent-modal", "[class*='welcome']", "[class*='consent']"]) {
    try {
      await page.locator(selector).first().waitFor({ timeout: 3000 });
      await page.keyboard.press("Escape");
    } catch {}
  }

  // Confirm dashboard rendered
  try {
    await page.locator(".app-shell").waitFor({ timeout: 30000 });
  } catch {
    console.log("URL at failure:", page.url());
    console.log("Page title:", await page.title());
    await page.screenshot({ path: "login-failure.png", fullPage: true });
    throw new Error("Dashboard did not appear after login. Screenshot saved as login-failure.png");
  }

  await page.context().storageState({ path: AUTH_FILE });
  await browser.close();
}
