import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { AUTH_FILE } from "./apps/app-under-test/e2e/global-setup.js";

// bdd generates playwright test files from .feature files into this dir
// run `npm run bdd:gen` before `npm test` or use `npm run test:bdd`
const bddTestDir = defineBddConfig({
  features: "apps/app-under-test/features/*.feature",
  steps: "apps/app-under-test/features/steps/*.js",
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

  globalSetup: "./apps/app-under-test/e2e/global-setup.js",

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
      testMatch: ["**/app-under-test/api/smoke.spec.js"],
    },
    {
      name: "public",
      testMatch: [
        "**/app-under-test/e2e/accessibility.spec.js",
        "**/app-under-test/e2e/landing.spec.js",
        "**/app-under-test/e2e/auth.spec.js",
      ],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "dashboard",
      testMatch: [
        "**/app-under-test/e2e/dashboard.spec.js",
        "**/app-under-test/e2e/invoices.spec.js",
        "**/app-under-test/e2e/billing.spec.js",
        "**/app-under-test/e2e/profile.spec.js",
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
