// Navigation flottante — masquage au scroll + ouverture liens externes
document.addEventListener('DOMContentLoaded', () => {

  // Header flottant : masque au scroll vers le bas, reapparait au scroll vers le haut
  const card = document.getElementById('headerCard');
  if (card) {
    let lastY = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;

    function onScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      // Masquer apres 80px de defilement vers le bas
      if (y > 80 && y > lastY) {
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
  }

  // Liens externes : ouvrir dans un nouvel onglet avec rel securise
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

    const u = new URL(href, location.href);
    const isHttp = u.protocol === 'http:' || u.protocol === 'https:';
    const sameHost = u.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '');

    if (isHttp && !sameHost) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
