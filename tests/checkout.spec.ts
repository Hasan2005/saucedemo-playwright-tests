import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );
  });

  test('checkout with one item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInformation();
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyCheckoutComplete();
  });

  test('checkout with multiple items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.openCart();

    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInformation();
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyCheckoutComplete();
  });
});