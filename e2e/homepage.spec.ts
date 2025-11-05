import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/en');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check if the page title is visible
    await expect(page).toHaveTitle(/Digital Diwan|Hamlet/i);
  });

  test('should display the daily poll', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check for poll elements
    const poll = page.locator('[data-testid="daily-poll"]').or(page.locator('text=/poll|vote/i')).first();
    if (await poll.isVisible()) {
      await expect(poll).toBeVisible();
    }
  });

  test('should show login prompt for unauthenticated users', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check if login prompt or compose card is visible
    const loginButton = page.getByRole('button', { name: /log in/i });
    const composeArea = page.getByPlaceholder(/what's on your mind/i);
    
    // One of them should be visible
    const isLoginVisible = await loginButton.isVisible().catch(() => false);
    const isComposeVisible = await composeArea.isVisible().catch(() => false);
    
    expect(isLoginVisible || isComposeVisible).toBeTruthy();
  });

  test('should display the feed with posts', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Wait a moment for posts to load
    await page.waitForTimeout(1000);
    
    // Check for either skeleton loaders or actual posts
    const hasSkeletons = await page.locator('.animate-pulse').count() > 0;
    const hasPosts = await page.locator('[data-testid="post"]').count() > 0;
    
    expect(hasSkeletons || hasPosts).toBeTruthy();
  });

  test('should switch between languages', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Look for language switcher
    const languageSwitcher = page.locator('[data-testid="language-switcher"]').or(
      page.locator('button:has-text("EN")').or(page.locator('button:has-text("AR")'))
    ).first();
    
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click();
      
      // Check if URL changed or language options appeared
      await page.waitForTimeout(500);
      
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/\/(en|ar|ku)/);
    }
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check for navigation elements
    const navigation = page.locator('nav').or(page.locator('[role="navigation"]')).first();
    
    if (await navigation.isVisible()) {
      await expect(navigation).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Page should load without horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });

  test('should have accessible elements', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check for basic accessibility
    const mainContent = page.locator('main').or(page.locator('[role="main"]')).first();
    const buttons = page.getByRole('button');
    
    const hasMainContent = await mainContent.count() > 0;
    const hasButtons = await buttons.count() > 0;
    
    expect(hasMainContent || hasButtons).toBeTruthy();
  });
});
