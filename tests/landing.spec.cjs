const { test, expect } = require('@playwright/test');

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`layout and content remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page).toHaveTitle(/Arstech/);
    await expect(page.locator('h1')).toContainText('Less friction.');
    await expect(page.locator('#diagram')).toHaveClass(/is-rendered/);
    for (const id of ['capabilities', 'process', 'studio', 'mission', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id} h2`)).toBeVisible();
    }
    const layout = await page.evaluate(() => ({
      width: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clipped: [...document.querySelectorAll('h1, .diagram__node')].filter(el => {
        const box = el.getBoundingClientRect();
        return box.left < -1 || box.right > innerWidth + 1;
      }).map(el => el.textContent.trim()),
      unresolved: document.body.innerHTML.includes('{{'),
    }));
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
    expect(layout.clipped).toEqual([]);
    expect(layout.unresolved).toBe(false);
    expect(errors).toEqual([]);
    await expect(page.locator('a[href*="62812345678"]')).toHaveCount(0);
    await expect(page.locator('.footer__top')).toHaveAttribute('href', '#top');
    await expect(page.locator('#mission-title')).toContainText('AI Native Company');
    await expect(page.locator('.origin-story__years strong')).toHaveText('2');
  });
}

test('service exploration updates the workflow and project brief', async ({ page }) => {
  await page.goto('/');
  const ai = page.locator('#cap-trigger-2');
  await ai.click();
  await expect(ai).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#cap-trigger-1')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#preview-title')).toHaveText('Less repetition. More attention.');
  await page.locator('#preview-cta').click();
  await expect(page.locator('#cf-type')).toHaveValue('AI system');
  await page.locator('#cf-submit').click();
  await expect(page.locator('#cf-name')).toBeFocused();
  await expect(page.locator('#cf-name')).toHaveAttribute('aria-invalid', 'true');
  await page.locator('#cf-name').fill('Test visitor');
  await page.locator('#cf-email').fill('visitor@example.com');
  await page.locator('#cf-message').fill('We need help routing customer requests.');
  await page.locator('#cf-consent').check();
  await page.locator('#cf-submit').click();
  await expect(page.locator('#cf-status')).toContainText('Your brief is ready to send');
  const draft = await page.locator('#cf-status a').getAttribute('href');
  const url = new URL(draft);
  expect(url.protocol).toBe('mailto:');
  expect(url.pathname).toBe('info@arstech.my.id');
  expect(url.searchParams.get('body')).toContain('Project type: AI system');
  expect(url.searchParams.get('body')).toContain('We need help routing customer requests.');
});

test('ASCII sculptures have accessible descriptions and render in both sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('img', { name: /three-dimensional orbit/ })).toBeVisible();
  const process = page.getByRole('img', { name: /Three blue ASCII layers/ });
  await process.scrollIntoViewIfNeeded();
  await expect(process).toHaveClass(/is-rendered/);
  await expect(page.locator('[data-ascii-art] canvas')).toHaveCount(2);
  await expect(page.locator('.ascii-art__fallback').first()).toBeHidden();
});

test('mobile menu supports focus containment and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('#menu-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.mobile-menu__link').first()).toBeFocused();
  await page.locator('.mobile-menu__cta').focus();
  await page.keyboard.press('Tab');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('.mobile-menu__link').first().click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#capabilities$/);
});

test('ASCII sculpture animates and pauses outside the viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#diagram')).toHaveClass(/is-rendered/);
  const canvas = page.locator('#diagram canvas');
  const first = await canvas.evaluate(el => el.toDataURL());
  await expect.poll(() => canvas.evaluate(el => el.toDataURL())).not.toBe(first);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const paused = await canvas.evaluate(el => el.toDataURL());
  await page.waitForTimeout(400);
  expect(await canvas.evaluate(el => el.toDataURL())).toBe(paused);
  await page.locator('#diagram').scrollIntoViewIfNeeded();
  await expect.poll(() => canvas.evaluate(el => el.toDataURL())).not.toBe(paused);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reduced = await canvas.evaluate(el => el.toDataURL());
  await page.waitForTimeout(400);
  expect(await canvas.evaluate(el => el.toDataURL())).toBe(reduced);
});

test('reduced motion and JavaScript-disabled fallbacks keep content accessible', async ({ browser }) => {
  const reduced = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await reduced.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('#diagram')).toHaveClass(/is-rendered/);
  const animations = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length);
  expect(animations).toBe(0);
  await reduced.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJs.newPage();
  await fallback.goto('http://127.0.0.1:4173/');
  await expect(fallback.locator('h1')).toBeVisible();
  await expect(fallback.locator('#cap-panel-2')).toBeVisible();
  await expect(fallback.locator('#diagram .ascii-art__fallback')).toBeVisible();
  await expect(fallback.locator('#diagram .ascii-art__fallback')).toContainText(/[#%*]/);
  await expect(fallback.locator('a[href="mailto:info@arstech.my.id"]').first()).toBeVisible();
  await noJs.close();
});

test('shared layout and article assets resolve at nested paths', async ({ page }) => {
  for (const path of ['/blog/', '/blog/berapa-biaya-pembuatan-software-custom/', '/blog/erp-siap-pakai-vs-software-custom/', '/blog/otomasi-proses-bisnis-dengan-ai/']) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.nav-link[aria-current="page"]')).toHaveText('Articles');
    for (const href of await page.locator('link[rel="stylesheet"]').evaluateAll(links => links.map(link => link.href))) {
      expect((await page.request.get(href)).status()).toBe(200);
    }
    for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      expect(() => JSON.parse(json)).not.toThrow();
    }
  }
});


