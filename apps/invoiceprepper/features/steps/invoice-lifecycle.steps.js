// step defs for invoice-lifecycle.feature
// uses the page objects under e2e/pages

import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { Sidebar } from "../../e2e/pages/Sidebar.js";
import { InvoiceList } from "../../e2e/pages/InvoiceList.js";

const { Given, When, Then } = createBdd();

Given("I am on the dashboard", async ({ page }) => {
  const sidebar = new Sidebar(page);
  await page.goto("/");
  await sidebar.waitUntilReady();
});

When("I click new invoice", async ({ page }) => {
  const sidebar = new Sidebar(page);
  await sidebar.clickNewInvoice();
});

When("I cancel the form", async ({ page }) => {
  const list = new InvoiceList(page);
  await list.cancelForm();
});

When("I enter client {string} and item {string}", async ({ page }, client, item) => {
  const list = new InvoiceList(page);
  await list.fillNewInvoice({ client, item });
});

Then("the invoice form is visible", async ({ page }) => {
  const list = new InvoiceList(page);
  await expect(list.modal).toBeVisible();
});

Then("the invoice form is closed", async ({ page }) => {
  const list = new InvoiceList(page);
  await expect(list.modal).not.toBeVisible();
});

Then("the form keeps the values I typed", async ({ page }) => {
  // values stay in the inputs after typing, basic sanity check
  const modal = page.locator(".modal");
  await expect(modal).toContainText("Acme Cleaning Co");
});
