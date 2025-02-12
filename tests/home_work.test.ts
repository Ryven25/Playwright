import { test, expect } from '@playwright/test';

test.describe('Quality Guild Main Page Test2', () => {


    test.beforeEach(async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/");
    });



    test('Button Improve your skill', async ({ page }) => {
        await expect(page.getByRole('button', { name: "Improve your skills" })).toBeVisible();
    });

    test('Verify button is green', async ({ page }) => {

        const button = page.locator('button', { hasText: "Improve your skills" });
        const backgroundColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
        await expect(backgroundColor).toBe('rgb(26, 188, 156)'); //  #1abc9c
    });


    test('Verify Navigation to the Trivia Screen and Validate the Trivia Screen and Start Game', async ({ page }) => {
        await page.getByRole('button', { name: "Improve your skills" }).click();


        await expect(page.getByRole('heading', { name: 'Legion QA Wizards Gym' })).toBeVisible();
        await page.locator('//input[@id = "playerName"]').fill("John Doe");
        await page.getByPlaceholder('Number of Questions').fill('5');

        await page.getByRole('button', { name: "Start Game" }).click();
        await expect(page.getByText("Correct Answers: 0 / 5")).toBeVisible();
    });


    test('Back to Home Functionality', async ({ page }) => {
        await page.getByRole('button', { name: "Improve your skills" }).click();


        await expect(page.getByRole('heading', { name: 'Legion QA Wizards Gym' })).toBeVisible();
        await page.locator('//input[@id = "playerName"]').fill("John Doe");
        await page.getByPlaceholder('Number of Questions').fill('5');

        await page.getByRole('button', { name: "Back to Home" }).click();
        await expect(page.getByRole('button', { name: "Improve your skills" })).toBeVisible();
    });
});

