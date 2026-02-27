const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const toggle = document.querySelector('.categories-toggle');
const dropdown = document.querySelector('.categories-dropdown');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
});

toggle.addEventListener('click', function() {
    dropdown.classList.toggle('open');
});

const dropdownLinks = document.querySelectorAll('.categories-dropdown a');

dropdownLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    dropdown.classList.remove('open');
  });
});