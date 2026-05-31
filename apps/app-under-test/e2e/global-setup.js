import { chromium } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const AUTH_FILE = path.join(__dirname, "../.auth/user.json");

// one full login attempt
// kept small so the retry loop can call it cleanly
async function attemptLogin(targetUrl, email, password) {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  try {
    // domcontentloaded is enough, we wait for the auth modal next anyway
    // networkidle is unreliable here because Supabase keeps a websocket open
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.getByText("Welcome back").waitFor({ timeout: 10000 });

    await page.fill("#auth-email", email);
    await page.fill("#auth-password", password);
    await page.getByRole("button", { name: /^sign in$/i }).last().click();

    // dashboard shell tells us auth is fully through
    await page.locator(".app-shell").waitFor({ timeout: 30000 });

    // dismiss post-login modals if they actually showed up
    // single isVisible check, no try/catch hiding real failures
    for (const sel of [".welcome-modal", ".consent-modal"]) {
      const modal = page.locator(sel).first();
      if (await modal.isVisible()) {
        await page.keyboard.press("Escape");
      }
    }

    await page.context().storageState({ path: AUTH_FILE });
    await browser.close();
    return true;
  } catch (err) {
    // capture state on failure for the artifact upload step
    try {
      await page.screenshot({ path: "login-failure.png", fullPage: true });
      console.log("URL at failure:", page.url());
      console.log("Page title:", await page.title());
    } catch {}
    await browser.close();
    throw err;
  }
}

export default async function globalSetup() {
  const email    = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    console.log("TEST_EMAIL/TEST_PASSWORD not set, skipping authenticated session setup (public-only run).");
    return;
  }

  const targetUrl = process.env.TARGET_URL || "https://app.example.com";

  // retry the whole login a few times, third party auth flakes
  const MAX_ATTEMPTS = 3;
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await attemptLogin(targetUrl, email, password);
      console.log(`Login succeeded on attempt ${attempt}`);
      return;
    } catch (err) {
      lastError = err;
      console.log(`Login attempt ${attempt} of ${MAX_ATTEMPTS} failed: ${err.message}`);
    }
  }

  throw new Error(`Login failed after ${MAX_ATTEMPTS} attempts. Last error: ${lastError?.message}`);
}
