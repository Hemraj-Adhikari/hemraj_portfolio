/**
 * Hemraj Adhikari Portfolio — main.js v3.1
 * Fixed: progress bar ID, back-to-top ID, nav selector,
 *        body scroll lock on mobile nav, exp accordion
 */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────
     CURSOR GLOW
  ───────────────────────────────── */
  var cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    }, { passive: true });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ─────────────────────────────────
     THEME TOGGLE
  ───────────────────────────────── */
  var themeToggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  var savedTheme = localStorage.getItem('ha-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ha-theme', next);
    });
  }

  /* ─────────────────────────────────
     SCROLL PROGRESS BAR
     HTML id="progress" (was "progressBar")
  ───────────────────────────────── */
  var progressBar = document.getElementById('progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  /* ─────────────────────────────────
     MOBILE NAVIGATION
  ───────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (isOpen) {
        var first = mobileNav.querySelector('a');
        if (first) first.focus();
      }
    });

    // Close when a link is tapped
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on outside tap
    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
        navToggle.focus();
      }
    });
  }

  /* ─────────────────────────────────
     ACTIVE NAV LINK
     Fixed selector: .nav-links a (was .nav__links a)
  ───────────────────────────────── */
  var sections  = document.querySelectorAll('section[id]');
  var navLinks  = document.querySelectorAll('.nav-links a');
  var ticking   = false;

  function updateActiveLink() {
    var scrollY  = window.scrollY;
    var current  = '';
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(function (a) {
      var href    = a.getAttribute('href') || '';
      var isActive = href === '#' + current || href.endsWith('/' + current + '.html');
      a.classList.toggle('active', isActive);
      a.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(updateActiveLink); ticking = true; }
  }, { passive: true });

  /* ─────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (prefersReduced) { target.scrollIntoView(); }
      else { target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ─────────────────────────────────
     TYPING EFFECT
  ───────────────────────────────── */
  var typedEl = document.getElementById('typedText');
  var phrases = [
    'IT Officer',
    'Cloud Infrastructure Specialist',
    'AWS & Linux SysAdmin',
    'SaaS & CRM Administrator',
    'Cybersecurity Specialist',
    'Nepal IT Mentor',
    'Freelance IT Consultant'
  ];

  if (typedEl && !prefersReduced) {
    var pIdx = 0, cIdx = 0, deleting = false;
    function typeLoop() {
      var phrase = phrases[pIdx];
      typedEl.textContent = deleting ? phrase.slice(0, cIdx - 1) : phrase.slice(0, cIdx + 1);
      if (!deleting) cIdx++; else cIdx--;
      if (!deleting && cIdx > phrase.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
      setTimeout(typeLoop, deleting ? 45 : 75);
    }
    setTimeout(typeLoop, 1000);
  } else if (typedEl) {
    typedEl.textContent = phrases[0];
  }

  /* ─────────────────────────────────
     REVEAL ON SCROLL
  ───────────────────────────────── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var reveals   = document.querySelectorAll('.reveal');
    var delayMap  = new WeakMap();
    reveals.forEach(function (el, i) { delayMap.set(el, i); });

    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = Math.min((delayMap.get(entry.target) % 6) * 70, 300);
        setTimeout(function () { entry.target.classList.add('visible'); }, delay);
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  /* ─────────────────────────────────
     ANIMATED COUNTERS
  ───────────────────────────────── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el      = entry.target;
        var target  = parseInt(el.getAttribute('data-count'), 10);
        var duration = 1600, startTime = null;
        function animCount(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          el.textContent = Math.round((1 - Math.pow(1 - progress, 3)) * target);
          if (progress < 1) requestAnimationFrame(animCount);
        }
        requestAnimationFrame(animCount);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function (el) { countObs.observe(el); });
  }

  /* ─────────────────────────────────
     SKILL BARS ANIMATION
  ───────────────────────────────── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var skillObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.width = el.getAttribute('data-width') + '%';
        skillObs.unobserve(el);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skill-bar__fill').forEach(function (el) { skillObs.observe(el); });
  } else {
    document.querySelectorAll('.skill-bar__fill').forEach(function (el) {
      el.style.width = el.getAttribute('data-width') + '%';
    });
  }

  /* ─────────────────────────────────
     EXPERIENCE ACCORDION
  ───────────────────────────────── */
  window.toggleExp = function (id) {
    var card = document.getElementById(id);
    if (!card) return;
    var isOpen = card.classList.contains('open');
    // Close all
    document.querySelectorAll('.exp-card.open').forEach(function (c) {
      c.classList.remove('open');
      var btn = c.querySelector('.exp-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      card.classList.add('open');
      var btn = card.querySelector('.exp-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ─────────────────────────────────
     FAQ ACCORDION
  ───────────────────────────────── */
  window.toggleFaq = function (btn) {
    var item   = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (el) {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ─────────────────────────────────
     PORTFOLIO FILTER
  ───────────────────────────────── */
  var filterBtns    = document.querySelectorAll('.filter-btn[data-filter]');
  var projectCards  = document.querySelectorAll('.project-card[data-category]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      projectCards.forEach(function (card) {
        var cats = card.getAttribute('data-category') || '';
        card.classList.toggle('hidden', filter !== 'all' && !cats.includes(filter));
      });
    });
  });

  /* ─────────────────────────────────
     BLOG FILTER
  ───────────────────────────────── */
  var blogFilterBtns = document.querySelectorAll('.filter-btn[data-blog-filter]');
  var blogCards      = document.querySelectorAll('.blog-card[data-blog-category]');
  blogFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      blogFilterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-blog-filter');
      blogCards.forEach(function (card) {
        var cats = card.getAttribute('data-blog-category') || '';
        card.classList.toggle('hidden', filter !== 'all' && !cats.includes(filter));
      });
    });
  });

  /* ─────────────────────────────────
     CONTACT FORM
  ───────────────────────────────── */
  var form      = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formMsg   = document.getElementById('formMsg');
  var emailRe   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showMsg(text, type) {
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.className = 'form-msg ' + type;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (formMsg) { formMsg.className = 'form-msg'; formMsg.textContent = ''; }
      var nameVal    = (form.elements['name']    && form.elements['name'].value.trim())    || '';
      var emailVal   = (form.elements['email']   && form.elements['email'].value.trim())   || '';
      var messageVal = (form.elements['message'] && form.elements['message'].value.trim()) || '';

      if (nameVal.length < 2)      { showMsg('Please enter your full name (at least 2 characters).', 'error'); form.elements['name'].focus(); return; }
      if (!emailRe.test(emailVal)) { showMsg('Please enter a valid email address.', 'error'); form.elements['email'].focus(); return; }
      if (messageVal.length < 10)  { showMsg('Please write a message (at least 10 characters).', 'error'); form.elements['message'].focus(); return; }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) { form.reset(); showMsg("✓ Message sent! I'll reply within 24 hours.", 'ok'); }
          else { return res.json().then(function (d) { throw new Error(d.error || 'Server error'); }); }
        })
        .catch(function () {
          showMsg('Something went wrong. Email me: hemrajhadhikari@gmail.com', 'err');
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
        });
    });
  }

  /* ─────────────────────────────────
     BACK TO TOP
     HTML id="btt" (was "backToTop")
  ───────────────────────────────── */
  var btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('on', window.scrollY > 600);
    }, { passive: true });
    btt.addEventListener('click', function () {
      if (prefersReduced) { window.scrollTo(0, 0); }
      else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
  }

  /* ─────────────────────────────────
     FOOTER YEAR
  ───────────────────────────────── */
  var footerYear = document.getElementById('footer-year');
  if (footerYear) { footerYear.textContent = new Date().getFullYear(); }

})();
