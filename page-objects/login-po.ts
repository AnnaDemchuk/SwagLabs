import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await test.step('Should be able to navigate to login page', async () => {
      await this.page.goto('/');
    });
  }

  async login(username: string, password: string) {
    await test.step('Should be able to login', async () => {
      await this.goto();
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async verifyErrorMessage(expectedError: string) {
    await test.step('Should verify error message', async () => {
      await expect(this.errorMessage).toHaveText(expectedError);
    });
  }
}
