import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Quality Guild Main Page Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/", { timeout: 60000 }); //timeOut
        //  test.setTimeout(120000);
        //  page.setDefaultNavigationTimeout(60000);
        //  page.setDefaultTimeout(60000); // for click and checkbox
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


    test('Level range should be functional', async ({ page }) => {
        const levelElement = await page.getByTestId("level-range");
        // await levelElement.fill('75');

        await levelElement.focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowLeft");

        await expect(page.locator("#skillLevelValue")).toHaveText('51');
    });


    test('Table data should be visible', async ({ page }) => {
        const row = await page.getByRole('row', { name: 'Bugslayer Eldric' });
        await expect(row).toBeVisible();

        await expect(row.getByRole('cell', { name: 'eldric@realmwatchers.com' })).toBeVisible();
        await expect(row.getByRole('cell', { name: 'Hero of Quality' })).toBeVisible();
        await expect(row.getByRole('cell', { name: '85' })).toBeVisible();
    });

    test('Drag and Drop should be visible', async ({ page }) => {
        const source = await page.getByTestId('hero1-image');
        const target = await page.getByTestId('team-area');

        const initialBox = await source.boundingBox();
        if (!initialBox) throw new Error('Could not find initial box');

        await source.dragTo(target);

        const finalBox = await source.boundingBox();
        if (!finalBox) throw new Error('Could not find initial box');

        await expect(finalBox.x).not.toBe((initialBox.x));
        await expect(finalBox.y).not.toBe((initialBox.y));

    });

    test('Buttons should be green', async ({ page }) => {
        const button = await page.getByRole('button', { name: 'Guild Info' });
        await expect(button).toHaveCSS('background-color', 'rgb(26, 188, 156)');
    });


    test('File upload should be functional', async ({ page }) => {
        const filePath = path.resolve(__dirname, '../assests/Viking.jpg');
        await page.getByTestId('photo-upload').setInputFiles(filePath);

        await expect(page.locator('#hero3')).toBeVisible();
    });

});


