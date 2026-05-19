import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove from Cart Feature', () => {
 test.beforeEach(async ({ page }) => {
  await page.goto('/inventory.html');
});
  test('add one item, remove it, and verify cart is empty', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.verifyCartCount('1');

    await inventoryPage.openCart();
    await cartPage.verifyCartItemsCount(1);

    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.verifyCartItemsCount(0);
  });

  test('add multiple items, remove one by one, and verify cart status', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.verifyCartCount('2');

    await inventoryPage.openCart();
    await cartPage.verifyCartItemsCount(2);

    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.verifyCartItemsCount(1);

    await cartPage.removeItem('Sauce Labs Bike Light');
    await cartPage.verifyCartItemsCount(0);
  });
});