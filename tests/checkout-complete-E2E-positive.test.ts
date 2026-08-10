import { test } from '../fixtures/fixture';
import { BUTTON_TEXT, SUCCESS_MESSAGE, TAX_RATE } from '../test-data/constants';

// For the case test, products with a specific price were selected 
// (some product prices have a bug BUG-004)
test.describe('Successful order flow', () => {
  test('It is possible to complete the order flow with a successful result', async ({
    inventoryPage,
    headerComponent,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {

    //inventory page
    const itemName1 = await inventoryPage.getItemNameByNumber(1);
    const itemName2 = await inventoryPage.getItemNameByNumber(2);

    await inventoryPage.addItemToCartByName(itemName1);
    await inventoryPage.addItemToCartByName(itemName2);

    const description2 = await inventoryPage.getItemDescriptionByName(itemName2);
    const description1 = await inventoryPage.getItemDescriptionByName(itemName1);

    const price1 = await inventoryPage.getItemPriceByName(itemName1);
    const price2 = await inventoryPage.getItemPriceByName(itemName2);

    await headerComponent.gotoCart();
    await headerComponent.verifyCartItemCount(2);

    //cart page
    await cartPage.verifyDescriptionByName(itemName1, description1);
    await cartPage.verifyDescriptionByName(itemName2, description2);

    await cartPage.verifyPriceByName(itemName1, price1);
    await cartPage.verifyPriceByName(itemName2, price2);

    await cartPage.verifyQuantityByName(itemName1, '1');
    await cartPage.verifyQuantityByName(itemName2, '1');

    await headerComponent.verifyCartItemCount(2);
    await cartPage.clickCheckoutButton();

    //checkout-step-one page
    await checkoutStepOnePage.sendInformationForm('John', 'Doe', '12345');
    await checkoutStepOnePage.clickContinueButton();

    //checkout-step-two page
    await checkoutStepTwoPage.verifyDescriptionByName(itemName1, description1);
    await checkoutStepTwoPage.verifyDescriptionByName(itemName2, description2);

    await checkoutStepTwoPage.verifyPriceByName(itemName1, price1);
    await checkoutStepTwoPage.verifyPriceByName(itemName2, price2);

    await checkoutStepTwoPage.verifyQuantityByName(itemName1, '1');
    await checkoutStepTwoPage.verifyQuantityByName(itemName2, '1');

    const priceWithoutDollar1 = Number(price1.replace('$', ''));
    const priceWithoutDollar2 = Number(price2.replace('$', ''));

    const itemTotal = priceWithoutDollar1 + priceWithoutDollar2;
    const tax = itemTotal * TAX_RATE;
    const total = itemTotal + tax;

    await checkoutStepTwoPage.verifyItemTotal(itemTotal.toFixed(2).toString());
    await checkoutStepTwoPage.verifyTax(tax.toFixed(2).toString());
    await checkoutStepTwoPage.verifyTotal(total.toFixed(2).toString());

    await checkoutStepTwoPage.verifyPaymentInformation();
    await checkoutStepTwoPage.verifyShippingInformation();

    await headerComponent.verifyCartItemCount(2);
    await checkoutStepTwoPage.clickFinishButton();

    //checkout-complete page
    await checkoutCompletePage.verifySuccessMessage(SUCCESS_MESSAGE);
    await headerComponent.verifyCartBadgeNotVisible();
    await checkoutCompletePage.clickBackHomeButton();

    //inventory page
    await headerComponent.verifyCartBadgeNotVisible();
    await inventoryPage.verifyNoButtonByName(BUTTON_TEXT.remove);
  });
});
