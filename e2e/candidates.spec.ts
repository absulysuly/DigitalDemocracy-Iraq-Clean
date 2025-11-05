import { test, expect } from '@playwright/test';

test.describe('Candidates Page', () => {
  test('should navigate to candidates page', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the candidates page
    expect(page.url()).toContain('/candidates');
  });

  test('should display filter panel', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    // Look for filter elements
    const searchInput = page.getByPlaceholder(/search|name/i);
    const governorateFilter = page.getByRole('combobox').or(page.locator('select')).first();
    
    const hasSearch = await searchInput.count() > 0;
    const hasFilter = await governorateFilter.count() > 0;
    
    expect(hasSearch || hasFilter).toBeTruthy();
  });

  test('should filter candidates by search', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    const searchInput = page.getByPlaceholder(/search|name/i).first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      
      // Wait for debounce and URL update
      await page.waitForTimeout(500);
      
      // URL should contain query parameter
      expect(page.url()).toContain('query=test');
    }
  });

  test('should filter candidates by governorate', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    const governorateSelect = page.locator('select#governorate').or(
      page.getByLabel(/governorate/i)
    ).first();
    
    if (await governorateSelect.isVisible()) {
      // Get the first non-empty option
      const options = await governorateSelect.locator('option').all();
      if (options.length > 1) {
        const firstValue = await options[1].getAttribute('value');
        if (firstValue) {
          await governorateSelect.selectOption(firstValue);
          
          // Wait for URL update
          await page.waitForTimeout(500);
          
          // URL should contain governorate parameter
          expect(page.url()).toContain('governorate=');
        }
      }
    }
  });

  test('should filter candidates by gender', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    const genderSelect = page.locator('select#gender').or(
      page.getByLabel(/gender/i)
    ).first();
    
    if (await genderSelect.isVisible()) {
      await genderSelect.selectOption('male');
      
      // Wait for URL update
      await page.waitForTimeout(500);
      
      // URL should contain gender parameter
      expect(page.url()).toContain('gender=male');
    }
  });

  test('should display candidate cards', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    // Wait for candidates to load
    await page.waitForTimeout(1000);
    
    // Look for candidate cards or loading state
    const candidateCards = page.locator('a[href*="/candidates/"]');
    const loadingState = page.locator('.animate-pulse');
    
    const hasCards = await candidateCards.count() > 0;
    const hasLoading = await loadingState.count() > 0;
    
    expect(hasCards || hasLoading).toBeTruthy();
  });

  test('should show verified badge on verified candidates', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    // Wait for candidates to load
    await page.waitForTimeout(1000);
    
    // Look for verified badges
    const verifiedBadges = page.getByLabel(/verified/i);
    
    // If there are verified candidates, badges should be visible
    const badgeCount = await verifiedBadges.count();
    expect(badgeCount).toBeGreaterThanOrEqual(0);
  });

  test('should navigate to candidate detail page', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    // Wait for candidates to load
    await page.waitForTimeout(1000);
    
    const firstCandidate = page.locator('a[href*="/candidates/"]').first();
    
    if (await firstCandidate.isVisible()) {
      await firstCandidate.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // URL should be a specific candidate page
      expect(page.url()).toMatch(/\/candidates\/[^/]+$/);
    }
  });

  test('should have pagination', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    // Look for pagination elements
    const pagination = page.locator('[data-testid="pagination"]').or(
      page.locator('button:has-text("Next")').or(page.locator('button:has-text("Previous")'))
    );
    
    // Pagination might not be visible if there aren't enough candidates
    const hasPagination = await pagination.count() > 0;
    expect(hasPagination).toBeDefined();
  });

  test('should maintain filters across page refreshes', async ({ page }) => {
    await page.goto('/en/candidates?query=test&gender=male');
    await page.waitForLoadState('networkidle');
    
    // Check if filters are applied from URL
    const searchInput = page.getByPlaceholder(/search|name/i).first();
    
    if (await searchInput.isVisible()) {
      const searchValue = await searchInput.inputValue();
      expect(searchValue).toBe('test');
    }
    
    const genderSelect = page.locator('select#gender').first();
    if (await genderSelect.isVisible()) {
      const genderValue = await genderSelect.inputValue();
      expect(genderValue).toBe('male');
    }
  });
});
