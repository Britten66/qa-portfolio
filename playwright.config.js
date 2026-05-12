import { defineConfig, devices } from "@playwright/test";
import { AUTH_FILE } from "./apps/invoiceprepper/e2e/global-setup.js";

export default defineConfig({
  testDir: "./apps",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,
  timeout: 60000,

  globalSetup: "./apps/invoiceprepper/e2e/global-setup.js",

  reporter: [
    ["html", { open: "never" }],
    ["allure-playwright"],
  ],

  use: {
    baseURL: "https://invoiceprepper.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "invoiceprepper-public",
      testMatch: [
        "**/invoiceprepper/e2e/accessibility.spec.js",
        "**/invoiceprepper/e2e/landing.spec.js",
        "**/invoiceprepper/e2e/auth.spec.js",
        "**/invoiceprepper/e2e/seo-pages.spec.js",
      ],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "invoiceprepper-dashboard",
      testMatch: [
        "**/invoiceprepper/e2e/dashboard.spec.js",
        "**/invoiceprepper/e2e/invoices.spec.js",
        "**/invoiceprepper/e2e/billing.spec.js",
        "**/invoiceprepper/e2e/profile.spec.js",
      ],
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
    },
  ],
});
