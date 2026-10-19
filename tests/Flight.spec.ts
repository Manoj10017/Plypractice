import { test, expect } from '@playwright/test';

test('Book ticket', async ({ page }) => {

    await page.goto('https://blazedemo.com/');

    // FIXED: Added 'await' to ensure dropdowns select properly before moving forward
    await page.locator('[name="fromPort"]').selectOption({ value: "Boston" });
    await page.locator('[name="toPort"]').selectOption({ value: "London" });

    await page.locator('[value="Find Flights"]').click();
    const table = page.locator('table.table');

    // FIXED: Added 'await' so Playwright waits for the table to appear on the screen
    await expect(table).toBeVisible();

    const allrows = await page.locator('table.table tbody tr').all();
    const rowCount = allrows.length;
    expect(rowCount).toBe(5);

    // capturing the prices of all 
    let lowPrice = Infinity;
    let lowestPriceIndex: number = Infinity;

    for (let i = 0; i < allrows.length; i++) {
        let prices = await allrows[i].locator('td').last().innerText();
        let cleanPrice = Number(prices.replace('$', ''));
        //console.log (cleanPrice);

        if (cleanPrice < lowPrice) {
            lowPrice = cleanPrice;
            lowestPriceIndex = i;
        }
    }
    console.log('Lowest price found:', lowPrice);
    console.log('Lowest price index:', lowestPriceIndex);
    await allrows[lowestPriceIndex].locator('td').filter({ hasText: 'Choose This Flight' }).click();

/*     
• Name: John
• Address: 1403 American Beauty Ln
• City: Columbus
• State: OH
• Zip Code: 43240
• Card Type: American Express
• Card Number: 6789067345231267
• Expiry Month: 10
• Expiry Year: 2024
• Name on Card: John Canedy
 */

await page.locator('#inputName').fill('John');
await page.locator('#address').fill('1403 American Beauty Ln');
await page.locator('#city').fill('Columbus');
await page.locator('#state').fill('OH');
await page.locator('#zipCode').fill('43240');
await page.locator('#cardType').selectOption({value:"amex"});
await page.locator('#creditCardNumber').fill('6789067345231267');
await page.locator('#creditCardMonth').fill('10');
await page.locator('#creditCardYear').fill('24');
await page.locator('#nameOnCard').fill('John Canedy');

await page.locator('[value="Purchase Flight"]').click();
expect(page.locator("//*[text()='Thank you for your purchase today!']")).toBeVisible();




});
