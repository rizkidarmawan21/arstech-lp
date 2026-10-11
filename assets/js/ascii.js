(function () {
  'use strict';

  var elements = Array.prototype.slice.call(document.querySelectorAll('[data-ascii-art]'));
  if (!elements.length) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var glyphs = ' .:=-+*#%@';
  var palette = Array.from({ length: 16 }, function (_, index) {
    return 'hsl(213, 94%, ' + (29 + index * 1.8) + '%)';
  });

  function makeModel(type) {
    var points = [];
    if (type === 'orbit') {
      for (var u = 0; u < 240; u++) {
        var a = u * Math.PI * 2 / 240;
        for (var v = 0; v < 84; v++) {
          var b = v * Math.PI * 2 / 84;
          var ring = 1.08 + .4 * Math.cos(b);
          points.push(ring * Math.cos(a), ring * Math.sin(a), .4 * Math.sin(b), Math.cos(b) * Math.cos(a), Math.cos(b) * Math.sin(a), Math.sin(b));
        }
      }
    } else {
      for (var layer = 0; layer < 3; layer++) {
        var y = (layer - 1) * .72;
        for (var i = 0; i <= 40; i++) {
          for (var j = 0; j <= 40; j++) {
            var x = i / 40 * 1.65 - .825;
            var z = j / 40 * 1.65 - .825;
            points.push(x, y - .13, z, 0, -1, 0, x, y + .13, z, 0, 1, 0);
          }
          for (var k = 0; k <= 8; k++) {
            var edgeY = y + k / 8 * .26 - .13;
            points.push(x, edgeY, -.825, 0, 0, -1, x, edgeY, .825, 0, 0, 1);
            points.push(-.825, edgeY, x, -1, 0, 0, .825, edgeY, x, 1, 0, 0);
          }
        }
      }
    }
    return new Float32Array(points);
  }

  function makeComponent(type) {
    var points = [];
    var thickness = type === 'ai' ? .22 : .18;
    var front = thickness / 2 + .015;
    function line(x1, y1, x2, y2, radius, centerZ, depth) {
      radius = radius || .035;
      centerZ = centerZ || 0;
      depth = depth === undefined ? thickness : depth;
      var length = Math.hypot(x2 - x1, y2 - y1);
      var steps = Math.ceil(length * 60);
      var nx = -(y2 - y1) / length, ny = (x2 - x1) / length;
      for (var i = 0; i <= steps; i++) {
        var x = x1 + (x2 - x1) * i / steps;
        var y = y1 + (y2 - y1) * i / steps;
        for (var j = 0; j <= 4; j++) {
          var r = (j / 4 * 2 - 1) * radius;
          points.push(x + nx * r, y + ny * r, centerZ + depth / 2, 0, 0, 1);
          points.push(x + nx * r, y + ny * r, centerZ - depth / 2, 0, 0, -1);
        }
        for (var k = 0; k <= 8; k++) {
          var z = centerZ + (k / 8 - .5) * depth;
          points.push(x + nx * radius, y + ny * radius, z, nx, ny, 0);
          points.push(x - nx * radius, y - ny * radius, z, -nx, -ny, 0);
        }
      }
      for (var end = 0; end < 2; end++) {
        var ex = end ? x2 : x1, ey = end ? y2 : y1;
        var direction = end ? 1 : -1;
        for (var u = 0; u <= 4; u++) {
          for (var v = 0; v <= 8; v++) {
            var edge = (u / 4 * 2 - 1) * radius;
            points.push(ex + nx * edge, ey + ny * edge, centerZ + (v / 8 - .5) * depth,
              (x2 - x1) / length * direction, (y2 - y1) / length * direction, 0);
          }
        }
      }
    }
    function rectangle(x, y, width, height, z, depth) {
      line(x, y, x + width, y, .035, z, depth);
      line(x + width, y, x + width, y + height, .035, z, depth);
      line(x + width, y + height, x, y + height, .035, z, depth);
      line(x, y + height, x, y, .035, z, depth);
    }
    if (type === 'web') {
      rectangle(-.44, -.32, .88, .64);
      line(-.44, -.17, .44, -.17, .025, front, .025);
      for (var dot = 0; dot < 3; dot++) line(-.33 + dot * .1, -.245, -.31 + dot * .1, -.245, .027, front, .025);
      rectangle(-.32, -.04, .25, .22, front, .025);
      line(.06, 0, .31, 0, .025, front, .025);
      line(.06, .13, .24, .13, .025, front, .025);
    } else if (type === 'ai') {
      rectangle(-.29, -.29, .58, .58);
      rectangle(-.13, -.13, .26, .26, .06, .16);
      for (var pin = 0; pin < 3; pin++) {
        var position = (pin - 1) * .18;
        line(position, -.29, position, -.44, .035, -.025, .09);
        line(position, .29, position, .44, .035, -.025, .09);
        line(-.29, position, -.44, position, .035, -.025, .09);
        line(.29, position, .44, position, .035, -.025, .09);
      }
    } else if (type === 'data') {
      for (var layer = 0; layer < 3; layer++) {
        var cy = (layer - 1) * .23;
        for (var u = 0; u < 112; u++) {
          var angle = u / 112 * Math.PI * 2;
          var ca = Math.cos(angle), sa = Math.sin(angle);
          for (var v = 0; v <= 20; v++) {
            var y = cy + (v / 20 - .5) * .19;
            points.push(.32 * ca, y, .32 * sa, ca, 0, sa);
            var r = v / 20 * .32;
            points.push(r * ca, cy - .095, r * sa, 0, -1, 0);
            points.push(r * ca, cy + .095, r * sa, 0, 1, 0);
          }
        }
      }
    } else {
      rectangle(-.23, -.42, .46, .84);
      line(-.07, -.31, .07, -.31, .025, front, .025);
      rectangle(-.15, -.2, .3, .35, front, .025);
      line(-.06, .3, .06, .3, .025, front, .025);
    }
    return new Float32Array(points);
  }

  function rotation(a, b, c) {
    var ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), cc = Math.cos(c), sc = Math.sin(c);
    return [cb * cc, sa * sb * cc - ca * sc, ca * sb * cc + sa * sc,
      cb * sc, sa * sb * sc + ca * cc, ca * sb * sc - sa * cc,
      -sb, sa * cb, ca * cb];
  }

  var components = [
    { type: 'web', spin: .19, pitch: -.2, yaw: .35, phase: -2.85, radius: 2.8, tilt: .65, turn: -.2, depth: -.4, drift: .11 },
    { type: 'ai', spin: .16, pitch: .12, yaw: .4, phase: -.65, radius: 2.1, tilt: -.55, turn: .3, depth: .55, drift: .13 },
    { type: 'data', spin: -.14, pitch: .12, yaw: .4, phase: .72, radius: 2.4, tilt: .48, turn: .4, depth: -.5, drift: .17 },
    { type: 'mobile', spin: .2, pitch: -.12, yaw: .2, phase: 2.15, radius: 2.45, tilt: -.42, turn: -.25, depth: .45, drift: .09 }
  ].map(function (component) {
    component.model = makeComponent(component.type);
    component.plane = rotation(component.tilt, component.turn, 0);
    return component;
  });

  var models = {};
  var scenes = elements.map(function (element) {
    var canvas = element.querySelector('canvas');
    var context = canvas.getContext('2d');
    if (!context) return null;
    var type = element.getAttribute('data-ascii-art');
    if (!models[type]) models[type] = makeModel(type);
    return { element: element, canvas: canvas, context: context, type: type, model: models[type], visible: false, width: 0, height: 0, columns: 0, rows: 0, lastDraw: 0, lastUpdate: 0, time: 0 };
  }).filter(Boolean);

  function draw(scene) {
    var width = scene.width;
    var height = scene.height;
    if (!width || !height) return;
    var cols = scene.columns;
    var rows = scene.rows;
    var depth = scene.depth;
    var light = scene.light;
    depth.fill(-Infinity);
    scene.ink.fill(0);
    scene.opacity.fill(1);
    var t = scene.time;
    var a = scene.type === 'orbit' ? .52 + Math.sin(t * .24) * .2 : -.5;
    var b = scene.type === 'orbit' ? -.35 + Math.sin(t * .18) * .5 : -.55 + Math.sin(t * .2) * .22;
    var c = scene.type === 'orbit' ? t * .12 - .2 : .05;
    var matrix = rotation(a, b, c);
    var scale = scene.type === 'orbit' ? .32 : .29;
    var camera = scene.type === 'orbit' ? 5.1 : 4.2;
    function project(x, y, z) {
      var x3 = matrix[0] * x + matrix[1] * y + matrix[2] * z;
      var y3 = matrix[3] * x + matrix[4] * y + matrix[5] * z;
      var z3 = matrix[6] * x + matrix[7] * y + matrix[8] * z;
      var perspective = 3.6 / (camera - z3);
      return [cols / 2 + x3 * perspective * cols * scale,
        rows / 2 + y3 * perspective * cols * scale / 1.75, z3];
    }
    function raster(model, size, local, offset, shift, opacity) {
      for (var i = 0; i < model.length; i += 6) {
        var x = model[i] * size, y = model[i + 1] * size, z = model[i + 2] * size;
        var nx = model[i + 3], ny = model[i + 4], nz = model[i + 5];
        if (local) {
          var lx = local[0] * x + local[1] * y + local[2] * z;
          var ly = local[3] * x + local[4] * y + local[5] * z;
          z = local[6] * x + local[7] * y + local[8] * z;
          x = lx; y = ly;
          var lnx = local[0] * nx + local[1] * ny + local[2] * nz;
          var lny = local[3] * nx + local[4] * ny + local[5] * nz;
          nz = local[6] * nx + local[7] * ny + local[8] * nz;
          nx = lnx; ny = lny;
        }
        if (offset) { x += offset[0]; y += offset[1]; z += offset[2]; }
        var point = project(x, y, z);
        var px = Math.floor(point[0] + (shift ? shift[0] : 0)), py = Math.floor(point[1] + (shift ? shift[1] : 0));
        if (px < 0 || px >= cols || py < 0 || py >= rows) continue;
        var index = py * cols + px;
        if (point[2] <= depth[index]) continue;
        depth[index] = point[2];
        scene.ink[index] = shift ? 1 : 0;
        scene.opacity[index] = opacity === undefined ? 1 : opacity;
        var nx3 = matrix[0] * nx + matrix[1] * ny + matrix[2] * nz;
        var ny3 = matrix[3] * nx + matrix[4] * ny + matrix[5] * nz;
        var nz3 = matrix[6] * nx + matrix[7] * ny + matrix[8] * nz;
        light[index] = Math.min(1, .2 + .8 * Math.max(0, -nx3 * .35 - ny3 * .45 + nz3 * .82));
      }
    }
    raster(scene.model, scene.type === 'orbit' ? 1.16 : 1);
    if (scene.type === 'orbit') {
      components.forEach(function (component) {
        var angle = component.phase + t * .16 + .12 * Math.sin(t * component.drift + component.phase);
        var x = component.radius * Math.cos(angle);
        var y = component.radius * Math.sin(angle);
        var plane = component.plane;
        var offset = [plane[0] * x + plane[1] * y, plane[3] * x + plane[4] * y,
          plane[6] * x + plane[7] * y + component.depth];
        var local = rotation(component.pitch + .18 * Math.sin(t * .23 + component.phase),
          component.yaw + .6 * Math.sin(t * component.spin + component.phase), .1 * Math.sin(angle));
        var center = project(offset[0], offset[1], offset[2]);
        var distanceScale = (camera - center[2]) / camera;
        var dx = (center[0] - cols / 2) * distanceScale;
        var dy = (center[1] - rows / 2) * distanceScale;
        var radius = Math.hypot(dx / cols, dy / rows);
        var iconScale = .7;
        var iconRadius = .55 * iconScale * 3.6 / (camera - center[2]) * scale;
        var availableRadius = .49 - iconRadius;
        var fit = Math.pow(1 + Math.pow(radius / availableRadius, 8), -1 / 8);
        var shift = [cols / 2 + dx * fit - center[0], rows / 2 + dy * fit - center[1]];
        var opacity = Math.max(.52, Math.min(1, .78 + center[2] * .16));
        raster(component.model, iconScale, local, offset, shift, opacity);
      });
    }
    var ctx = scene.context;
    var cellWidth = width / cols;
    var cellHeight = height / rows;
    ctx.clearRect(0, 0, width, height);
    ctx.font = (cellWidth / .62).toFixed(2) + 'px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        var cell = row * cols + col;
        if (depth[cell] === -Infinity) continue;
        var shade = light[cell];
        ctx.globalAlpha = scene.opacity[cell];
        ctx.fillStyle = palette[Math.floor(shade * (scene.ink[cell] ? 8 : 15))];
        ctx.fillText(glyphs[Math.max(1, Math.floor(shade * (glyphs.length - 1)))], (col + .5) * cellWidth, (row + .5) * cellHeight);
      }
    }
    ctx.globalAlpha = 1;
    scene.element.classList.add('is-rendered');
  }

  function resize(scene) {
    var bounds = scene.element.getBoundingClientRect();
    scene.width = bounds.width;
    scene.height = bounds.height;
    scene.columns = scene.type === 'orbit'
      ? Math.max(96, Math.min(160, Math.floor(bounds.width / 3.5)))
      : Math.max(48, Math.min(104, Math.floor(bounds.width / 6)));
    scene.rows = Math.max(18, Math.round(scene.columns * bounds.height / bounds.width / 1.75));
    scene.depth = new Float32Array(scene.columns * scene.rows);
    scene.light = new Float32Array(scene.columns * scene.rows);
    scene.ink = new Uint8Array(scene.columns * scene.rows);
    scene.opacity = new Float32Array(scene.columns * scene.rows);
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    scene.canvas.width = Math.round(bounds.width * ratio);
    scene.canvas.height = Math.round(bounds.height * ratio);
    scene.context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw(scene);
  }

  var frame = 0;
  function tick(now) {
    frame = 0;
    if (motion.matches || document.hidden) return;
    var running = false;
    scenes.forEach(function (scene) {
      if (!scene.visible) return;
      running = true;
      var interval = 1000 / 30;
      var elapsed = now - scene.lastDraw;
      if (elapsed < interval - .5) return;
      scene.time += Math.min(now - scene.lastUpdate, 100) / 1000;
      scene.lastUpdate = now;
      scene.lastDraw += Math.max(1, Math.floor((elapsed + .5) / interval)) * interval;
      draw(scene);
    });
    if (running) frame = window.requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    if (motion.matches || document.hidden) return;
    if (scenes.some(function (scene) { return scene.visible; })) frame = window.requestAnimationFrame(tick);
  }

  scenes.forEach(function (scene) {
    resize(scene);
    if ('ResizeObserver' in window) new ResizeObserver(function () { resize(scene); }).observe(scene.element);
    else window.addEventListener('resize', function () { resize(scene); });
  });
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var scene = scenes.find(function (candidate) { return candidate.element === entry.target; });
        if (entry.isIntersecting && !scene.visible) {
          scene.lastDraw = performance.now();
          scene.lastUpdate = scene.lastDraw;
        }
        scene.visible = entry.isIntersecting;
      });
      sync();
    }, { threshold: 0 });
    scenes.forEach(function (scene) { observer.observe(scene.element); });
  } else {
    scenes.forEach(function (scene) { scene.visible = true; });
    sync();
  }
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
})();
