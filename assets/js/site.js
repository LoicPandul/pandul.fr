// pandul.fr : comportements de la page. Une seule boucle d'animation, qui s'arrête quand rien ne bouge.
// Le contenu reste complet et lisible sans ce script.

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const html = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const wide = () => window.innerWidth >= 960;
const base = document.querySelector('script[data-base]')?.dataset.base || '/assets/';
// la version de site.js (?v=…) suit les modules chargés après coup, pour qu'un navigateur ne garde pas d'anciennes couleurs en cache
const VER = new URL(import.meta.url).search;

// Textes écrits par le script, dans la langue de la page (<html lang>) ; le reste vient de _data/i18n/.
const EN = html.lang === 'en';
const T = EN ? {
  copied: 'Address copied.', copyFail: 'Copy failed: the text is selected, copy it by hand.',
  kinds: { tutoriel: 'tutorial', article: 'article', formation: 'course', podcast: 'podcast episode', production: 'video', interview: 'interview', documentation: 'documentation', script: 'video script' },
  rail: 'Published pieces, one tick each', others: 'Others', key: 'Tick height:',
  keys: ['course or docs', 'tutorial', 'article', 'audio and video'], open: 'Open', portrait: 'Portrait of Loïc Morel',
  q: (s) => `"${s}"`,
} : {
  copied: 'Adresse copiée.', copyFail: 'Copie impossible\u00a0: le texte est sélectionné, copiez-le à la main.',
  kinds: { tutoriel: 'tutoriel', article: 'article', formation: 'formation', podcast: 'épisode de podcast', production: 'vidéo', interview: 'interview', documentation: 'documentation', script: 'script de vidéo' },
  rail: 'Contenus publiés, un trait par contenu', others: 'Autres', key: 'Hauteur du trait\u00a0:',
  keys: ['formation ou doc', 'tutoriel', 'article', 'audio et vidéo'], open: 'Ouvrir', portrait: 'Portrait de Loïc Morel',
  q: (s) => `\u00ab\u00a0${s}\u00a0\u00bb`,
};

/* ---------- Boucle ---------- */
const frames = new Set();
let running = false, last = 0;
const scroll = { y: window.scrollY, vy: 0, lastY: window.scrollY };
function kick() {
  if (running || document.hidden) return;
  running = true;
  last = performance.now();
  requestAnimationFrame(frame);
}
function frame(now) {
  // le premier « now » d'un rafraîchissement peut précéder l'instant du kick : jamais de pas négatif
  const dt = Math.max(0, Math.min(0.05, (now - last) / 1000 || 0.016));
  last = now;
  if (lenis) lenis.raf(now);
  scroll.vy = scroll.vy * 0.85 + (scroll.y - scroll.lastY) * 0.15;
  scroll.lastY = scroll.y;
  let again = Math.abs(scroll.vy) > 0.05 || (lenis && lenis.isScrolling);
  // une animation en erreur ne doit pas arrêter les autres
  for (const fn of frames) { try { if (fn(dt, now)) again = true; } catch (e) { frames.delete(fn); } }
  if (again && !document.hidden) requestAnimationFrame(frame);
  else running = false;
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });

let lenis = null;
function onScroll() { scroll.y = lenis ? lenis.scroll : window.scrollY; kick(); }
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', kick, { passive: true });

/* ---------- Défilement doux (ordinateur à souris seulement) ---------- */
function barHeight() { return wide() ? 64 : 56; }
function scrollToTarget(el) {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -barHeight() - 8, duration: 1.2 });
  else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
function initLenis() {
  if (!fine || reduce) { if (!reduce) html.style.scrollBehavior = 'smooth'; return; }
  const s = document.createElement('script');
  s.src = base + 'js/vendor/lenis.min.js';
  s.onload = () => {
    if (!window.Lenis) return;
    lenis = new window.Lenis({ autoRaf: false, lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', onScroll);
    kick();
  };
  document.head.appendChild(s);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href*="#"]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
  const url = new URL(a.href, location.href);
  if (url.pathname !== location.pathname || !url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  const menu = $('#menu');
  if (menu && menu.open) menu.close();
  scrollToTarget(target);
  history.pushState(null, '', url.hash);
});

/* ---------- Barre : se cache en descendant, trait de la section en cours ---------- */
function initBar() {
  const bar = $('[data-bar]');
  if (!bar) return;
  let lastY = scroll.y;
  const heroName = $('.hero-name');
  frames.add(() => {
    const y = scroll.y;
    if (heroName) bar.classList.toggle('is-top', heroName.getBoundingClientRect().bottom > barHeight());
    const menuOpen = $('#menu')?.open;
    if (!menuOpen) {
      if (y > 240 && y > lastY + 4) bar.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 120) bar.classList.remove('is-hidden');
    }
    html.classList.toggle('bar-shown', !bar.classList.contains('is-hidden'));
    lastY = y;
    return false;
  });
  const nav = $('.bar-nav', bar), mark = $('.bar-mark', bar);
  if (!nav || !mark) return;
  const links = new Map($$('a[data-nav]', nav).map((a) => [a.dataset.nav, a]));
  const place = (id) => {
    const a = links.get(id);
    if (!a) { mark.style.setProperty('--w', 0); return; }
    mark.style.setProperty('--x', a.offsetLeft + 'px');
    mark.style.setProperty('--w', a.offsetWidth / 100);
  };
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) place(en.target.id);
  }, { rootMargin: '-40% 0px -55% 0px' });
  $$('main > section[id]').forEach((s) => io.observe(s));
}

