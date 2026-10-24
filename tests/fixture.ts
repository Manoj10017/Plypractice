import { test as base, expect, Page } from '@playwright/test';

 type loggedUser = { loggedInUser: Page };

export const test = base.extend<loggedUser>({

    loggedInUser: async ({ page }, use) => {

        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator("//a[text()='Log in']").click();
        await page.locator("#Email").fill("vithal@example.com");
        await page.locator("#Password").fill("test123");
        await page.locator('[value="Log in"]').click();
        use(page);
        return page;
    }
})