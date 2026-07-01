import { test, expect } from '@playwright/test';

test('take real app screenshots', async ({ page, context }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log('Navigating to login...');
  await page.goto('http://localhost:8080/login');
  
  // Wait short time to see if we redirect
  await page.waitForTimeout(3000);
  
  const url = page.url();
  console.log('Opened url:', url);
  
  if (url.includes('/dashboard')) {
    console.log('Already logged in, but let\'s force logout...');
    // We can go to /logout or look for a logout button or trigger a form post
    // Let's just clear all cookies and reload
    await context.clearCookies();
    // Try visiting login again
    await page.goto('http://localhost:8080/login');
    await page.waitForTimeout(3000);
  }
  
  const newUrl = page.url();
  console.log('URL after potential logout:', newUrl);
  
  if (newUrl.includes('/login')) {
    console.log('Waiting for login form...');
    await page.waitForSelector('input[type="email"]');
    console.log('Logging in...');
    await page.fill('input[type="email"]', 'admin@gmail.com');
    await page.fill('input[type="password"]', 'rahasia123');
    await page.click('button[type="submit"]');
  }

  console.log('Waiting for dashboard...');
  await page.waitForURL('**/dashboard', { timeout: 20000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(6000); // Wait for charts to load
  
  console.log('Taking dashboard screenshot...');
  await page.screenshot({ path: 'real-dashboard.png' });

  // Navigate to POS
  console.log('Navigating to POS...');
  const tenantUrl = page.url();
  const tenantSlug = tenantUrl.split('/')[3]; 
  await page.goto(`http://localhost:8080/${tenantSlug}/pos`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(4000);
  
  console.log('Taking POS screenshot...');
  await page.screenshot({ path: 'real-pos.png' });
});
