// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Handle cursor interaction with clickable elements
document.querySelectorAll('a, button, .btn').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
  });
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
  });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    nav.classList.add('active');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    nav.classList.remove('active');
    menuOpen = false;
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    // Close mobile menu if open
    if (menuOpen) {
      menuBtn.classList.remove('open');
      nav.classList.remove('active');
      menuOpen = false;
    }

    // Smooth scroll to target
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Active navigation link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Animate skill progress bars
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.transform = `scaleX(${progress / 100})`;
  });
};

// Animate counter numbers
const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    const count = 0;
    const speed = 200;
    const increment = target / speed;

    const updateCount = () => {
      const current = parseInt(counter.innerText);
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate progress bars in skills section
      if (entry.target.id === 'skills') {
        animateProgressBars();
      }
      // Animate counters in about section
      if (entry.target.id === 'about') {
        animateCounters();
      }
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Typing effect for hero section
const textElement = document.querySelector('.typing-effect');
const text = textElement.innerText;
let index = 0;

const typeText = () => {
  if (index < text.length) {
    textElement.textContent = text.slice(0, index + 1);
    index++;
    setTimeout(typeText, 100);
  }
};

// Start typing effect when page loads
window.addEventListener('load', () => {
  typeText();
});

// Handle form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    const formData = new FormData(contactForm);
    console.log('Form submitted:', Object.fromEntries(formData));
    // Reset form
    contactForm.reset();
  });
}

// Project hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.project-overlay').style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.project-overlay').style.opacity = '0';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  hero.style.transform = `translateY(${scrolled * 0.3}px)`;
});

// Preloader
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
