import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly successMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.getByTestId('complete-header');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  async verifySuccessMessage(expectedMessage: string) {
    await test.step('Should verify success message', async () => {
      const actualMessage = this.successMessage;
      await expect(actualMessage).toHaveText(expectedMessage);
    });
  }

  async clickBackHomeButton() {
    await test.step('Should be able to click back home button', async () => {
      await this.backHomeButton.click();
      await expect(this.page).toHaveURL(/inventory\.html/);
    });
  }
}
