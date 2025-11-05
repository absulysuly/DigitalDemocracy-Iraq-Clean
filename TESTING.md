# Testing Guide

This document provides comprehensive information about the testing strategy and how to run tests in this project.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)

## Overview

This project implements a comprehensive testing strategy that includes:

1. **Unit/Component Tests**: Testing individual components and functions in isolation
2. **Integration Tests**: Testing how components work together
3. **End-to-End (E2E) Tests**: Testing complete user journeys

## Testing Stack

### Unit & Component Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **@testing-library/user-event**: Simulating user interactions

### E2E Testing
- **Playwright**: Modern E2E testing framework
- Supports multiple browsers (Chromium, Firefox, WebKit)
- Mobile viewport testing

## Running Tests

### Unit & Component Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI mode (interactive debugging)
npm run test:e2e:ui

# Run E2E tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run E2E tests in headed mode (see browser)
npx playwright test --headed
```

### Running Specific Tests

```bash
# Run a specific test file
npm test -- CandidateCard.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="should render"

# Run E2E test for a specific feature
npx playwright test e2e/candidates.spec.ts
```

## Writing Tests

### Component Tests

Component tests should be placed in a `__tests__` directory next to the component:

```
components/
  ui/
    Button.tsx
    __tests__/
      Button.test.tsx
```

Example component test:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Tests

E2E tests are located in the `e2e/` directory:

```
e2e/
  homepage.spec.ts
  candidates.spec.ts
  auth.spec.ts
  navigation.spec.ts
```

Example E2E test:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Candidates Page', () => {
  test('should navigate to candidates page', async ({ page }) => {
    await page.goto('/en/candidates');
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('/candidates');
  });
});
```

## Test Coverage

Current test coverage includes:

### Components
- ✅ UI Components (Button, VerifiedBadge, LoadingSpinner, Avatar)
- ✅ CandidateCard
- ✅ FilterPanel
- ✅ Utility functions

### E2E Tests
- ✅ Homepage navigation and functionality
- ✅ Candidates listing and filtering
- ✅ Authentication flow
- ✅ Navigation between pages
- ✅ Responsive design (mobile/desktop)
- ✅ Accessibility checks

### Coverage Goals
- **Unit/Component Tests**: Aim for >80% code coverage
- **E2E Tests**: Cover all critical user journeys

To view coverage report:

```bash
npm run test:coverage
# Open coverage/lcov-report/index.html in a browser
```

## Best Practices

### Unit & Component Tests

1. **Test Behavior, Not Implementation**
   ```typescript
   // ✅ Good: Testing behavior
   expect(screen.getByRole('button')).toBeDisabled();
   
   // ❌ Bad: Testing implementation
   expect(component.state.isDisabled).toBe(true);
   ```

2. **Use Accessible Queries**
   ```typescript
   // ✅ Good: Using accessible queries
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText('Email address')
   
   // ❌ Bad: Using test IDs unnecessarily
   screen.getByTestId('submit-button')
   ```

3. **Test User Interactions**
   ```typescript
   // Simulate real user behavior
   await userEvent.click(button);
   await userEvent.type(input, 'Hello World');
   ```

4. **Mock External Dependencies**
   ```typescript
   jest.mock('next/navigation', () => ({
     useRouter: () => ({ push: jest.fn() }),
   }));
   ```

5. **Keep Tests Isolated**
   - Each test should be independent
   - Clean up after tests
   - Don't rely on test execution order

### E2E Tests

1. **Wait for Network Idle**
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

2. **Use Descriptive Test Names**
   ```typescript
   test('should filter candidates by governorate and update URL', async ({ page }) => {
     // ...
   });
   ```

3. **Test Critical User Journeys**
   - Focus on end-to-end flows users actually perform
   - Test happy paths and common error scenarios

4. **Handle Async Operations**
   ```typescript
   // Wait for elements to appear
   await expect(page.locator('.result')).toBeVisible();
   
   // Wait for specific timeout when needed
   await page.waitForTimeout(500);
   ```

5. **Test Multiple Viewports**
   ```typescript
   test('should work on mobile', async ({ page }) => {
     await page.setViewportSize({ width: 375, height: 667 });
     // ...
   });
   ```

## Continuous Integration

Tests are designed to run in CI environments:

1. **Unit Tests**: Fast, run on every commit
2. **E2E Tests**: Run on pull requests and before deployment

Example CI configuration:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

## Debugging Tests

### Jest Tests
```bash
# Run with verbose output
npm test -- --verbose

# Debug specific test
node --inspect-brk node_modules/.bin/jest --runInBand ComponentName.test.tsx
```

### Playwright Tests
```bash
# Run with UI mode for visual debugging
npm run test:e2e:ui

# Run in headed mode to see the browser
npx playwright test --headed

# Debug specific test
npx playwright test --debug

# Generate trace for failed tests
npx playwright test --trace on
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. Write tests first (TDD approach) or alongside the feature
2. Ensure all tests pass before committing
3. Maintain or improve code coverage
4. Update this documentation if adding new test patterns

---

For questions or issues with testing, please reach out to the development team.
