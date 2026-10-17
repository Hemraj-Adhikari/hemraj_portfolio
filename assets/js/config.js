/* Site settings — edit this file, run `npm run build`, then push.
   Every option is off when left empty, so nothing new appears on the site until you fill it in. */
window.SITE = {
  /* Privacy-friendly analytics (no cookies, no personal data).
     1. Make a free account at https://www.goatcounter.com and pick a code, e.g. "hemraj".
     2. Put that code here. Leave it empty for no analytics at all. */
  goatcounter: '',

  /* A booking link for a short call, e.g. 'https://cal.com/hemraj/15min' or a Calendly link.
     Shows a "Book a 15-minute call" button on the home and contact pages. Empty = hidden. */
  bookingUrl: '',

  /* Testimonials. Only real quotes, with the person's permission
     (LinkedIn recommendations are a good source). Empty list = the section stays hidden.
     Example:
     { quote: 'Hemraj rebuilt our ...', name: 'Full Name', role: 'Job title, Company', link: 'https://www.linkedin.com/in/...' } */
  testimonials: [
  ]
};

/* load GoatCounter only when a code is set */
(function () {
  var code = (window.SITE && window.SITE.goatcounter || '').trim();
  if (!code || /^(localhost|127\.)/.test(location.hostname)) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + code + '.goatcounter.com/count');
  document.head.appendChild(s);
})();
