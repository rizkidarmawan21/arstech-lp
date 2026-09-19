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
      if (!id || id.charAt(0) !== '#') return;
      var section = document.querySelector(id);
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

    triggers.forEach(function (trigger) {
      var panelId = trigger.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      var item = trigger.closest('.capability');
      if (!panel || !item) return;

      // Sync the initial state from the markup
      var open = trigger.getAttribute('aria-expanded') === 'true';
      item.classList.toggle('is-open', open);

      trigger.addEventListener('click', function () {
        var next = trigger.getAttribute('aria-expanded') !== 'true';
        trigger.setAttribute('aria-expanded', next ? 'true' : 'false');
        item.classList.toggle('is-open', next);
      });
    });
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
        if (node.classList.contains('is-active')) reset(); else activate(node);
      });
    });

    root.addEventListener('mouseleave', reset);
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
          'We opened your email client with the details filled in. Send it and we will reply within one business day.');
        window.location.href = href;
        form.reset();
        if (submit) {
          submit.disabled = false;
          var s = submit.querySelector('.btn__spinner');
          if (s) s.remove();
        }
      }, reduceMotion ? 0 : 220);
    });
  })();

})();
