import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { CartItemsComponent } from './../components/cart-items-comp';
import { URLS } from '../test-data/constants';

export class CartPage {
  readonly page: Page;
  readonly cartItemsComponent: CartItemsComponent;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemsComponent = new CartItemsComponent(page);
    this.checkoutButton = page.getByTestId('checkout');
  }

  async clickCheckoutButton() {
    await test.step('Should be able to click checkout button', async () => {
      await this.checkoutButton.click();
    });
  }

  async verifyDescriptionByName(itemName: string, expectedDescription: string) {
    await this.cartItemsComponent.verifyDescriptionByName(itemName, expectedDescription);
  }

  async verifyPriceByName(itemName: string, expectedPrice: string) {
    await this.cartItemsComponent.verifyPriceByName(itemName, expectedPrice);
  }

  async verifyQuantityByName(itemName: string, expectedQuantity: string) {
    await this.cartItemsComponent.verifyQuantityByName(itemName, expectedQuantity);
  }

  async verifyUrlUnchanged() {
    await this.verifyUrlCartPage();
  }

  async verifyUrlCartPage() {
    await test.step('Should verify cart page url', async () => {
      await expect(this.page).toHaveURL(URLS.cart);
    });
  }

  async verifyCartIsEmpty() {
    await test.step('Should verify no items in cart', async () => {
      await expect(this.cartItemsComponent.cartItems).toHaveCount(0);
    });
  }
}
