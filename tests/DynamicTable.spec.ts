import { test, expect } from '@playwright/test';

test('Dynamic table', async ({ page }) => {

    await page.goto('https://datatables.net/examples/core/basic_init/zero_configuration.html');

    const table = page.locator('table#example');
    const allRows = await table.locator('tbody tr');
    const next= page.locator('[aria-label="Next"]');

    let hasNext=true;
    let found =false;
    let pagenu:number=1;

    while(hasNext){

        await table.first().waitFor({state:'visible'});
        const row =await allRows.all();
        let pagData='';
        console.log('We are in the page of',pagenu)
        for (let eachRow of row ){
            let name=await eachRow.locator('td').allInnerTexts();
            page.pause();
            pagData+=name.join (',') + '\n'
           console.log(pagData);

        }
        if (await next.isVisible() && await next.isEnabled()){
             await  next.click();
             pagenu++
           

        }else{
           hasNext =false;
        }


    }


})