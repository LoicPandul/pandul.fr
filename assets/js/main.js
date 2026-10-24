// pandul.fr : menu du téléphone, apparition des sections, définition tirée au hasard.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu (téléphone)
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    var close = function () { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  // Apparition : titre, puis texte, puis image, décalés de 80 ms dans chaque bloc.
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && items.length) {
    var groups = new Map();
    items.forEach(function (el) {
      var box = el.closest('article, section, footer, tbody, ul, .grid') || document.body;
      var i = groups.get(box) || 0;
      groups.set(box, i + 1);
      el.style.setProperty('--d', Math.min(i, 6) * 80 + 'ms');
    });
    root.classList.add('reveal-on');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Dictionnaire : une définition différente à chaque visite, et à chaque clic.
  var card = document.getElementById('definition');
  var data = document.getElementById('def-data');
  var next = document.getElementById('def-next');
  if (card && data && next) {
    var defs = [];
    try { defs = JSON.parse(data.textContent); } catch (e) { defs = []; }
    if (defs.length > 1) {
      var base = card.getAttribute('data-base') || '';
      var term = document.getElementById('def-term');
      var text = document.getElementById('def-text');
      var link = document.getElementById('def-link');
      var current = 0;
      var show = function (i) {
        var d = defs[i];
        var url = base + '/' + d.s + '/';
        term.textContent = d.t; term.href = url;
        text.textContent = d.d; link.href = url;
        current = i;
      };
      var pick = function () {
        var i = current;
        while (i === current) i = Math.floor(Math.random() * defs.length);
        return i;
      };
      show(pick());
      next.hidden = false;
      next.addEventListener('click', function () {
        var i = pick();
        if (reduce) { show(i); return; }
        card.classList.add('is-swapping');
        setTimeout(function () { show(i); card.classList.remove('is-swapping'); }, 220);
      });
    }
  }

  // Vidéo de Gerfaut : lecture muette en boucle quand elle est à l'écran.
  var clip = document.querySelector('.proj-desk video');
  if (clip && !reduce && 'IntersectionObserver' in window) {
    clip.removeAttribute('controls');
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { var p = clip.play(); if (p && p.catch) p.catch(function () { clip.setAttribute('controls', ''); }); }
        else clip.pause();
      });
    }, { threshold: 0.35 }).observe(clip);
  }
})();
