import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { CartItemsComponent } from '../components/cart-items-comp';
import { PAYMENT_INFORMATION, SHIPPING_INFORMATION } from '../test-data/constants';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly cartItems: CartItemsComponent;
  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = new CartItemsComponent(page);
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.paymentInformation = page.getByTestId('payment-info-value');
    this.shippingInformation = page.getByTestId('shipping-info-value');
  }

  async verifyDescriptionByName(itemName: string, expectedDescription: string) {
    await this.cartItems.verifyDescriptionByName(itemName, expectedDescription);
  }

  async verifyPriceByName(itemName: string, expectedPrice: string) {
    await this.cartItems.verifyPriceByName(itemName, expectedPrice);
  }

  async verifyQuantityByName(itemName: string, expectedQuantity: string) {
    await this.cartItems.verifyQuantityByName(itemName, expectedQuantity);
  }

  private async getMoneyValue(locator: Locator, prefix: string): Promise<string> {
    const text = await locator.textContent();
    return text?.replace(prefix, '') || '';
  }

  async getItemTotal(): Promise<string> {
    return await test.step('Should be able to get item total', async () => {
      return this.getMoneyValue(this.itemTotal, 'Item total: $');
    });
  }

  async getTax(): Promise<string> {
    return await test.step('Should be able to get tax', async () => {
      return this.getMoneyValue(this.tax, 'Tax: $');
    });
  }

  async getTotal(): Promise<string> {
    return await test.step('Should be able to get total', async () => {
      return this.getMoneyValue(this.total, 'Total: $');
    });
  }

  async verifyItemTotal(expectedTotal: string) {
    await test.step('Should verify item total', async () => {
      const itemTotal = await this.getItemTotal();
      expect(itemTotal).toBe(expectedTotal);
    });
  }

  async verifyTax(expectedTax: string) {
    await test.step('Should verify tax', async () => {
      const tax = await this.getTax();
      expect(tax).toBe(expectedTax);
    });
  }

  async verifyTotal(expectedTotal: string) {
    await test.step('Should verify total', async () => {
      const total = await this.getTotal();
      expect(total).toBe(expectedTotal);
    });
  }

  async clickFinishButton() {
    await test.step('Should be able to click finish button', async () => {
      await this.finishButton.click();
      await expect(this.page).toHaveURL(/checkout-complete\.html/);
    });
  }

  async verifyPaymentInformation() {
    await test.step('Should verify payment information', async () => {
      const paymentInformation = this.paymentInformation;
      await expect(paymentInformation).toContainText(PAYMENT_INFORMATION);
    });
  }

  async verifyShippingInformation() {
    await test.step('Should verify shipping information', async () => {
      const shippingInformation = this.shippingInformation;
      await expect(shippingInformation).toContainText(SHIPPING_INFORMATION);
    });
  }
}
