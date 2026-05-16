import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  async verifyItemInCart(itemName: string) {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: itemName })
    ).toBeVisible();
  }

  async verifyCartItemsCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item').filter({
      hasText: itemName,
    });

    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}