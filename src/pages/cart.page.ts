import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly continueShoppingBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.checkoutBtn).toBeVisible();
  }

  async removeFirstItem() {
    await this.page.locator('button:has-text("Remove")').first().click();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }
}
