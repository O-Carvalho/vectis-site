/* ============================================
   VECTIS — SÓCIOS FUNDADORES — JavaScript
   ============================================ */

// ===== COUNTDOWN (30 dias a partir de hoje) =====
(function initCountdown() {
    const KEY = 'vectis_sf_deadline';
    let deadline = localStorage.getItem(KEY);
    if (!deadline) {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        deadline = d.getTime();
        localStorage.setItem(KEY, deadline);
    } else {
        deadline = parseInt(deadline, 10);
    }

    function update() {
        const now = Date.now();
        const diff = deadline - now;
        if (diff <= 0) {
            document.getElementById('cdDias').textContent = '00';
            document.getElementById('cdHoras').textContent = '00';
            document.getElementById('cdMin').textContent = '00';
            document.getElementById('cdSec').textContent = '00';
            return;
        }
        const dias  = Math.floor(diff / 86400000);
        const horas = Math.floor((diff % 86400000) / 3600000);
        const min   = Math.floor((diff % 3600000) / 60000);
        const sec   = Math.floor((diff % 60000) / 1000);
        const pad = n => String(n).padStart(2, '0');
        document.getElementById('cdDias').textContent  = pad(dias);
        document.getElementById('cdHoras').textContent = pad(horas);
        document.getElementById('cdMin').textContent   = pad(min);
        document.getElementById('cdSec').textContent   = pad(sec);
    }
    update();
    setInterval(update, 1000);
})();

// ===== VAGAS (ilustrativo) =====
const TOTAL_VAGAS = 50;
const USADAS      = 32;
const RESTANTES   = TOTAL_VAGAS - USADAS;
const PCT         = Math.round((USADAS / TOTAL_VAGAS) * 100);

document.querySelectorAll('#vagasUsadas').forEach(el => el.textContent = USADAS);
document.querySelectorAll('#vagasRestantes, #vagasRestantes2').forEach(el => el.textContent = RESTANTES);
document.querySelectorAll('#pctNum').forEach(el => el.textContent = PCT);

// Animar barra e círculo SVG na entrada
window.addEventListener('load', () => {
    setTimeout(() => {
        const fill = document.getElementById('vagasFill');
        if (fill) fill.style.width = PCT + '%';

        const circle = document.getElementById('progressCircle');
        if (circle) {
            const circumference = 2 * Math.PI * 80;
            const offset = circumference - (PCT / 100) * circumference;
            circle.style.transition = 'stroke-dashoffset 1.5s ease';
            circle.setAttribute('stroke-dasharray', circumference.toFixed(1));
            circle.setAttribute('stroke-dashoffset', offset.toFixed(1));
        }
    }, 400);
});

// ===== PARTÍCULAS =====
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('span');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            position:absolute;
            width:${size}px; height:${size}px;
            background:rgba(200,160,64,${Math.random() * 0.3 + 0.05});
            border-radius:50%;
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            animation: floatP ${5 + Math.random() * 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatP {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
            33%  { transform: translateY(-${20 + Math.random()*20}px) translateX(${10 - Math.random()*20}px); opacity: 1; }
            66%  { transform: translateY(${10 + Math.random()*10}px) translateX(${-10 + Math.random()*20}px); opacity: 0.4; }
        }
    `;
    document.head.appendChild(style);
})();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
    '.sf-benefit, .sf-step, .sf-manifesto__inner, .sf-countdown, .sf-form-wrap, .sf-escassez__left, .sf-escassez__right'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 80);
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));

// ===== FORMULÁRIO =====
const sfForm    = document.getElementById('sfForm');
const sfSuccess = document.getElementById('sfSuccess');

if (sfForm) {
    sfForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('sfSubmitBtn');
        const btnText = document.getElementById('sfBtnText');
        btn.disabled = true;
        btnText.textContent = 'A processar...';

        // Simulação de envio (2s)
        setTimeout(() => {
            const nome = document.getElementById('sf-nome').value.split(' ')[0];
            document.getElementById('sfSuccessName').textContent = nome;
            sfForm.style.display = 'none';
            sfSuccess.classList.add('visible');
            sfForm.reset();
        }, 2000);
    });
}

// ===== SMOOTH SCROLL NOS BOTÕES =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
