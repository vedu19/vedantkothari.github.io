
const toggle = document.getElementById('theme-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  toggle.textContent = body.classList.contains('dark') ? 'Blast it' : 'Protect your eyes';
});

// Show HOME only when not on homepage
if (!window.location.pathname.endsWith("index.html")) {
  document.body.classList.add("show-home");
}
