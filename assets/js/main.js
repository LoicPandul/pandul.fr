// Header flottant + ouverture des liens externes dans nouvel onglet
document.addEventListener('DOMContentLoaded', () => {
  // --- Header flottant ---
  const card = document.getElementById('headerCard');
  if (card) {
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
  }

  // --- Liens externes : nouvel onglet + sécurité ---
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;                      // ancres
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;          // mails, tel, js

    const u = new URL(href, location.href);
    const isHttp = u.protocol === 'http:' || u.protocol === 'https:';
    const sameHost = u.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '');

    if (isHttp && !sameHost) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
