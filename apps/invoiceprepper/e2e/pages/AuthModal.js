// auth modal wrapper
// the nav has its own sign in / sign up buttons, modal has its own too
// scope to .auth-card when clicking inside the modal or you hit the nav buttons

export class AuthModal {
  constructor(page) {
    this.page = page;
    this.card = page.locator(".auth-card");
  }

  async openSignIn() {
    await this.page.goto("/");
    await this.page.getByRole("button", { name: /^sign in$/i }).click();
  }

  async openSignUp() {
    await this.page.goto("/");
    await this.page.getByRole("button", { name: /^sign up$/i }).click();
  }

  async fillSignUp(email, password, confirm) {
    await this.page.getByPlaceholder("you@example.com").fill(email);
    await this.page.locator('input[type="password"]').first().fill(password);
    await this.page.locator('input[type="password"]').last().fill(confirm);
    await this.page.getByRole("button", { name: /create account/i }).click();
  }

  async closeWithEscape() {
    await this.page.keyboard.press("Escape");
  }
}
