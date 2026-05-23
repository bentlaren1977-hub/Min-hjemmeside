document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const fadeElements = document.querySelectorAll('.fade-in');
  const galleryImgs = document.querySelectorAll('.gallery img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');

  menuToggle?.addEventListener('click', () => {
    const isOpen = menu?.classList.toggle('active') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });

  const showVisibleElements = () => {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.9;

      if (elementTop < triggerPoint) {
        element.classList.add('show');
      }
    });
  };

  showVisibleElements();
  window.addEventListener('scroll', showVisibleElements, { passive: true });

  galleryImgs.forEach((img) => {
    img.addEventListener('click', () => {
      lightbox?.classList.remove('hidden');
      lightbox?.setAttribute('aria-hidden', 'false');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.add('hidden');
    lightbox?.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu?.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      closeLightbox();
    }
  });
});
