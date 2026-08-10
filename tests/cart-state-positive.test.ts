import { test } from '../fixtures/fixture';
import { BUTTON_TEXT } from '../test-data/constants';

test.describe('Cart state', () => {
  let itemName: string;

  test.beforeEach(async ({ inventoryPage }) => {
    itemName = await inventoryPage.getItemNameByNumber(1);
    await inventoryPage.addItemToCartByName(itemName);
  });

  test('Cart state is saved after reloading page', async ({
    authenticatedPage,
    inventoryPage,
    headerComponent,
  }) => {
    await headerComponent.verifyCartItemCount(1);
    await authenticatedPage.reload();

    await headerComponent.verifyCartItemCount(1);
    await inventoryPage.verifyButtonText(itemName, BUTTON_TEXT.remove);
  });

  test('Cart state is not saved after deleting cart contents from localStorage', async ({
    authenticatedPage,
    inventoryPage,
    headerComponent,
  }) => {
    await headerComponent.verifyCartItemCount(1);

    await authenticatedPage.evaluate(() => {
      localStorage.setItem('cart-contents', JSON.stringify([]));
    });
    await authenticatedPage.reload();

    await headerComponent.verifyCartBadgeNotVisible();
    await inventoryPage.verifyButtonText(itemName, BUTTON_TEXT.addToCart);
  });
});
