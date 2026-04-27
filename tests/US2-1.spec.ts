import { test, expect } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json'
});

test('TC2-1', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('Good Dentist');
  await page.getByRole('textbox', { name: 'Your comment' }).fill('are you are you coming to the tree');
  await page.locator('label').filter({ hasText: '5 Stars' }).click();
  await page.getByRole('button', { name: 'Post comment' }).click();

  const latestComment = page.getByRole('article').first();

  await expect(latestComment.locator('h3')).toContainText('Good Dentist');
  await expect(latestComment).toContainText('are you are you coming to the tree');

  const trigger = latestComment.getByRole('button').first();
  await trigger.click();

  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Yes, delete it!' }).click();

  // await expect(latestComment).not.toBeVisible();
});


test('TC2-2', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.getByRole('textbox', { name: 'Your comment' }).fill('are you are you coming to the tree');
  await page.locator('label').filter({ hasText: '5 Stars' }).click();
  await page.getByRole('button', { name: 'Post comment' }).click();
  const reviewTitle = page.getByPlaceholder('Review title...');
  const message = await reviewTitle.evaluate((el: HTMLInputElement) => el.validationMessage);
  expect(message).toMatch(/.*fill out this field.*/i);
});

test('TC2-3', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('Good Dentist');
  await page.locator('label').filter({ hasText: '5 Stars' }).click();

  await page.getByRole('button', { name: 'Post comment' }).click();
  const reviewTitle = page.getByPlaceholder('Write a comment...');
  const message = await reviewTitle.evaluate((el: HTMLInputElement) => el.validationMessage);
  expect(message).toMatch(/.*fill out this field.*/i);
});

test('TC2-4', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('Good Dentist');
  await page.getByRole('textbox', { name: 'Your comment' }).fill('are you are you coming to the tree');

  page.once('dialog', async dialog => {
    // ตรวจสอบข้อความใน Alert
    expect(dialog.message()).toBe('Please provide a title, comment and rating.');
    
    // กดปุ่ม OK เพื่อปิด Alert
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Post comment' }).click();
});