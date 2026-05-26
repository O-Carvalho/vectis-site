/* ============================================
   VECTIS MARTIAL ACADEMY - JavaScript Final
   ============================================ */

// ===== Header scroll effect =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Active link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Reveal animations on scroll =====
const revealElements = document.querySelectorAll(
    '.pillar, .value-card, .about__card, .mat-card, .contact__item, .manifesto__content'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// ===== Form submission =====
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Obrigado, ${name}! A nossa equipa entrará em contato em breve.\n\nVECTIS — Disciplina. Técnica. Caráter.`);
    form.reset();
});

// ===== Parallax suave no emblema =====
const emblem = document.querySelector('.emblem');
const heroSection = document.querySelector('.hero');

if (emblem && heroSection && window.innerWidth > 992) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 60;
        const y = (e.clientY - rect.top - rect.height / 2) / 60;
        emblem.style.transform = `translate(${x}px, ${y}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        emblem.style.transform = 'translate(0, 0)';
    });
}
