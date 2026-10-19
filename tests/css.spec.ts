import { test, expect } from '@playwright/test';

test('css', async ({ page }) => {

    //Step 1: Open Application
    await page.goto('https://demowebshop.tricentis.com/');

    //Test 2: Verify Logo Visibility
    const logo = page.locator('.header-logo');
    await expect(logo).toBeVisible();

    //Test 3: Find Products Containing "computer"

    const computer=page.locator('div[class="product-item"] h2>a[href$="computer"]');
    console.log(await computer.count());
    console.log(await computer.first().innerText());
    console.log(await computer.last().innerText());


    const build=page.locator('div[class="product-item"] h2>a[href^="/build"]');
    console.log(await build.count());
    console.log(await build.first().innerText());
    console.log(await build.last().innerText());


})