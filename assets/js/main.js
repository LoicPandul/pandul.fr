// Header flottant
document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('headerCard');
  if (!card) return;

  let lastY = window.pageYOffset || document.documentElement.scrollTop;
  let ticking = false;

  function onScroll() {
    const y = window.pageYOffset || document.documentElement.scrollTop;

    if (y > 120 && y > lastY) {
      card.classList.add('hide');
    } else {
      card.classList.remove('hide');
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
});
