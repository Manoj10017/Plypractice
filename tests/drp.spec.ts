import { test, expect } from '@playwright/test';

test('Drp validations', async ({ page }) => {

    await page.goto('https://www.bstackdemo.com/')

    const sortdrp = await page.locator('.sort select').selectOption({ value: 'lowestprice' });


    const alltitles = page.locator('.shelf-item>p');
    const allprices = page.locator('.val b');

    const titcount = await allprices.count();
    const allcount = await allprices.count();

    for (let i = 0, count = await alltitles.count(); i < count; i++) {

        const title = await alltitles.nth(i).innerText();
        const price = await allprices.nth(i).innerText();

        console.log(`Title: ${title} Price: ${price}`);

    }

    // Identify and Print the Lowest Priced Product
    const firstText=await alltitles.first().innerText();
    const firstPrice=await allprices.first().innerText();

    console.log(`Price and text of first product,${firstText} and ${firstPrice}`);



    expect(titcount).toBe(allcount);

       // Identify and Print the Lowest Priced Product
    const lastText=await alltitles.last().innerText();
    const lastPrice=await allprices.last().innerText();

    console.log(`Price and text of first product,${lastText} and ${lastPrice}`);

})