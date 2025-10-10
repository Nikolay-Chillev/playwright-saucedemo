import { test, expect } from '@playwright/test';
import { InventoryPage } from '../src/pages/inventory.page';
import { CartPage } from '../src/pages/cart.page';

test('TC04 Add to cart & view cart', async ({ page }) => {
  const inv = new InventoryPage(page);
  const cart = new CartPage(page);

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await inv.assertLoaded();
  await inv.addFirstItemToCart();
  await inv.openCart();
  await cart.assertLoaded();
});

test('TC05 Remove item from cart', async ({ page }) => {
  const inv = new InventoryPage(page);
  const cart = new CartPage(page);

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await inv.addFirstItemToCart();
  await inv.openCart();
  await cart.assertLoaded();

  await cart.removeFirstItem();
  const removeButtons = await page.locator('button:has-text("Remove")').count();
  expect(removeButtons).toBe(0);

  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveCount(0);
});
