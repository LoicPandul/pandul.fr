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
  portrait: 'Portrait of Loïc Morel',
  count: (n, q) => (n === 1 ? '1 piece' : `${n} pieces`) + (q ? ` for "${q}"` : ''),
  q: (s) => `"${s}"`,
} : {
  copied: 'Adresse copiée.', copyFail: 'Copie impossible\u00a0: le texte est sélectionné, copiez-le à la main.',
  kinds: { tutoriel: 'tutoriel', article: 'article', formation: 'formation', podcast: 'épisode de podcast', production: 'vidéo', interview: 'interview', documentation: 'documentation', script: 'script de vidéo' },
  portrait: 'Portrait de Loïc Morel',
  count: (n, q) => (n === 1 ? '1 contenu' : `${n}\u00a0contenus`) + (q ? ` pour \u00ab\u00a0${q}\u00a0\u00bb` : ''),
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
// Lenis retient le défilement natif et n'avance que dans la boucle : un cran de molette la relance, même au repos
window.addEventListener('wheel', kick, { passive: true });

/* ---------- Défilement doux (ordinateur à souris seulement) ---------- */
function barHeight() { return wide() ? 64 : 56; }
function scrollToTarget(el) {
  if (!el) return;
  // un titre pas encore apparu est décalé par son animation d'entrée (translateY) : on vise sa place finale
  const ty = new DOMMatrixReadOnly(getComputedStyle(el).transform === 'none' ? undefined : getComputedStyle(el).transform).m42 || 0;
  if (lenis) { lenis.scrollTo(el, { offset: -barHeight() - 8 - ty, duration: 1.2 }); kick(); }
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
  // un onglet touché s'allume tout de suite, et le reste pendant que la page glisse jusqu'à son métier
  let lockUntil = 0;
  links.forEach((a) => a.addEventListener('click', () => {
    cur = a.dataset.index; lockUntil = performance.now() + 4000;
    links.forEach((b) => b.classList.toggle('is-current', b.dataset.index === cur));
  }));
  const update = () => {
    // au doigt, la ligne de lecture est sous les onglets, et jamais au-dessus de l'endroit où s'arrête un titre visé (scroll-margin-top)
    const stop = parseFloat(getComputedStyle(trades[0].querySelector('h3')).scrollMarginTop) || 0;
    const line = tabs && tabs.offsetParent !== null ? Math.max(tabs.getBoundingClientRect().bottom + 12, stop + 8) : window.innerHeight * 0.5;
    let id = trades[0].getAttribute('aria-labelledby');
    for (const t of trades) if (t.getBoundingClientRect().top <= line) id = t.getAttribute('aria-labelledby');
    // trait de progression le long de l'index : la part des trois métiers déjà lue
    if (index) {
      const a = trades[0].getBoundingClientRect().top, b = trades[trades.length - 1].getBoundingClientRect().bottom;
      index.style.setProperty('--tp', clamp((line - a) / Math.max(1, b - a)).toFixed(3));
    }
    // au doigt, les onglets s'effacent une fois les trois métiers lus (ils ne restent pas collés au-dessus de « Projets »)
    if (tabs && list) tabs.classList.toggle('is-past', list.getBoundingClientRect().bottom < line + 40);
    if (id === cur || performance.now() < lockUntil) return;
    cur = id;
    links.forEach((a) => a.classList.toggle('is-current', a.dataset.index === id));
  };
  let raf = 0, settle = 0;
  // le verrou de l'onglet touché tombe quand le défilement s'arrête (250 ms sans mouvement), au plus tard après 4 s
  window.addEventListener('scroll', () => { if (lockUntil) { clearTimeout(settle); settle = setTimeout(() => { lockUntil = 0; update(); }, 250); } }, { passive: true });
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

/* ---------- Index des contenus publiés ---------- */
// La liste entière est écrite dans la page ; le script ajoute la recherche, les filtres et la pagination.
const KINDS = T.kinds;
let works = null;
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function initWorks() {
  const root = $('[data-works]');
  if (!root) return;
  const sel = $('[data-works-src]', root);
  const groups = sel ? $$('option', sel).slice(1).map((o) => o.textContent.replace(/\s*\(\d+\)\s*$/, '').trim()) : [];
  const items = $$('.wi', root).map((li) => {
    const a = li.firstElementChild;
    const t = $('.wi-title', a).textContent.trim();
    const g = Number(li.dataset.g);
    return { t, u: a.href, k: li.dataset.k, g, f: fold(t + ' ' + (groups[g] || '')), li };
  });
  // le portrait en lignes (s'il est réactivé) lit les titres ici
  works = { items, groups };
  const tools = $('[data-works-tools]', root);
  if (!items.length || !tools) return;
  const q = $('[data-works-q]', root), status = $('[data-works-status]', root);
  const empty = $('[data-works-empty]', root), more = $('[data-works-more]', root), reset = $('[data-works-reset]', root);
  const toggles = $$('.toggle', tools);
  tools.hidden = false;
  root.classList.add('is-live');

  const PAGE = wide() ? 12 : 8;
  let shown = PAGE, type = '', src = '', query = '', matches = items;
  const apply = (animate) => {
    const words = fold(query).split(/\s+/).filter(Boolean);
    const types = type ? type.split(' ') : null;
    matches = items.filter((it) => (!types || types.includes(it.k)) && (src === '' || it.g === Number(src)) && words.every((w) => it.f.includes(w)));
    const visible = new Set(matches.slice(0, shown));
    let i = 0;
    for (const it of items) {
      const on = visible.has(it);
      it.li.hidden = !on;
      if (on && animate && !reduce) {
        // chaque ligne entre l'une après l'autre, les douze premières seulement
        it.li.style.setProperty('--i', String(Math.min(i++, 12)));
        it.li.classList.toggle('is-enter', false);
        void it.li.offsetWidth;
        it.li.classList.toggle('is-enter', true);
      }
    }
    const n = matches.length;
    empty.hidden = n > 0;
    const rest = n - shown;
    more.hidden = rest <= 0;
    if (rest > 0) more.textContent = more.dataset.label.replace('%n', String(Math.min(rest, PAGE * 2)));
    status.textContent = T.count(n, query.trim());
  };
  const restart = () => { shown = PAGE; apply(true); };

  let timer = 0;
  q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { query = q.value; restart(); }, 120); });
  q.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && q.value) { e.preventDefault(); q.value = ''; query = ''; restart(); }
  });
  // « / » place le curseur dans la recherche quand l'index est à l'écran
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
    const r = root.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    e.preventDefault();
    q.focus();
  });
  sel.addEventListener('change', () => { src = sel.value; restart(); });
  toggles.forEach((b) => b.addEventListener('click', () => {
    toggles.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    type = b.dataset.type;
    restart();
  }));
  more.addEventListener('click', () => {
    const from = shown;
    shown += PAGE * 2;
    apply(false);
    // le focus passe au premier contenu ajouté : le clavier reprend là où la liste s'est allongée
    const next = matches[from];
    if (next) next.li.firstElementChild.focus({ preventScroll: true });
  });
  reset.addEventListener('click', () => {
    q.value = ''; query = ''; src = ''; sel.value = ''; type = '';
    toggles.forEach((o, i) => o.setAttribute('aria-pressed', String(i === 0)));
    restart();
    q.focus();
  });
  apply(false);
}

