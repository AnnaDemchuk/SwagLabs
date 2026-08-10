import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async gotoCart() {
    await test.step('Should be able to go to cart', async () => {
      await this.cartLink.click();
      await expect(this.page).toHaveURL(/cart\.html/);
    });
  }

  async verifyCartItemCount(expectedCount: number) {
    await test.step('Should verify cart item count', async () => {
      await expect(this.cartBadge).toHaveText(String(expectedCount));
    });
  }

  async verifyCartBadgeNotVisible() {
    await test.step('Should verify cart badge is not visible', async () => {
      await expect(this.cartBadge).toBeHidden();
    });
  }
}