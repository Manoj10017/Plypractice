import { expect } from '@playwright/test';
import { test } from './fixture';

test('login with custom fixtures', async ({ page, loggedInUser }) => {
  await expect(
    page.locator("//a[text()='Log out']")
  ).toBeVisible();
});