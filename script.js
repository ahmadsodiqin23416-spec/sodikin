const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const form = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');
const projectButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.querySelector('.testimonial-nav.prev');
const nextButton = document.querySelector('.testimonial-nav.next');

let currentTestimonial = 0;

menuToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('is-open');
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !service || !message) {
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

projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    projectButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.style.display = 'grid';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const updateTestimonial = (index) => {
  const offset = index * -100;
  testimonialTrack.style.transform = `translateX(${offset}%)`;
  currentTestimonial = index;
};

prevButton?.addEventListener('click', () => {
  const nextIndex = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
  updateTestimonial(nextIndex);
});

nextButton?.addEventListener('click', () => {
  const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
  updateTestimonial(nextIndex);
});

setInterval(() => {
  const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
  updateTestimonial(nextIndex);
}, 6000);

const revealElements = document.querySelectorAll('.section, .service-card, .project-card, .testimonial-slide, .about-card, .hero-card, .contact-info, .contact-form');
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
