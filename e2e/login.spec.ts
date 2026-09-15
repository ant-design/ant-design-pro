import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('/user/login');

    await expect(page.getByText('Ant Design').first()).toBeVisible();
    await expect(page.locator('.ant-pro-form-login-desc')).toHaveText(
      'Ant Design is the most influential web design specification in Xihu district',
    );
  });

  test('should login success', async ({ page }) => {
    await page.goto('/user/login');

    await page.getByPlaceholder('Username: admin or user').fill('admin');
    await page.getByPlaceholder('Password: ant.design').fill('ant.design');
    await page.getByRole('button', { name: 'Login' }).click();

    // mock login has a 2s delay before redirecting to the dashboard
    await expect(page.getByText(/Welcome/)).toBeVisible({
      timeout: 10000,
    });
  });
});
