// ===== MENU HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});



// ===== NAVIGATION ACTIVE AU SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul a');

    sections.forEach((section, index) => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

// ===== APPARITION DES ELEMENTS AU SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .card, .apropos-text').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// ===== FORMULAIRE DE CONTACT AVEC FORMSPREE =====
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Envoi en cours...';

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            btn.textContent = 'Message envoyé ✓';
            btn.style.background = '#d4af37';
            btn.style.color = '#0a0a0a';
            form.reset();
            setTimeout(() => {
                btn.textContent = 'Envoyer';
                btn.style.background = 'transparent';
                btn.style.color = '#d4af37';
            }, 3000);
        } else {
            btn.textContent = 'Erreur, réessayez';
        }
    } catch (error) {
        btn.textContent = 'Erreur, réessayez';
    }
});
// ===== NAVIGATION SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});