document.querySelectorAll('.carousel-next').forEach((btn) => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.target);
    if (el) el.scrollBy({ left: 136, behavior: 'smooth' });
  });
});
