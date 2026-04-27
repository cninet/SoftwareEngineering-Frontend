import { test, expect } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json'
});

test('TC2-7', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByRole('heading', { name: 'Updated!' })).toBeVisible();
});

test('TC2-8', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByPlaceholder('Title', { exact: true }).fill('');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Please provide a title, comment and rating.');
    
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Save Changes' }).click();
});

test('TC2-9', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByPlaceholder('Comment', { exact: true }).fill('');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Please provide a title, comment and rating.');
    
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Save Changes' }).click();
});

test('TC2-10', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('label').filter({ hasText: '5 Stars' }).nth(1).click();

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Please provide a title, comment and rating.');
    
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Save Changes' }).click();
});