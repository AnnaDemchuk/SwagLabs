import { test } from '../fixtures/fixture';

test.describe('Empty cart negative scenario', () => {
  //bug: BUG-001 - Checkout can be started with an empty cart
  test('It is impossible to proceed to checkout with an empty cart', async ({
    headerComponent,
    cartPage,
  }) => {
    await headerComponent.verifyCartBadgeNotVisible();
    await headerComponent.gotoCart();
    await cartPage.verifyCartIsEmpty();
    await cartPage.clickCheckoutButton();
    await cartPage.verifyUrlUnchanged();
  });
});
