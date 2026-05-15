// invoice list / form on the dashboard
// keeping it simple, selectors match what the existing specs already use

export class InvoiceList {
  constructor(page) {
    this.page = page;
    this.grid = page.locator(".receipt-grid");
    this.empty = page.locator(".empty");
    this.modal = page.locator(".modal");
  }

  async fillNewInvoice({ client, item }) {
    // form opens in the same .modal container the rest of the app uses
    const clientField = this.modal.locator(
      "input[placeholder*='client' i], input[placeholder*='billed' i], input[placeholder*='customer' i]"
    ).first();
    const itemField = this.modal.locator(
      "input[placeholder*='description' i], input[placeholder*='item' i], input[placeholder*='service' i]"
    ).first();

    await clientField.fill(client);
    await itemField.fill(item);
  }

  async cancelForm() {
    // ghost button inside the modal is cancel
    await this.modal.locator("button.btn-ghost").first().click();
  }

  async findRowByClient(name) {
    // each invoice row should mention the client name somewhere
    return this.grid.locator(`text=${name}`).first();
  }
}
