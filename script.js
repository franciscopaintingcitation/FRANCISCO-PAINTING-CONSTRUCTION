/**
 * Francisco Painting and General Construction
 * Premium Website JavaScript Engine (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all premium features
  initPreloader();
  initStickyHeader();
  initMobileMenu();
  initActivePageHighlight();
  initScrollProgress();
  initScrollReveal();
  initCounterStats();
  initBackToTop();
  initFaqAccordion();
  initContactFormValidation();
});

/**
 * Preloader Control
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 500); // Gives a high-speed elegant loader feel
    });
    
    // Fallback if load event doesn't trigger
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 2500);
  }
}

/**
 * Sticky Header and Blur Transition
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init
  }
}

/**
 * Mobile Hamburger & Drawer Menu
 */
function initMobileMenu() {
  const trigger = document.querySelector('.menu-trigger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (trigger && navMenu) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      trigger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scrolling when menu is active
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !trigger.contains(e.target)) {
        trigger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu on clicking active links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        trigger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Active Page Highlight for Multi-Page Context
 */
function initActivePageHighlight() {
  const navItems = document.querySelectorAll('.nav-item');
  const currentPath = window.location.pathname;
  
  // Clean filename extraction
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  let matched = false;
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      const href = link.getAttribute('href');
      if (href && (href === pageName || (pageName === '' && href === 'index.html'))) {
        item.classList.add('active');
        matched = true;
      } else {
        item.classList.remove('active');
      }
    }
  });

  // Default to Home if no pages match
  if (!matched && navItems.length > 0 && (pageName === '' || pageName === 'index.html')) {
    navItems[0].classList.add('active');
  }
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progress.style.width = scrolled + '%';
    });
  }
}

/**
 * Intersection Observer Scroll Reveal Effects
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optionally unobserve after animating
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(elem => {
      observer.observe(elem);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(elem => {
      elem.classList.add('active');
    });
  }
}

/**
 * Stats Counter Animation
 */
function initCounterStats() {
  const counterElements = document.querySelectorAll('.counter-value');
  
  if (counterElements.length === 0) return;
  
  const startCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const speed = 2000; // Animation duration in ms
    const increment = target / (speed / 16); // 60 FPS approx
    let current = 0;
    
    const updateCount = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.ceil(current);
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = target;
      }
    };
    
    updateCount();
  };
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
      observer.observe(counter);
    });
  } else {
    counterElements.forEach(counter => {
      counter.innerText = counter.getAttribute('data-target');
    });
  }
}

/**
 * Back to Top Logic
 */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * FAQ Accordion Panel Handling
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs for clean presentation
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/**
 * Form Validation (Contact Page)
 */
function initContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const message = document.getElementById('message');
      
      // Reset visual indicator states
      [name, email, phone, message].forEach(el => {
        if (el) {
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }
      });
      
      // Simple checks
      if (name && name.value.trim() === '') {
        name.style.borderColor = '#EF4444';
        isValid = false;
      }
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailPattern.test(email.value.trim())) {
        email.style.borderColor = '#EF4444';
        isValid = false;
      }
      
      if (phone && phone.value.trim() === '') {
        phone.style.borderColor = '#EF4444';
        isValid = false;
      }
      
      if (message && message.value.trim() === '') {
        message.style.borderColor = '#EF4444';
        isValid = false;
      }
      
      if (isValid) {
        // Build premium feedback toast or direct notification
        const formContainer = document.querySelector('.contact-form-container');
        if (formContainer) {
          formContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem 0; animation: logoFadeInUp 0.8s ease forwards;">
              <div style="width: 70px; height: 70px; background: rgba(212,175,55,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--gold); border: 2px solid var(--gold);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 0.75rem;">Estimate Request Received</h3>
              <p style="color: var(--text-medium); font-size: 1rem; max-width: 400px; margin: 0 auto 2rem auto;">Thank you for contacting Francisco Painting and General Construction. Our project estimators will review your inquiry and call you shortly.</p>
              <a href="http://franciscoconstruction.com/" class="btn-primary" style="display: inline-flex;">Visit Official Site</a>
            </div>
          `;
        }
      }
    });
  }
}
