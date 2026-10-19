import { test, expect, Page } from '@playwright/test';

async function selectDate(page: Page, targetDate: Date) {
    let yearValue = targetDate.getFullYear().toString();
    console.log(yearValue);
    let monthValue = targetDate.getMonth().toString();
    console.log(monthValue);
    let dayValue = targetDate.getDate().toString()
    console.log(dayValue);

    await page.locator('[aria-label="Select month"]').selectOption(monthValue);
    await page.locator('[aria-label="Select year"]').selectOption(yearValue)
    await page.locator('.ui-datepicker-calendar td a').filter({ hasText: dayValue }).first().click();
}

test('Dummay booking', async ({ page }) => {
    const dateBirth = new Date('1995-01-15');
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 20);
    console.log(departureDate);
    const returDate = new Date(departureDate);
    returDate.setDate(returDate.getDate() + 10);
    console.log(returDate);


    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');
    await expect(page).toHaveTitle('Dummy ticket for applying visa - Verifiable flight reservation for embassy');
    //Select "Dummy Ticket for Visa Application".
    const visaApp = await page.locator('#product_549').check();
    await page.locator('[name="travname"]').fill('John');
    await page.locator('#travlastname').fill('smith');
    await page.locator('#dob').click();

    await selectDate(page, dateBirth);
    await page.locator('#sex_1').check();
    await page.locator('#traveltype_2').check();
    await page.locator('#fromcity').fill('Hyderabad');
    await page.locator('#tocity').fill('London');
    await page.locator('#departon').click();
    await selectDate(page,departureDate);
    await page.locator('#returndate').click();
    await selectDate(page,returDate);
    await page.locator('#billname').fill('John Smith');
    await page.locator('#billing_email').fill('JohnSmith@gmail.com');
    await page.locator('#select2-billing_country-container').fill('India');
    await page.locator('#billing_address_1').fill('Hitech City, Hyderabad');
    await page.locator('#billing_city').fill('Hyderabad');
    await page.locator('#select-8-billing_state-container').fill('Telangana');
    await page.locator('#billing_postcode').fill('500081');
    await page.locator('#billing_phone').fill('9876543210');
    await page.locator('#place_order').click();



})