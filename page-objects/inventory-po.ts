import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { BUTTON_TEXT } from '../test-data/constants';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.getByTestId('inventory-item');
  }

  async addItemToCartByName(itemName: string) {
    await test.step(`Should be able to add ${itemName} to cart`, async () => {
      const item = this.inventoryItems.filter({ hasText: itemName });
      const addToCartButton = item.getByRole('button', { name: 'Add to cart' });
      await addToCartButton.click();
      await this.verifyButtonText(itemName, BUTTON_TEXT.remove);
    });
  }

  async verifyButtonText(itemName: string, expectedText: string) {
    await test.step(`Should verify button text on item ${itemName}`, async () => {
      const item = this.inventoryItems.filter({ hasText: itemName });
      const button = item.getByRole('button');
      await expect(button).toHaveText(expectedText);
    });
  }

  async getItemDescriptionByName(itemName: string): Promise<string> {
    return await test.step(`Should be able to get ${itemName} description`, async () => {
      const item = this.inventoryItems.filter({ hasText: itemName });
      const description = await item.getByTestId('inventory-item-desc').textContent();
      return description || '';
    });
  }

  async getItemPriceByName(itemName: string): Promise<string> {
    return await test.step(`Should be able to get ${itemName} price`, async () => {
      const item = this.inventoryItems.filter({ hasText: itemName });
      const price = await item.getByTestId('inventory-item-price').textContent();
      return price || '';
    });
  }

  async verifyNoButtonByName(buttonName: string) {
    await test.step(`Should verify no button with name ${buttonName}`, async () => {
      const buttons = this.inventoryItems.filter({ hasText: buttonName }).getByRole('button');
      await expect(buttons).toHaveCount(0);
    });
  }

  async getItemNameByNumber(itemNumber: number): Promise<string> {
    return await test.step(`Should be able to get item name by number ${itemNumber}`, async () => {
      const index = itemNumber - 1;
      const item = this.inventoryItems.nth(index);
      const text = await item.getByTestId('inventory-item-name').textContent();
      return text ?? '';
    });
  }
}
