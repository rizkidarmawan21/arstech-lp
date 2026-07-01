import { test, expect } from '@playwright/test';

test('logo and hero image render correctly', async ({ page }) => {
  await page.goto('http://manapos.43.134.80.173.sslip.io');
  
  // Logo should be visible
  const logo = page.locator('img[alt="Manapos"]');
  await expect(logo).toBeVisible();
  
  // Verify logo loaded (not broken)
  const logoSrc = await logo.getAttribute('src');
  const logoResp = await page.request.get(logoSrc);
  expect(logoResp.status()).toBe(200);
  
  // Check page title
  await expect(page).toHaveTitle(/Manapos/);
  
  // Verify key features text is present
  await expect(page.getByText('AI Assistant')).toBeVisible();
  await expect(page.getByText('HPP Calculator')).toBeVisible();
  await expect(page.getByText('Self-Order Microsite')).toBeVisible();
});
