import { test, expect } from '@playwright/test';

const electionSegments = [
  'candidates',
  'governorates',
  'stats',
  'analytics',
  'poll',
  'vote',
  'election',
];

const matchesElectionSegment = (url: string) =>
  electionSegments.some((segment) => url.toLowerCase().includes(segment));

test.describe('Election feature flag disabled', () => {
  test('navigation hides election links when disabled', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const candidatesLink = page.locator('a[href*="/candidates"]');
    const governoratesLink = page.locator('a[href*="/governorates"]');
    const statsLink = page.locator('a[href*="/stats"]');

    await expect(candidatesLink).toHaveCount(0);
    await expect(governoratesLink).toHaveCount(0);
    await expect(statsLink).toHaveCount(0);
  });

  test('no election API requests are issued when disabled', async ({ page }) => {
    const electionRequests: string[] = [];

    page.on('request', (request) => {
      const requestUrl = request.url();
      if (matchesElectionSegment(requestUrl)) {
        electionRequests.push(requestUrl);
      }
    });

    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    expect(electionRequests).toEqual([]);
  });
});
