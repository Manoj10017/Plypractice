import { test, expect } from '@playwright/test';

test('valid', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');

    page.on('dialog', dialog =>
        console.log('alert message is', dialog.type()));
    await page.getByRole('button', { name: 'Conqqqqqfirm' }).click();

})