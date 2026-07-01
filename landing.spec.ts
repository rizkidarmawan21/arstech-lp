import { test, expect } from '@playwright/test';

test('logo renders correctly', async ({ page }) => {
  await page.goto('http://manapos.43.134.80.173.sslip.io');
  
  // Logo should be visible in nav
  const logo = page.locator('nav img[alt="Manapos"]');
  await expect(logo).toBeVisible();
  
  // Verify logo src is set
  const logoSrc = await logo.getAttribute('src');
  expect(logoSrc).toBe('/logo.png');
  
  // Check page title
  await expect(page).toHaveTitle(/Manapos/);
  
  // Verify key features text is present
  await expect(page.getByText('AI Assistant')).toBeVisible();
  await expect(page.getByText('HPP Calculator')).toBeVisible();
  await expect(page.getByText('Self-Order Microsite')).toBeVisible();
  await expect(page.getByText('Kenapa Pilih Manapos')).toBeVisible();
});
