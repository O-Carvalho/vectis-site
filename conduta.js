/* ============================================
   VECTIS — conduta.js
   ============================================ */

// ===== Header scroll effect =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// ===== Accordion =====
document.querySelectorAll('.rule-item__header').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.rule-item');
        const body = item.querySelector('.rule-item__body');
        const isOpen = item.classList.contains('is-open');

        // Close all
        document.querySelectorAll('.rule-item.is-open').forEach(openItem => {
            openItem.classList.remove('is-open');
            openItem.querySelector('.rule-item__body').classList.remove('is-open');
            openItem.querySelector('.rule-item__header').setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it was closed
        if (!isOpen) {
            item.classList.add('is-open');
            body.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
