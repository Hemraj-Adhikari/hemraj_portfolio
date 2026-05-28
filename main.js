/**
 * Hemraj Adhikari Portfolio — main.js
 * Extracted from inline script for improved CSP compliance and caching.
 * Version: 2.0
 */

(function () {
  'use strict';

  // ── Mobile navigation ────────────────────────────────────────
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var firstMobileLink = mobileNav ? mobileNav.querySelector('a') : null;

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      // Move focus into menu when opened for keyboard users
      if (isOpen && firstMobileLink) {
        firstMobileLink.focus();
      }
    });

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // ── Smooth scroll: respect prefers-reduced-motion ───────────
  // We removed scroll-behavior from CSS; handle it here conditionally.
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (prefersReduced) {
        target.scrollIntoView();
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Reveal on scroll (IntersectionObserver) ──────────────────
  if ('IntersectionObserver' in window && !prefersReduced) {
    var reveals = document.querySelectorAll('.reveal');
    var staggerDelays = new WeakMap(); // track per-element delay

    // Assign stagger indices in DOM order once
    reveals.forEach(function (el, domIdx) {
      staggerDelays.set(el, domIdx);
    });

    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // Clamp delay: max 300ms so bottom-of-page elements don't wait forever
          var delay = Math.min(staggerDelays.get(el) * 55, 300);
          setTimeout(function () {
            el.classList.add('visible');
          }, delay);
          revealObs.unobserve(el);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    // Reduced motion or no IntersectionObserver: show immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Active nav link highlight on scroll ──────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a');
  var ticking = false;

  function updateActiveLink() {
    var scrollY = window.scrollY;
    var current = '';
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - 130) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (a) {
      var isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', isActive);
      a.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateActiveLink);
      ticking = true;
    }
  }, { passive: true });

  // ── Contact form: validation + async submit ──────────────────
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formMsg = document.getElementById('formMsg');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showMsg(text, type) {
    formMsg.textContent = text;
    formMsg.className = 'form-msg ' + type;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset state
      formMsg.className = 'form-msg';
      formMsg.textContent = '';

      var nameVal = form.elements['name'].value.trim();
      var emailVal = form.elements['email'].value.trim();
      var messageVal = form.elements['message'].value.trim();

      // Client-side validation
      if (!nameVal || nameVal.length < 2) {
        showMsg('Please enter your full name (at least 2 characters).', 'error');
        form.elements['name'].focus();
        return;
      }
      if (!emailRe.test(emailVal)) {
        showMsg('Please enter a valid email address.', 'error');
        form.elements['email'].focus();
        return;
      }
      if (!messageVal || messageVal.length < 10) {
        showMsg('Please write a message (at least 10 characters).', 'error');
        form.elements['message'].focus();
        return;
      }

      // UI: loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            showMsg("Message sent! I'll get back to you within 24 hours.", 'success');
          } else {
            return res.json().then(function (data) {
              throw new Error(data.error || 'Server error');
            });
          }
        })
        .catch(function () {
          showMsg('Something went wrong. Please email me directly at hemrajhadhikari@gmail.com', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message →';
        });
    });
  }

  // ── Back to top button ───────────────────────────────────────
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      if (prefersReduced) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

})();
