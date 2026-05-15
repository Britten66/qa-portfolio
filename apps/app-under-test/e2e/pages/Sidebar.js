// sidebar after login
// new invoice button lives up top, billing and profile in the side nav

export class Sidebar {
  constructor(page) {
    this.page = page;
    this.root = page.locator(".sidebar");
  }

  async waitUntilReady() {
    await this.root.waitFor({ timeout: 15000 });
  }

  async clickNewInvoice() {
    await this.page.getByRole("button", { name: /new invoice/i }).click();
  }

  async openBilling() {
    await this.root.getByText(/billing/i).click();
  }

  async openProfile() {
    // profile button is the first ghost button in the sidebar
    await this.root.locator(".btn-ghost").first().click();
  }

  async openTrash() {
    await this.page.locator(".trash-btn").click();
  }
}
