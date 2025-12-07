/* =========================
   Portfolio — script.js
   ========================= */

// Mobile nav toggle
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// Close menu when clicking outside or pressing Esc
(function setupMenuGuards() {
  const links = document.getElementById('nav-links');

  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.nav-toggle');
    const insideMenu = e.target.closest('#nav-links');
    if (toggle || insideMenu) return;
    links.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') links.classList.remove('open');
  });
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for in-page nav links
(function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      document.getElementById('nav-links')?.classList.remove('open');

      if (prefersReduced) {
        target.scrollIntoView();
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Move focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      target.focus({ preventScroll: true });
    });
  });
})();

// Highlight active section in nav as you scroll
(function sectionObserver() {
  const sections = document.querySelectorAll('main .section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const map = {};
  navLinks.forEach((a) => (map[a.getAttribute('href')] = a));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const href = `#${entry.target.id}`;
        const link = map[href];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
  );

  sections.forEach((s) => io.observe(s));
})();

// Contact form (demo)
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  if (status) {
    status.textContent =
      "Thanks! This demo form doesn’t send emails. Please use the email on the left to reach me.";
  }
  e.target.reset();
}

// Lazy-load hero image (if supported)
(function lazyHero() {
  const img = document.querySelector('.hero-image img');
  if (!img) return;
  if ('loading' in HTMLImageElement.prototype) {
    img.setAttribute('loading', 'lazy');
    return;
  }
  // Fallback: simple IntersectionObserver preloader
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const src = el.getAttribute('data-src') || el.getAttribute('src');
      el.src = src;
      obs.unobserve(el);
    });
  });
  io.observe(img);
})();