/**
 * Hemraj Adhikari Portfolio — main.js v3.0
 * Features: theme toggle, typing effect, scroll animations,
 * skill bars, counters, portfolio filter, blog filter,
 * smooth scroll, mobile nav, contact form, progress bar
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
      var current = html.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ha-theme', next);
    });
  }

  /* ─────────────────────────────────
     SCROLL PROGRESS BAR
  ───────────────────────────────── */
  var progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var pct = total > 0 ? (window.scrollY / total * 100) : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ─────────────────────────────────
     MOBILE NAVIGATION
  ───────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        var first = mobileNav.querySelector('a');
        if (first) first.focus();
      }
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

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
     ACTIVE NAV LINK
  ───────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a');
  var ticking = false;
  function updateActiveLink() {
    var scrollY = window.scrollY;
    var current = '';
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(function (a) {
      var isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', isActive);
      a.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(updateActiveLink); ticking = true; }
  }, { passive: true });

  /* ─────────────────────────────────
     TYPING EFFECT
  ───────────────────────────────── */
  var typedEl = document.getElementById('typedText');
  var phrases = [
    'Full Stack Developer',
    'Cloud Engineer (AWS)',
    'System Administrator',
    'Network Engineer',
    'Cybersecurity Expert',
    'SEO Specialist',
    'IT Consultant'
  ];
  if (typedEl && !prefersReduced) {
    var pIdx = 0, cIdx = 0, deleting = false;
    function typeLoop() {
      var phrase = phrases[pIdx];
      typedEl.textContent = deleting ? phrase.slice(0, cIdx - 1) : phrase.slice(0, cIdx + 1);
      if (!deleting) cIdx++;
      else cIdx--;
      if (!deleting && cIdx > phrase.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
      setTimeout(typeLoop, deleting ? 50 : 80);
    }
    setTimeout(typeLoop, 1000);
  } else if (typedEl) {
    typedEl.textContent = phrases[0];
  }

  /* ─────────────────────────────────
     REVEAL ON SCROLL
  ───────────────────────────────── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var reveals = document.querySelectorAll('.reveal');
    var delayMap = new WeakMap();
    reveals.forEach(function (el, i) { delayMap.set(el, i); });

    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = Math.min((delayMap.get(el) % 6) * 70, 300);
        setTimeout(function () { el.classList.add('visible'); }, delay);
        revealObs.unobserve(el);
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
    var counters = document.querySelectorAll('[data-count]');
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var start = 0, duration = 1600;
        var startTime = null;
        function animCount(ts) {
          if (!startTime) startTime = ts;
          var elapsed = ts - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(animCount);
        }
        requestAnimationFrame(animCount);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ─────────────────────────────────
     SKILL BARS ANIMATION
  ───────────────────────────────── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var skillBars = document.querySelectorAll('.skill-bar__fill');
    var skillObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.width = el.getAttribute('data-width') + '%';
        skillObs.unobserve(el);
      });
    }, { threshold: 0.2 });
    skillBars.forEach(function (el) { skillObs.observe(el); });
  } else {
    document.querySelectorAll('.skill-bar__fill').forEach(function (el) {
      el.style.width = el.getAttribute('data-width') + '%';
    });
  }

  /* ─────────────────────────────────
     PORTFOLIO FILTER
  ───────────────────────────────── */
  var filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  var projectCards = document.querySelectorAll('.project-card[data-category]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      projectCards.forEach(function (card) {
        var cats = card.getAttribute('data-category') || '';
        var show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ─────────────────────────────────
     BLOG FILTER
  ───────────────────────────────── */
  var blogFilterBtns = document.querySelectorAll('.filter-btn[data-blog-filter]');
  var blogCards = document.querySelectorAll('.blog-card[data-blog-category]');
  blogFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      blogFilterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-blog-filter');
      blogCards.forEach(function (card) {
        var cats = card.getAttribute('data-blog-category') || '';
        var show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ─────────────────────────────────
     CONTACT FORM
  ───────────────────────────────── */
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
      formMsg.className = 'form-msg';
      formMsg.textContent = '';
      var nameVal    = form.elements['name'].value.trim();
      var emailVal   = form.elements['email'].value.trim();
      var messageVal = form.elements['message'].value.trim();
      if (!nameVal || nameVal.length < 2) {
        showMsg('Please enter your full name (at least 2 characters).', 'error');
        form.elements['name'].focus(); return;
      }
      if (!emailRe.test(emailVal)) {
        showMsg('Please enter a valid email address.', 'error');
        form.elements['email'].focus(); return;
      }
      if (!messageVal || messageVal.length < 10) {
        showMsg('Please write a message (at least 10 characters).', 'error');
        form.elements['message'].focus(); return;
      }
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending… <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="60"><animate attributeName="stroke-dashoffset" dur=".8s" repeatCount="indefinite" from="60" to="0"/></circle></svg>';
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            showMsg("✓ Message sent! I'll get back to you within 24 hours.", 'success');
          } else {
            return res.json().then(function (data) { throw new Error(data.error || 'Server error'); });
          }
        })
        .catch(function () {
          showMsg('Something went wrong. Please email me directly: hemrajhadhikari@gmail.com', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        });
    });
  }

  /* ─────────────────────────────────
     BACK TO TOP
  ───────────────────────────────── */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      if (prefersReduced) { window.scrollTo(0, 0); }
      else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
  }

})();