/* ---------- Visuels de l'accueil (_includes/visuels) ---------- */
// Hors production, ?visuel=a, b, c ou visage remplace le visuel choisi dans _config.yml par un autre, pris dans son <template>.
function pickVisuel() {
  const want = new URLSearchParams(location.search).get('visuel');
  if (!want) return;
  const tpl = $(`template[data-visuel="${CSS.escape(want)}"]`);
  const cur = $('.hero [data-visuel]');
  if (!tpl || !cur) return;
  cur.replaceWith(tpl.content.cloneNode(true));
}

// Défilement automatique d'un visuel : arrêté au survol, au focus clavier, hors de l'écran, par le bouton Pause,
// et jamais lancé quand le système demande moins de mouvement.
function autoplay(root, step, btn, ms) {
  let user = reduce, hover = false, focus = false, seen = false, timer = 0;
  const run = () => {
    clearTimeout(timer);
    if (!user && !hover && !focus && seen && !document.hidden) timer = setTimeout(() => { step(); run(); }, ms);
  };
  const label = () => { btn.textContent = user ? btn.dataset.play : btn.dataset.pause; };
  btn.addEventListener('click', () => { user = !user; label(); if (!user) step(); run(); });
  if (fine) {
    root.addEventListener('pointerenter', () => { hover = true; run(); });
    root.addEventListener('pointerleave', () => { hover = false; run(); });
  }
  // le focus sur les boutons de contrôle n'arrête pas la pile : on peut les enchaîner au clavier
  root.addEventListener('focusin', (e) => { focus = !e.target.closest('.vb-ctrl'); run(); });
  root.addEventListener('focusout', () => { focus = false; run(); });
  document.addEventListener('visibilitychange', run);
  new IntersectionObserver((en) => { seen = en[0].isIntersecting; run(); }, { threshold: 0.3 }).observe(root);
  label();
}

