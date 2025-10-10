import { test } from '@playwright/test';
import { InventoryPage } from '../src/pages/inventory.page';
import { CartPage } from '../src/pages/cart.page';
import { CheckoutPage } from '../src/pages/checkout.page';

test('TC06 Successful checkout', async ({ page }) => {
  const inv = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await inv.assertLoaded();
  await inv.addFirstItemToCart();
  await inv.openCart();

  await cart.assertLoaded();
  await cart.checkout();

  await checkout.fillInfo('Nikolay', 'Chillev', '1000');
  await checkout.finish();
  await checkout.assertSuccess();
});

test('TC07 Cancel checkout returns to products', async ({ page }) => {
  const inv = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await inv.addFirstItemToCart();
  await inv.openCart();
  await cart.checkout();

  await checkout.cancelBtn.click();
  await cart.assertLoaded();
  await cart.continueShopping();
  await inv.assertLoaded();
});