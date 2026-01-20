/* Nathan Wallace - Personal Website JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
      });
    });
    
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('nav__links--open');
      }
    });
  }
  
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
  
  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const articles = document.querySelectorAll('article[id]');
  const navLinksItems = document.querySelectorAll('.nav__link');
  
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksItems.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
    articles.forEach(article => {
      const articleTop = article.offsetTop - 100;
      const articleHeight = article.offsetHeight;
      const articleId = article.getAttribute('id');
      if (scrollPosition >= articleTop && scrollPosition < articleTop + articleHeight) {
        navLinksItems.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${articleId}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();
  
  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
      button.classList.add('filter-btn--active');
      projectCards.forEach(card => {
        const domain = card.dataset.domain;
        if (filter === 'all' || domain === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Skill Bar Animation
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('skill-category')) {
        const progressBars = entry.target.querySelectorAll('.skill-item__progress');
        progressBars.forEach(bar => {
          const width = bar.dataset.progress;
          setTimeout(() => { bar.style.width = width; }, 200);
        });
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
  
  // Store progress values and reset
  document.querySelectorAll('.skill-item__progress').forEach(bar => {
    bar.dataset.progress = bar.style.width;
    bar.style.width = '0';
  });
});
