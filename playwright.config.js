import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { AUTH_FILE } from "./apps/breton-smartek/e2e/global-setup.js";

// bdd generates playwright test files from .feature files into this dir
// run `npm run bdd:gen` before `npm test` or use `npm run test:bdd`
const bddTestDir = defineBddConfig({
  features: "apps/breton-smartek/features/*.feature",
  steps: "apps/breton-smartek/features/steps/*.js",
});

// target url comes from env so the repo never names the product
// set TARGET_URL locally and in CI secrets
const TARGET_URL = process.env.TARGET_URL || "https://app.example.com";

export default defineConfig({
  testDir: "./apps",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,
  timeout: 60000,

  globalSetup: "./apps/breton-smartek/e2e/global-setup.js",

  reporter: [
    ["html", { open: "never" }],
    ["allure-playwright"],
  ],

  use: {
    baseURL: TARGET_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "smoke",
      testMatch: ["**/breton-smartek/api/smoke.spec.js"],
    },
    {
      name: "public",
      testMatch: [
        "**/breton-smartek/e2e/accessibility.spec.js",
        "**/breton-smartek/e2e/landing.spec.js",
        "**/breton-smartek/e2e/auth.spec.js",
      ],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "dashboard",
      testMatch: [
        "**/breton-smartek/e2e/dashboard.spec.js",
        "**/breton-smartek/e2e/invoices.spec.js",
        "**/breton-smartek/e2e/billing.spec.js",
        "**/breton-smartek/e2e/profile.spec.js",
      ],
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
    },
    {
      // bdd scenarios, generated from .feature files
      name: "bdd",
      testDir: bddTestDir,
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
    },
  ],
});
