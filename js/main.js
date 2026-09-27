/* ============================================================
   NUTS & CHOCOLATES — main.js
   Theme-free (single festive theme) · mobile nav · reveals
   WhatsApp enquiry links · contact form → WhatsApp (mailto fallback)
   ============================================================ */

/* ------------------------- CONFIG -------------------------
   Change these two lines only — the whole site updates.      */
const GIFTING_CONFIG = {
  whatsappNumber: '919000000000', // digits only, with country code
  email: 'hello@nutsandchocolates.example',
};

/* ------------------------- WHATSAPP LINKS ------------------------- */
function waLink(message) {
  const text = encodeURIComponent(message);
  return 'https://wa.me/' + GIFTING_CONFIG.whatsappNumber + '?text=' + text;
}

function emailLink(subject, body) {
  return (
    'mailto:' + GIFTING_CONFIG.email +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body)
  );
}

/* Every element with [data-wa] opens WhatsApp with a preset message.
   The message is read from data-wa; {package} is filled from the
   closest [data-package] ancestor, if any.                        */
document.querySelectorAll('[data-wa]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let msg = el.getAttribute('data-wa') || 'Hi! I want to enquire about corporate gift boxes.';
    const pkg = el.closest('[data-package]');
    if (pkg && msg.indexOf('{package}') !== -1) {
      msg = msg.replace('{package}', pkg.getAttribute('data-package'));
    }
    window.open(waLink(msg), '_blank', 'noopener');
  });
});

/* ------------------------- HEADER SCROLL STATE ------------------------- */
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');

function onScroll() {
  const y = window.scrollY;
  if (header) header.classList.toggle('is-scrolled', y > 10);
  if (toTop) toTop.classList.toggle('is-visible', y > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (toTop) {
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ------------------------- MOBILE NAV ------------------------- */
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  siteNav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      siteNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ------------------------- SCROLL REVEALS ------------------------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ------------------------- FOOTER YEAR ------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ------------------------- FLOATING WHATSAPP ------------------------- */
const waFloat = document.getElementById('waFloat');
if (waFloat) {
  waFloat.href = waLink("Hi Nuts & Chocolates! I'd like to enquire about corporate gift boxes for our team.");
  waFloat.target = '_blank';
  waFloat.rel = 'noopener';
}

/* ------------------------- CONTACT FORM → WHATSAPP ------------------------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const formError = document.getElementById('formError');
  const formNote = document.getElementById('formNote');
  const fallback = document.getElementById('formFallback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const val = (id) => (document.getElementById(id) || {}).value || '';
    const name = val('cf-name').trim();
    const company = val('cf-company').trim();
    const phone = val('cf-phone').trim();
    const occasion = val('cf-occasion');
    const qty = val('cf-qty').trim();
    const pkg = val('cf-package');
    const message = val('cf-message').trim();

    if (!name || !phone || !message) {
      if (formError) formError.hidden = false;
      return;
    }
    if (formError) formError.hidden = true;

    const lines = [
      'Hi Nuts & Chocolates! Corporate gift enquiry:',
      '',
      '• Name: ' + name,
      '• Company: ' + (company || '—'),
      '• Phone: ' + phone,
      '• Occasion: ' + (occasion || '—'),
      '• Approx. quantity: ' + (qty || '—'),
      '• Package of interest: ' + pkg,
    ];
    if (message) lines.push('', 'Notes: ' + message);

    window.open(waLink(lines.join('\n')), '_blank', 'noopener');

    if (fallback) {
      fallback.href = emailLink('Corporate gift enquiry — ' + (company || name), lines.join('\n'));
      fallback.hidden = false;
    }
    if (formNote) formNote.textContent = 'WhatsApp should have opened. If not, use the email link below — nothing is stored on this site.';
  });
}
