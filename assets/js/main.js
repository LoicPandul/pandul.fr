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

  // Menu hamburger mobile
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fermer le menu quand on clique sur un lien
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Lightbox — zoom sur les images des definitions
  const defContent = document.querySelector('.definition-content');
  if (defContent) {
    defContent.addEventListener('click', (e) => {
      if (e.target.tagName !== 'IMG') return;

      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = '<button class="lightbox-close" aria-label="Fermer">&times;</button><img src="' + e.target.src + '" alt="' + (e.target.alt || '') + '">';

      const previousFocus = document.activeElement;
      document.body.appendChild(overlay);

      // Fade in
      requestAnimationFrame(() => { overlay.classList.add('active'); });
      overlay.querySelector('.lightbox-close').focus();

      function closeLightbox() {
        overlay.classList.remove('active');
        setTimeout(() => {
          overlay.remove();
          if (previousFocus) previousFocus.focus();
        }, 150);
      }

      overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay || ev.target.classList.contains('lightbox-close')) closeLightbox();
      });
      document.addEventListener('keydown', function handler(ev) {
        if (ev.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', handler);
        }
      });
    });
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
