import { test, expect } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json'
});

test('TC2-5', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Attawith Sudsang Attawith' }).click();
  await expect(page.getByRole('article').first()).toBeVisible();
});

test('TC2-6', async ({ page }) => {
  await page.goto('https://software-engineering-frontend.vercel.app/');
  await page.getByRole('link', { name: 'Taratip Suwannasart Taratip' }).click();
  await expect(page.locator('section').filter({ hasText: 'Community Feedback' }))
        .toContainText('No comments yet. Be the first to share your experience!');
});