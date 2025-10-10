import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly successHeader: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.finishBtn = page.getByRole('button', { name: 'Finish' });
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    this.successHeader = page.locator('.complete-header');
  }

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }

  async assertSuccess() {
    await expect(this.successHeader).toHaveText('Thank you for your order!');
  }
}