/* ---------- Index des métiers : surligne celui qu'on lit ---------- */
function initTradesIndex() {
  const links = $$('[data-index]');
  const trades = $$('.trade[aria-labelledby]');
  if (!links.length || !trades.length) return;
  const tabs = $('.trades-tabs');
  const index = $('.trades-index');
  const list = $('.trades-list');
  let cur = '';
  // le métier lu est le dernier dont le titre a passé la ligne de lecture :
  // juste sous la barre d'onglets au doigt, au milieu de l'écran sinon (comme le panneau des métiers)
  const update = () => {
    const line = tabs && tabs.offsetParent !== null ? tabs.getBoundingClientRect().bottom + 12 : window.innerHeight * 0.5;
    let id = trades[0].getAttribute('aria-labelledby');
    for (const t of trades) if (t.getBoundingClientRect().top <= line) id = t.getAttribute('aria-labelledby');
    // trait de progression le long de l'index : la part des trois métiers déjà lue
    if (index) {
      const a = trades[0].getBoundingClientRect().top, b = trades[trades.length - 1].getBoundingClientRect().bottom;
      index.style.setProperty('--tp', clamp((line - a) / Math.max(1, b - a)).toFixed(3));
    }
    // au doigt, les onglets s'effacent une fois les trois métiers lus (ils ne restent pas collés au-dessus de « Projets »)
    if (tabs && list) tabs.classList.toggle('is-past', list.getBoundingClientRect().bottom < line + 40);
    if (id === cur) return;
    cur = id;
    links.forEach((a) => a.classList.toggle('is-current', a.dataset.index === id));
  };
  let raf = 0;
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ---------- Menu téléphone ---------- */
function initMenu() {
  const menu = $('#menu');
  const open = $('[data-menu-open]');
  if (!menu || !open || typeof menu.showModal !== 'function') return;
  open.addEventListener('click', () => { menu.showModal(); open.setAttribute('aria-expanded', 'true'); });
  $('[data-menu-close]', menu)?.addEventListener('click', () => menu.close());
  menu.addEventListener('close', () => { open.setAttribute('aria-expanded', 'false'); open.focus(); });
  open.setAttribute('aria-expanded', 'false');
}

/* ---------- Entrées de section ---------- */
function initReveal() {
  const els = $$('[data-reveal]');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* ---------- Boutons magnétiques ---------- */
function initMagnetic() {
  if (!fine || reduce) return;
  $$('[data-magnetic]').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.style.setProperty('--mx', clamp(dx * 0.22, -8, 8).toFixed(2) + 'px');
      b.style.setProperty('--my', clamp(dy * 0.3, -6, 6).toFixed(2) + 'px');
    });
    b.addEventListener('pointerleave', () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
  });
}

/* ---------- Copier l'adresse et la clé minisign ---------- */
// Copie : l'API du presse-papiers, ou l'ancienne méthode quand la page n'est pas servie en https (aperçu local).
async function copyText(s) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s);
  const ta = document.createElement('textarea');
  ta.value = s; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
  document.body.appendChild(ta); ta.select();
  const ok = document.execCommand('copy');
  ta.remove();
  if (!ok) throw new Error('copy');
}
function initCopy() {
  const status = $('[data-copy-status]');
  $$('[data-copy]').forEach((btn) => {
    btn.hidden = false;
    btn.classList.add('can-copy');
    // le texte qui change : le libellé du bouton, ou son repère [data-copy-text] (bloc de la clé)
    const out = $('[data-copy-text]', btn) || btn;
    const label = out.textContent;
    let timer;
    btn.addEventListener('click', async () => {
      let msg;
      try { await copyText(btn.dataset.copy); msg = btn.dataset.copyLabel || T.copied; btn.classList.add('is-copied'); }
      catch (e) {
        msg = btn.dataset.copyLabel ? (EN ? 'Selected' : 'Sélectionnée') : T.copyFail;
        const target = btn.closest('.contact') ? $('.contact-mail a') : $('code', btn);
        if (target) { const r = document.createRange(); r.selectNodeContents(target); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
      }
      if (btn.dataset.copyLabel) out.textContent = msg; else if (status) status.textContent = msg;
      clearTimeout(timer);
      timer = setTimeout(() => { btn.classList.remove('is-copied'); if (btn.dataset.copyLabel) out.textContent = label; else if (status) status.textContent = ''; }, 2400);
    });
  });
}

/* ---------- Titre « Ils me font confiance » : les deux moitiés glissent l'une vers l'autre ---------- */
function initSlides() {
  const parts = $$('.slide');
  if (!parts.length || reduce) return;
  const title = parts[0].parentElement;
  let prev = -1;
  frames.add(() => {
    const r = title.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < -100 || r.top > vh + 100) return false;
    const p = clamp((vh * 0.98 - r.top) / (vh * 0.62));
    if (Math.abs(p - prev) < 0.001) return false;
    prev = p;
    const e = 1 - Math.pow(1 - p, 3);
    const off = (1 - e) * window.innerWidth * 0.16;
    parts.forEach((s) => s.style.setProperty('--sx', (Number(s.dataset.slide) * off).toFixed(1) + 'px'));
    return false;
  });
}

