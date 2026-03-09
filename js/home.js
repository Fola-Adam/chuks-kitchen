const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// Nav link toasts
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const text = this.textContent.trim();
    if (text === 'My Orders') {
      e.preventDefault();
      showToast('Order tracking coming soon!', 'neutral');
    }
    if (text === 'Account') {
      e.preventDefault();
      showToast('Account management coming soon!', 'neutral');
    }
  });
});

// Cart feedback — assign statuses to each food card
const cartStatuses = [
  { type: 'success', message: 'Added to cart!' },
  { type: 'error', message: 'Sorry, this item is out of stock.' },
  { type: 'warning', message: 'This meal is currently in preparation.' },
  { type: 'info', message: "We've updated this meal — check the new price!" },
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' }
];

document.querySelectorAll('.food-card-footer .primary-btn').forEach(function (btn, index) {
  const status = cartStatuses[index] || cartStatuses[0];

  if (status.type === 'error') {
    btn.textContent = 'Out of Stock';
    btn.disabled = true;
    btn.style.background = '#9ca3af';
    btn.style.cursor = 'not-allowed';
  }

  btn.addEventListener('click', function () {
    if (status.type !== 'error') {
      showToast(status.message, status.type);
    }
  });
});

// Search bar toast
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
      showToast('Searching for "' + this.value.trim() + '"...', 'neutral');
    }
  });
}

// Footer coming soon links
document.querySelectorAll('.footer-col a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    showToast('Coming soon!', 'neutral');
  });
});

// Scroll animations
document.querySelectorAll('.category-card, .food-card').forEach(function (card) {
  card.classList.add('animate-on-scroll');
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
  observer.observe(el);
});

const promoContent = document.querySelector('.promo-content');
if (promoContent) observer.observe(promoContent);

const footer = document.querySelector('.footer');
if (footer) observer.observe(footer);

// Onboarding tour
const tourSteps = [
  {
    target: '.navbar',
    message: "Welcome to Chuks Kitchen! Let me show you around 👋",
    position: 'bottom'
  },
  {
    target: '.search-bar',
    message: "Search for any meal you're craving right here 🔍",
    position: 'bottom'
  },
  {
    target: '.categories',
    message: "Browse by category to find exactly what you want 🍱",
    position: 'bottom'
  },
  {
    target: '.specials',
    message: "Chef's top picks! Tap 'Add to Cart' to place an order 🛒",
    position: 'bottom'
  },
  {
    target: '.promo-banner',
    message: "New dishes and limited-time offers land here first 🔥",
    position: 'top'
  },
  {
    target: '.footer',
    message: "That's it! Enjoy your meal. Chop well! 🍽️",
    position: 'top'
  }
];

let currentStep = 0;

function createTourOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'tour-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9000;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);
}

function createTourCard() {
  const card = document.createElement('div');
  card.id = 'tour-card';
  card.style.cssText = `
    position: fixed;
    z-index: 9999;
    background: white;
    border-radius: 16px;
    padding: 20px 24px;
    max-width: 300px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    font-family: Inter, sans-serif;
    pointer-events: all;
    transition: all 0.4s ease;
  `;
  document.body.appendChild(card);
  return card;
}

function showStep(index) {
  const step = tourSteps[index];
  const target = document.querySelector(step.target);
  if (!target) return;

  // Scroll target into view
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Highlight target
  target.style.position = 'relative';
  target.style.zIndex = '9001';
  target.style.boxShadow = '0 0 0 4px #ff7a18, 0 0 0 8px rgba(255,122,24,0.3)';
  target.style.borderRadius = '8px';
  target.style.transition = 'box-shadow 0.3s ease';

  // Position card
  setTimeout(function () {
    const card = document.getElementById('tour-card');
    const rect = target.getBoundingClientRect();
    const isBottom = step.position === 'bottom';

    card.style.left = Math.min(Math.max(rect.left, 16), window.innerWidth - 316) + 'px';
    card.style.top = isBottom
      ? Math.min(rect.bottom + 16, window.innerHeight - 160) + 'px'
      : Math.max(rect.top - 160, 16) + 'px';

    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
        <span style="font-size:28px;">👨‍🍳</span>
        <span style="font-weight:700; font-size:13px; color:#ff7a18; text-transform:uppercase; letter-spacing:0.05em;">Chuks Guide</span>
      </div>
      <p style="font-size:14px; color:#1f2937; line-height:1.6; margin:0 0 16px;">${step.message}</p>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; color:#9ca3af;">${index + 1} of ${tourSteps.length}</span>
        <div style="display:flex; gap:8px;">
          <button id="tour-skip" style="padding:8px 16px; border:1px solid #e5e7eb; border-radius:8px; background:white; color:#6b7280; font-size:13px; cursor:pointer; font-family:Inter,sans-serif;">Skip</button>
          <button id="tour-next" style="padding:8px 16px; border:none; border-radius:8px; background:#ff7a18; color:white; font-size:13px; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">${index === tourSteps.length - 1 ? 'Done 🎉' : 'Next →'}</button>
        </div>
      </div>
    `;

    document.getElementById('tour-next').addEventListener('click', function () {
      clearHighlight(target);
      if (index === tourSteps.length - 1) {
        endTour();
      } else {
        currentStep++;
        showStep(currentStep);
      }
    });

    document.getElementById('tour-skip').addEventListener('click', function () {
      clearHighlight(target);
      endTour();
    });
  }, 400);
}

function clearHighlight(target) {
  target.style.zIndex = '';
  target.style.boxShadow = '';
  target.style.borderRadius = '';
}

function endTour() {
  const overlay = document.getElementById('tour-overlay');
  const card = document.getElementById('tour-card');
  if (overlay) overlay.remove();
  if (card) card.remove();
  localStorage.setItem('chuks-tour-done', 'true');
  showToast("You're all set! Enjoy Chuks Kitchen 🍽️", 'success');
}

function startTour() {
  createTourOverlay();
  createTourCard();
  showStep(0);
}

// Only show once
if (!localStorage.getItem('chuks-tour-done')) {
  setTimeout(startTour, 1500);
}