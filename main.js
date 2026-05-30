/**
 * Hemraj Adhikari Portfolio — main.js v5.0
 * FIXED: mobile nav, search bar, scroll progress, back-to-top
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── SCROLL PROGRESS BAR ── */
  var progressBar = document.getElementById('progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  /* ── MOBILE NAV ── */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.removeAttribute('style');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var first = mobileNav.querySelector('a');
    if (first) setTimeout(function(){ first.focus(); }, 50);
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
        navToggle.focus();
      }
    });
  }

  /* ── SEARCH BAR TOGGLE ── */
  var searchToggle = document.getElementById('searchToggle');
  var searchOverlay = document.getElementById('searchOverlay');
  var searchInput = document.getElementById('searchInput');
  var searchClose = document.getElementById('searchClose');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ if(searchInput) searchInput.focus(); }, 80);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if(searchInput) searchInput.value = '';
    var results = document.getElementById('searchResults');
    if(results) results.innerHTML = '';
  }

  if (searchToggle) {
    searchToggle.addEventListener('click', function(e){
      e.stopPropagation();
      closeMobileNav();
      openSearch();
    });
  }
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function(e){
      if(e.target === searchOverlay) closeSearch();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeSearch();
    });
  }

  /* Search functionality */
  var searchableContent = [
    { title: 'About Hemraj', section: '#about', keywords: 'about hemraj it officer cloud kathmandu nepal' },
    { title: 'Skills & Tech Stack', section: '#skills', keywords: 'aws linux python devops docker cybersecurity crm google workspace microsoft 365' },
    { title: 'Work Experience', section: '#experience', keywords: 'experience route2uni citizen infotech it officer work history' },
    { title: 'Services', section: '#services', keywords: 'cloud infrastructure saas crm wordpress hosting cybersecurity helpdesk mentoring' },
    { title: 'Projects', section: '#portfolio', keywords: 'kbm fm mega loksewa cloud management projects portfolio' },
    { title: 'Blog & IT Guides', section: '#blog', keywords: 'aws cloud career linux nepal cybersecurity csit bca bit blog guide' },
    { title: 'BIT / BCA / CSIT Mentoring', section: '#services', keywords: 'bit bca csit mentoring nepal students career guidance computer engineering' },
    { title: 'FAQ', section: '#faq', keywords: 'faq hire freelance pricing upwork whatsapp international' },
    { title: 'Contact', section: '#contact', keywords: 'contact hire email whatsapp upwork kathmandu nepal freelance' },
  ];

  if (searchInput) {
    searchInput.addEventListener('input', function(){
      var q = searchInput.value.trim().toLowerCase();
      var results = document.getElementById('searchResults');
      if(!results) return;
      if(q.length < 2){ results.innerHTML = ''; return; }
      var matches = searchableContent.filter(function(item){
        return item.title.toLowerCase().includes(q) || item.keywords.includes(q);
      });
      if(matches.length === 0){
        results.innerHTML = '<div class="search-no-result">No results for "' + q + '"</div>';
        return;
      }
      results.innerHTML = matches.map(function(item){
        return '<a href="' + item.section + '" class="search-result-item" onclick="closeSearchPublic()">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '<span>' + item.title + '</span>' +
        '</a>';
      }).join('');
    });
  }
  window.closeSearchPublic = closeSearch;

  /* ── ACTIVE NAV ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  var ticking  = false;

  function updateActiveLink() {
    var scrollY = window.scrollY;
    var current = '';
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var active = href === '#' + current || href.endsWith('/' + current + '.html');
      a.classList.toggle('active', active);
    });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(updateActiveLink); ticking = true; }
  }, { passive: true });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if(href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeSearch();
      target.scrollIntoView(prefersReduced ? undefined : { behavior: 'smooth' });
    });
  });

  /* ── TYPING EFFECT ── */
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
        deleting = true; setTimeout(typeLoop, 1800); return;
      }
      if (deleting && cIdx === 0) {
        deleting = false; pIdx = (pIdx + 1) % phrases.length;
      }
      setTimeout(typeLoop, deleting ? 45 : 75);
    }
    setTimeout(typeLoop, 800);
  } else if (typedEl) {
    typedEl.textContent = phrases[0];
  }

  /* ── REVEAL ON SCROLL ── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var reveals  = document.querySelectorAll('.reveal');
    var delayMap = new WeakMap();
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
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── ANIMATED COUNTERS ── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
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

  /* ── EXPERIENCE ACCORDION ── */
  window.toggleExp = function (id) {
    var card = document.getElementById(id);
    if (!card) return;
    var isOpen = card.classList.contains('open');
    document.querySelectorAll('.exp-card.open').forEach(function (c) {
      c.classList.remove('open');
      var btn = c.querySelector('.exp-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      card.classList.add('open');
      var btn = card.querySelector('.exp-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ── FAQ ACCORDION ── */
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

  /* ── CONTACT FORM ── */
  var form      = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formMsg   = document.getElementById('formMsg');
  var emailRe   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showMsg(text, cls) {
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.className = 'form-msg ' + cls;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (formMsg) { formMsg.className = 'form-msg'; formMsg.textContent = ''; }
      var nameVal    = (form.elements['name']    && form.elements['name'].value.trim())    || '';
      var emailVal   = (form.elements['email']   && form.elements['email'].value.trim())   || '';
      var messageVal = (form.elements['message'] && form.elements['message'].value.trim()) || '';

      if (nameVal.length < 2)      { showMsg('Please enter your full name.', 'err'); form.elements['name'].focus(); return; }
      if (!emailRe.test(emailVal)) { showMsg('Please enter a valid email address.', 'err'); form.elements['email'].focus(); return; }
      if (messageVal.length < 10)  { showMsg('Please write a message (at least 10 characters).', 'err'); form.elements['message'].focus(); return; }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      fetch(form.action, {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) { form.reset(); showMsg("✓ Message sent! I'll reply within 24 hours.", 'ok'); }
          else { return res.json().then(function (d) { throw new Error(d.error || 'Error'); }); }
        })
        .catch(function () { showMsg('Something went wrong. Email: hemrajhadhikari@gmail.com', 'err'); })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
        });
    });
  }

  /* ── BACK TO TOP ── */
  var btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('on', window.scrollY > 600);
    }, { passive: true });
    btt.addEventListener('click', function () {
      if (prefersReduced) window.scrollTo(0, 0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── FOOTER YEAR ── */
  var yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
