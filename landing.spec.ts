import { test, expect } from '@playwright/test';

test('landing page content renders', async ({ page }) => {
  await page.goto('http://manapos.43.134.80.173.sslip.io', { waitUntil: 'networkidle' });
  
  // Check page title
  await expect(page).toHaveTitle(/Manapos/);
  
  // Verify logo file is in HTML
  const logoInHtml = await page.locator('img[alt="Manapos"]').first().getAttribute('src');
  expect(logoInHtml).toBe('/logo.png');
  
  // Verify key features text is present
  await expect(page.getByText('AI Assistant')).toBeVisible();
  await expect(page.getByText('HPP Calculator')).toBeVisible();
  await expect(page.getByText('Self-Order Microsite')).toBeVisible();
  await expect(page.getByText('Kenapa Pilih Manapos')).toBeVisible();
  await expect(page.getByText('Sistem POS Modern untuk Bisnis Indonesia')).toBeVisible();
});
