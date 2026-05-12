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

  await page.goto("https://invoiceprepper.com");

  await page.getByRole("button", { name: /^sign in$/i }).click();
  await page.getByText("Welcome back").waitFor();

  await page.fill("#auth-email",    email);
  await page.fill("#auth-password", password);
  await page.getByRole("button", { name: /^sign in$/i }).last().click();

  try {
    const welcome = page.locator(".welcome-modal, [class*='welcome']").first();
    await welcome.waitFor({ timeout: 5000 });
    await page.keyboard.press("Escape");
  } catch {}

  try {
    const consent = page.locator(".consent-modal, [class*='consent']").first();
    await consent.waitFor({ timeout: 3000 });
    await page.keyboard.press("Escape");
  } catch {}

  await page.locator(".app-shell, .sidebar").first().waitFor({ timeout: 20000 });
  await page.context().storageState({ path: AUTH_FILE });
  await browser.close();
}
