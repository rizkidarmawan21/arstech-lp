const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('all orbiting icons have volume and front, back, and side surfaces', () => {
  const context = { setTransform() {}, clearRect() {}, fillText() {} };
  const element = {
    getAttribute() { return 'orbit'; },
    querySelector() { return { getContext() { return context; } }; },
    getBoundingClientRect() { return { width: 320, height: 320 }; },
    classList: { add() {} },
  };
  const sandbox = {
    document: { querySelectorAll() { return [element]; }, addEventListener() {} },
    window: {
      matchMedia() { return { matches: true, addEventListener() {} }; },
      devicePixelRatio: 1,
      addEventListener() {},
    },
  };
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/ascii.js'), 'utf8');
  const closing = source.lastIndexOf('})();');
  vm.runInNewContext(source.slice(0, closing) +
    'globalThis.iconGeometry = components;\n' + source.slice(closing), sandbox);

  expect(Array.from(sandbox.iconGeometry, icon => icon.type)).toEqual(['web', 'ai', 'data', 'mobile']);
  for (const icon of sandbox.iconGeometry) {
    const bounds = [[Infinity, -Infinity], [Infinity, -Infinity], [Infinity, -Infinity]];
    const directions = Array.from({ length: 3 }, () => new Set());
    for (let i = 0; i < icon.model.length; i += 6) {
      for (let axis = 0; axis < 3; axis++) {
        bounds[axis][0] = Math.min(bounds[axis][0], icon.model[i + axis]);
        bounds[axis][1] = Math.max(bounds[axis][1], icon.model[i + axis]);
        const normal = icon.model[i + 3 + axis];
        if (Math.abs(normal) > .5) directions[axis].add(Math.sign(normal));
      }
    }
    expect(bounds[2][1] - bounds[2][0], `${icon.type} thickness`).toBeGreaterThan(.15);
    for (const directionsOnAxis of directions) {
      expect(directionsOnAxis.has(-1), `${icon.type} negative face`).toBe(true);
      expect(directionsOnAxis.has(1), `${icon.type} positive face`).toBe(true);
    }
  }
});