/* ---------- Réglette des contenus publiés ---------- */
const KINDS = T.kinds;
let works = null;
function initWorks() {
  const root = $('[data-works]');
  if (!root) return;
  const groups = $$('.works-group', root).map((g) => ({
    name: g.dataset.group,
    items: $$('a', g).map((a) => ({ t: a.textContent.trim(), u: a.href, k: a.dataset.kind })),
  }));
  const items = [];
  const starts = [];
  groups.forEach((g, gi) => { starts.push(items.length); g.items.forEach((it, j) => items.push({ ...it, g: gi, first: j === 0 })); });
  const N = items.length;
  if (!N) return;

  const read = $('.works-read', root);
  const rail = $('[data-works-rail]', root);
  const titleEl = $('[data-works-title]', root), metaEl = $('[data-works-meta]', root), openEl = $('[data-works-open]', root);
  read.hidden = false; rail.hidden = false;

  const track = document.createElement('div');
  track.className = 'works-ticks';
  track.tabIndex = 0;
  track.setAttribute('role', 'slider');
  track.setAttribute('aria-label', T.rail);
  track.setAttribute('aria-valuemin', '1');
  track.setAttribute('aria-valuemax', String(N));
  track.setAttribute('aria-orientation', 'horizontal');
  const spacerA = document.createElement('span'); spacerA.className = 'tick-spacer';
  track.appendChild(spacerA);
  const ticks = items.map((it) => {
    const s = document.createElement('span');
    s.className = 'tick' + (it.first ? ' is-group' : '');
    s.dataset.k = it.k;
    s.appendChild(document.createElement('i'));
    track.appendChild(s);
    return s;
  });
  const spacerB = document.createElement('span'); spacerB.className = 'tick-spacer';
  track.appendChild(spacerB);
  const labels = document.createElement('div');
  labels.className = 'works-groups';
  labels.setAttribute('aria-hidden', 'true');
  const labelEls = groups.map((g, gi) => {
    const l = document.createElement('span');
    l.textContent = g.name;
    labels.appendChild(l);
    return l;
  });
  // les repères de groupe (desktop)
  const markEls = [];
  // les petits groupes de la fin n'ont pas la place pour leur nom : un repère « Autres » et une légende
  let tail = groups.length;
  while (tail > 0 && groups[tail - 1].items.length < 20) tail--;
  if (tail < groups.length) {
    for (let gi = tail; gi < groups.length; gi++) labelEls[gi].classList.add('is-small');
    const l = document.createElement('span');
    l.textContent = T.others;
    labels.appendChild(l);
    labelEls.push(l);
    starts.push(starts[tail]);
    const legend = document.createElement('p');
    legend.className = 'works-legend';
    legend.textContent = T.others + (EN ? ': ' : '\u00a0: ') + groups.slice(tail).map((g) => `${g.name} (${g.items.length})`).join(', ') + '.';
    rail.after(legend);
  }
  labelEls.forEach(() => { const m = document.createElement('b'); labels.appendChild(m); markEls.push(m); });
  rail.append(track, labels);
  // légende des hauteurs : un trait par type de contenu
  const key = document.createElement('ul');
  key.className = 'works-key';
  key.setAttribute('aria-hidden', 'true');
  const head = document.createElement('li');
  head.textContent = T.key;
  key.appendChild(head);
  [32, 24, 17, 11].map((h, n) => [T.keys[n], h]).forEach(([t, h]) => {
    const li = document.createElement('li');
    const i = document.createElement('i'); i.style.setProperty('--kh', h + 'px');
    li.append(i, t);
    key.appendChild(li);
  });
  rail.after(key);
  // au doigt, une barre de position : la partie des 246 que l'on regarde
  const map = document.createElement('div');
  map.className = 'works-map';
  map.setAttribute('aria-hidden', 'true');
  map.appendChild(document.createElement('i'));
  rail.appendChild(map);

  let current = -1;
  const set = (i, fromScroll) => {
    i = clamp(Math.round(i), 0, N - 1);
    if (i === current) return;
    if (current >= 0) ticks[current].classList.remove('is-current');
    current = i;
    ticks[i].classList.add('is-current');
    const it = items[i];
    titleEl.textContent = it.t;
    metaEl.textContent = `${groups[it.g].name}, ${KINDS[it.k] || it.k}`;
    openEl.href = it.u;
    openEl.setAttribute('aria-label', `${T.open} ${T.q(it.t)}`);
    track.setAttribute('aria-valuenow', String(i + 1));
    map.style.setProperty('--p', (i / Math.max(1, N - 1)).toFixed(4));
    track.setAttribute('aria-valuetext', `${it.t}, ${groups[it.g].name}`);
    if (!wide() && !fromScroll) track.scrollTo({ left: i * 8, behavior: reduce ? 'auto' : 'smooth' });
  };

  // Placement des noms de groupes.
  const placeLabels = () => {
    if (wide()) {
      const w = track.clientWidth;
      // une seule règle : un repère sous le premier trait de chaque groupe, le nom juste après, tenu dans la réglette ;
      // s'il chevauche le précédent, il passe au rang suivant (trois rangs : les premiers groupes sont courts)
      const ends = [-Infinity, -Infinity, -Infinity];
      labelEls.forEach((l, gi) => {
        const mk = markEls[gi];
        l.classList.remove('is-pinned');
        if (l.classList.contains('is-small')) { l.style.visibility = 'hidden'; if (mk) mk.style.visibility = 'hidden'; return; }
        const x = (starts[gi] / N) * w;
        const lw = l.offsetWidth;
        // le nom se place à droite de son repère ; au bout de la réglette, il passe à sa gauche
        const lx = x + 8 + lw <= w ? x + 8 : x - 8 - lw;
        const row = ends.findIndex((e) => lx >= e + 12);
        l.style.visibility = row < 0 ? 'hidden' : '';
        if (mk) { mk.style.visibility = row < 0 ? 'hidden' : ''; mk.style.transform = `translateX(${x.toFixed(1)}px)`; mk.style.top = `${Math.max(0, row) * 1.6}em`; }
        if (row < 0) return;
        l.dataset.row = String(row);
        ends[row] = lx + lw;
        l.style.transform = `translateX(${lx.toFixed(1)}px)`;
      });
    } else {
      const sp = spacerA.offsetWidth, tw = track.clientWidth;
      // trois rangs, comme sur ordinateur : un nom qui chevaucherait le précédent passe au rang suivant
      const ends = [-Infinity, -Infinity, -Infinity];
      labelEls.forEach((l, gi) => {
        let x = sp + starts[gi] * 8 - track.scrollLeft;
        // le nom du groupe en cours reste collé au bord gauche tant que son groupe défile
        const next = gi + 1 < labelEls.length ? sp + starts[gi + 1] * 8 - track.scrollLeft : Infinity;
        const pinned = x < 0 && next > l.offsetWidth + 16;
        if (pinned) x = 0;
        // collé au bord, son repère est sorti de l'écran : une flèche dit que le groupe a commencé plus à gauche
        l.classList.toggle('is-pinned', pinned);
        // un nom qui entre par la droite reste entier : il passe à gauche de son repère
        const lw = l.offsetWidth, lx = pinned ? 0 : x + 8 + lw <= tw ? x + 8 : x - 8 - lw;
        const out = x > tw || x + lw < 0 || l.classList.contains('is-small');
        const row = out ? -1 : pinned ? 0 : ends.findIndex((e) => lx >= e + 12);
        if (row >= 0) ends[row] = lx + lw;
        l.style.visibility = row < 0 ? 'hidden' : '';
        l.style.transform = `translateX(${lx.toFixed(1)}px)`;
        l.dataset.row = String(Math.max(0, row));
        const mk = markEls[gi];
        if (mk) { const mx = sp + starts[gi] * 8 - track.scrollLeft; mk.style.visibility = row < 0 || mx < 0 || mx > tw ? 'hidden' : ''; mk.style.transform = `translateX(${mx.toFixed(1)}px)`; mk.style.top = `${Math.max(0, row) * 1.6}em`; }
      });
    }
  };

  // Survol (ordinateur) : le trait sous le curseur est lu, ses voisins grandissent.
  const dock = { x: -1, amp: { v: 0, vel: 0 }, target: 0 };
  const follow = (px) => {
    // la lecture suit le trait survolé, sans sortir de la réglette
    const tw = track.clientWidth, rw = Math.min(read.offsetWidth || 0, tw);
    read.style.setProperty('--rx', clamp(px - 48, 0, Math.max(0, tw - rw)).toFixed(0) + 'px');
  };
  // le pointeur file vers « Ouvrir » (vers le haut, droit sur le bouton) : on garde le contenu lu au lieu de lire chaque trait traversé
  let last = null;
  const aiming = (e) => {
    const p = last; last = { x: e.clientX, y: e.clientY };
    if (!p || e.pointerType !== 'mouse') return false;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    if (dy > -1) return false;
    const b = openEl.getBoundingClientRect();
    const t = (b.bottom - e.clientY) / dy;
    const hx = e.clientX + dx * t;
    return t > 0 && hx >= b.left - 24 && hx <= b.right + 24;
  };
  track.addEventListener('pointermove', (e) => {
    // au doigt sur une grande tablette, glisser le long de la réglette la parcourt aussi
    if (!wide() || aiming(e)) return;
    const r = track.getBoundingClientRect();
    const x = clamp((e.clientX - r.left) / r.width) * N;
    dock.x = x; dock.target = 1;
    set(Math.floor(x));
    follow(e.clientX - r.left);
    kick();
  });
  track.addEventListener('pointerleave', () => { dock.target = 0; last = null; kick(); });
  track.addEventListener('click', (e) => {
    if (!wide()) return;
    const r = track.getBoundingClientRect();
    set(Math.floor(clamp((e.clientX - r.left) / r.width) * N));
    track.focus({ preventScroll: true });
  });

  // Piste défilante (téléphone, tablette).
  track.addEventListener('scroll', () => {
    if (wide()) return;
    set(track.scrollLeft / 8, true);
    placeLabels();
  }, { passive: true });

  // Clavier.
  track.addEventListener('keydown', (e) => {
    if (wide()) requestAnimationFrame(() => follow(((current + 0.5) / N) * track.clientWidth));
    const g = items[Math.max(0, current)].g;
    let n = current;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowUp': n = current + 1; break;
      case 'ArrowLeft': case 'ArrowDown': n = current - 1; break;
      case 'PageDown': n = starts[Math.min(starts.length - 1, g + 1)]; break;
      case 'PageUp': n = current > starts[g] ? starts[g] : starts[Math.max(0, g - 1)]; break;
      case 'Home': n = 0; break;
      case 'End': n = N - 1; break;
      case 'Enter': location.href = items[current].u; return;
      default: return;
    }
    e.preventDefault();
    set(n);
  });

  // Les traits poussent quand la bande entre ; effet Dock au survol.
  const inner = ticks.map((t) => t.firstChild);
  const scales = new Float32Array(N).fill(-1);
  let grow = reduce ? 1 : 0;
  frames.add((dt) => {
    const r = track.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < -200 || r.top > vh + 200) return false;
    if (!reduce) grow = clamp((vh - r.top) / (vh * 0.55));
    let moving = false;
    // ressort de l'amplitude du Dock
    const a = dock.amp;
    const acc = 200 * (dock.target - a.v) - 24 * a.vel;
    a.vel += acc * dt; a.v += a.vel * dt;
    if (Math.abs(dock.target - a.v) > 0.001 || Math.abs(a.vel) > 0.001) moving = true;
    const useDock = wide() && a.v > 0.001;
    for (let i = 0; i < N; i++) {
      const g = reduce ? 1 : clamp(grow * 1.6 - (i / N) * 0.6);
      let s = g;
      if (useDock) { const dx = (i + 0.5 - dock.x) / 6; s *= 1 + 0.85 * a.v * Math.exp(-dx * dx); }
      if (Math.abs(s - scales[i]) > 0.002) { scales[i] = s; inner[i].style.transform = `scaleY(${s.toFixed(3)})`; }
    }
    return moving;
  });

  const onResize = () => {
    if (!wide()) { track.scrollLeft = Math.max(0, current) * 8; read.style.setProperty('--rx', '0px'); }
    placeLabels();
  };
  window.addEventListener('resize', onResize, { passive: true });
  // on part du premier contenu, le plus récent, sur tous les formats
  set(0);
  requestAnimationFrame(onResize);
  works = { items, groups: groups.map((g) => g.name) };
}

