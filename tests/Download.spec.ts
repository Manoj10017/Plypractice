import { test, expect } from '@playwright/test';
import fs from 'fs';

test('download file', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download File' }).click()
    ])
    await expect(download.suggestedFilename()).toContain(`${download.suggestedFilename()}`);

    const downloadPath = "Downloads/sample.txt";
    await download.saveAs(downloadPath);

    const fileExists = fs.existsSync(downloadPath);
    await expect(fileExists).toBeTruthy({timeout: 7000});

    /*  if(fileExists){
         fs.unlinkSync(downloadPath);
     } */


})

test('slider validations', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay');
    const slider1 = page.locator('div#slider-range span').nth(0);
    const slider2 = page.locator('div#slider-range span').nth(1);
    const sliderText = page.locator('input#amount');

    //
    await slider1.focus();
    await page.keyboard.press('Home');
    for (let i = 0; i < 100; i++) {
        await page.keyboard.press('ArrowRight');
    }

    await slider2.focus();
    await page.keyboard.press('End');
    for (let i = 0; i < 200; i++) {
        await page.keyboard.press('ArrowLeft');
    }
    expect(await page.locator('input#amount').innerText()).toContain('300');
    expect(await page.locator('input#amount').innerText()).toContain('100');

    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight) });


})

test('Lazy loading', async ({ page }) => {

    await page.goto('https://www.booksbykilo.in/children-books');
    let previousHeight = 0;
    while (true) {
        page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(2000);


        let currentHeight = await page.evaluate(() => {
            return document.body.scrollHeight;

        })
        console.log(currentHeight);
        if (previousHeight === currentHeight) {
            break
        }
        previousHeight = currentHeight;
    }







})

test('frame locator', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');
    let frameCount = page.frames();
    let totalFarmaes = frameCount.length;
    console.log(totalFarmaes);

    let firstFrame=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'});
    expect(firstFrame).toBeTruthy();


   

   
})