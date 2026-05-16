import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async verifyInventoryPage() {
    await expect(this.title).toHaveText('Products');
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({
      hasText: itemName,
    });

    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async verifyCartCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async sortByAZ() {
    await this.sortDropdown.selectOption('az');
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('hilo');
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices() {
    const pricesText = await this.page.locator('.inventory_item_price').allTextContents();

    return pricesText.map((price) =>
      Number(price.replace('$', ''))
    );
  }
}