/* ---------- Dictionnaire : une autre définition ---------- */
let letterStage = null;
let letterFigure = null;
function initDict() {
  const box = $('[data-dict]');
  if (!box) return;
  const btn = $('[data-dict-next]', box);
  const term = $('[data-dict-term]', box), text = $('[data-dict-text]', box), link = $('[data-dict-link]', box);
  const letterEl = $('[data-dict-letter]');
  let defs = null, current = term.textContent.trim();
  const load = async () => {
    if (defs) return defs;
    const res = await fetch(box.dataset.src, { credentials: 'same-origin' });
    defs = await res.json();
    return defs;
  };
  // la dernière définition vue, d'une visite à l'autre, pour ne pas la reprendre
  const KEY = 'pandul-dict-vue';
  let seen = null;
  try { seen = localStorage.getItem(KEY); } catch (e) { /* stockage refusé : tirage sans mémoire */ }
  // une définition au hasard : jamais celle déjà affichée ni la dernière vue, d'une autre lettre si possible
  const pick = (list) => {
    const curLetter = current.charAt(0);
    let d = null;
    for (let tries = 0; tries < 16; tries++) {
      d = list[Math.floor(Math.random() * list.length)];
      if (d.t === current || d.s === seen) continue;
      if (d.t.charAt(0) !== curLetter || tries > 10) break;
    }
    return d;
  };
  // pose la définition ; « animate » : fondu du texte et lettre qui se redessine
  const show = (d, animate) => {
    current = d.t; seen = d.s;
    try { localStorage.setItem(KEY, d.s); } catch (e) { /* idem */ }
    const apply = () => {
      const h0 = box.offsetHeight;
      const url = `${box.dataset.base}/${d.s}/`;
      // espaces insécables à l'intérieur des guillemets : « et » ne restent jamais seuls en bout de ligne
      const nbsp = (s) => s.replace(/« /g, '«\u00a0').replace(/ »/g, '\u00a0»');
      term.textContent = nbsp(d.t); term.href = url; link.href = url;
      text.textContent = nbsp(d.d);
      // la légende et la lettre changent avec le texte, pas avant lui
      if (letterEl) letterEl.textContent = letter;
      if (capL) capL.textContent = letter;
      if (capT) capT.textContent = d.t;
      box.classList.remove('is-changing');
      // au téléphone le cadre épouse la définition : il glisse vers sa nouvelle hauteur au lieu de sauter
      const h1 = box.offsetHeight;
      if (animate && !reduce && Math.abs(h1 - h0) > 1) {
        box.style.overflow = 'hidden';
        box.animate([{ height: `${h0}px` }, { height: `${h1}px` }], { duration: 320, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
          .finished.finally(() => { box.style.overflow = ''; });
      }
    };
    const letter = d.t.charAt(0);
    const capL = $('[data-dict-caption-letter]'), capT = $('[data-dict-caption-term]');
    if (animate && !reduce) { box.classList.add('is-changing'); setTimeout(apply, 220); } else apply();
    if (letterStage && letterFigure) { letterStage.morphTo(letterFigure(letter), false, animate && !reduce ? 1100 : 200); kick(); }
  };
  btn.hidden = false;
  btn.addEventListener('click', async () => {
    let list;
    try { list = await load(); } catch (e) { return; }
    show(pick(list), true);
  });
  // À chaque visite, une définition tirée au hasard dès le démarrage du script : la liste (10 ko) arrive
  // en général avant que le panneau de la lettre ne se dessine, qui part alors de la bonne lettre.
  // D'ici là, le terme, le texte et la légende restent masqués (CSS : html.js .defn:not(.is-drawn)), puis apparaissent
  // en fondu ; sans JavaScript, ou si la liste ne vient pas, la définition écrite dans la page reste.
  const veil = [box, $('.dict-caption')].filter(Boolean);
  const reveal = () => veil.forEach((el) => el.classList.add('is-drawn'));
  const safety = setTimeout(reveal, 2500);
  load().then((list) => show(pick(list), false)).catch(() => {}).finally(() => { clearTimeout(safety); requestAnimationFrame(reveal); });
}

/* ---------- Ce que je fais : une page de lignes par métier (chargée à l'approche) ---------- */
function initTradeStages() {
  const sec = $('#activites');
  if (!sec || !sec.querySelector('canvas[data-trade-canvas]')) return;
  new IntersectionObserver((en, io) => {
    if (!en[0].isIntersecting) return;
    io.disconnect();
    import('./trades.js' + VER).then((m) => m.initTrades({ frames, kick, reduce })).catch(() => {});
  }, { rootMargin: '1800px 0px' }).observe(sec);
}

/* ---------- Chiffres qui se comptent au défilement ---------- */
function initCount() {
  const box = $('[data-count]');
  if (!box || reduce) return;
  const nums = $$('dt', box).map((dt) => ({ dt, n: parseInt(dt.textContent, 10) || 0 }));
  // le lecteur d'écran lit le chiffre final, jamais un chiffre en cours de comptage
  nums.forEach((x) => { x.dt.setAttribute('aria-label', String(x.n)); x.dt.textContent = '0'; });
  // le comptage part quand les chiffres arrivent dans l'écran et finit toujours sur la vraie valeur
  new IntersectionObserver((en, io) => {
    if (!en[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now();
    const tick = (t) => {
      const k = clamp((t - t0) / 900);
      const e = 1 - Math.pow(1 - k, 3);
      nums.forEach((x) => { x.dt.textContent = String(Math.round(x.n * e)); });
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.6 }).observe(box);
}

/* ---------- Titres en lignes : ils s'écrivent ligne par ligne au défilement ---------- */
function initLineReveal() {
  const els = $$('.line-reveal');
  if (!els.length || reduce) return;
  html.classList.add('lines-on');
  const last = new Map();
  frames.add(() => {
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) continue;
      const p = clamp((vh * 0.96 - r.top) / (vh * 0.42));
      const f = 0.1 + 0.9 * (1 - Math.pow(1 - p, 2.2));
      if (Math.abs((last.get(el) ?? -1) - f) < 0.002) continue;
      last.set(el, f);
      el.style.setProperty('--fill', f.toFixed(3));
      // titre fini : plus de masque, donc plus de filet de raccord entre deux bandes
      el.classList.toggle('is-full', f > 0.995);
    }
    return false;
  });
}

/* ---------- Panneaux de lignes ---------- */
// Sans WebGL : le portrait redevient la photo (bichromie encre), la lettre et le nom restent en texte plein.
function staticStage(el) {
  el.classList.add('is-static');
  if (el.dataset.stage === 'portrait' && !el.querySelector('img.stage-fallback')) {
    const img = new Image();
    img.className = 'stage-fallback';
    img.alt = T.portrait;
    img.width = 800; img.height = 1000;
    img.src = base + 'img/lignes/portrait-encre.webp';
    el.querySelector('.stage-box').prepend(img);
  }
}

async function initStages() {
  const els = $$('.stage[data-stage]');
  if (!els.length) return;
  const mod = await import('./lines.js' + VER);
  if (!mod.webglAvailable()) { els.forEach(staticStage); return; }
  const { LineStage, portraitCanvas, textCanvas, spring } = mod;
  try {
    await Promise.all([document.fonts.load('860 100px "Mona Sans"'), document.fonts.load('500 16px Literata')]);
  } catch (e) { /* les polices de repli suffisent */ }

  const stages = [];
  for (const el of els) {
    const kind = el.dataset.stage;
    let st = null;
    if (kind === 'portrait') {
      const img = new Image();
      img.src = base + 'img/lignes/portrait-figure.webp';
      try { await img.decode(); } catch (e) { staticStage(el); continue; }
      // chaque mot garde l'indice de son titre, pour retrouver le titre sous le curseur
      const items = works ? works.items : [{ t: 'Bitcoin', u: '#', g: 0, k: '' }];
      const words = items.flatMap((it, ti) => it.t.split(/[ \t\n]+/).filter(Boolean).map((w) => ({ w, ti })));
      st = new LineStage(el, {
        figure: (w, h) => ({ canvas: portraitCanvas(img, w, h, { bg: '#9e9e9e', crop: w < 600 ? [0.17, -0.04, 0.63, 0.82] : [0.146, -0.05, 0.68, 0.85] }), invert: true }),
        words, pitch: [5.5, 4.6], thick: [0.06, 0.86], lensR: [44, 34], lensShape: [3.4, 1], mag: 2.6, vignette: 1, drawn: reduce, drawK: 7, drawC: 5.3,
      });
      st.items = items;
      st.kind = 'portrait';
    } else if (kind === 'letter') {
      const getLetter = () => ($('[data-dict-letter]')?.textContent || 'B').trim().charAt(0);
      letterFigure = (letter) => textCanvas([letter], st.w, st.h, { fill: 0.82, heightFill: 0.84 }).canvas;
      st = new LineStage(el, {
        figure: (w, h) => ({ canvas: textCanvas([getLetter()], w, h, { fill: 0.82, heightFill: 0.84 }).canvas }),
        pitch: [7, 5], thick: [0.1, 0.82], lensR: [140, 96], mag: 1.9, drawn: reduce, drawK: 10, drawC: 6.3,
      });
      st.kind = 'letter';
      letterStage = st;
    } else if (kind === 'name') {
      st = new LineStage(el, {
        figure: (w, h, s) => {
          const lines = w < 600 ? ['Loïc', 'Morel'] : ['Loïc Morel'];
          const r = textCanvas(lines, w, h, { fill: 0.94, heightFill: w < 600 ? 0.86 : 0.8 });
          s.letters = r.letters; s.ampRows = lines.length;
          return { canvas: r.canvas };
        },
        letters: true, ink: mod.cssColor('--paper'), paper: mod.cssColor('--ink'), pitch: [6, 3.5], thick: [0.1, 0.84], lensR: [0, 0], mag: 1, drawn: reduce, drawK: 40, drawC: 12.6,
      });
      st.kind = 'name';
    }
    if (st) { st.near = false; stages.push(st); bindStage(st, spring); }
  }

  // Un contexte WebGL par panneau (trois au plus), créé à l'approche de l'écran ;
  // hors écran, le panneau garde sa dernière image et ne dessine plus.
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const st = stages.find((s) => s.el === en.target);
      if (!st) continue;
      st.near = en.isIntersecting;
      if (st.near && !st.gl && !st.failed) {
        if (!st.init()) { st.failed = true; staticStage(st.el); continue; }
        if (st.kind !== 'name' && !reduce) st.drawTarget = 1;
        kick();
      }
    }
  }, { rootMargin: '90% 0px 90% 0px' });
  stages.forEach((s) => io.observe(s.el));

  const ro = new ResizeObserver(() => { stages.forEach((s) => s.gl && s.resize()); kick(); });
  stages.forEach((s) => ro.observe(s.box));

  frames.add((dt, now) => {
    let any = false;
    for (const st of stages) {
      if (!st.gl || !st.near) continue;
      const r = st.box.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = r.bottom > 0 && r.top < vh;
      if (st.kind === 'portrait') {
        // le portrait se défait seulement quand il sort par le haut de l'écran
        const f = reduce ? 0 : Math.pow(clamp((barHeight() - r.top) / (r.height * 0.85 + 1)), 1.2);
        if (Math.abs(f - st.flat) > 0.001) { st.flat = f; st.dirty = true; }
        const wv = reduce ? 0 : clamp(Math.abs(scroll.vy) * 0.03, 0, 1);
        st.wave += (wv - st.wave) * 0.12;
      } else if (st.kind === 'name') {
        st.drawTarget = reduce ? 1 : clamp((vh - r.top) / (r.height * 1.15));
        // à la première arrivée, une vague passe sur les lettres, une par une
        if (!st.swept && !reduce && st.letters && st.draw.v > 0.97 && visible) {
          st.swept = true;
          st.letters.forEach((L, i) => {
            setTimeout(() => { L.target = 1; kick(); }, 120 + i * 90);
            setTimeout(() => { if (!L.hover) { L.target = 0; kick(); } }, 120 + i * 90 + 260);
          });
        }
        if (st.letters) {
          let mv = false;
          for (const L of st.letters) mv = spring(L.s, L.target, dt, 210, 11) || mv;
          if (mv || st.ampMoving) st.writeAmp(st.letters);
          st.ampMoving = mv;
          if (mv) any = true;
        }
      }
      const moving = st.step(dt, now);
      if (visible && (moving || st.dirty)) st.render(now);
      if (moving) any = true;
    }
    return any;
  });
  kick();
}

