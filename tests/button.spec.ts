import { test, expect } from '@playwright/test';

test('Debe renderizar el botón y ser clickeable', async ({ page }) => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=components-button--default'
  );

  const button = page.getByRole('button', { name: 'Click me' });
  await expect(button).toBeVisible();
  await button.click();
});
