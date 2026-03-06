/* ============================================
   CAMERON WEB SOLUTIONS — script.js
   Light enhancements: nav, smooth scroll, form
   ============================================ */

(function () {
  'use strict';

  /* ---------- Dynamic year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll shadow ---------- */
  const header = document.getElementById('site-header');
  function handleScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Scroll-triggered fade-in ---------- */
  // Add .fade-in to key elements
  const fadeTargets = document.querySelectorAll(
    '.highlight-card, .package-card, .addon-card, .reason-card, .step, .contact-info, .contact-form-wrapper'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset errors
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('has-error');
      });

      let valid = true;

      // Name
      const name = form.querySelector('#name');
      if (!name.value.trim()) {
        name.closest('.form-group').classList.add('has-error');
        valid = false;
      }

      // Email
      const email = form.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.closest('.form-group').classList.add('has-error');
        valid = false;
      }

      if (!valid) return;

      // Simulate submission (replace with real form handler)
      form.querySelector('button[type="submit"]').disabled = true;
      form.querySelector('button[type="submit"]').textContent = 'Sending…';

      setTimeout(function () {
        form.reset();
        form.querySelector('button[type="submit"]').disabled = false;
        form.querySelector('button[type="submit"]').textContent = 'Send Enquiry';
        successMsg.classList.add('visible');

        // Hide success message after 6 seconds
        setTimeout(function () {
          successMsg.classList.remove('visible');
        }, 6000);
      }, 800);
    });

    // Clear error on input
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        this.closest('.form-group').classList.remove('has-error');
      });
    });
  }
})();
