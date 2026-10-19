import { test, expect } from '@playwright/test';

test.describe('Data form validations', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sdetqa.vercel.app/autoplay')
    })


    //1. Page Load Validation
    test('1. Page Load Validation', async ({ page }) => {

        const autoPlay = page.locator("//*[text()='AutoPlay']");
        await expect(autoPlay).toBeVisible();

    })

    //2. Input Fields Validation
    test('2. Input Fields Validation', async ({ page }) => {

        const fullName = page.locator("#name");
        const email = page.getByPlaceholder("john@example.com");
        const phone = page.locator('[type="tel"]');
        const address = page.getByText('123 Main St, City');

        await expect(fullName).toBeVisible();
        await expect(fullName).toHaveAttribute('maxlength', "15");
        await fullName.fill("John Canedy");
        await expect(fullName).toHaveValue('John Canedy');

        await expect(email).toBeVisible();
        await email.fill("tester@example.com");
        await expect(email).toHaveValue('tester@example.com');

        await expect(phone).toBeVisible();
        await phone.fill("+91 1234567898");
        await expect(phone).toHaveValue('+91 1234567898');

        await expect(address).toBeVisible();
        await address.fill("yelmar mangewadi \n Tal-sangola \n Dist-Solapur");
        await expect(address).toHaveValue('yelmar mangewadi \n Tal-sangola \n Dist-Solapur');

    })

    test('Radio Button (Gender) Validation', async ({ page }) => {

        const male = page.getByLabel('Male', { exact: true });
        const female = page.getByLabel(' Female', { exact: true });

        await expect(female).not.toBeChecked();
        female.check();
        await expect(female).toBeChecked();
        await expect(male).not.toBeChecked();
    })

    test('Select dropdown', async ({ page }) => {

        const country = page.locator("#country");
        await country.selectOption({ value: "india" })

        await page.waitForTimeout(3000);
        await country.selectOption({ label: "UK" });

        await page.waitForTimeout(3000);
        await country.selectOption({ index: 4 });
    })

    test('Select multi select dropdown', async ({ page }) => {

        const multiselect = page.locator("#colors");
        multiselect.selectOption([{ value: 'red' }, { value: 'yellow' }]);

        const options = await multiselect.locator('option').allInnerTexts();

        for (let option of options) {
            console.log(option);


        }


    })

})