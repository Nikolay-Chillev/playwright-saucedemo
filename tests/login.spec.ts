import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { InventoryPage } from '../src/pages/inventory.page';

test.describe('Login', () => {
  test('TC01 Valid login (standard_user)', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await inventory.assertLoaded();
  });

  test('TC02 Invalid login shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('invalid_user', 'wrong_pass');
    await expect(login.error).toBeVisible();
    await expect(login.error).toContainText('Epic sadface');
  });

  test('TC03 Locked out user gets specific message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.error).toContainText('locked out');
  });
});
