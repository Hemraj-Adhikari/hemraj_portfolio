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
      desc: 'One CRM for the whole student journey, from enquiry to offer, Pre-CAS, CAS and visa, used by 50+ staff and 30+ partners. Now in a 10-phase rebuild onto Next.js, NestJS, PostgreSQL, Prisma, Redis and BullMQ on AWS.',
      stack: 'Next.js · NestJS · PostgreSQL · Prisma · Redis · AWS', url: 'https://www.route2unigroup.com/',
      mock: 'kanban', color: '#17393b', host: 'route2uni-crm', name: 'ROUTE 2 UNI', cols: ['Offer', 'Pre-CAS', 'CAS', 'Visa'] },
    { title: 'Dreams Care Homes CRM', type: 'system', cat: 'CRM / UK health & social care', live: false,
      desc: 'CRM and staff-compliance portal for a UK domiciliary care agency: right-to-work checks, visa sponsorship and DBS expiry tracking, documents and an audit log. I lead the roadmap and the build.',
      stack: 'Next.js 14 · TypeScript · Tailwind · Firebase', url: '',
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
      stack: 'Next.js · Firebase · Vercel · PDF export', url: '',
      mock: 'kanban', color: '#ef4a2b', host: 'trackrecorde.vercel.app', name: 'TaskTrack', cols: ['To do', 'Doing', 'Review', 'Done'] },
    { title: 'Mock Pre-CAS Interview', type: 'system', cat: 'Web app / EdTech', live: true,
      desc: 'Practice for the UK Pre-CAS interview in the browser: 23 timed questions, webcam recording, live transcript and a PDF report for counsellors.',
      stack: 'JavaScript · Web Speech API · MediaRecorder', url: '',
      mock: 'interview', color: '#5b6cff', host: 'mock-pre-cas-module.vercel.app' },
    { title: 'UK University Intake Directory', type: 'system', cat: 'Web app / Data', live: true,
      desc: 'Searchable list of partner UK universities for the September 2026 intake, with tuition, entry criteria and deadline flags. Used by counsellors on calls.',
      stack: 'HTML · CSS · JavaScript · GitHub Pages', url: '',
      mock: 'table', color: '#7a1f3d', host: 'info-route2uni', rows: [['University', 'UG / yr', 'PG / yr', 'Deadline'], 4] },
    { title: 'KBM FM', type: 'web', cat: 'Media / Radio streaming', live: true, dark: true,
      desc: 'Live radio streaming platform with programme schedules, hosted on AWS.',
      stack: 'PHP · MySQL · AWS', url: '',
      mock: 'radio', color: '#d6262f', host: 'kbmfm.com', name: 'KBM FM', headline: 'Live radio, 24 hours a day' },
    { title: 'Mega Loksewa', type: 'web', cat: 'Education / Exam prep & LMS', live: true,
      desc: 'Government exam-prep platform with mock tests, live classes and a learning management system.',
      stack: 'Laravel · MySQL', url: '',
      mock: 'quiz', color: '#1f6fd6', host: 'megaloksewa.com', name: 'Mega Loksewa' },
    { title: 'Sanchar Sanket', type: 'web', cat: 'Media / News portal', live: true,
      desc: 'News and media portal with categories, fast mobile reading and managed hosting.',
      stack: 'WordPress · Hosting', url: 'https://sancharsanket.com/',
      mock: 'news', color: '#b3122b', host: 'sancharsanket.com', name: 'Sanchar Sanket' },
    { title: 'Sargam Sangeet Vidyalay', type: 'web', cat: 'Education / Music school, Pune', live: true, dark: true,
      desc: 'Website for a music school in Pune, India, built through an agency partner.',
      stack: 'WordPress', url: '',
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
    { t: 'Aniruddha Deshpande', s: 'Tabla artist · YouTube & Facebook setup' },
    { t: 'Café website, Australia', s: 'Menu and ordering information · WordPress' },
    { t: 'Shopify stores, Indonesia', s: 'Two e-commerce builds · Shopify' },
    { t: 'Tespaxi (agency partner)', s: 'Delivery partner for clients in India' }
  ];

  var CERTS = [
    { t: 'IBM Full Stack Software Developer', who: 'IBM · Coursera', when: 'Oct 2026', n: '15 courses', d: 'React, Node.js and Express, Python and Django, Git, Docker, Kubernetes and OpenShift, microservices and serverless, with a full-stack capstone deployed to the cloud.', foot: 'View certificate', c: 'l-navy l-wide', ill: 'stack', img: 'cert-ibm-full-stack-developer', u: '' },
    { t: 'Google Project Management', who: 'Google · Coursera', when: 'Sep 2026', n: '7 courses', d: 'Initiating, planning and running traditional and Agile projects.', foot: 'Verify on Coursera', c: 'l-red', ill: 'flag', img: 'cert-google-project-management', u: 'https://coursera.org/verify/professional-cert/FNO8CY5VUBI1' },
    { t: 'Google Advanced Data Analytics', who: 'Google · Coursera', when: 'Aug 2026', n: '7 courses', d: 'Statistics, regression and machine learning in Python, with a capstone.', foot: 'Verify on Coursera', c: 'l-blue', ill: 'chart', img: 'cert-google-advanced-data-analytics', u: 'https://coursera.org/verify/professional-cert/EFS3MQDVCNMY' },
    { t: 'Google Cybersecurity', who: 'Google · Coursera', when: 'Aug 2026', n: '9 courses', d: 'Security frameworks, networks, Linux, SQL, SIEM tools and Python automation.', foot: 'Verify on Coursera', c: 'l-green', ill: 'shield', img: 'cert-google-cybersecurity', u: 'https://coursera.org/verify/professional-cert/EV6A6CZUO3XZ' },
    { t: 'Google AI', who: 'Google · Coursera', when: 'Jul 2026', n: '7 courses', d: 'AI for research, writing, data analysis and building small apps.', foot: 'Verify on Coursera', c: 'l-black', ill: 'spark', img: 'cert-google-ai', u: 'https://coursera.org/verify/professional-cert/26CKVVWU0EKY' },
    { t: 'IBM AI Developer', who: 'IBM · Coursera', when: 'Aug 2026', n: '10 courses', d: 'Web development, Python and Flask, and generative AI applications.', foot: 'Verify on Coursera', c: 'l-pink', ill: 'bulb', img: 'cert-ibm-ai-developer', u: 'https://coursera.org/verify/professional-cert/WYG3ENN67WGZ' },
    { t: 'Google AI Essentials', who: 'Google · Coursera', when: 'Sep 2026', n: '5 courses', d: 'Using AI tools responsibly to get more done at work.', foot: 'Verify on Coursera', c: 'l-yellow', ill: 'pen', img: 'cert-google-ai-essentials', u: 'https://coursera.org/verify/specialization/RD5VSI3KEUBL' }
  ];

  /* Individual course certificates (Google, on Coursera). code = Coursera verify code */
  var COURSES = [
    ['Introduction to Git and GitHub', 'Google IT Automation', 'Sep 16, 2026', 'XKPYGRWG5NR1'],
    ['Capstone: Applying Project Management in the Real World', 'Google Project Management', 'Sep 15, 2026', 'EIZQATYL4EYC'],
    ['Introduction to AI', 'Google AI Essentials', 'Sep 15, 2026', 'WG9NUE2ZA9RJ'],
    ['Discover the Art of Prompting', 'Google AI Essentials', 'Sep 20, 2026', '0CEGZOFPX8WV'],
    ['Use AI Responsibly', 'Google AI Essentials', 'Sep 20, 2026', 'MN1K79DD6RPD'],
    ['Stay Ahead of the AI Curve', 'Google AI Essentials', 'Sep 20, 2026', '7N31UGMJ2KVF'],
    ['Maximize Productivity With AI Tools', 'Google AI Essentials', 'Sep 18, 2026', '18BEC6JHCX7K'],
    ['Agile Project Management', 'Google Project Management', 'Sep 6, 2026', '1RMB1D3E7013'],
    ['Project Execution: Running the Project', 'Google Project Management', 'Sep 2, 2026', 'O5SMPLB3O5XN'],
    ['Foundations of Business Intelligence', 'Google Business Intelligence', 'Aug 29, 2026', 'YA0PNE20TZPH'],
    ['Using Python to Interact with the Operating System', 'Google IT Automation', 'Aug 27, 2026', 'YBJETE60VOYT'],
    ['Project Planning: Putting It All Together', 'Google Project Management', 'Aug 26, 2026', 'XGX1VPUGU0ON'],
    ['Put It to Work: Prepare for Cybersecurity Jobs', 'Google Cybersecurity', 'Aug 24, 2026', 'LAGABL6IARV7'],
    ['Automate Cybersecurity Tasks with Python', 'Google Cybersecurity', 'Aug 22, 2026', '4BSLO20PPXHX'],
    ['Accelerate Your Job Search with AI', 'Google Career Certificates', 'Aug 19, 2026', '18SDY3HZ8PA8'],
    ['Google Advanced Data Analytics Capstone', 'Google Advanced Data Analytics', 'Aug 19, 2026', 'BBDA8XDBZTII'],
    ['The Nuts and Bolts of Machine Learning', 'Google Advanced Data Analytics', 'Aug 18, 2026', 'GBLQKIUUEFRF'],
    ['Sound the Alarm: Detection and Response', 'Google Cybersecurity', 'Aug 15, 2026', 'UO16FIOIBP0I'],
    ['Project Initiation: Starting a Successful Project', 'Google Project Management', 'Aug 8, 2026', 'J5EKS4Z57RJW'],
    ['Regression Analysis: Simplify Complex Data Relationships', 'Google Advanced Data Analytics', 'Aug 7, 2026', 'KV7DZS5JT3KY'],
    ['Assets, Threats, and Vulnerabilities', 'Google Cybersecurity', 'Aug 5, 2026', '47AY1MAFYMD4'],
    ['The Power of Statistics', 'Google Advanced Data Analytics', 'Jul 30, 2026', '9SOAJ95WA8GM'],
    ['AI for App Building', 'Google AI', 'Jul 28, 2026', 'Y2MVH2ZL0048'],
    ['AI for Data Analysis', 'Google AI', 'Jul 26, 2026', 'UMHPJ3CLSSNC'],
    ['Foundations of Project Management', 'Google Project Management', 'Jul 24, 2026', 'UI1L6FDAW3IA'],
    ['AI for Content Creation', 'Google AI', 'Jul 23, 2026', 'HNQJ331RSBHT'],
    ['Tools of the Trade: Linux and SQL', 'Google Cybersecurity', 'Jul 22, 2026', 'VZT001FCE51O'],
    ['AI for Writing and Communicating', 'Google AI', 'Jul 20, 2026', '8KWN5CR1PLF7'],
    ['Go Beyond the Numbers: Translate Data into Insights', 'Google Advanced Data Analytics', 'Jul 15, 2026', 'MLQXIOMB1EWJ'],
    ['AI for Research and Insights', 'Google AI', 'Jul 14, 2026', 'BGC3X0E73L2D'],
    ['Connect and Protect: Networks and Network Security', 'Google Cybersecurity', 'Jul 13, 2026', 'PXP1YVN7DTN4'],
    ['Crash Course on Python', 'Google IT Automation', 'Jul 10, 2026', 'PWQDJTZ82GRU'],
    ['AI for Brainstorming and Planning', 'Google AI', 'Jul 6, 2026', '1PGGNJHAURHA'],
    ['Play It Safe: Manage Security Risks', 'Google Cybersecurity', 'Jul 4, 2026', 'JSJQHOMFNL37'],
    ['AI Fundamentals', 'Google AI', 'Jun 28, 2026', '650A433LEW80'],
    ['Foundations of Data Science', 'Google Advanced Data Analytics', 'Jun 27, 2026', 'Q30M6URIGFFB'],
    ['Foundations of Cybersecurity', 'Google Cybersecurity', 'Jun 25, 2026', '7BUM8PZW1LU0']
  ];
  COURSES.sort(function (a, b) { return new Date(b[2]) - new Date(a[2]); });

  var ILL = {
    stack: '<svg class="ill" viewBox="0 0 80 80"><rect x="12" y="46" width="56" height="14" rx="4" fill="#ef4a2b"/><rect x="12" y="30" width="56" height="14" rx="4" fill="#fff"/><rect x="12" y="14" width="56" height="14" rx="4" fill="#5b8cff"/><path d="M30 19l-5 2 5 2M50 19l5 2-5 2" stroke="#fff" stroke-width="2" fill="none"/></svg>',
    shield: '<svg class="ill" viewBox="0 0 80 80"><path d="M40 8 66 18v20c0 17-11 28-26 34C25 66 14 55 14 38V18z" fill="#fff" stroke="#111" stroke-width="3"/><path d="m29 40 8 8 15-17" fill="none" stroke="#2b8a2b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bulb: '<svg class="ill" viewBox="0 0 80 80"><path d="M40 10a20 20 0 0 0-12 36c3 2 4 5 4 8h16c0-3 1-6 4-8a20 20 0 0 0-12-36z" fill="#ffd83a" stroke="#111" stroke-width="3"/><rect x="31" y="56" width="18" height="10" rx="3" fill="#fff" stroke="#111" stroke-width="3"/><path d="M8 26h6M66 26h6M16 8l4 4M64 8l-4 4" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',
    flag: '<svg class="ill" viewBox="0 0 80 80"><path d="M18 70V10" stroke="#111" stroke-width="4" stroke-linecap="round"/><path d="M20 12h40l-8 12 8 12H20z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><circle cx="18" cy="70" r="5" fill="#111"/></svg>',
    chart: '<svg class="ill" viewBox="0 0 80 80"><rect x="10" y="12" width="60" height="56" rx="8" fill="#fff" stroke="#111" stroke-width="3"/><path d="M20 54V42M32 54V32M44 54V38M56 54V24" stroke="#be2768" stroke-width="6" stroke-linecap="round"/></svg>',
    spark: '<svg class="ill" viewBox="0 0 80 80"><path d="M40 8c3 16 10 23 26 26-16 3-23 10-26 26-3-16-10-23-26-26 16-3 23-10 26-26z" fill="#fff"/><path d="M64 52c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10z" fill="#ef4a2b"/></svg>',
    pen: '<svg class="ill" viewBox="0 0 80 80"><path d="m52 10 18 18-30 30-22 6 6-22z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="m46 16 18 18" stroke="#111" stroke-width="3"/><circle cx="34" cy="46" r="4" fill="#111"/></svg>'
  };


  /* extra detail shown in the project panel */
  var DETAIL = {
    'Route 2 Uni CRM': { role: 'Sole developer, now technical lead', year: '2025 – now', hl: ['Pipeline from enquiry to offer, Pre-CAS, CAS and visa', 'Role-based access and MFA for staff and partners', 'Used daily by 50+ staff, about 40% less manual reporting', '10-phase rebuild onto Next.js, NestJS, PostgreSQL and AWS'] },
    'Dreams Care Homes CRM': { role: 'Project manager and technical lead', year: '2026 – now', hl: ['Right-to-work, visa sponsorship and DBS expiry tracking', 'Staff documents and a full audit log', 'Firebase Auth, Firestore and Storage with role-based rules', 'Built on Next.js 14, TypeScript and Tailwind CSS'] },
    'Hajiri HR & Attendance': { role: 'Built for Route2Uni', hl: ['Daily attendance with approvals', 'Leave, holidays and notices in one place', 'Bikram Sambat and AD dates side by side', 'Team and department reports'] },
    'Kaam Khoj': { role: 'Founder', hl: ['Workers call employers directly, no commission', 'Nepali-first interface with a read-aloud button', 'Larger text option and works on weak internet', 'Job categories such as labourer, mason, plumber and electrician'] },
    'Slotly': { role: 'Designer and developer', hl: ['Services and customer list', 'Shareable booking link', 'Expected income and no-show tracking', 'Simple Romanised Nepali interface'] },
    'Partner Bulk Messaging': { role: 'Built for the Route2Uni B2B team', hl: ['Bulk messages on WhatsApp and email', 'Templates with personalised fields', 'Contact lists of partner agents', 'Delivery status for each partner'] },
    'TaskTrack': { role: 'Designer and developer', year: '2026', hl: ['Per-person daily work board', 'One-click PDF reports', 'IT asset register and attendance'] },
    'Mock Pre-CAS Interview': { role: 'Designer and developer', year: '2026', hl: ['23 timed questions with webcam recording', 'Live speech-to-text transcript', 'Rule-based scoring and a PDF report for counsellors'] },
    'UK University Intake Directory': { role: 'Designer and developer', year: '2026', hl: ['Search and sort partner universities', 'UG and PG tuition per year', 'Entry criteria and deadline flags'] },
    'KBM FM': { year: '2023', hl: ['Live radio streaming', 'Programme schedules', 'Hosted on AWS'] },
    'Mega Loksewa': { year: '2022', hl: ['Mock tests for government exams', 'Live classes', 'Learning management system'] },
    'Sanchar Sanket': { year: '2024', hl: ['News categories', 'Fast mobile reading', 'Managed hosting'] },
    'Sargam Sangeet Vidyalay': { year: '2024', hl: ['Website for a music school in Pune', 'Built through an agency partner'] },
    'Aaradhana Shrestha': { hl: ['Personal brand website for a corporate trainer'] }
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
  var isHome = document.body.classList.contains('home');
  if (grid) {
    grid.innerHTML = (isHome ? PROJECTS.slice(0, 6) : PROJECTS).map(function (p, i) {
      var link = p.url
        ? '<a class="w-link" href="' + p.url + '" target="_blank" rel="noopener">View project ' + ARROW + '<span class="sr-only" style="position:absolute;left:-9999px"> (' + esc(p.title) + ', opens in a new tab)</span></a>'
        : (p.live ? '<span class="w-private">Live · link on request</span>' : '<span class="w-private">' + LOCK + 'Private · demo on request</span>');
      var shot = p.img ? '<img src="' + p.img + '" alt="' + esc(p.title) + ' screenshot" loading="lazy">' : mock(p);
      return '<article class="work-card' + ((i % 4 === 0 || i % 4 === 3) ? ' is-dark' : '') + '" data-type="' + p.type + '" data-p="' + PROJECTS.indexOf(p) + '">' +
        '<span class="w-badge' + (p.live || p.badge ? '' : ' private') + '">' + (p.badge || (p.live ? 'Live' : 'Private')) + '</span>' +
        '<div class="w-text"><span class="w-cat">' + esc(p.cat) + '</span><h3 class="w-title">' + esc(p.title) + '</h3><p class="w-desc">' + esc(p.desc) + '</p><span class="w-stack">' + esc(p.stack) + '</span><div class="w-actions"><button class="w-more" type="button" data-open="' + PROJECTS.indexOf(p) + '">Details <span aria-hidden="true">+</span></button>' + link + '</div></div>' +
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
  function thumb(full, sm, title, label, verify) {
    return '<button class="cert-thumb" type="button" data-full="' + full + '" data-title="' + esc(title) + '" data-verify="' + (verify || '') + '"><img src="' + sm + '" alt="" width="640" height="495" loading="lazy"><small>' + esc(label) + '</small><b>' + esc(title) + '</b></button>';
  }
  var ar = $('#archiveRow');
  if (ar) {
    ar.innerHTML = CERTS.map(function (c) {
      return thumb('assets/img/' + c.img + '.webp', 'assets/img/' + c.img + '-sm.webp', c.t, c.who.split(' ·')[0] + ' · ' + c.when, c.u);
    }).join('');
  }
  var cr = $('#courseRow'), cf = $('#courseFilters'), cm = $('#courseMore');
  var GROUPS = [['all', 'All'], ['Google AI', 'Google AI'], ['Google Cybersecurity', 'Cybersecurity'], ['Google Advanced Data Analytics', 'Data Analytics'], ['Google Project Management', 'Project Management'], ['Google AI Essentials', 'AI Essentials'], ['other', 'Other']];
  var MAIN = GROUPS.slice(1, 6).map(function (g) { return g[0]; });
  var courseFilter = 'all', showAll = false;
  function renderCourses() {
    if (!cr) return;
    var list = COURSES.filter(function (c) { return courseFilter === 'all' || (courseFilter === 'other' ? MAIN.indexOf(c[1]) < 0 : c[1] === courseFilter); });
    var shown = (courseFilter === 'all' && !showAll) ? list.slice(0, 12) : list;
    cr.innerHTML = shown.map(function (c) {
      var k = c[3].toLowerCase();
      return thumb('assets/img/courses/' + k + '.webp', 'assets/img/courses/' + k + '-sm.webp', c[0], c[1].replace('Google ', '') + ' · ' + c[2], 'https://coursera.org/verify/' + c[3]);
    }).join('');
    if (cm) { cm.hidden = !(courseFilter === 'all' && list.length > 12); cm.textContent = showAll ? 'Show fewer' : 'Show all ' + list.length + ' course certificates'; }
  }
  if (cf) {
    cf.innerHTML = GROUPS.map(function (g) {
      var n = g[0] === 'all' ? COURSES.length : COURSES.filter(function (c) { return g[0] === 'other' ? MAIN.indexOf(c[1]) < 0 : c[1] === g[0]; }).length;
      return '<button class="filter" type="button" data-cf="' + g[0] + '" aria-pressed="' + (g[0] === 'all') + '">' + g[1] + ' <span style="opacity:.6">' + n + '</span></button>';
    }).join('');
    cf.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cf]'); if (!b) return;
      courseFilter = b.getAttribute('data-cf');
      $$('[data-cf]', cf).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderCourses();
    });
  }
  if (cm) cm.addEventListener('click', function () { showAll = !showAll; renderCourses(); });
  renderCourses();

  /* ---------------- lightbox (prev / next / swipe) ---------------- */
  var lb = null, lbItems = [], lbIndex = 0, lastFocus = null;
  function itemFrom(t) {
    if (t.classList.contains('g-item')) return { full: t.getAttribute('data-full'), title: t.querySelector('figcaption b').textContent + ' · ' + t.querySelector('figcaption span').textContent, verify: '' };
    if (t.classList.contains('cert-open')) { var c = CERTS[+t.getAttribute('data-i')]; return { full: 'assets/img/' + c.img + '.webp', title: c.t, verify: c.u }; }
    return { full: t.getAttribute('data-full'), title: t.getAttribute('data-title'), verify: t.getAttribute('data-verify') };
  }
  function drawLb() {
    var it = lbItems[lbIndex];
    var img = $('.lb-img', lb);
    img.src = it.full; img.alt = it.title;
    $('.cap', lb).innerHTML = '<b>' + esc(it.title) + '</b>' + (it.verify ? ' · <a href="' + it.verify + '" target="_blank" rel="noopener">Verify on Coursera ↗</a>' : '') + (lbItems.length > 1 ? '<span class="lb-count">' + (lbIndex + 1) + ' / ' + lbItems.length + '</span>' : '');
    lb.setAttribute('aria-label', it.title);
  }
  function stepLb(d) { if (lbItems.length < 2) return; lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; drawLb(); }
  function closeLb() { if (!lb) return; lb.remove(); lb = null; document.body.classList.remove('lock'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function openLb(items, index) {
    closeLb(); lastFocus = document.activeElement;
    lbItems = items; lbIndex = index || 0;
    lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<button class="icon-btn close" type="button" aria-label="Close">✕</button>' +
      (items.length > 1 ? '<button class="lb-nav prev" type="button" aria-label="Previous">‹</button><button class="lb-nav next" type="button" aria-label="Next">›</button>' : '') +
      '<img class="lb-img" alt=""><p class="cap"></p>';
    lb.addEventListener('click', function (ev) {
      if (ev.target === lb || ev.target.classList.contains('close')) closeLb();
      else if (ev.target.classList.contains('prev')) stepLb(-1);
      else if (ev.target.classList.contains('next')) stepLb(1);
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) stepLb(dx < 0 ? 1 : -1); sx = null; });
    document.body.appendChild(lb); document.body.classList.add('lock');
    drawLb(); $('.close', lb).focus();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.cert-thumb, .cert-open, .g-item[data-full]');
    if (!t) return;
    var group = t.classList.contains('g-item') ? $$('.g-item[data-full]', t.parentNode) : t.classList.contains('cert-open') ? [t] : $$('.cert-thumb', t.parentNode);
    openLb(group.map(itemFrom), group.indexOf(t));
  });

  /* ---------------- project details panel ---------------- */
  var panel = null;
  function closePanel() {
    if (!panel) return;
    var p = panel; panel = null;
    p.classList.remove('open'); setTimeout(function () { p.remove(); }, 320);
    document.body.classList.remove('lock'); if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function openPanel(i) {
    var p = PROJECTS[i]; if (!p) return;
    var d = DETAIL[p.title] || {};
    if (!panel) lastFocus = document.activeElement;
    if (panel) panel.remove();
    panel = document.createElement('div');
    panel.className = 'pp'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', p.title);
    var hl = (d.hl || []).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('');
    var meta = [d.role ? ['Role', d.role] : null, d.year ? ['Year', d.year] : null, ['Status', p.badge || (p.live ? 'Live' : 'Private')]].filter(Boolean)
      .map(function (m) { return '<div><small>' + m[0] + '</small><b>' + esc(m[1]) + '</b></div>'; }).join('');
    var stack = p.stack.split(' · ').map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
    var cta = p.url
      ? '<a class="btn btn--dark btn--pill" href="' + p.url + '" target="_blank" rel="noopener">Open live project ' + ARROW + '</a>'
      : '<a class="btn btn--dark btn--pill" href="contact.html?topic=' + encodeURIComponent('Something else') + '">Ask for a demo ' + ARROW + '</a>';
    panel.innerHTML = '<div class="pp-backdrop" data-close></div><article class="pp-sheet" tabindex="-1">' +
      '<header class="pp-head"><span class="w-cat">' + esc(p.cat) + '</span><button class="icon-btn" type="button" data-close aria-label="Close">✕</button></header>' +
      '<div class="pp-shot">' + mock(p) + '</div>' +
      '<h2>' + esc(p.title) + '</h2><p class="pp-desc">' + esc(p.desc) + '</p>' +
      '<div class="pp-meta">' + meta + '</div>' +
      (hl ? '<h3>Highlights</h3><ul class="pp-hl">' + hl + '</ul>' : '') +
      '<h3>Stack</h3><div class="tags-row">' + stack + '</div>' +
      '<footer class="pp-foot">' + cta + '<span class="pp-nav"><span class="pp-count">' + (i + 1) + ' / ' + PROJECTS.length + '</span><button class="icon-btn" type="button" data-step="-1" aria-label="Previous project">‹</button><button class="icon-btn" type="button" data-step="1" aria-label="Next project">›</button></span></footer></article>';
    panel.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { closePanel(); return; }
      var st = e.target.closest('[data-step]');
      if (st) openPanel((i + (+st.getAttribute('data-step')) + PROJECTS.length) % PROJECTS.length);
    });
    document.body.appendChild(panel); document.body.classList.add('lock');
    var pnl = panel;
    requestAnimationFrame(function () { pnl.classList.add('open'); $('.pp-sheet', pnl).focus(); });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-open]');
    if (b) { e.preventDefault(); openPanel(+b.getAttribute('data-open')); return; }
    var card = e.target.closest && e.target.closest('.work-card');
    if (card && !e.target.closest('a, button')) openPanel(+card.getAttribute('data-p'));
  });
  try { var pq = new URLSearchParams(location.search).get('project'); if (pq !== null && grid) openPanel(+pq); } catch (e) {}

  /* ---------------- quick search (Ctrl / Cmd + K, or "/") ---------------- */
  var PAGES = [['Home', 'index.html', 'Start page'], ['About', 'about.html', 'Background and how I work'], ['Services', 'services.html', 'What I can build for you'], ['Work', 'projects.html', 'All 14 projects'], ['Experience', 'experience.html', 'Career timeline and skills'], ['Education', 'education.html', 'Degrees'], ['Certificates', 'credentials.html', '44 certificates'], ['Contact', 'contact.html', 'Send a message'], ['Resume', 'resume.html', 'One-page resume'], ['Download CV', 'CV-Hemraj%20Adhikari.pdf', 'PDF file']];
  function searchIndex() {
    var out = PAGES.map(function (p) { return { k: 'Page', t: p[0], s: p[2], go: function () { location.href = p[1]; } }; });
    PROJECTS.forEach(function (p, i) { out.push({ k: 'Project', t: p.title, s: p.cat, go: function () { if (grid && !isHome) openPanel(i); else location.href = 'projects.html?project=' + i; } }); });
    var certItems = CERTS.map(function (x) { return { full: 'assets/img/' + x.img + '.webp', title: x.t, verify: x.u }; });
    CERTS.forEach(function (c, i) { out.push({ k: 'Certificate', t: c.t, s: c.who + ' · ' + c.when, go: function () { openLb(certItems, i); } }); });
    var courseItems = COURSES.map(function (x) { return { full: 'assets/img/courses/' + x[3].toLowerCase() + '.webp', title: x[0], verify: 'https://coursera.org/verify/' + x[3] }; });
    COURSES.forEach(function (c, i) { out.push({ k: 'Course', t: c[0], s: c[1] + ' · ' + c[2], go: function () { openLb(courseItems, i); } }); });
    return out;
  }
  var qs = null, qsItems = [], qsSel = 0;
  function closeQs() { if (!qs) return; qs.remove(); qs = null; document.body.classList.remove('lock'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function drawQs(q) {
    var all = searchIndex(); q = (q || '').trim().toLowerCase();
    qsItems = q ? all.filter(function (x) { return (x.t + ' ' + x.s + ' ' + x.k).toLowerCase().indexOf(q) > -1; }).slice(0, 40)
                : all.filter(function (x) { return x.k === 'Page' || x.k === 'Project'; }).slice(0, 16);
    qsSel = 0;
    $('.qs-list', qs).innerHTML = qsItems.length
      ? qsItems.map(function (x, i) { return '<li role="option" data-qi="' + i + '" aria-selected="' + (i === 0) + '"><span class="qs-k">' + x.k + '</span><b>' + esc(x.t) + '</b><small>' + esc(x.s) + '</small></li>'; }).join('')
      : '<li class="qs-empty">No matches. Try “CRM”, “AWS” or “Cybersecurity”.</li>';
  }
  function moveQs(d) {
    var lis = $$('[data-qi]', qs); if (!lis.length) return;
    qsSel = (qsSel + d + lis.length) % lis.length;
    lis.forEach(function (l, i) { l.setAttribute('aria-selected', String(i === qsSel)); });
    lis[qsSel].scrollIntoView({ block: 'nearest' });
  }
  function pickQs(i) { var it = qsItems[i]; if (!it) return; closeQs(); it.go(); }
  function openQs() {
    if (qs) return;
    setMenu(false);
    lastFocus = document.activeElement;
    qs = document.createElement('div'); qs.className = 'qs'; qs.setAttribute('role', 'dialog'); qs.setAttribute('aria-modal', 'true'); qs.setAttribute('aria-label', 'Search the site');
    qs.innerHTML = '<div class="qs-box"><label class="qs-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="qs-input" type="search" placeholder="Search pages, projects, certificates…" autocomplete="off" aria-label="Search"><button type="button" class="qs-esc" aria-label="Close search">Esc</button></label><ul class="qs-list" role="listbox"></ul><p class="qs-tip"><kbd>↑</kbd><kbd>↓</kbd> move · <kbd>Enter</kbd> open · <kbd>Ctrl</kbd>+<kbd>K</kbd> anywhere</p></div>';
    qs.addEventListener('click', function (e) {
      if (e.target === qs || e.target.classList.contains('qs-esc')) { closeQs(); return; }
      var li = e.target.closest('[data-qi]'); if (li) pickQs(+li.getAttribute('data-qi'));
    });
    var input = $('input', qs);
    input.addEventListener('input', function () { drawQs(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveQs(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveQs(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); pickQs(qsSel); }
    });
    document.body.appendChild(qs); document.body.classList.add('lock');
    drawQs(''); input.focus();
  }
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-search]')) openQs(); });
  if (!/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) $$('.search-btn kbd').forEach(function (k) { k.textContent = 'Ctrl K'; });

  /* one keyboard handler for every overlay */
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qs) closeQs(); else openQs(); return; }
    var typing = /input|textarea|select/i.test((document.activeElement || {}).tagName || '');
    if (e.key === '/' && !qs && !typing) { e.preventDefault(); openQs(); return; }
    if (e.key === 'Escape') { if (qs) closeQs(); else if (lb) closeLb(); else if (panel) closePanel(); }
    if (lb && e.key === 'ArrowRight') stepLb(1);
    if (lb && e.key === 'ArrowLeft') stepLb(-1);
    if (panel && !lb && e.key === 'ArrowRight') { var n = $('[data-step="1"]', panel); if (n) n.click(); }
    if (panel && !lb && e.key === 'ArrowLeft') { var pv = $('[data-step="-1"]', panel); if (pv) pv.click(); }
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

  /* ---------------- nav, progress, back to top ---------------- */
  var nav = $('.nav'), menuBtn = $('#menuBtn'), links = $('#navLinks'), progressBar = $('#progress'), toTop = $('#toTop'), mBar = $('#mBar');
  function setMenu(open) {
    if (!links) return;
    links.classList.toggle('open', open);
    document.body.classList.toggle('lock', open);
    if (menuBtn) { menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); }
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  if (links) links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  var ticking = false;
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (progressBar) progressBar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    if (toTop) toTop.classList.toggle('show', y > window.innerHeight * 0.9);
    if (mBar) mBar.classList.toggle('show', y > window.innerHeight * 0.6 && y < h - 120);
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  var mTop = $('.m-top'); if (mTop) mTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------------- toast + copy ---------------- */
  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }
  document.addEventListener('click', function (e) {
    var c = e.target.closest && e.target.closest('[data-copy]');
    if (!c) return;
    var text = c.getAttribute('data-copy');
    if (c.tagName === 'A') e.preventDefault();
    var done = function () { toast('Email copied: ' + text); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { toast(text); });
    else toast(text);
  });

  /* gallery video play / pause */
  $$('.g-video').forEach(function (fig) {
    var v = $('video', fig), b = $('.g-sound', fig);
    if (!v || !b) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); b.textContent = '▶'; b.setAttribute('aria-label', 'Play video'); }
    b.addEventListener('click', function () {
      if (v.paused) { v.play(); b.textContent = '❚❚'; b.setAttribute('aria-label', 'Pause video'); }
      else { v.pause(); b.textContent = '▶'; b.setAttribute('aria-label', 'Play video'); }
    });
  });

  /* ---------------- spotlight on project cards ---------------- */
  document.addEventListener('pointermove', function (e) {
    var card = e.target.closest && e.target.closest('.work-card');
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  /* ---------------- reveal on scroll (only for things below the fold) ---------------- */
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealEls = $$('.section-head, .work-card, .tl-item, .edu-card, .l-card, .fact, .principle, .svc, .step, .skill, .stat, .split-card, .cert-thumb, .faq details, .contact-copy, .form, .learn-head, .about-photo');
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.remove('pre'); ro.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el, i) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal', 'pre');
        el.style.transitionDelay = ((i % 3) * 70) + 'ms';
        ro.observe(el);
      }
    });
  }

  /* active menu item = current page */
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.nav-links a').forEach(function (a) {
    if ((a.getAttribute('href') || '').toLowerCase() === here) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
  });

  /* "Explore" on a service opens the contact page with the project type chosen */
  var topic = null;
  try { topic = new URLSearchParams(location.search).get('topic'); } catch (e) {}
  if (topic) { var sel = $('#f-topic'); if (sel) sel.value = topic; }

  /* FAQ: one open at a time */
  $$('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) $$('.faq details').forEach(function (o) { if (o !== d) o.open = false; }); });
  });

  /* ---------------- contact form (Formspree) ---------------- */
  var form = $('#contactForm'), msg = $('#formMsg'), ta = $('#f-msg'), cnt = $('#msgCount');
  function check(f) {
    var ok = !!f.value.trim() && (f.type !== 'email' || /^\S+@\S+\.\S+$/.test(f.value.trim()));
    var field = f.closest('.field');
    if (field) { field.classList.toggle('invalid', !ok); field.classList.toggle('valid', ok); }
    f.setAttribute('aria-invalid', String(!ok));
    return ok;
  }
  if (ta && cnt) ta.addEventListener('input', function () { cnt.textContent = ta.value.length + '/2000'; });
  if (form) {
    $$('[required]', form).forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.closest('.field').classList.contains('invalid')) check(f); });
      f.addEventListener('change', function () { check(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = $$('[required]', form).filter(function (f) { return !check(f); });
      if (bad.length) { msg.className = 'form-msg err'; msg.textContent = 'Please fix the highlighted fields.'; bad[0].focus(); return; }
      var btn = $('button[type=submit]', form); btn.disabled = true;
      msg.className = 'form-msg'; msg.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.innerHTML = '<div class="form-done"><span class="tick"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5 9-10"/></svg></span><h3>Message sent</h3><p>Thank you. I will reply within a day, usually sooner.</p><a class="btn btn--ghost btn--pill" href="index.html">Back to home</a></div>';
          toast('Message sent');
        })
        .catch(function () { msg.className = 'form-msg err'; msg.textContent = 'The message could not be sent. Please email hemrajhadhikari@gmail.com directly.'; btn.disabled = false; });
    });
  }

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