// Souris et doigt sur un panneau.
function bindStage(st, spring) {
  const box = st.box;
  const pos = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  let release;
  const lensOn = (p) => { st.mouse.x = p.x; st.mouse.y = p.y; st.lensTarget = 1; clearTimeout(release); kick(); };

  // Portrait : la ligne sous le curseur est surlignée, son titre s'affiche sous le panneau.
  let reader = null;
  if (st.kind === 'portrait') {
    const cap = st.el.querySelector('.stage-caption');
    const def = cap && cap.querySelector('.stage-default'), cur = cap && cap.querySelector('.stage-current');
    const tEl = cap && cap.querySelector('[data-stage-title]'), mEl = cap && cap.querySelector('[data-stage-meta]');
    let shown = -1;
    reader = {
      at(p) {
        const hit = st.titleAt(p.x, p.y);
        const ti = hit ? hit.ti : -1;
        if (ti === shown) return;
        shown = ti;
        st.highlight(hit ? hit.ti : null, hit ? hit.row : 0);
        if (!cap) return;
        if (ti < 0) { cur.hidden = true; def.hidden = false; box.style.cursor = ''; return; }
        const it = st.items[ti];
        tEl.textContent = it.t; tEl.href = it.u;
        mEl.textContent = `${works.groups[it.g]}, ${KINDS[it.k] || it.k}`;
        def.hidden = true; cur.hidden = false;
        box.style.cursor = 'pointer';
        kick();
      },
      clear() { if (shown !== -1) { shown = -1; st.highlight(null); if (cur) { cur.hidden = true; def.hidden = false; } box.style.cursor = ''; kick(); } },
      url() { return shown >= 0 ? st.items[shown].u : null; },
    };
  }

  box.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') lensOn(pos(e)); });
  const pickLetter = (p) => {
    if (!st.letters) return;
    const rows = st.ampRows || 1;
    const row = Math.min(rows - 1, Math.floor((p.y / st.h) * rows));
    const L = st.letters.find((l) => l.row === row && p.x >= l.x0 && p.x <= l.x1) || null;
    st.letters.forEach((l) => { l.hover = l === L; l.target = l === L ? 1 : 0; });
  };
  const show = (p) => { lensOn(p); if (reader) reader.at(p); pickLetter(p); };
  // au doigt : rien pendant qu'on fait défiler la page ; la loupe vient sur un toucher bref ou un glissé horizontal
  let touch = null;
  box.addEventListener('pointermove', (e) => {
    const p = pos(e);
    if (e.pointerType === 'mouse') { show(p); return; }
    if (!touch) return;
    if (!touch.scrub) {
      const dx = Math.abs(p.x - touch.x), dy = Math.abs(p.y - touch.y);
      if (dx > 10 && dx > dy * 1.4) { touch.scrub = true; st.mx.v = p.x; st.my.v = p.y; }
      else return;
    }
    show(p);
  });
  const leave = () => {
    st.lensTarget = 0;
    if (st.letters) st.letters.forEach((l) => { l.target = 0; });
    kick();
  };
  box.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { leave(); if (reader) reader.clear(); } });
  box.addEventListener('pointerdown', (e) => {
    const p = pos(e);
    if (e.pointerType === 'mouse') { show(p); if (!reduce && st.kind !== 'name') st.tap(p.x, p.y); return; }
    touch = { x: p.x, y: p.y, t: performance.now(), scrub: false };
  });
  // au clic de souris, on ouvre le titre surligné
  box.addEventListener('click', (e) => {
    if (!reader || e.pointerType === 'touch') return;
    const u = reader.url();
    if (u && matchMedia('(hover: hover)').matches) location.href = u;
  });
  const up = (e) => {
    if (e.pointerType === 'mouse') return;
    const p = pos(e);
    if (touch && !touch.scrub && performance.now() - touch.t < 600 && Math.hypot(p.x - touch.x, p.y - touch.y) < 12) {
      st.mx.v = p.x; st.my.v = p.y;
      show(p);
      if (!reduce && st.kind !== 'name') st.tap(p.x, p.y);
    }
    touch = null;
    clearTimeout(release);
    release = setTimeout(leave, 2200);
  };
  box.addEventListener('pointerup', up);
  box.addEventListener('pointercancel', () => { touch = null; leave(); });
}

