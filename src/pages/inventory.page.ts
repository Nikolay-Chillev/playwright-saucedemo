import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title').filter({ hasText: 'Products' });
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toBeVisible();
  }

  async addFirstItemToCart() {
    await this.page.locator('button:has-text("Add to cart")').first().click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
