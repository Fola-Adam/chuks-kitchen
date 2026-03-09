const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const toggle = document.querySelector('.categories-toggle');
const dropdown = document.querySelector('.categories-dropdown');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

toggle.addEventListener('click', function () {
  dropdown.classList.toggle('open');
});

document.querySelectorAll('.categories-dropdown a').forEach(function (link) {
  link.addEventListener('click', function () {
    dropdown.classList.remove('open');
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

// Add button statuses — cycles through all 4 types for variety
const addStatuses = [
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'warning', message: 'This meal is currently in preparation.' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'error', message: 'Sorry, this item is out of stock.' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'info', message: "We've updated this meal — check the new price!" },
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' },
  { type: 'success', message: 'Added to cart!' }
];

document.querySelectorAll('.add-btn').forEach(function (btn, index) {
  const status = addStatuses[index] || addStatuses[0];

  if (status.type === 'error') {
    btn.style.background = '#9ca3af';
    btn.style.cursor = 'not-allowed';
    btn.disabled = true;
  }

  btn.addEventListener('click', function () {
    if (status.type !== 'error') {
      showToast(status.message, status.type);
    }
  });
});

// Explore More toasts
document.querySelectorAll('.view-all').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    showToast('More items coming soon!', 'neutral');
  });
});

// Footer coming soon links
document.querySelectorAll('.footer-col a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    showToast('Coming soon!', 'neutral');
  });
});

// Scroll animations
document.querySelectorAll('.food-card').forEach(function (card) {
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

const footer = document.querySelector('.footer');
if (footer) observer.observe(footer);