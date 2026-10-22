import { test, expect } from '@playwright/test';
import fs from 'fs';

const item = JSON.parse(fs.readFileSync('Storage-data/cookies.data.json', 'utf8'));

for (let eachItem of item) {


    test(`login with existing cookies ${eachItem.email}@'sanity'`, async ({ page }) => {

        await page.goto('https://demowebshop.tricentis.com/')
        await page.locator("//a[text()='Log in']").click();
        await page.locator("#Email").fill(eachItem.email);
        await page.locator("#Password").fill(eachItem.pass);
        await page.locator("//input[@value='Log in']").click();



        if (eachItem.isValid.toLowerCase() == "valid") {
            expect(await page.locator("//a[text()='Log out']").isVisible());

        } else {
            expect(await page.locator("[class='validation-summary-errors']").isVisible());
        }
    });
}