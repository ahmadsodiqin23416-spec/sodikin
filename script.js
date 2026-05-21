document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');
  const navLinks = document.querySelectorAll('.site-nav a');
  const form = document.getElementById('contact-form');
  const formMessage = document.querySelector('.form-message');
  const projectButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevButton = document.querySelector('.testimonial-nav.prev');
  const nextButton = document.querySelector('.testimonial-nav.next');

  let currentTestimonial = 0;

  const toggleMobileMenu = () => {
    if (!menuToggle || !siteNav) return;
    siteNav.classList.toggle('is-open');
    const expanded = siteNav.classList.contains('is-open');
    menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  };

  menuToggle?.addEventListener('click', toggleMobileMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !service || !message) {
      if (formMessage) {
        formMessage.textContent = 'Silakan isi semua kolom terlebih dahulu.';
        formMessage.style.color = '#dc2626';
      }
      return;
    }

    if (formMessage) {
      formMessage.textContent = 'Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.';
      formMessage.style.color = '#16a34a';
    }
    form.reset();
  });

  window.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.site-nav') && !target.closest('.menu-toggle')) {
      siteNav?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  projectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      projectButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        card.style.display = filter === 'all' || category === filter ? 'grid' : 'none';
      });
    });
  });

  const updateTestimonial = (index) => {
    if (!testimonialTrack || testimonialSlides.length === 0) return;
    const offset = index * -100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
    currentTestimonial = index;
  };

  prevButton?.addEventListener('click', () => {
    if (testimonialSlides.length === 0) return;
    const nextIndex = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateTestimonial(nextIndex);
  });

  nextButton?.addEventListener('click', () => {
    if (testimonialSlides.length === 0) return;
    const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
    updateTestimonial(nextIndex);
  });

  if (testimonialSlides.length > 0) {
    setInterval(() => {
      const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
      updateTestimonial(nextIndex);
    }, 6000);
  }

  const revealElements = document.querySelectorAll('.section, .service-card, .project-card, .testimonial-slide, .about-card, .hero-card, .contact-info, .contact-form');
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  revealElements.forEach((element) => observer.observe(element));
});
