// Vedant Kothari Portfolio - JavaScript
// Version 1.0 - 2025

// Dark mode with localStorage persistence
const toggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  themeText.textContent = '☀️ Light Mode';
}

toggle.onclick = () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeText.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Typing Effect for Tagline
const taglines = [
  "MSc Accounting (Data & Analytics)",
  "Financial Data Analyst",
  "Building Data-Driven Solutions"
];

let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const typingTextElement = document.querySelector('.typing-text');
const cursorElement = document.querySelector('.typing-cursor');

function typeWriter() {
  const currentTagline = taglines[taglineIndex];
  
  if (isDeleting) {
    // Remove characters
    typingTextElement.textContent = currentTagline.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    // Add characters
    typingTextElement.textContent = currentTagline.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  // When word is complete
  if (!isDeleting && charIndex === currentTagline.length) {
    // Pause at end
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    taglineIndex = (taglineIndex + 1) % taglines.length;
    typingSpeed = 500; // Pause before typing next
  }
  
  setTimeout(typeWriter, typingSpeed);
}

// Start typing effect after page loads
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
});

// Smooth scroll with offset for sticky nav
document.querySelectorAll('.sticky-nav a').forEach(element => {
  element.onclick = e => {
    e.preventDefault();
    const target = document.querySelector(element.getAttribute('href'));
    const offset = 80; // Height of sticky nav
    const targetPosition = target.offsetTop - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };
});

// Improved scroll spy
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.sticky-nav a');

const observerOptions = {
  rootMargin: '-20% 0px -70% 0px'
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// Enhanced accordions
document.querySelectorAll('.accordion').forEach(accordion => {
  const title = accordion.dataset.title;
  const date = accordion.dataset.date;
  const content = accordion.innerHTML;
  
  accordion.innerHTML = `
    <div class="hdr">
      <span>${title}</span>
      <span class="dt">${date || ''}</span>
    </div>
    <div class="accordion-content">${content}</div>
  `;
  
  accordion.onclick = () => {
    // Close other accordions in the same section
    const parent = accordion.parentElement;
    parent.querySelectorAll('.accordion').forEach(acc => {
      if (acc !== accordion && acc.classList.contains('open')) {
        acc.classList.remove('open');
      }
    });
    
    accordion.classList.toggle('open');
  };
});

// Reveal animations on scroll
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => revealObserver.observe(section));

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Mobile navigation functionality
const mobileSelect = document.querySelector('.mobile-nav select');
if (mobileSelect) {
  mobileSelect.addEventListener('change', (e) => {
    if (e.target.value) {
      const target = document.querySelector(e.target.value);
      const offset = 60; // Smaller offset for mobile
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Reset select to show placeholder
      setTimeout(() => {
        e.target.value = '';
      }, 100);
    }
  });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Press 'T' to toggle theme
  if (e.key === 't' || e.key === 'T') {
    if (!e.target.matches('input, textarea')) {
      toggle.click();
    }
  }
});

// Performance optimization: Lazy load images if any are added in the future
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  // Observe all images with class 'lazy'
  const lazyImages = document.querySelectorAll('img.lazy');
  lazyImages.forEach(img => imageObserver.observe(img));
}
