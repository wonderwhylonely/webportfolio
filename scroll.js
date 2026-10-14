/**
 * Personal Scroll & Navigation Handler
 */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.custom-navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navLinks = document.querySelectorAll('.nav-link-personal');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollPos > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    highlightNav(scrollPos);
  });

  // Automatically activate nav link based on current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  function highlightNav(scrollPos) {
    if (!sections.length || !navLinks.length) return;
    const hasHashLinks = Array.from(navLinks).some(link => link.getAttribute('href')?.startsWith('#'));
    if (!hasHashLinks) return;

    let currentId = '';
    const offset = 100;

    sections.forEach((sec) => {
      const top = sec.offsetTop - offset;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === '#' + currentId || href.endsWith('#' + currentId)) {
          link.classList.add('active');
        } else if (href?.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  const revealElements = document.querySelectorAll('.reveal-fade-up');

  setTimeout(() => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 80) {
        el.classList.add('active');
      }
    });
  }, 100);

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 40px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }
});
