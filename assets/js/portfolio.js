/* Hemraj Adhikari portfolio
   To add a project: add an object to PROJECTS (featured) or SITES (list).
   To use a real screenshot instead of the drawn preview, set  img: 'assets/img/work/name.webp'  on the project. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ARROW = '<svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12 12 4M5 4h7v7"/></svg>';
  var LOCK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------------- data ---------------- */
  var PROJECTS = [
    { title: 'Route 2 Uni CRM', type: 'system', cat: 'CRM / Education consultancy', live: true,
      desc: 'One CRM for the whole student journey, from enquiry to offer, Pre-CAS, CAS and visa. Staff and partners each get their own dashboard; used daily by 50+ people.',
      stack: 'JavaScript · Firebase · Firestore · RBAC · MFA', url: 'https://hemraj-adhikari.github.io/crmportal/',
      mock: 'kanban', color: '#17393b', host: 'route2uni-crm', name: 'ROUTE 2 UNI', cols: ['Offer', 'Pre-CAS', 'CAS', 'Visa'] },
    { title: 'Dreams Care Homes CRM', type: 'system', cat: 'CRM / UK health & social care', live: false,
      desc: 'Staff compliance CRM for a care-home operator in Wales: right-to-work checks, visa sponsorship and DBS expiry tracking, documents and an audit log. I am the project manager.',
      stack: 'Node.js · REST APIs · Automation · Audit log', url: '',
      mock: 'compliance', color: '#1f5a34', host: 'dreamscarehomes', name: 'Dreams Care' },
    { title: 'Hajiri HR & Attendance', type: 'system', cat: 'HRM / Route 2 Uni', live: false,
      desc: 'HR and attendance system for Route 2 Uni: daily hajiri, approvals, leave, holidays and notices, with team and department reports. Dates show in Bikram Sambat and AD.',
      stack: 'Firebase · Firestore · RBAC · Nepali calendar', url: '',
      mock: 'hajiri', color: '#2e9e55', host: 'hajiri.route2uni', name: 'Hajiri' },
    { title: 'Kaam Khoj', type: 'system', cat: 'Social impact / Job app', live: false,
      desc: 'Free app that connects daily-wage workers with nearby jobs. Workers call employers directly, with no middlemen and no commission. Nepali-first, read-aloud button and works with weak internet.',
      stack: 'PWA · Offline-first · Text-to-speech · Nepali UI', url: '',
      mock: 'jobs', color: '#eba300', host: 'kaamkhoj', name: 'काम खोज', badge: 'App' },
    { title: 'Slotly', type: 'system', cat: 'SaaS / Booking app & web app', live: false,
      desc: 'Booking app any business can use: services, customers, a shareable booking link, expected income and no-show tracking, in simple Romanised Nepali.',
      stack: 'Web app · Mobile app · Booking links · Analytics', url: '',
      mock: 'booking', color: '#5b3df5', host: 'slotly', name: 'Slotly', badge: 'App' },
    { title: 'Partner Bulk Messaging', type: 'system', cat: 'B2B tool / Route 2 Uni', live: false,
      desc: 'Tool for the B2B team to reach partner agents in bulk on WhatsApp and email: contact lists, templates and personalised messages, with delivery status for each partner.',
      stack: 'WhatsApp · Email · Templates · Contact lists', url: '',
      mock: 'broadcast', color: '#1f9d55', host: 'b2b-messaging', name: 'B2B Broadcast' },
    { title: 'TaskTrack', type: 'system', cat: 'Internal tool / Operations', live: true,
      desc: 'Daily work board for the IT team, with history, one-click PDF reports, an IT asset register and leave in one app.',
      stack: 'Next.js · Firebase · Vercel · PDF export', url: 'https://trackrecorde.vercel.app/',
      mock: 'kanban', color: '#ef4a2b', host: 'trackrecorde.vercel.app', name: 'TaskTrack', cols: ['To do', 'Doing', 'Review', 'Done'] },
    { title: 'Mock Pre-CAS Interview', type: 'system', cat: 'Web app / EdTech', live: true,
      desc: 'Practice for the UK Pre-CAS interview in the browser: 23 timed questions, webcam recording, live transcript and a PDF report for counsellors.',
      stack: 'JavaScript · Web Speech API · MediaRecorder', url: 'https://mock-pre-cas-module.vercel.app/interview/',
      mock: 'interview', color: '#5b6cff', host: 'mock-pre-cas-module.vercel.app' },
    { title: 'UK University Intake Directory', type: 'system', cat: 'Web app / Data', live: true,
      desc: 'Searchable list of partner UK universities for the September 2026 intake, with tuition, entry criteria and deadline flags. Used by counsellors on calls.',
      stack: 'HTML · CSS · JavaScript · GitHub Pages', url: 'https://hemraj-adhikari.github.io/Info-route2uni/',
      mock: 'table', color: '#7a1f3d', host: 'info-route2uni', rows: [['University', 'UG / yr', 'PG / yr', 'Deadline'], 4] },
    { title: 'KBM FM', type: 'web', cat: 'Media / Radio streaming', live: true, dark: true,
      desc: 'Live radio streaming platform with programme schedules, hosted on AWS.',
      stack: 'PHP · MySQL · AWS', url: 'https://kbmfm.com/',
      mock: 'radio', color: '#d6262f', host: 'kbmfm.com', name: 'KBM FM', headline: 'Live radio, 24 hours a day' },
    { title: 'Mega Loksewa', type: 'web', cat: 'Education / Exam prep & LMS', live: true,
      desc: 'Government exam-prep platform with mock tests, live classes and a learning management system.',
      stack: 'Laravel · MySQL', url: 'https://www.megaloksewa.com/',
      mock: 'quiz', color: '#1f6fd6', host: 'megaloksewa.com', name: 'Mega Loksewa' },
    { title: 'Sanchar Sanket', type: 'web', cat: 'Media / News portal', live: true,
      desc: 'News and media portal with categories, fast mobile reading and managed hosting.',
      stack: 'WordPress · Hosting', url: 'https://sancharsanket.com/',
      mock: 'news', color: '#b3122b', host: 'sancharsanket.com', name: 'Sanchar Sanket' },
    { title: 'Sargam Sangeet Vidyalay', type: 'web', cat: 'Education / Music school, Pune', live: true, dark: true,
      desc: 'Website for a music school in Pune, India, built through an agency partner.',
      stack: 'WordPress', url: 'https://www.sargamsangeetvidyalay.in/',
      mock: 'brand', color: '#8a3b12', host: 'sargamsangeetvidyalay.in', name: 'Sargam', headline: 'Learn Indian classical music' },
    { title: 'Aaradhana Shrestha', type: 'web', cat: 'Personal brand / Corporate trainer', live: true, dark: true,
      desc: 'Personal website for a soft-skills and corporate trainer in Nepal.',
      stack: 'HTML · CSS · JavaScript', url: 'https://arradhanashrestha.com/',
      mock: 'brand', color: '#6b2fa3', host: 'arradhanashrestha.com', name: 'Aaradhana', headline: 'Training that changes how teams work' },
  ];

  var SITES = [
    { t: 'Achham Online', s: 'Regional news portal · WordPress, hosting, DNS' },
    { t: 'Veeraj Sales', s: 'Retail store, Mumbai · WooCommerce' },
    { t: 'Kamal Bazar Municipality', s: 'Public information, incl. Ward 7 · WordPress' },
    { t: 'Manakamana School', s: 'School website and IT support · WordPress' },
    { t: 'Milind Kulkarni', s: 'Harmonium artist, India · WordPress' },
    { t: 'Aniruddha Deshpande', s: 'Tabla artist · YouTube & Facebook setup', u: 'https://www.youtube.com/channel/UCA8gaBX51UhV4CHU0oriJCA' },
    { t: 'Café website, Australia', s: 'Menu and ordering information · WordPress' },
    { t: 'Shopify stores, Indonesia', s: 'Two e-commerce builds · Shopify' },
    { t: 'Tespaxi (agency partner)', s: 'Delivery partner for clients in India' },
    { t: 'GitHub', s: 'Code and smaller projects', u: 'https://github.com/Hemraj-Adhikari' }
  ];

  var CERTS = [
    { t: 'IBM Full Stack Software Developer', who: 'IBM · Coursera', when: 'Oct 2026', n: '15 courses', d: 'React, Node.js and Express, Python and Django, Git, Docker, Kubernetes and OpenShift, microservices and serverless, with a full-stack capstone deployed to the cloud.', foot: 'View certificate', c: 'l-navy l-wide', ill: 'stack', img: 'cert-ibm-full-stack-developer', u: '' },
    { t: 'Google Cybersecurity', who: 'Google · Coursera', when: 'Aug 2026', n: '9 courses', d: 'Security frameworks, networks, Linux, SQL, SIEM tools and Python automation.', foot: 'Protect what you build.', c: 'l-green', ill: 'shield', img: 'cert-google-cybersecurity', u: 'https://coursera.org/verify/professional-cert/WYG3ENN67WGZ' },
    { t: 'IBM AI Developer', who: 'IBM · Coursera', when: 'Aug 2026', n: '10 courses', d: 'Web development, Python and Flask, and generative AI applications.', foot: 'From ideas to working apps.', c: 'l-blue', ill: 'bulb', img: 'cert-ibm-ai-developer', u: 'https://coursera.org/verify/professional-cert/FNO8CY5VUBI1' },
    { t: 'Google Project Management', who: 'Google · Coursera', when: 'Sep 2026', n: '7 courses', d: 'Initiating, planning and running traditional and Agile projects.', foot: 'Plans that ship.', c: 'l-red', ill: 'flag', img: 'cert-google-project-management', u: 'https://coursera.org/verify/professional-cert/EV6A6CZUO3XZ' },
    { t: 'Google Advanced Data Analytics', who: 'Google · Coursera', when: 'Aug 2026', n: '7 courses', d: 'Statistics, regression and machine learning in Python, with a capstone.', foot: 'Decisions from data.', c: 'l-pink', ill: 'chart', img: 'cert-google-advanced-data-analytics', u: 'https://coursera.org/verify/professional-cert/26CKVVWU0EKY' },
    { t: 'Google AI', who: 'Google · Coursera', when: 'Jul 2026', n: '7 courses', d: 'AI for research, writing, data analysis and building small apps.', foot: 'Learning today, building tomorrow.', c: 'l-black', ill: 'spark', img: 'cert-google-ai', u: 'https://coursera.org/verify/professional-cert/EFS3MQDVCNMY' },
    { t: 'Google AI Essentials', who: 'Google · Coursera', when: 'Sep 2026', n: '5 courses', d: 'Using AI tools responsibly to get more done at work.', foot: 'Working smarter with AI.', c: 'l-yellow', ill: 'pen', img: 'cert-google-ai-essentials', u: 'https://coursera.org/verify/specialization/RD5VSI3KEUBL' }
  ];

  var ILL = {
    stack: '<svg class="ill" viewBox="0 0 80 80"><rect x="12" y="46" width="56" height="14" rx="4" fill="#ef4a2b"/><rect x="12" y="30" width="56" height="14" rx="4" fill="#fff"/><rect x="12" y="14" width="56" height="14" rx="4" fill="#5b8cff"/><path d="M30 19l-5 2 5 2M50 19l5 2-5 2" stroke="#fff" stroke-width="2" fill="none"/></svg>',
    shield: '<svg class="ill" viewBox="0 0 80 80"><path d="M40 8 66 18v20c0 17-11 28-26 34C25 66 14 55 14 38V18z" fill="#fff" stroke="#111" stroke-width="3"/><path d="m29 40 8 8 15-17" fill="none" stroke="#2b8a2b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bulb: '<svg class="ill" viewBox="0 0 80 80"><path d="M40 10a20 20 0 0 0-12 36c3 2 4 5 4 8h16c0-3 1-6 4-8a20 20 0 0 0-12-36z" fill="#ffd83a" stroke="#111" stroke-width="3"/><rect x="31" y="56" width="18" height="10" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><path d="M8 26h6M66 26h6M16 8l4 4M64 8l-4 4" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',
    flag: '<svg class="ill" viewBox="0 0 80 80"><path d="M18 70V10" stroke="#111" stroke-width="4" stroke-linecap="round"/><path d="M20 12h40l-8 12 8 12H20z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><circle cx="18" cy="70" r="5" fill="#111"/></svg>',
    chart: '<svg class="ill" viewBox="0 0 80 80"><rect x="10" y="12" width="60" height="56" rx="8" fill="#fff" stroke="#111" stroke-width="3"/><path d="M20 54V42M32 54V32M44 54V38M56 54V24" stroke="#be2768" stroke-width="6" stroke-linecap="round"/></svg>',
    spark: '<svg class="ill" viewBox="0 0 80 80"><path d="M40 8c3 16 10 23 26 26-16 3-23 10-26 26-3-16-10-23-26-26 16-3 23-10 26-26z" fill="#fff"/><path d="M64 52c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10z" fill="#ef4a2b"/></svg>',
    pen: '<svg class="ill" viewBox="0 0 80 80"><path d="m52 10 18 18-30 30-22 6 6-22z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="m46 16 18 18" stroke="#111" stroke-width="3"/><circle cx="34" cy="46" r="4" fill="#111"/></svg>'
  };

  /* ---------------- drawn previews ---------------- */
  function bar(host) { return '<div class="mock-bar"><i></i><i></i><i></i><span>' + esc(host) + '</span></div>'; }
  function side(p, items) {
    var h = '<div class="m-side"><b>' + esc(p.name || p.title) + '</b>';
    for (var i = 0; i < items; i++) h += '<i class="' + (i === 0 ? 'on' : '') + '" style="width:' + (60 + (i * 13) % 35) + '%"></i>';
    return h + '</div>';
  }
  function mock(p) {
    var m = p.mock, inner = '';
    if (m === 'kanban') {
      var cols = p.cols.map(function (c, i) {
        var tiles = ''; for (var k = 0; k < 4 - (i % 3); k++) tiles += '<div class="m-tile"></div>';
        return '<div class="m-col"><span>' + esc(c) + '</span>' + tiles + '</div>';
      }).join('');
      inner = side(p, 6) + '<div class="m-main"><div class="m-row"><div class="m-kpi"><b>128</b><span>Active</span></div><div class="m-kpi"><b>36</b><span>This week</span></div><div class="m-kpi"><b>92%</b><span>On track</span></div></div><div class="m-cols">' + cols + '</div></div>';
    } else if (m === 'dashboard') {
      inner = side(p, 6) + '<div class="m-main"><div class="m-row">' + p.kpis.map(function (k) { return '<div class="m-kpi"><b>' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('') + '</div><div class="m-table"><div><span>Resident</span><span>Room</span><span>Care plan</span><span>Status</span></div>' + new Array(4).join('<div><span class="m-line s"></span><span class="m-line xs"></span><span class="m-line"></span><span class="m-line xs"></span></div>') + '</div><div class="m-line"></div><div class="m-line s"></div></div>';
    } else if (m === 'interview') {
      inner = '<div class="m-col-wrap"><div class="m-cam"><div class="cam"></div><div class="tr"><b>Question 7 of 23</b><span>Why did you choose this university?</span><div class="m-line"></div><div class="m-line s"></div><div class="m-line"></div><div class="m-line xs"></div><span style="color:#8bffb5">● Transcribing…</span></div></div></div>';
    } else if (m === 'table') {
      inner = '<div class="m-main" style="background:#fff"><div class="m-row"><div class="m-kpi" style="flex:3"><span>Search universities…</span></div><div class="m-kpi"><span>Sort: Fee</span></div></div><div class="m-table"><div>' + p.rows[0].map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>' + new Array(p.rows[1] + 1).join('<div><span class="m-line s"></span><span class="m-line"></span><span class="m-line"></span><span class="m-line xs"></span></div>') + '</div></div>';
    } else if (m === 'attendance') {
      var cal = ''; for (var d = 0; d < 28; d++) cal += '<i class="' + (d % 7 > 4 ? '' : (d === 9 || d === 17 ? 'a' : 'p')) + '"></i>';
      inner = side(p, 5) + '<div class="m-main"><div class="m-row"><div class="m-kpi"><b>24</b><span>Staff</span></div><div class="m-kpi"><b>22</b><span>Present</span></div><div class="m-kpi"><b>2</b><span>On leave</span></div></div><div class="m-kpi"><span>October attendance</span><div class="m-cal">' + cal + '</div></div><div class="m-line s"></div></div>';
    } else if (m === 'hajiri') {
      var stack = [[70, 6, 3, 0], [66, 12, 3, 0], [80, 9, 0, 0], [62, 21, 3, 11], [72, 12, 0, 3], [83, 12, 0, 3], [72, 21, 3, 3], [62, 21, 3, 11]];
      var bars = stack.map(function (b) { return '<span class="hb"><i style="height:' + b[3] + '%;background:#e04848"></i><i style="height:' + b[2] + '%;background:#9b5de5"></i><i style="height:' + b[1] + '%;background:#f0a500"></i><i style="height:' + b[0] + '%;background:var(--m)"></i></span>'; }).join('');
      inner = '<div class="m-side" style="background:#fff;color:#1b1b1b;border-right:1px solid #eee"><b>ROUTE 2 UNI</b><span class="m-chip">✓ Hajiri</span><i class="on" style="background:#e9eef0"></i><i style="background:#eef0f2"></i><i style="background:#eef0f2"></i><i style="background:#eef0f2"></i><i style="background:#eef0f2"></i></div>' +
        '<div class="m-main"><div class="m-kpi"><b style="font-size:7px">आइतबार, २५ असोज २०८३</b><span>This month, day by day · 93% attendance</span><div class="hbars">' + bars + '</div></div><div class="m-kpi"><span>Departments this month</span><div class="m-prog"><i style="width:98%"></i></div><div class="m-prog"><i style="width:100%"></i></div><div class="m-prog"><i style="width:81%;background:#f0a500"></i></div></div></div>';
    } else if (m === 'compliance') {
      inner = '<div class="m-side" style="background:linear-gradient(#1f5a34,#123a22)"><b>Dreams Care Homes</b><i class="on" style="background:#d58a2e"></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="m-main" style="background:#fff"><b style="font-size:10px;font-family:Georgia,serif">Dashboard</b><div class="m-row">' +
        [['Staff records', '#5a9a6e'], ['Sponsored', '#5a9a6e'], ['Expiring 90d', '#d58a2e'], ['Overdue', '#c4574a']].map(function (k) { return '<div class="m-kpi" style="border:1px solid #eee"><b style="font-family:Georgia,serif;color:' + k[1] + '">•</b><span>' + k[0] + '</span><svg viewBox="0 0 40 10" style="height:8px"><path d="M0 7 6 3 12 5 18 6 24 4 30 4 40 9" fill="none" stroke="' + k[1] + '" stroke-width="1.2"/></svg></div>'; }).join('') +
        '</div><div class="m-row"><div class="m-kpi" style="flex:1.6;border:1px solid #eee"><span>Expiring within 90 days · LIVE</span><div class="m-trow"><span>Right to Work</span><em class="exp">Expired</em></div><div class="m-trow"><span>Visa / sponsorship</span><em class="exp">Expired</em></div><div class="m-trow"><span>Enhanced DBS</span><em class="soon">60d</em></div></div><div class="m-kpi" style="border:1px solid #eee;place-items:center"><span>Compliance</span><span class="donut"></span></div></div></div>';
    } else if (m === 'jobs') {
      inner = '<div class="m-col-wrap" style="background:#eef0ea;padding:7px;gap:5px"><div class="kk-head"><b>काम खोज</b><span>नजिकै काम, सिधै फोन। बिचौलिया छैन, कमिसन छैन।</span></div>' +
        '<div class="m-row"><span class="kk-tab on">काम चाहियो</span><span class="kk-tab">कामदार चाहियो</span></div><div class="kk-search">📍 ठाउँ खोज्नुहोस्</div>' +
        '<div class="m-row"><span class="kk-chip on">सबै</span><span class="kk-chip">ज्यामी</span><span class="kk-chip">डकर्मी</span><span class="kk-chip">प्लम्बर</span></div>' +
        '<div class="kk-card"><b>खाना पकाउने मान्छे चाहियो</b><span>रु. ८०० / दिन · २ दिनको काम</span><span class="kk-call">📞 फोन गर्नुहोस्</span></div></div>';
    } else if (m === 'booking') {
      inner = '<div class="m-side" style="background:#fff;color:#5b3df5;width:14%;border-right:1px solid #eee;justify-items:center"><b style="background:var(--m);color:#fff;border-radius:4px;padding:2px 4px">▦</b><i class="on" style="background:#e6e1ff;width:80%"></i><i style="background:#eee;width:80%"></i><i style="background:#eee;width:80%"></i><i style="background:#eee;width:80%"></i></div>' +
        '<div class="m-main" style="background:#f6f6fb"><span style="font-size:5.5px;color:#888">Sunday, 11 October</span><b style="font-size:11px">Subha prabhat ☀</b><div class="m-row"><div class="m-kpi" style="background:linear-gradient(135deg,#5b3df5,#9b5de5);color:#fff"><b>0</b><span style="color:#e8e4ff">Aaja ko booking</span></div><div class="m-kpi"><b>0</b><span>Aauda 7 din</span></div><div class="m-kpi"><b>NPR 0</b><span>Expected income</span></div><div class="m-kpi"><b>0%</b><span>No-show</span></div></div>' +
        '<div class="sl-tabs"><span class="on">Upcoming</span><span>Past</span><span>Cancelled</span></div><div style="display:grid;justify-items:center;gap:3px;padding-top:4px"><span style="font-size:6px;color:#555;font-weight:700">Ahile kunai booking chhaina</span><span class="sl-btn">Share booking link</span></div></div>';
    } else if (m === 'broadcast') {
      inner = '<div class="m-side" style="background:#10302a"><b>B2B Broadcast</b><i class="on"></i><i></i><i></i><i></i></div>' +
        '<div class="m-main"><div class="m-row"><div class="m-kpi"><b>Partners</b><span>Recipients selected</span></div><div class="m-kpi"><b>WhatsApp</b><span>+ Email</span></div><div class="m-kpi"><b>Sent</b><span>Delivery status</span></div></div>' +
        '<div class="m-row"><div class="m-kpi" style="flex:1.3"><span>Message template</span><div class="bc-msg">Namaste {name}, here is this week’s update from Route 2 Uni…</div><span class="sl-btn" style="justify-self:start;background:#1f9d55">Send to all</span></div>' +
        '<div class="m-kpi"><span>Recipients</span>' + ['✓', '✓', '✓', '…', '✓'].map(function (t, i) { return '<div class="m-trow"><span class="m-line" style="width:' + (50 + i * 7) + '%"></span><em class="' + (t === '✓' ? 'ok' : 'soon') + '">' + t + '</em></div>'; }).join('') + '</div></div></div>';
    } else if (m === 'radio') {
      inner = '<div class="m-col-wrap"><div class="m-nav">' + esc(p.name) + '<span><em>Home</em><em>Programs</em><em>Live</em></span></div><div class="m-hero" style="--m:' + p.color + '"><h5>' + esc(p.headline) + '</h5><p>Programme schedule, news and music.</p><span class="m-btn">Listen live</span></div><div class="m-player"><i></i><span>ON AIR</span><div class="m-wave"></div><span>LIVE</span></div></div>';
    } else if (m === 'quiz') {
      inner = '<div class="m-col-wrap"><div class="m-nav">' + esc(p.name) + '<span><em>Mock tests</em><em>Live class</em><em>Notes</em></span></div><div class="m-quiz"><b>Mock Test 14 · Question 3/50</b><span style="font-size:6px;color:#555">नेपालको संविधान कहिले जारी भयो?</span><div class="m-opt">२०७० असोज ३</div><div class="m-opt on">२०७२ असोज ३</div><div class="m-opt">२०७३ असोज ३</div><div class="m-opt">२०७४ असोज ३</div></div></div>';
    } else if (m === 'news') {
      inner = '<div class="m-col-wrap"><div class="m-nav" style="border-bottom:2px solid ' + p.color + '">' + esc(p.name) + '<span><em>समाचार</em><em>राजनीति</em><em>खेलकुद</em></span></div><div class="m-news"><div></div><div></div><div></div><div></div><div></div></div><div style="padding:0 7px;display:grid;gap:3px;background:#fff;flex:1"><div class="m-line"></div><div class="m-line s"></div><div class="m-line"></div></div></div>';
    } else {
      inner = '<div class="m-col-wrap"><div class="m-nav">' + esc(p.name) + '<span><em>About</em><em>Programs</em><em>Contact</em></span></div><div class="m-hero" style="--m:' + p.color + '"><h5>' + esc(p.headline) + '</h5><p>' + esc(p.cat.split('/')[1] || '') + '</p><span class="m-btn">Get in touch</span></div></div>';
    }
    return '<div class="mock" style="--m:' + p.color + '" aria-hidden="true">' + bar(p.host) + '<div class="mock-body">' + inner + '</div></div>';
  }

  /* ---------------- render ---------------- */
  var grid = $('#workGrid');
  if (grid) {
    grid.innerHTML = PROJECTS.map(function (p, i) {
      var link = p.url
        ? '<a class="w-link" href="' + p.url + '" target="_blank" rel="noopener">View project ' + ARROW + '<span class="sr-only" style="position:absolute;left:-9999px"> (' + esc(p.title) + ', opens in a new tab)</span></a>'
        : '<span class="w-private">' + LOCK + 'Private · demo on request</span>';
      var shot = p.img ? '<img src="' + p.img + '" alt="' + esc(p.title) + ' screenshot" loading="lazy">' : mock(p);
      return '<article class="work-card' + ((i % 4 === 0 || i % 4 === 3) ? ' is-dark' : '') + '" data-type="' + p.type + '">' +
        '<span class="w-badge' + (p.live || p.badge ? '' : ' private') + '">' + (p.badge || (p.live ? 'Live' : 'Private')) + '</span>' +
        '<div class="w-text"><span class="w-cat">' + esc(p.cat) + '</span><h3 class="w-title">' + esc(p.title) + '</h3><p class="w-desc">' + esc(p.desc) + '</p><span class="w-stack">' + esc(p.stack) + '</span>' + link + '</div>' +
        '<div class="w-shot">' + shot + '</div></article>';
    }).join('');
  }
  var list = $('#siteList');
  if (list) {
    list.innerHTML = SITES.map(function (s) {
      return s.u
        ? '<a href="' + s.u + '" target="_blank" rel="noopener"><b>' + esc(s.t) + ARROW + '</b><span>' + esc(s.s) + '</span></a>'
        : '<div><b>' + esc(s.t) + '</b><span>' + esc(s.s) + '</span></div>';
    }).join('');
  }
  var lg = $('#learnGrid');
  if (lg) {
    lg.innerHTML = CERTS.map(function (c, i) {
      var body = '<span class="when">' + c.when + '</span><h3>' + esc(c.t) + '</h3><span class="who">' + esc(c.who) + ' · ' + c.n + '</span><p>' + esc(c.d) + '</p><span class="foot"><span class="go">' + ARROW + '</span>' + esc(c.foot) + '</span>' + ILL[c.ill];
      return c.u
        ? '<a class="l-card ' + c.c + '" href="' + c.u + '" target="_blank" rel="noopener">' + body + '</a>'
        : '<button type="button" class="l-card cert-open ' + c.c + '" data-i="' + i + '">' + body + '</button>';
    }).join('');
  }
  var ar = $('#archiveRow');
  if (ar) {
    ar.innerHTML = CERTS.map(function (c, i) {
      return '<button class="cert-thumb" type="button" data-i="' + i + '"><img src="assets/img/' + c.img + '-sm.webp" alt="" width="640" height="495"><small>' + esc(c.who.split(' ·')[0]) + ' · ' + c.when + '</small><b>' + esc(c.t) + '</b></button>';
    }).join('');
  }

  /* ---------------- lightbox ---------------- */
  var lb = null;
  function closeLb() { if (lb) { lb.remove(); lb = null; document.removeEventListener('keydown', onKey); } }
  function onKey(e) { if (e.key === 'Escape') closeLb(); }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.cert-thumb, .cert-open');
    if (!t) return;
    var c = CERTS[+t.getAttribute('data-i')];
    lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', c.t);
    lb.innerHTML = '<button class="icon-btn close" type="button" aria-label="Close">✕</button><img src="assets/img/' + c.img + '.webp" alt="' + esc(c.t) + ' certificate"><p class="cap">' + esc(c.t) + (c.u ? ' · <a href="' + c.u + '" target="_blank" rel="noopener">Verify on Coursera</a>' : '') + '</p>';
    lb.addEventListener('click', function (ev) { if (ev.target === lb || ev.target.classList.contains('close')) closeLb(); });
    document.body.appendChild(lb); document.addEventListener('keydown', onKey);
    $('.close', lb).focus();
  });

  /* ---------------- filters ---------------- */
  $$('.filter').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      $$('.filter').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $$('.work-card').forEach(function (c) { c.hidden = !(f === 'all' || c.getAttribute('data-type') === f); });
    });
  });

  /* ---------------- theme ---------------- */
  var root = document.documentElement;
  var themeBtn = $('#themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------------- nav ---------------- */
  var nav = $('.nav'), menuBtn = $('#menuBtn'), links = $('#navLinks');
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  if (links) links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn && menuBtn.setAttribute('aria-expanded', 'false'); } });
  window.addEventListener('scroll', function () { nav && nav.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });

  var secs = ['about', 'services', 'work', 'experience', 'education', 'learning', 'contact'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ('IntersectionObserver' in window && secs.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $$('.nav-links a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* service "Explore" pre-selects the project type */
  $$('[data-topic]').forEach(function (a) {
    a.addEventListener('click', function () { var s = $('#f-topic'); if (s) s.value = a.getAttribute('data-topic'); });
  });

  /* ---------------- contact form (Formspree) ---------------- */
  var form = $('#contactForm'), msg = $('#formMsg'), ta = $('#f-msg'), cnt = $('#msgCount');
  if (ta && cnt) ta.addEventListener('input', function () { cnt.textContent = ta.value.length + '/2000'; });
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = $$('[required]', form).filter(function (f) { return !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value)); });
    if (bad.length) { msg.className = 'form-msg err'; msg.textContent = 'Please fill in your name, a valid email, the project type and a message.'; bad[0].focus(); return; }
    var btn = $('button[type=submit]', form); btn.disabled = true;
    msg.className = 'form-msg'; msg.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(); form.reset(); if (cnt) cnt.textContent = '0/2000'; msg.className = 'form-msg ok'; msg.textContent = 'Thanks, your message was sent. I will reply within a day.'; })
      .catch(function () { msg.className = 'form-msg err'; msg.textContent = 'The message could not be sent. Please email hemrajhadhikari@gmail.com directly.'; })
      .then(function () { btn.disabled = false; });
  });

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
