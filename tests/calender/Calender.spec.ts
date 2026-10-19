
import { test, expect, Page, Locator } from '@playwright/test';

async function selectDate(page: Page, targetDate: string, targetMonth: string, targetYear: string) {
    while (true) {
        let actualMonth = await page.locator('.ui-datepicker-month').innerText();
        let actualYear = await page.locator('.ui-datepicker-year').innerText();

        if (actualMonth === targetMonth && actualYear === targetYear) {
            break;

        }
        else {
            await page.locator('[title="Next"]').click()
        }
    }

    let allCalender = await page.locator('.ui-datepicker-calendar td').all();

    for (let date of allCalender) {
        let sDate = await date.innerText();

        if (sDate === targetDate) {
            await date.click();
            break;
        }
    }
}

test('select calender', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');
    await page.locator('#datepicker1').first().click();
    let actualMonth = 'December';
    let actualYear = "2030";
    let actualDate = '25';

    await selectDate(page, actualDate, actualMonth, actualYear);
});