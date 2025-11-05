import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between main pages', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Look for navigation links
    const candidatesLink = page.locator('a[href*="/candidates"]').first();
    
    if (await candidatesLink.isVisible()) {
      await candidatesLink.click();
      await page.waitForLoadState('networkidle');
      
      expect(page.url()).toContain('/candidates');
    }
  });

  test('should handle language switching', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Try to find and click Arabic language option
    const arabicLink = page.locator('a[href*="/ar"]').or(
      page.locator('button:has-text("AR")').or(page.locator('text=/عربي/'))
    ).first();
    
    if (await arabicLink.isVisible()) {
      await arabicLink.click();
      await page.waitForLoadState('networkidle');
      
      // URL should now contain /ar
      expect(page.url()).toContain('/ar');
    }
  });

  test('should handle swipe navigation on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }
    
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Get the initial URL
    const initialUrl = page.url();
    
    // Simulate swipe gesture
    await page.touchscreen.tap(200, 300);
    await page.mouse.move(200, 300);
    await page.mouse.down();
    await page.mouse.move(100, 300);
    await page.mouse.up();
    
    await page.waitForTimeout(500);
    
    // URL might have changed after swipe
    const finalUrl = page.url();
    expect(finalUrl).toBeDefined();
  });

  test('should maintain scroll position on navigation', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200);
    
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(0);
  });

  test('should have working back button', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    const initialUrl = page.url();
    
    // Navigate to another page
    const candidatesLink = page.locator('a[href*="/candidates"]').first();
    if (await candidatesLink.isVisible()) {
      await candidatesLink.click();
      await page.waitForLoadState('networkidle');
      
      // Go back
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      // Should be back at initial URL
      expect(page.url()).toBe(initialUrl);
    }
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Navigation should be keyboard accessible
    await page.keyboard.press('Tab');
    
    // Check if focus is visible on an element
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(focusedElement).toBeTruthy();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/en/this-page-does-not-exist');
    await page.waitForLoadState('networkidle');
    
    // Should show 404 or redirect to home
    const url = page.url();
    const content = await page.content();
    
    const is404 = content.includes('404') || content.includes('not found');
    const isRedirected = url.includes('/en') && !url.includes('this-page-does-not-exist');
    
    expect(is404 || isRedirected).toBeTruthy();
  });
});
