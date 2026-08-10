import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

export class CartItemsComponent {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
  }

  async verifyDescriptionByName(itemName: string, expectedDescription: string) {
    await test.step(`Should verify ${itemName} description`, async () => {
      const item = this.cartItems.filter({ hasText: itemName });
      const description = item.getByTestId('inventory-item-desc');
      await expect(description).toHaveText(expectedDescription);
    });
  }

  async verifyPriceByName(itemName: string, expectedPrice: string) {
    await test.step(`Should verify ${itemName} price`, async () => {
      const item = this.cartItems.filter({ hasText: itemName });
      const price = item.getByTestId('inventory-item-price');
      await expect(price).toHaveText(expectedPrice);
    });
  }

  async verifyQuantityByName(itemName: string, expectedQuantity: string) {
    await test.step(`Should verify ${itemName} quantity`, async () => {
      const item = this.cartItems.filter({ hasText: itemName });
      const quantity = item.getByTestId('item-quantity');
      await expect(quantity).toHaveText(expectedQuantity);
    });
  }
}
