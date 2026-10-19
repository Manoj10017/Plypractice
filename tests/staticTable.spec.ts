import { test, expect } from '@playwright/test';

test('Validated the static table', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay');

    const stTable = page.locator('table').first();

    const totalRows = stTable.locator(' tbody tr');
    const totalCount = totalRows.first().locator('td');
    let count = await totalRows.count();

    console.log(await totalRows.count());
    console.log(await totalCount.count());

    const secondrow = await totalRows.nth(2).locator('td').allInnerTexts();
    console.log(secondrow);

    //4. Read all data from the table (excluding header) → Expected: 4 rows of product data

    const totaldata = await totalRows.locator('td').allInnerTexts();
    /* for (let data of totaldata) {
        console.log(data);
    } */
    console.log(totaldata)
    let tabeleData: string[][] = [];

    for (let r = 0; r < count; r++) {
        const rowValue = await totalRows.nth(r).locator('td').allInnerTexts();
        tabeleData.push(rowValue)

    for (let r = 0; r < tabeleData.length; r++) {
        productData.push(tabeleData[r][0]);
        //productData.push(rowValue);


    }
    console.log(productData)

    const outOfStockProducts: string[] = [];
    for (let r = 0; r < tabeleData.length; r++) {
        const stock = Number(tabeleData[r][3]);

        if (stock === 0) {
            outOfStockProducts.push(tabeleData[r][0]);
        }
    }

    console.log('Out of stock products:', outOfStockProducts);

}
    




})