function initDeck(fig) {
  const cards = $$('.vb-card', fig);
  const ctrl = $('[data-deck-ctrl]', fig);
  if (!cards.length || !ctrl) return;
  let order = cards.map((_, i) => i);
  const place = () => order.forEach((ci, k) => {
    cards[ci].style.setProperty('--k', String(k));
    // seule la carte du dessus se lit et se clique ; les autres restent joignables au clavier
    cards[ci].classList.toggle('is-front', k === 0);
  });
  let busy = false;
  const next = () => {
    if (busy) return;
    const c = cards[order[0]];
    const done = () => { order.push(order.shift()); place(); c.classList.toggle('is-leaving', false); busy = false; };
    if (reduce) { done(); return; }
    busy = true;
    c.classList.toggle('is-leaving', true);
    setTimeout(done, 380);
  };
  // une carte atteinte au clavier passe sur le dessus
  cards.forEach((c, i) => c.addEventListener('focusin', () => {
    if (order[0] === i) return;
    order = [i, ...order.filter((x) => x !== i)];
    place();
  }));
  ctrl.hidden = false;
  $('[data-deck-next]', fig).addEventListener('click', next);
  autoplay(fig, next, $('[data-deck-pause]', fig), 3200);
  place();
  fig.classList.add('is-live');
}

function initTally(fig) {
  const list = $('[data-tally]', fig);
  const ctrl = $('[data-tally-ctrl]', fig);
  if (!list || !ctrl) return;
  const rows = $$('.vc-row', list);
  const nums = rows.map((r) => { const el = $('.vc-n', r); return { el, n: Number(el.textContent) }; });
  const count = ({ el, n }) => {
    const t0 = performance.now();
    const tick = (now) => {
      const k = clamp((now - t0) / 700);
      el.textContent = String(Math.round(n * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  let i = 0;
  const show = (k, animate) => {
    rows.forEach((r, j) => r.classList.toggle('is-on', j === k));
    list.style.setProperty('--i', String(k));
    if (animate && !reduce) count(nums[k]);
  };
  ctrl.hidden = false;
  autoplay(fig, () => { i = (i + 1) % rows.length; show(i, true); }, $('[data-tally-pause]', fig), 2600);
  show(0, false);
  fig.classList.add('is-live');
}

function initVisuels() {
  $$('.visuel-b').forEach(initDeck);
  $$('.visuel-c').forEach(initTally);
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
  // filet : une formule perdue à l'extraction laisse une espace avant le point ou la virgule (« l'ensemble des tels que . ») ;
  // _scripts/definitions-extraits.py réécrit désormais les formules, ce filtre ne devrait plus rien écarter
  const sound = (d) => !/\s[.,](\s|$)/.test(d.d);
  const pick = (all) => {
    const list = all.filter(sound);
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
      const nbsp = (s) => s.replace(/« /g, '«\u00a0').replace(/ »/g, '\u00a0»').replace(/\.\.\.$/, '…');
      term.textContent = nbsp(d.t); term.href = url; link.href = url;
      // les variables d'une formule arrivent en <i>…</i> : posées en nœuds, jamais en innerHTML
      text.replaceChildren(...nbsp(d.d).split(/<i>(.*?)<\/i>/).map((part, k) => {
        if (k % 2 === 0) return document.createTextNode(part);
        const i = document.createElement('i');
        i.textContent = part;
        return i;
      }));
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
    if (btn.getAttribute('aria-disabled') === 'true') return;
    btn.setAttribute('aria-disabled', 'true');
    let list;
    try { list = await load(); } catch (e) { btn.removeAttribute('aria-disabled'); return; }
    show(pick(list), true);
    setTimeout(() => btn.removeAttribute('aria-disabled'), reduce ? 0 : 420);
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
pickVisuel();
initLang();
initBar();
initMenu();
initTradesIndex();
initReveal();
initMagnetic();
initCopy();
initSlides();
initWorks();
initVisuels();
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
