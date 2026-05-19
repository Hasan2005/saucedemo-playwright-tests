import { test, expect } from '@playwright/test';

test('authenticate user', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill(process.env.USER_NAME as string);
  await page.locator('[data-test="password"]').fill(process.env.PASSWORD as string);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});