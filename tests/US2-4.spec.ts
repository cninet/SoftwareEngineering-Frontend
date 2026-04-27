import { test, expect } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json'
});

test('TC2-11', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Pittipol Kantavat Pittipol' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('Good Dentist');
  await page.getByRole('textbox', { name: 'Your comment' }).fill('are you are you coming to the tree');
  await page.locator('label').filter({ hasText: '5 Stars' }).click();
  await page.getByRole('button', { name: 'Post comment' }).click();

  const latestComment = page.getByRole('article').first();
  const trigger = latestComment.getByRole('button').first();
  await trigger.click();

  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Yes, delete it!' }).click();
  await expect(page.getByRole('heading', { name: 'Deleted!' })).toBeVisible();
});