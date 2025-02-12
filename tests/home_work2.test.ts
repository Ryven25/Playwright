import { test, expect } from '@playwright/test';

test.describe('Quality Guild Main Page Test2', () => {


    test.beforeEach(async ({ page }) => {
        await page.goto("http://167.99.178.249:4450/");
        await page.getByTestId('start-quest-button').click();
    });


    test('Start your testing quest button is present', async ({ page }) => {

        // await expect(page.getByTestId('start-quest-button')).toBeVisible();
        // await page.getByTestId('start-quest-button').click();

        await expect(page.getByText('QA Adventure Configuration')).toBeVisible();

    });


    test('Presence and functionality of all text input fields', async ({ page }) => {
        await expect(page.getByPlaceholder('Enter thy test case name')).toBeVisible();
        await expect(page.getByPlaceholder('Enter a description of thy test scenario')).toBeVisible();

    });

    test('Validate Input Fields', async ({ page }) => {
        await expect(page.getByPlaceholder('Enter thy test case name')).toBeVisible();
        await expect(page.getByPlaceholder('Enter a description of thy test scenario')).toBeVisible();

        const questName = await page.getByPlaceholder('Enter thy test case name');
        await questName.fill('Roman');

        const testQuestDescription = await page.getByPlaceholder('Enter a description of thy test scenario');
        await testQuestDescription.fill('Verify the presence and functionality of all text input fields. Enter valid data into each field and verify that the inputs are accepted without errors. Test edge cases, such as leaving a required field blank, and verify that appropriate validation messages are displayed.');

    });

    test('Complexity Level: Dropdown', async ({ page }) => {
        await page.getByLabel('Complexity Level').selectOption('senior');
        const selectedLevelValue = await page.locator('#questLevel').inputValue();
        console.log(selectedLevelValue);
        await expect(selectedLevelValue).toBe('senior');
    });


    test('Bug Bounty Reward Type: Dropdown', async ({ page }) => {
        await page.getByLabel('Bug Bounty Reward Type').selectOption('artifact');
        const selectedRewardValue = await page.locator('#reward').inputValue();
        console.log(selectedRewardValue);
        await expect(selectedRewardValue).toBe('artifact');
    });


    test('Validate Radio Buttons', async ({ page }) => {

        await expect(page.getByText("Quest Type:")).toBeVisible();

        await expect(page.getByText('Bug Investigation')).not.toBeChecked();
        await expect(page.getByText('Regression Battle')).not.toBeChecked();
        await expect(page.getByText('Exploratory Testing')).not.toBeChecked();

        await page.getByText('Bug Investigation').click();
        await expect(page.getByText('Bug Investigation')).toBeChecked();

        await page.getByText('Regression Battle').click();
        await expect(page.getByText('Regression Battle')).toBeChecked();

        await page.getByText('Exploratory Testing').click();
        await expect(page.getByText('Exploratory Testing')).toBeChecked();

    });

    test('Submit the Form', async ({ page }) => {
        const questName = await page.getByPlaceholder('Enter thy test case name');
        await questName.fill('Roman');

        const testQuestDescription = await page.getByPlaceholder('Enter a description of thy test scenario');
        await testQuestDescription.fill('Verify the presence and functionality of all text input fields. Enter valid data into each field and verify that the inputs are accepted without errors. Test edge cases, such as leaving a required field blank, and verify that appropriate validation messages are displayed.');

        await page.getByLabel('Complexity Level').selectOption('senior');
        const selectedLevelValue = await page.locator('#questLevel').inputValue();
        await expect(selectedLevelValue).toBe('senior');

        await page.getByText('Regression Battle').click();

        await page.getByLabel('Bug Bounty Reward Type').selectOption('artifact');
        const selectedRewardValue = await page.locator('#reward').inputValue();
        await expect(selectedRewardValue).toBe('artifact');


        await page.getByText('Initiate QA Adventure').click();
        await expect(page.getByText('Prepare thyself for an epic QA adventure!')).toBeVisible();

    });
});

