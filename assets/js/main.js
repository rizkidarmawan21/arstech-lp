/* ==========================================================================
   Arstech website interactions
   Plain ES2015+, no dependencies. Everything here has a working fallback:
   the page is fully readable with JavaScript disabled.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Header: solid surface once the page has scrolled
     --------------------------------------------------------------------- */
  (function header() {
    var el = document.getElementById('site-header');
    if (!el) return;

    var ticking = false;
    function update() {
      el.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  })();

  /* ---------------------------------------------------------------------
     Mobile menu: toggle, Escape, outside click, focus handling
     --------------------------------------------------------------------- */
  (function mobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    function open() {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
      var first = menu.querySelector('a');
      if (first) first.focus();
    }

    function close(returnFocus) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
      if (returnFocus) toggle.focus();
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
      if (isOpen()) close(true); else open();
    });

    // Close when a link inside the drawer is used
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) close(false);
    });

    // Close on Escape, return focus to the toggle
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) close(true);
      if (event.key === 'Tab' && isOpen()) {
        var controls = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll('a, button')));
        var first = controls[0];
        var last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });

    // Close on a click outside the drawer and the toggle
    document.addEventListener('click', function (event) {
      if (!isOpen()) return;
      if (menu.contains(event.target) || toggle.contains(event.target)) return;
      close(false);
    });

    // Reset state if the viewport grows past the mobile breakpoint
    var wide = window.matchMedia('(min-width: 900px)');
    function onWide(event) {
      if (event.matches && isOpen()) close(false);
    }
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  })();

  /* ---------------------------------------------------------------------
     Scroll reveal: one reveal per element, never re-triggered
     --------------------------------------------------------------------- */
  (function reveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ---------------------------------------------------------------------
     Scrollspy: mark the nav link for the section in view
     --------------------------------------------------------------------- */
  (function scrollspy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href');
      if (!id) return;
      var target = new URL(id, window.location.href);
      if (target.pathname !== window.location.pathname && !(target.pathname.endsWith('/index.html') && window.location.pathname.endsWith('/'))) return;
      if (!target.hash) return;
      var section = document.querySelector(target.hash);
      if (!section) return;
      map[section.id] = link;
      sections.push(section);
    });
    if (!sections.length) return;

    var visible = {};

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      // The first section in document order that is currently crossing the middle
      for (var i = 0; i < sections.length; i++) {
        var id = sections[i].id;
        if (visible[id]) {
          links.forEach(function (l) {
            var on = l === map[id];
            l.classList.toggle('is-active', on);
            if (on) l.setAttribute('aria-current', 'true');
            else l.removeAttribute('aria-current');
          });
          return;
        }
      }
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  })();

  /* ---------------------------------------------------------------------
     Capability index: accessible accordion
     --------------------------------------------------------------------- */
  (function capabilities() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll('.capability__trigger'));
    if (!triggers.length) return;

    var examples = {
      'cap-panel-1': { source: 'Incoming request', input: 'A brief from your team', app: 'Operations workspace', view: 'Team requests', rows: ['Collect the brief', 'Assign an owner', 'Review the next step'], result: 'Ready for your team', title: 'Your operation. One workspace.', text: 'Requests, owners, and decisions in one shared workspace.', cta: 'Discuss custom software', type: 'Custom software' },
      'cap-panel-2': { source: 'Company knowledge', input: 'Documents with context', app: 'AI-assisted workspace', view: 'A request, prepared for review', rows: ['Find relevant context', 'Prepare a useful draft', 'Hand over to a person'], result: 'Ready for human review', title: 'Less repetition. More attention.', text: 'Company knowledge becomes useful drafts. Your team stays in control.', cta: 'Discuss AI systems', type: 'AI system' },
      'cap-panel-3': { source: 'Customer enquiry', input: 'A visitor takes the next step', app: 'Customer portal', view: 'From interest to a conversation', rows: ['Explain the offer', 'Capture the enquiry', 'Route the conversation'], result: 'A clear next step', title: 'A better first impression.', text: 'A clear offer, a useful experience, and an easy next step.', cta: 'Discuss a web platform', type: 'Web platform' },
      'cap-panel-4': { source: 'An update in your tools', input: 'One record changes', app: 'Connected operations', view: 'One update, the right destinations', rows: ['Receive the event', 'Match the right record', 'Sync and log the result'], result: 'Your tools, connected', title: 'Your tools. Working together.', text: 'One update reaches the right tools, with every handoff logged.', cta: 'Discuss integration', type: 'Integration or automation' }
    };
    var preview = document.querySelector('.build-preview');
    var previewCta = document.getElementById('preview-cta');
    var workbench = document.querySelector('.workbench');
    var currentType = 'Custom software';
    var timers = [];
    var previewVisible = false;
    var previewMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function stopPreview() {
      timers.forEach(window.clearTimeout);
      timers = [];
      if (workbench) workbench.setAttribute('data-run-step', previewMotion.matches ? 'done' : 'idle');
    }

    function runPreview() {
      if (!workbench) return;
      stopPreview();
      if (previewMotion.matches || !previewVisible || document.hidden) return;
      workbench.setAttribute('data-run-step', '1');
      ['2', '3', 'done'].forEach(function (state, index) {
        timers.push(window.setTimeout(function () {
          workbench.setAttribute('data-run-step', state);
        }, (index + 1) * 800));
      });
      timers.push(window.setTimeout(runPreview, 4800));
    }
    if (workbench) {
      stopPreview();
      if ('IntersectionObserver' in window) {
        var demoObserver = new IntersectionObserver(function (entries) {
          previewVisible = entries.some(function (entry) { return entry.isIntersecting; });
          if (previewVisible) runPreview(); else stopPreview();
        }, { threshold: 0, rootMargin: '-10% 0px -10% 0px' });
        demoObserver.observe(workbench);
      } else {
        previewVisible = true;
        runPreview();
      }
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopPreview(); else runPreview();
      });
      previewMotion.addEventListener('change', runPreview);
    }

    function updatePreview(id) {
      var example = examples[id];
      if (!example || !preview) return;
      currentType = example.type;
      stopPreview();
      ['source', 'input', 'app', 'view', 'result', 'title', 'text'].forEach(function (field) {
        var el = document.getElementById('preview-' + field);
        if (el) el.textContent = example[field];
      });
      example.rows.forEach(function (row, index) { document.getElementById('preview-row-' + (index + 1)).textContent = row; });
      previewCta.firstChild.textContent = example.cta + ' ';
      var sceneId = id.replace('cap-panel-', '');
      preview.setAttribute('data-preview', sceneId);
      preview.querySelectorAll('[data-scene]').forEach(function (scene) {
        scene.hidden = scene.getAttribute('data-scene') !== sceneId;
      });
      preview.classList.remove('is-changing');
      window.requestAnimationFrame(function () { preview.classList.add('is-changing'); });
      runPreview();
    }

    if (previewCta) previewCta.addEventListener('click', function () {
      var type = document.getElementById('cf-type');
      if (type) type.value = currentType;
    });

    function openCapability(trigger) {
      var activeIndex = triggers.indexOf(trigger);
      triggers.forEach(function (other, index) {
        var open = scrollLayout.matches ? index <= activeIndex : other === trigger;
        other.setAttribute('aria-expanded', open ? 'true' : 'false');
        other.closest('.capability').classList.toggle('is-open', open);
        other.closest('.capability').classList.toggle('is-current', other === trigger);
        document.getElementById(other.getAttribute('aria-controls')).inert = !open;
      });
      var panelId = trigger.getAttribute('aria-controls');
      if (preview && preview.getAttribute('data-preview') !== panelId.replace('cap-panel-', '')) {
        updatePreview(panelId);
      }
    }

    triggers.forEach(function (trigger) {
      var panelId = trigger.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      var item = trigger.closest('.capability');
      if (!panel || !item) return;

      // Sync the initial state from the markup
      var open = trigger.getAttribute('aria-expanded') === 'true';
      item.classList.toggle('is-open', open);
      item.classList.toggle('is-current', open);
      panel.inert = !open;

      trigger.addEventListener('click', function () {
        var next = scrollLayout.matches || trigger.getAttribute('aria-expanded') !== 'true';
        if (next) {
          openCapability(trigger);
          if (scrollLayout.matches) {
            var header = document.querySelector('.header');
            var headerBottom = header ? header.getBoundingClientRect().bottom : 88;
            window.scrollTo({ top: trigger.getBoundingClientRect().top + window.scrollY - headerBottom - 20, behavior: 'instant' });
          }
        } else {
          trigger.setAttribute('aria-expanded', 'false');
          item.classList.remove('is-open');
          panel.inert = true;
        }
      });
    });

    var serviceList = document.querySelector('.capabilities');
    var scrollLayout = window.matchMedia('(min-width: 900px)');
    var scrollFrame = 0;
    serviceList.classList.add('is-scroll-driven');

    function syncCapabilityToScroll() {
      scrollFrame = 0;
      if (!scrollLayout.matches) return;
      var listBounds = serviceList.getBoundingClientRect();
      var header = document.querySelector('.header');
      var headerBottom = header ? header.getBoundingClientRect().bottom : 88;
      var activationLine = headerBottom + (window.innerHeight - headerBottom) * .35;
      if (listBounds.top > activationLine || listBounds.bottom < headerBottom) return;
      var currentIndex = Number(preview.getAttribute('data-preview')) - 1;
      var active = triggers[currentIndex];
      if (active.getBoundingClientRect().top > activationLine) {
        active = triggers[0];
        triggers.slice(0, currentIndex).forEach(function (trigger) {
          if (trigger.getBoundingClientRect().top <= activationLine) active = trigger;
        });
      } else if (triggers[currentIndex + 1] && triggers[currentIndex + 1].getBoundingClientRect().top <= activationLine) {
        active = triggers[currentIndex + 1];
      }
      if (preview.getAttribute('data-preview') !== active.getAttribute('aria-controls').replace('cap-panel-', '') || active.getAttribute('aria-expanded') !== 'true') {
        var top = active.getBoundingClientRect().top;
        openCapability(active);
        var offset = active.getBoundingClientRect().top - top;
        if (Math.abs(offset) > 1) window.scrollBy({ top: offset, behavior: 'instant' });
        queueScrollSync();
      }
    }

    function queueScrollSync() {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(syncCapabilityToScroll);
    }

    window.addEventListener('scroll', queueScrollSync, { passive: true });
    window.addEventListener('resize', queueScrollSync);
    scrollLayout.addEventListener('change', function () {
      var current = triggers.find(function (trigger) {
        return trigger.getAttribute('aria-controls') === 'cap-panel-' + preview.getAttribute('data-preview');
      });
      if (current) openCapability(current);
      queueScrollSync();
    });
    queueScrollSync();
  })();

  /* ---------------------------------------------------------------------
     System diagram
     1. Assembly: runs once, the first time the diagram is in view.
     2. Interaction: hover, focus, or tap a node to highlight its connection.
     --------------------------------------------------------------------- */
  (function diagram() {
    var root = document.getElementById('diagram');
    var caption = document.getElementById('diagram-caption');
    if (!root) return;

    var nodes = Array.prototype.slice.call(root.querySelectorAll('.diagram__node'));
    // Both layers respond together: the static rail and the animated flow
    var links = Array.prototype.slice.call(
      root.querySelectorAll('.diagram__link, .diagram__flow')
    );
    if (!nodes.length) return;

    var defaultCaption = caption ? caption.textContent.trim() : '';
    var selected = null;
    nodes.forEach(function (node) { node.setAttribute('aria-pressed', 'false'); });

    // Assembly. Without it the CSS holds the nodes hidden, so this must always
    // run: immediately when motion is reduced or the observer is unavailable.
    var assembled = false;
    function assemble() {
      if (assembled) return;
      assembled = true;
      root.classList.add('is-assembled');
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      assemble();
    } else {
      // threshold 0, not a fraction: on a 375px-wide phone only the top of the
      // diagram is on screen at load, so a fractional threshold would leave the
      // hero empty until the reader scrolled.
      var assembly = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          assemble();
          assembly.disconnect();
        });
      }, { threshold: 0 });
      assembly.observe(root);
      // Safety net. The nodes are hidden until this runs, so a callback that
      // never arrives would leave the diagram permanently blank.
      window.setTimeout(assemble, 3000);
    }

    function activate(node) {
      var key = node.getAttribute('data-node');
      nodes.forEach(function (n) {
        n.classList.toggle('is-active', n === node);
        n.classList.toggle('is-dim', n !== node);
      });
      links.forEach(function (l) {
        var on = l.getAttribute('data-link') === key;
        l.classList.toggle('is-active', on);
        l.classList.toggle('is-dim', !on);
      });
      if (caption) {
        var desc = node.getAttribute('data-desc');
        if (desc) caption.textContent = desc;
      }
    }

    function reset() {
      if (selected) { activate(selected); return; }
      nodes.forEach(function (n) { n.classList.remove('is-active', 'is-dim'); });
      links.forEach(function (l) { l.classList.remove('is-active', 'is-dim'); });
      if (caption) caption.textContent = defaultCaption;
    }

    nodes.forEach(function (node) {
      node.addEventListener('mouseenter', function () { activate(node); });
      node.addEventListener('focus', function () { activate(node); });
      node.addEventListener('mouseleave', reset);
      node.addEventListener('blur', reset);
      // Touch and click also toggle the highlight
      node.addEventListener('click', function () {
        selected = selected === node ? null : node;
        nodes.forEach(function (n) { n.setAttribute('aria-pressed', n === selected ? 'true' : 'false'); });
        if (selected) activate(selected); else reset();
      });
    });

    root.addEventListener('mouseleave', reset);
  })();

  (function spatialMotion() {
    var visual = document.querySelector('.hero__visual');
    var hub = document.querySelector('.diagram__hub');
    if (!visual || !hub || reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    var frame = null;
    visual.addEventListener('pointermove', function (event) {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(function () {
        var bounds = visual.getBoundingClientRect();
        var x = (event.clientX - bounds.left) / bounds.width - 0.5;
        var y = (event.clientY - bounds.top) / bounds.height - 0.5;
        hub.style.setProperty('--tilt-x', (-y * 20).toFixed(2) + 'deg');
        hub.style.setProperty('--tilt-y', (x * 24).toFixed(2) + 'deg');
        frame = null;
      });
    });
    visual.addEventListener('pointerleave', function () {
      if (frame) window.cancelAnimationFrame(frame);
      frame = null;
      hub.style.setProperty('--tilt-x', '0deg');
      hub.style.setProperty('--tilt-y', '0deg');
    });
  })();

  /* ---------------------------------------------------------------------
     Contact form: validation, feedback, mailto submission
     --------------------------------------------------------------------- */
  (function contactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = document.getElementById('cf-status');
    var submit = document.getElementById('cf-submit');
    var submitLabel = submit ? submit.querySelector('.btn__label') : null;
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var rules = [
      { id: 'cf-name', message: 'Enter your name.' },
      { id: 'cf-email', message: 'Enter your email address.', test: function (v) { return EMAIL.test(v); },
        invalid: 'Enter a valid email address, for example name@company.com.' },
      { id: 'cf-message', message: 'Tell us what you need to build.',
        invalid: 'A sentence or two is enough to get started.', test: function (v) { return v.length >= 12; } },
      { id: 'cf-consent', message: 'Please agree to be contacted so we can reply.', checkbox: true }
    ];

    function fieldOf(input) { return input.closest('.field'); }

    function setError(input, message) {
      var field = fieldOf(input);
      if (!field) return;
      var error = field.querySelector('.field__error');
      field.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (error) { error.textContent = message; error.hidden = false; }
    }

    function clearError(input) {
      var field = fieldOf(input);
      if (!field) return;
      var error = field.querySelector('.field__error');
      field.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      if (error) { error.textContent = ''; error.hidden = true; }
    }

    function validate(input, rule) {
      var value = (input.value || '').trim();
      if (rule.checkbox) {
        if (!input.checked) { setError(input, rule.message); return false; }
        clearError(input);
        return true;
      }
      if (!value) { setError(input, rule.message); return false; }
      if (rule.test && !rule.test(value)) { setError(input, rule.invalid || rule.message); return false; }
      clearError(input);
      return true;
    }

    function showStatus(kind, title, body) {
      if (!status) return;
      status.className = 'form-status field--full form-status--' + kind;
      status.innerHTML = '';
      var heading = document.createElement('p');
      heading.className = 'form-status__title';
      heading.textContent = title;
      var text = document.createElement('p');
      text.textContent = body;
      status.appendChild(heading);
      status.appendChild(text);
      status.hidden = false;
    }

    // Live-clear an error as soon as the user fixes the field
    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      if (!input) return;
      var eventName = rule.checkbox ? 'change' : 'input';
      input.addEventListener(eventName, function () {
        if (fieldOf(input) && fieldOf(input).classList.contains('is-invalid')) {
          validate(input, rule);
        }
      });
      input.addEventListener('blur', function () {
        if (rule.checkbox) return;
        if ((input.value || '').trim()) validate(input, rule);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;
      rules.forEach(function (rule) {
        var input = document.getElementById(rule.id);
        if (!input) return;
        if (!validate(input, rule) && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        showStatus('error', 'Check the highlighted fields',
          'A few details are missing or need a fix before this can send.');
        firstInvalid.focus();
        return;
      }

      // Build the mailto payload
      var name = (document.getElementById('cf-name').value || '').trim();
      var email = (document.getElementById('cf-email').value || '').trim();
      var company = (document.getElementById('cf-company').value || '').trim();
      var type = document.getElementById('cf-type').value;
      var message = (document.getElementById('cf-message').value || '').trim();

      var bodyLines = [
        'Name: ' + name,
        'Email: ' + email,
        company ? 'Company: ' + company : null,
        'Project type: ' + type,
        '',
        message
      ].filter(Boolean).join('\n');

      var href = 'mailto:info@arstech.my.id'
        + '?subject=' + encodeURIComponent('Project enquiry: ' + type)
        + '&body=' + encodeURIComponent(bodyLines);

      if (submit) {
        submit.disabled = true;
        if (submitLabel) {
          var spinner = document.createElement('span');
          spinner.className = 'btn__spinner';
          spinner.setAttribute('aria-hidden', 'true');
          submit.insertBefore(spinner, submitLabel);
        }
      }

      // Give the success state a moment to be seen, then hand off to the mail client
      window.setTimeout(function () {
        showStatus('success', 'Your brief is ready to send',
          'Your email app should open with the details filled in. Review and send the message there. If it did not open, use the link below.');
        window.location.href = href;
        var draft = document.createElement('a');
        draft.href = href;
        draft.textContent = 'Open email draft';
        draft.className = 'email-draft';
        status.appendChild(draft);
        if (submit) {
          submit.disabled = false;
          var s = submit.querySelector('.btn__spinner');
          if (s) s.remove();
        }
      }, reduceMotion ? 0 : 220);
    });
  })();

})();
