// Navigation flottante — masquage au scroll + ouverture liens externes
document.addEventListener('DOMContentLoaded', () => {

  // Elements partages header + menu
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  // Header flottant : masque au scroll vers le bas, reapparait au scroll vers le haut
  const card = document.getElementById('headerCard');
  if (card) {
    let lastY = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;

    function onScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      // Masquer apres 80px de defilement vers le bas (sauf si menu ouvert)
      const menuOpen = navToggle && navToggle.classList.contains('open');
      if (!menuOpen && y > 80 && y > lastY) {
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

  // Listes repliables : afficher 7 elements, masquer le reste
  const MAX_VISIBLE = 7;
  document.querySelectorAll('.content-list').forEach(list => {
    const items = list.querySelectorAll('.content-list-item');
    if (items.length <= MAX_VISIBLE) return;

    const hiddenItems = [];
    items.forEach((item, i) => {
      if (i >= MAX_VISIBLE) {
        item.classList.add('list-hidden');
        hiddenItems.push(item);
      }
    });

    const remaining = items.length - MAX_VISIBLE;
    const btn = document.createElement('button');
    btn.className = 'content-list-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = 'Voir les ' + remaining + ' autres <span class="content-list-toggle-arrow" aria-hidden="true">▼</span>';
    list.appendChild(btn);

    btn.addEventListener('click', () => {
      const isExpanded = btn.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded);
      hiddenItems.forEach(item => item.classList.toggle('list-hidden', !isExpanded));
      if (isExpanded) {
        btn.innerHTML = 'Réduire la liste <span class="content-list-toggle-arrow" aria-hidden="true">▼</span>';
      } else {
        btn.innerHTML = 'Voir les ' + remaining + ' autres <span class="content-list-toggle-arrow" aria-hidden="true">▼</span>';
      }
    });
  });

  // Marquee scroll titres tronques listes mobiles (Phase 12)
  const MARQUEE_MQ = window.matchMedia('(max-width: 719px)');

  function setupMarquee(title) {
    // Retablir etat initial (texte brut sans .marquee-track)
    const existingTrack = title.querySelector('.marquee-track');
    if (existingTrack) {
      const original = existingTrack.textContent.split('\u00A0\u00A0\u00A0\u00A0\u00A0')[0];
      title.textContent = original;
      title.classList.remove('is-marquee');
    }

    if (!MARQUEE_MQ.matches) return; // desktop : laisser ellipsis

    // Detecter overflow apres retour a l'etat statique
    if (title.scrollWidth <= title.clientWidth + 1) return;

    // Overflow detecte : construire marquee
    const originalText = title.textContent;
    const gap = '\u00A0\u00A0\u00A0\u00A0\u00A0'; // 5 espaces insecables ~ 40px
    title.innerHTML = '';
    const track = document.createElement('span');
    track.className = 'marquee-track';
    track.textContent = originalText + gap + originalText + gap;
    title.appendChild(track);
    title.classList.add('is-marquee');
  }

  function scanMarquees() {
    document.querySelectorAll('.content-list-item .content-list-title').forEach(setupMarquee);
  }

  scanMarquees();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(scanMarquees, 150);
  });

  document.querySelectorAll('.content-list-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      // Delai pour laisser le reflow s'appliquer apres retrait de list-hidden
      setTimeout(scanMarquees, 20);
    });
  });

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
