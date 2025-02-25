import { test, expect } from '@playwright/test';

test.describe('Quality Guild Main Page Test', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://167.99.178.249:4450/");
  });

  test('test', async ({ page }) => {
    // Recording...
    await page.getByTestId('name-input').fill('Roman');
    await page.getByTestId('email-input').fill('ryven@gmail.com');


    await page.getByTestId('superpower-select').selectOption('invisibility');
    await page.getByTestId('signup-form').getByText('Trickster of Bugs').click();
    await page.getByText('Automation Speed').click();
    await page.getByTestId('level-range').fill('84');
    await page.getByTestId('join-guild-button').click();

    await page.getByTestId('start-quest-button').click();
    await page.getByRole('textbox', { name: 'Test Quest Name:' }).click();
    await page.getByRole('textbox', { name: 'Test Quest Name:' }).fill('Hello');
    await page.getByRole('textbox', { name: 'Test Quest Description:' }).click();
    await page.getByRole('textbox', { name: 'Test Quest Description:' }).fill('gfgfgggfgg');
    await page.getByLabel('Complexity Level:').selectOption('senior');
    await page.getByText('Regression Battle').click();
    await page.getByRole('slider', { name: 'Testing Team Size:' }).fill('8');
    await page.getByRole('button', { name: 'Initiate QA Adventure' }).click();
    await page.getByRole('button', { name: 'Embark on Testing!' }).click();
    await page.locator('div').filter({ hasText: '% Defect-Free' }).nth(1).click();
    await page.getByRole('button', { name: 'Find Bug' }).click();
  });
});