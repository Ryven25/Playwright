import { test, expect, Browser, chromium, BrowserContext, Page } from '@playwright/test';

test('browser - context - page example', async () => {
    const browser: Browser = await chromium.launch({ headless: false })

    const context: BrowserContext = await browser.newContext();
    const context2: BrowserContext = await browser.newContext();

    const page1: Page = await context.newPage();
    const page2: Page = await context2.newPage();

    await page1.goto("https://www.google.com/");
    await page2.goto("https://en.wikipedia.org/");

    await page1.waitForTimeout(10000);
    await page2.waitForTimeout(10000);
});
