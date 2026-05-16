import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Add to Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );
  });

  test('add one item to cart and check it in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.verifyCartCount('1');

    await inventoryPage.openCart();
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    await cartPage.verifyCartItemsCount(1);
  });

  test('add multiple items to cart and check cart count', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    await inventoryPage.verifyCartCount('2');

    await inventoryPage.openCart();
    await cartPage.verifyCartItemsCount(2);
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    await cartPage.verifyItemInCart('Sauce Labs Bike Light');
  });
});