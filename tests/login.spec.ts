import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login with valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', 'wrong_password');

    await loginPage.verifyLoginError();
  });
});