import { test, expect } from '@playwright/test';
import fs from 'fs';

test('download file', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');

    const [download] = await Promise.all([
        page.waitForEvent('download'),
     page.getByRole('button', { name: 'Download File' }).click()
    ])
    expect(download.suggestedFilename()).toContain(`${download.suggestedFilename()}`);

    const downloadPath="Downloads/sample.txt";
    await download.saveAs(downloadPath);

    const fileExists=fs.existsSync(downloadPath);
    await expect(fileExists).toBeTruthy();

   /*  if(fileExists){
        fs.unlinkSync(downloadPath);
    } */


})