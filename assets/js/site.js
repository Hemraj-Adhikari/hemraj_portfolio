/* hemrajadhikari.info.np — small amount of JavaScript, no libraries.
   Every block checks that its markup exists, so one file serves all pages. */
(function () {
  'use strict';
  var doc = document;
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }

  /* toast + copy */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = doc.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      doc.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2000);
  }
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () { toast('Copied ' + text); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () { toast(text); });
      else toast(text);
    });
  });

  /* header shadow on scroll */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* mobile menu */
  var btn = $('.menu-btn'), menu = $('#mobile-menu');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    doc.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (btn && menu) {
    btn.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); btn.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 1080 && menu.classList.contains('is-open')) setMenu(false); });
  }

  /* role durations (e.g. "3 mos"), recalculated so they stay current */
  var now = new Date();
  $$('[data-since]').forEach(function (el) {
    var s = el.getAttribute('data-since').split('-'), u = el.getAttribute('data-until');
    var months;
    if (u) { u = u.split('-'); months = (u[0] - s[0]) * 12 + (u[1] - s[1]) + 1; }
    else { months = Math.max(1, (now.getFullYear() - s[0]) * 12 + (now.getMonth() + 1 - s[1])); }
    var y = Math.floor(months / 12), m = months % 12, out = [];
    if (y) out.push(y + (y > 1 ? ' yrs' : ' yr'));
    if (m) out.push(m + (m > 1 ? ' mos' : ' mo'));
    el.textContent = out.join(' ') || '1 mo';
  });
  $$('[data-year]').forEach(function (el) { el.textContent = now.getFullYear(); });

  /* filters (projects table, blog list) */
  $$('[data-filter]').forEach(function (scope) {
    var items = $$('[data-tags]', scope), chips = $$('[data-filter-value]', scope);
    var search = $('[data-filter-search]', scope), countEl = $('[data-filter-count]', scope), empty = $('.empty', scope);
    var active = 'all';
    chips.forEach(function (chip) {
      var v = chip.getAttribute('data-filter-value'), c = $('.count', chip);
      if (c) c.textContent = v === 'all' ? items.length : items.filter(function (i) { return (' ' + i.getAttribute('data-tags') + ' ').indexOf(' ' + v + ' ') > -1; }).length;
      chip.addEventListener('click', function () {
        active = v;
        chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === chip)); });
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
    function apply() {
      var q = search ? search.value.trim().toLowerCase() : '', shown = 0;
      items.forEach(function (it) {
        var ok = (active === 'all' || (' ' + it.getAttribute('data-tags') + ' ').indexOf(' ' + active + ' ') > -1) &&
                 (!q || it.textContent.toLowerCase().indexOf(q) > -1);
        it.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = shown;
      if (empty) empty.classList.toggle('is-visible', shown === 0);
    }
  });

  /* lightbox for screenshots and certificates */
  var zoomers = $$('[data-zoom]');
  if (zoomers.length) {
    var lb = doc.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image preview');
    lb.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt=""><p></p>';
    doc.body.appendChild(lb);
    var lbImg = $('img', lb), lbCap = $('p', lb), last = null;
    var close = function () { lb.classList.remove('is-open'); doc.body.style.overflow = ''; if (last) last.focus(); };
    lb.addEventListener('click', close);
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('is-open')) close(); });
    zoomers.forEach(function (z) {
      z.addEventListener('click', function () {
        last = z;
        var img = $('img', z);
        lbImg.src = z.getAttribute('data-zoom') || (img && img.src);
        lbImg.alt = img ? img.alt : '';
        lbCap.textContent = z.getAttribute('data-caption') || (img ? img.alt : '');
        lb.classList.add('is-open');
        doc.body.style.overflow = 'hidden';
        $('button', lb).focus();
      });
    });
  }

  /* contact form (Formspree) */
  var form = $('form[data-ajax]');
  if (form && window.fetch) {
    var status = $('.form-status', form), msg = $('textarea', form), counter = $('[data-chars]', form);
    if (msg && counter) msg.addEventListener('input', function () { counter.textContent = msg.value.length + ' / 2000'; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = null;
      $$('[required]', form).forEach(function (f) {
        var ok = f.value.trim() !== '' && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.closest('.field').classList.toggle('is-invalid', !ok);
        f.setAttribute('aria-invalid', String(!ok));
        if (!ok && !bad) bad = f;
      });
      if (bad) { bad.focus(); show('Please fill in your name, a valid email and a message.', false); return; }
      var b = $('button[type="submit"]', form), label = b.textContent;
      b.disabled = true; b.textContent = 'Sending...';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw 0; form.reset(); if (counter) counter.textContent = '0 / 2000'; show('Thanks, your message was sent. I will reply within a day.', true); })
        .catch(function () { show('Sorry, that did not send. Please email hemrajhadhikari@gmail.com instead.', false); })
        .then(function () { b.disabled = false; b.textContent = label; });
    });
    function show(t, ok) { status.textContent = t; status.className = 'form-status ' + (ok ? 'is-ok' : 'is-err'); }
  }

  /* blog: highlight the current section in the table of contents */
  var toc = $$('.toc a[href^="#"]');
  if (toc.length && 'IntersectionObserver' in window) {
    var map = {};
    toc.forEach(function (a) { var t = doc.getElementById(a.getAttribute('href').slice(1)); if (t) map[t.id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          toc.forEach(function (a) { a.classList.remove('is-active'); });
          map[e.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(doc.getElementById(id)); });
  }
})();
