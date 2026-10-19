import { test, expect } from '@playwright/test'
test.beforeEach(async ({ page }) => {

    await page.goto("https://sdetqa.vercel.app/filters_practice")

})

test('Verify "Add to cart" for Product 2', async ({ page }) => {

    const addToCartPr2btn = page.getByRole('listitem')
        .filter({ hasText: 'Product 2' })
        .getByRole('button', { name: 'Add to cart' });

    await expect(addToCartPr2btn).toBeVisible();

})

test('Count items not having "Out of stock"', async ({ page }) => {

    const outOfStock = page.locator('.card').getByRole('listitem').filter({ hasText: 'Out of stock' })

    await expect(outOfStock).toHaveCount(2);

})

test('Find items with "In stock"', async ({ page }) => {

    const Instock = page.locator('.card').getByRole('listitem').filter({ hasText: 'n stock' })

    await expect(Instock).toHaveCount(3);

})

test('Verify elements using data-testid', async ({ page }) => {

    const allcount = page.locator('[data-testid]');
    const count = await allcount.count();
    console.log(count);
    console.log("TestID elements are", await allcount.first().innerText(), await allcount.last().innerText);

})

test('Find "Say goodbye" button for John', async ({ page }) => {

    const gooByBtn = page.getByRole('listitem')
        .filter({ hasText: '👤 John' })
        .getByRole('button', { name: 'Say goodbye' });

    await expect.soft(gooByBtn).toBeVisible();


})

test('Count "Say hello" buttons for John', async ({ page }) => {

    const sayHelloJohn = page.getByRole('listitem')
        .filter({ hasText: "👤 John" })
        .getByRole('button', { name: 'Say hello' });

    await expect.soft(sayHelloJohn).toBeVisible();


})

test('Count all buttons for John ', async ({ page }) => {

    const allJohnbtn = page.getByRole('listitem')
        .filter({ hasText: "👤 John" });

    await expect.soft(allJohnbtn).toHaveCount(2);

})

test('Find "Subscribe" buttons using multiple conditions', async ({ page }) => {

    const subs = page.locator('button[title="Subscribe"]').first()
        .and(page.getByRole('button', { name: '📬 Subscribe' }));

    await expect.soft(subs).toBeVisible();


})

test('Count tasks with "done" status', async ({ page }) => {

    const done = page.getByRole('listitem').filter({ hasText: 'done' }).getByRole('button', { name: 'details' });//;
    const donecount = await done.count();
    console.log(donecount);

    const tasA = done.filter({ hasText: '📘 Task A' });
    const donecounta = await tasA.count();
    console.log(donecounta);

})

test.only('Find tasks not marked "done"', async ({ page }) => {
    const otherdone = await page.locator('.card')
        .nth(2).getByRole('listitem')
        .filter({ hasNotText: 'done' })
    //.filter({ hasText: 'details' });
    let otherdonecount = await otherdone.count();
    console.log(otherdonecount);

})

test.only('Verify stock status counts', async ({ page }) => {

    const inStock = page.locator('.card').getByRole("listitem").filter({ hasText: 'In stock' });
    console.log(await inStock.count());

    const outOfStock = page.locator('.card').getByRole("listitem").filter({ hasText: 'Out of stock' });
    console.log(await outOfStock.count());

})








