import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.context().clearCookies();
  
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Log In' }).click();
  
  await page.waitForURL('https://software-engineering-frontend.vercel.app/');
  
  // บันทึก State ลงไฟล์ JSON
  await page.context().storageState({ path: authFile });
});

