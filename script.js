const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const form = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

menuToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('is-open');
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Silakan isi semua kolom terlebih dahulu.';
    formMessage.style.color = '#dc2626';
    return;
  }

  formMessage.textContent = 'Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.';
  formMessage.style.color = '#16a34a';
  form.reset();
});

window.addEventListener('click', (event) => {
  if (!event.target.closest('.site-nav') && !event.target.closest('.menu-toggle')) {
    siteNav?.classList.remove('is-open');
  }
});

const revealElements = document.querySelectorAll('.section, .service-card, .project-card, .testimonial-card, .about-card, .hero-card, .contact-info, .contact-form');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

revealElements.forEach((element) => observer.observe(element));