/* ---------- Sélecteur de langue : le curseur glisse, puis la page change de langue au même endroit ---------- */
function initLang() {
  $$('[data-lang]').forEach((sw) => {
    $$('.lang-opt', sw).forEach((a) => a.addEventListener('click', (e) => {
      if (a.hasAttribute('aria-current') || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      // la section lue suit dans l'autre langue (les deux pages ont les mêmes ancres)
      let sec = null;
      $$('main > section[id]').forEach((s) => { if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) sec = s; });
      const url = new URL(a.href, location.href);
      if (sec && sec.id !== 'accueil') {
        url.hash = sec.id;
        // et l'endroit lu dans la section : la part déjà défilée, reprise à l'arrivée
        const r = sec.getBoundingClientRect();
        try { sessionStorage.setItem('pandul-lang', JSON.stringify({ id: sec.id, p: clamp(-r.top / Math.max(1, r.height)) })); } catch (err) { /* stockage refusé : la section suffit */ }
      }
      $$('[data-lang]').forEach((o) => { o.dataset.lang = a.hreflang; });
      setTimeout(() => { location.href = url.href; }, reduce ? 0 : 420);
    }));
  });
}

// À l'arrivée dans l'autre langue : reprendre l'endroit lu dans la section.
function restoreLangSpot() {
  let s = null;
  try { s = JSON.parse(sessionStorage.getItem('pandul-lang') || 'null'); sessionStorage.removeItem('pandul-lang'); } catch (err) { return; }
  const sec = s && location.hash === '#' + s.id ? document.getElementById(s.id) : null;
  if (!sec || !(s.p > 0)) return;
  const top = sec.getBoundingClientRect().top + window.scrollY + s.p * sec.offsetHeight;
  if (lenis) lenis.scrollTo(top, { immediate: true }); else window.scrollTo(0, top);
}
// Retour arrière depuis l'autre langue (page restaurée telle quelle) : le curseur revient sur la langue de la page.
window.addEventListener('pageshow', (e) => { if (e.persisted) $$('[data-lang]').forEach((o) => { o.dataset.lang = html.lang; }); });

/* ---------- Démarrage ---------- */
initLang();
initBar();
initMenu();
initTradesIndex();
initReveal();
initMagnetic();
initCopy();
initSlides();
initWorks();
initDict();
initCount();
initTradeStages();
initLineReveal();
initLenis();
kick();
const startStages = () => initStages().catch(() => $$('.stage[data-stage]').forEach(staticStage));
const onLoaded = () => requestAnimationFrame(() => { restoreLangSpot(); startStages(); });
if (document.readyState === 'complete') onLoaded();
else window.addEventListener('load', onLoaded, { once: true });
