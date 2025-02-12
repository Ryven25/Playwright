import { test, expect } from '@playwright/test';

test.describe('Quality Guild Main Page Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/");

    });

    // test.afterEach(async ({ page }) => {
    //     console.log("after each test");
    // });



    // test.beforeAll(async ({ page }) => {
    //     console.log("before all test");

    // });

    // test.afterAll(async ({ page }) => {
    //     console.log("after all test");

    // });


    test('Header should be visible', async ({ page }) => {
        await expect(page).toHaveTitle('Legion QA Guild Signup');
    });

    test('Name field should work correctlly', async ({ page }) => {
        const nameInput = await page.getByPlaceholder('Enter your tester alias');
        //  await nameInput.fill('Roman');

        //   await page.locator('//input[@id = "name"]').fill("Roman2");
        await page.getByRole('textbox', { name: "Tester Alias" }).fill("656555")
    });



    test('Email field should work correctlly', async ({ page }) => {
        const email = 'ryven@gmail.com';

        const emailInput = await page.getByPlaceholder('Enter your scroll (email)');

        //  await emailInput.fill("ryven@gmail.com");
        //  await page.locator('//input[@id = "email"]').fill("ryven@gmail.com");


        await page.getByTestId('email-input').fill(email);
        await expect(page.getByTestId('email-input')).toHaveValue(email);
        const value = await page.getByTestId('email-input').inputValue();
        console.log("the email value is " + value);


    });


    test('File upload label should be visible', async ({ page }) => {

        const uploadLabel = await page.getByText("Upload", { exact: false });
        await expect(uploadLabel).toBeVisible();
        const labetext = await uploadLabel.textContent();
        expect(labetext).toBe("Upload Your Tester Portrait:");
        expect(labetext).toContain("Upload Your Tester");

    });

    test('Qa traits dropdown should be functional', async ({ page }) => {
        await page.getByTestId('superpower-select').selectOption('super_strength');
        const value = await page.getByTestId('superpower-select').inputValue();
        console.log(value);
        expect(value).toBe('super_strength');
    });

    test('Speed Checkbox should be functional', async ({ page }) => {
        await expect(page.getByTestId('speed-checkbox')).not.toBeChecked();
        await page.getByTestId('speed-checkbox').click();

        await expect(page.getByTestId('speed-checkbox')).toBeChecked();
    });


    test('Radio button should be functional', async ({ page }) => {

        await expect(page.getByText("Pick Your Allegiance:")).toBeVisible();


        await expect(page.getByTestId('hero-radio')).not.toBeChecked();
        await expect(page.getByTestId('trickster-radio')).not.toBeChecked();

        await page.getByTestId('hero-radio').click();
        await expect(page.getByTestId('hero-radio')).toBeChecked();
        await expect(page.getByTestId('trickster-radio')).not.toBeChecked();


        await page.getByTestId('trickster-radio').click();
        await expect(page.getByTestId('trickster-radio')).toBeChecked();
        await expect(page.getByTestId('hero-radio')).not.toBeChecked();


    });


});


