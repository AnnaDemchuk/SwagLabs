import { test as base_test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-po';
import { InventoryPage } from '../page-objects/inventory-po';
import { HeaderComponent } from '../components/header-comp';
import { CartPage } from '../page-objects/cart-po';
import { CheckoutStepOnePage } from '../page-objects/checkout-step-one-po';
import { CheckoutStepTwoPage } from '../page-objects/checkout-step-two-po';
import { CheckoutCompletePage } from '../page-objects/checkout-complete-po';
import { STANDARD_USERNAME, STANDARD_USER_PASSWORD } from '../test-data/constants';

type TestFixtures = {
  loginPage: LoginPage;
  headerComponent: HeaderComponent;
  cartPage: CartPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  inventoryPage: InventoryPage;
  authenticatedPage: import('@playwright/test').Page;
};

type WorkerFixtures = {
  authStorageState: Awaited<ReturnType<import('@playwright/test').BrowserContext['storageState']>>;
};

const test = base_test.extend<TestFixtures, WorkerFixtures>({
  authStorageState: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await new LoginPage(page).login(STANDARD_USERNAME, STANDARD_USER_PASSWORD);
      const state = await context.storageState();
      await context.close();
      await use(state);
    },
    { scope: 'worker' },
  ],

  authenticatedPage: async ({ browser, authStorageState }, use) => {
    const context = await browser.newContext({ storageState: authStorageState });
    const page = await context.newPage();
    await page.goto('/inventory.html');
    await use(page);
    await context.close();
  },

  async loginPage({ page }, use) {
    await use(new LoginPage(page));
  },
  async headerComponent({ authenticatedPage }, use) {
    await use(new HeaderComponent(authenticatedPage));
  },
  async cartPage({ authenticatedPage }, use) {
    await use(new CartPage(authenticatedPage));
  },
  async checkoutCompletePage({ authenticatedPage }, use) {
    await use(new CheckoutCompletePage(authenticatedPage));
  },
  async checkoutStepOnePage({ authenticatedPage }, use) {
    await use(new CheckoutStepOnePage(authenticatedPage));
  },
  async checkoutStepTwoPage({ authenticatedPage }, use) {
    await use(new CheckoutStepTwoPage(authenticatedPage));
  },
  async inventoryPage({ authenticatedPage }, use) {
    await use(new InventoryPage(authenticatedPage));
  },
});
export { test, expect };