test('illustration loops automatically and pauses outside the viewport', async ({ page }) => {
  await page.goto('/');
  const bench = page.locator('.workbench');
  await expect(page.locator('#preview-run, #preview-status')).toHaveCount(0);
  await page.evaluate(() => {
    window.demoStates = [];
    new MutationObserver(() => window.demoStates.push(document.querySelector('.workbench').getAttribute('data-run-step')))
      .observe(document.querySelector('.workbench'), { attributes: true, attributeFilter: ['data-run-step'] });
  });
  await bench.scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.demoStates.filter(s => s === 'done').length), { timeout: 11000 }).toBeGreaterThanOrEqual(2);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(bench).toHaveAttribute('data-run-step', 'idle');
  await page.waitForTimeout(1000);
  await expect(bench).toHaveAttribute('data-run-step', 'idle');
  await page.locator('#cap-trigger-2').click();
  await expect(page.locator('#preview-app')).toHaveText('AI-assisted workspace');
  await expect(page.locator('#preview-result')).toHaveText('Ready for human review');
  await bench.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(bench).toHaveAttribute('data-run-step', 'done');
  await page.waitForTimeout(1000);
  await expect(bench).toHaveAttribute('data-run-step', 'done');
});

for (const width of [320, 390, 768, 1440]) {
  test(`four distinct service illustrations fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const artwork = ['.workbench__app', '.ai-scene__processor', '.web-scene__browser', '.integration-scene__hub'];
    for (let i = 1; i <= 4; i++) {
      if (i > 1) await page.locator(`#cap-trigger-${i}`).click();
      const scene = page.locator(`[data-scene="${i}"]`);
      await expect(scene).toBeVisible();
      await expect(page.locator('.service-scene:not([hidden])')).toHaveCount(1);
      await expect(page.locator(artwork[i - 1])).toBeVisible();
      await expect(page.locator('.workbench')).toHaveAttribute('data-run-step', 'done');
      const boxes = await scene.evaluate(el => [...el.querySelectorAll('.workbench__app, .ai-scene__processor, .ai-scene__answer, .web-scene__browser, .web-scene__phone, .integration-scene__node, .integration-scene__hub')].map(n => {
        const box = n.getBoundingClientRect();
        return { left: box.left, right: box.right };
      }));
      for (const box of boxes) {
        expect(box.left).toBeGreaterThanOrEqual(0);
        expect(box.right).toBeLessThanOrEqual(width);
      }
      const overlap = await page.evaluate(() => {
        const scene = document.querySelector('.workbench__scene').getBoundingClientRect();
        const copy = document.querySelector('.build-preview__copy').getBoundingClientRect();
        return scene.bottom > copy.top;
      });
      expect(overlap).toBe(false);
    }
  });
}

for (const viewport of [{ width: 1024, height: 768 }, { width: 1440, height: 900 }]) {
  test(`scroll changes services while the illustration stays sticky at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const preview = page.locator('.build-preview');
    const head = page.locator('.capabilities-layout__head');
    const positions = () => page.locator('.capability').evaluateAll(items => items.map(item => {
      const box = item.getBoundingClientRect();
      return { top: box.top + scrollY, height: box.height };
    }));
    for (const id of [1, 2, 3, 4, 3, 2, 1]) {
      await page.evaluate(id => {
        const header = document.querySelector('.header').getBoundingClientRect().bottom;
        const target = document.querySelector(`#cap-trigger-${id}`).getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: target - header - 16, behavior: 'instant' });
      }, id);
      await expect(page.locator(`#cap-trigger-${id}`)).toHaveAttribute('aria-expanded', 'true');
      await expect(preview).toHaveAttribute('data-preview', String(id));
      await expect(page.locator('.capability.is-open')).toHaveCount(id);
      await expect(page.locator('.capability.is-current')).toHaveCount(1);
      const box = await head.boundingBox();
      if (id < 4) expect(box.y).toBeCloseTo(108, 0);
      expect(box.y + box.height).toBeLessThan(viewport.height);
      const slack = await page.locator('.capability').evaluateAll(items => items.map(item => {
        const heading = item.querySelector('.capability__heading').getBoundingClientRect().height;
        const panel = item.querySelector('.capability__panel').getBoundingClientRect().height;
        return item.getBoundingClientRect().height - heading - panel;
      }));
      for (const gap of slack) expect(gap).toBeLessThan(4);
    }
    const firstHeight = (await positions())[0].height;
    await page.mouse.wheel(0, firstHeight);
    await expect(preview).toHaveAttribute('data-preview', '2');
    await page.mouse.wheel(0, -firstHeight);
    await expect(preview).toHaveAttribute('data-preview', '1');
  });
}

test('mobile preview stays compact and services remain manually selectable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#cap-trigger-2').click();
  await expect(page.locator('.build-preview')).toHaveAttribute('data-preview', '2');
  const box = await page.locator('.capabilities-layout__head').boundingBox();
  expect(box.height).toBeLessThan(640);
  await page.locator('#cap-trigger-4').scrollIntoViewIfNeeded();
  await expect(page.locator('.build-preview')).toHaveAttribute('data-preview', '2');
  await page.locator('#cap-trigger-4').click();
  await expect(page.locator('.build-preview')).toHaveAttribute('data-preview', '4');
});
