import { test, expect } from '@playwright/test';
import path from 'path';


test.describe('Main page E2E', () => {


    test.beforeEach(async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/");

    });


    test('All field should work correctlly', async ({ page }) => {
        // Name
        await page.getByRole('textbox', { name: "Tester Alias" }).fill("Roma")

        // Email
        await page.locator('//input[@id = "email"]').fill("ryven@gmail.com");

        //Select Your QA Trait:
        await page.getByTestId('superpower-select').selectOption('mind_reading');

        // Pick Your Allegiance 
        await page.getByTestId('trickster-radio').click();

        // Choose Your Skills:
        await page.getByTestId('tech-checkbox').click();

        //Upload Your Tester Portrait:
        const filePath = path.resolve(__dirname, '../assests/Viking.jpg');
        await page.getByTestId('photo-upload').setInputFiles(filePath);
        await expect(page.locator('#hero3')).toBeVisible();

        //Select Your QA Skill Level:
        const levelElement = await page.getByTestId("level-range");
        await levelElement.fill('91');


        //Click on button'Join the QA Guild!'
        await page.getByTestId('join-guild-button').click();


        //Table data should be visible
        const row = await page.getByRole('row', { name: 'Roma' });
        await expect(row).toBeVisible();
        await expect(row.getByRole('cell', { name: 'ryven@gmail.com' })).toBeVisible();
        await expect(row.getByRole('cell', { name: 'Trickster' })).toBeVisible();
        await expect(row.getByRole('cell', { name: '91' })).toBeVisible();

        await page.getByTestId('join-guild-button').click();
    });



});
