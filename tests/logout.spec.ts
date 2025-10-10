import { test, expect } from '@playwright/test';

test('TC08 Logout redirects to login', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page).toHaveURL(/saucedemo\.com/);
});
