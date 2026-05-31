const progressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.setProperty('--progress-width', bar.dataset.width);
            bar.classList.add('animate');
        }
    });
}, { threshold: 0.4 });

progressBars.forEach((bar) => skillObserver.observe(bar));

const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.checked = false;
    });
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let note = contactForm.querySelector('.form-note');
        if (!note) {
            note = document.createElement('p');
            note.className = 'form-note';
            contactForm.appendChild(note);
        }
        note.textContent = 'Tin nhắn đã được ghi nhận. Cảm ơn bạn đã liên hệ!';
        contactForm.reset();
    });
}
