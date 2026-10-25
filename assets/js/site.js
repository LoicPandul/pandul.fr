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
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
  last = now;
  if (lenis) lenis.raf(now);
  scroll.vy = scroll.vy * 0.85 + (scroll.y - scroll.lastY) * 0.15;
  scroll.lastY = scroll.y;
  let again = Math.abs(scroll.vy) > 0.05 || (lenis && lenis.isScrolling);
  for (const fn of frames) if (fn(dt, now)) again = true;
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
  frames.add(() => {
    const y = scroll.y;
    const menuOpen = $('#menu')?.open;
    if (!menuOpen) {
      if (y > 240 && y > lastY + 4) bar.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 120) bar.classList.remove('is-hidden');
    }
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
  if (!links.length) return;
  const map = new Map(links.map((a) => [a.dataset.index, a]));
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const id = en.target.getAttribute('aria-labelledby');
      links.forEach((a) => a.classList.toggle('is-current', a.dataset.index === id));
    }
  }, { rootMargin: '-35% 0px -55% 0px' });
  $$('.trade[aria-labelledby]').forEach((t) => io.observe(t));
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

/* ---------- Copier l'adresse ---------- */
function initCopy() {
  const btn = $('[data-copy]');
  const status = $('[data-copy-status]');
  if (!btn || !navigator.clipboard) return;
  btn.hidden = false;
  let timer;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      status.textContent = 'Adresse copiée.';
    } catch (e) {
      status.textContent = 'Copie impossible\u00a0: sélectionnez l’adresse ci-dessus.';
    }
    clearTimeout(timer);
    timer = setTimeout(() => { status.textContent = ''; }, 2400);
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
const KINDS = { tutoriel: 'tutoriel', article: 'article', formation: 'formation', podcast: 'épisode de podcast', production: 'vidéo', interview: 'interview' };
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
  track.setAttribute('aria-label', 'Contenus publiés, un trait par contenu');
  track.setAttribute('aria-valuemin', '1');
  track.setAttribute('aria-valuemax', String(N));
  track.setAttribute('aria-orientation', 'horizontal');
  const spacerA = document.createElement('span'); spacerA.className = 'tick-spacer';
  track.appendChild(spacerA);
  const ticks = items.map((it) => {
    const s = document.createElement('span');
    s.className = 'tick' + (it.first ? ' is-group' : '');
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
    if (g.items.length < 6) l.classList.add('is-small');
    labels.appendChild(l);
    return l;
  });
  rail.append(track, labels);

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
    openEl.setAttribute('aria-label', `Ouvrir \u00ab\u00a0${it.t}\u00a0\u00bb`);
    track.setAttribute('aria-valuenow', String(i + 1));
    track.setAttribute('aria-valuetext', `${it.t}, ${groups[it.g].name}`);
    if (!wide() && !fromScroll) track.scrollTo({ left: i * 8, behavior: reduce ? 'auto' : 'smooth' });
  };

  // Placement des noms de groupes.
  const placeLabels = () => {
    if (wide()) {
      const w = track.clientWidth;
      let lastRight = -Infinity;
      labelEls.forEach((l, gi) => {
        const x = (starts[gi] / N) * w;
        const lw = l.offsetWidth;
        const over = x + lw > w;
        const left = over ? Math.max(x - lw, 0) : x;
        // un nom qui chevaucherait le précédent est masqué (la lecture au-dessus le donne déjà)
        const clash = !l.classList.contains('is-small') && left < lastRight + 12;
        l.classList.toggle('is-end', over);
        l.style.visibility = clash ? 'hidden' : '';
        if (!clash && !l.classList.contains('is-small')) lastRight = left + lw;
        l.style.transform = `translateX(${left.toFixed(1)}px)`;
      });
    } else {
      const sp = spacerA.offsetWidth, tw = track.clientWidth;
      labelEls.forEach((l, gi) => {
        const x = sp + starts[gi] * 8 - track.scrollLeft;
        l.style.visibility = x > tw || x + l.offsetWidth < 0 ? 'hidden' : '';
        l.style.transform = `translateX(${x.toFixed(1)}px)`;
      });
    }
  };

  // Survol (ordinateur) : le trait sous le curseur est lu, ses voisins grandissent.
  const dock = { x: -1, amp: { v: 0, vel: 0 }, target: 0 };
  track.addEventListener('pointermove', (e) => {
    if (!wide() || e.pointerType === 'touch') return;
    const r = track.getBoundingClientRect();
    const x = clamp((e.clientX - r.left) / r.width) * N;
    dock.x = x; dock.target = 1;
    set(Math.floor(x));
    kick();
  });
  track.addEventListener('pointerleave', () => { dock.target = 0; kick(); });
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
      if (useDock) { const dx = (i + 0.5 - dock.x) / 6; s *= 1 + 0.9 * a.v * Math.exp(-dx * dx); }
      if (Math.abs(s - scales[i]) > 0.002) { scales[i] = s; inner[i].style.transform = `scaleY(${s.toFixed(3)})`; }
    }
    return moving;
  });

  const onResize = () => {
    if (!wide()) { track.scrollLeft = Math.max(0, current) * 8; }
    placeLabels();
  };
  window.addEventListener('resize', onResize, { passive: true });
  set(0);
  requestAnimationFrame(onResize);
  works = { items };
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
  btn.hidden = false;
  btn.addEventListener('click', async () => {
    let list;
    try { list = await load(); } catch (e) { return; }
    const curLetter = current.charAt(0);
    let d = null;
    for (let tries = 0; tries < 12; tries++) {
      d = list[Math.floor(Math.random() * list.length)];
      if (d.t !== current && (d.t.charAt(0) !== curLetter || tries > 8)) break;
    }
    current = d.t;
    box.classList.add('is-changing');
    setTimeout(() => {
      const url = `${box.dataset.base}/${d.s}/`;
      term.textContent = d.t; term.href = url; link.href = url;
      text.textContent = d.d;
      box.classList.remove('is-changing');
    }, reduce ? 0 : 220);
    const letter = d.t.charAt(0);
    if (letterEl) letterEl.textContent = letter;
    if (letterStage && letterFigure) letterStage.morphTo(letterFigure(letter), false, reduce ? 200 : 1100), kick();
  });
  // Charge la liste à l'approche, pour que le premier clic soit immédiat.
  new IntersectionObserver((en, io) => { if (en[0].isIntersecting) { load().catch(() => {}); io.disconnect(); } }, { rootMargin: '400px 0px' }).observe(box);
}

/* ---------- Gerfaut : vidéo et stores ---------- */
function initGerfaut() {
  const band = $('[data-gerfaut]');
  if (!band) return;
  const video = $('video', band), toggle = $('[data-video-toggle]', band), blinds = $('.blinds', band);
  let userPaused = reduce;
  toggle.hidden = false;
  const label = () => { toggle.textContent = video.paused ? 'Lire la vidéo' : 'Mettre en pause'; };
  label();
  video.addEventListener('play', label); video.addEventListener('pause', label);
  toggle.addEventListener('click', () => {
    if (video.paused) { userPaused = false; video.play().catch(label); } else { userPaused = true; video.pause(); }
  });
  new IntersectionObserver((en) => {
    const vis = en[0].isIntersecting;
    if (vis && !userPaused) video.play().catch(label);
    else if (!vis && !video.paused) video.pause();
  }, { threshold: 0.3 }).observe(band);

  if (reduce || !blinds) return;
  const n = window.innerWidth < 600 ? 9 : 14;
  const bars = Array.from({ length: n }, () => blinds.appendChild(document.createElement('span')));
  let prev = -1;
  frames.add(() => {
    const r = band.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < -100 || r.top > vh + 100) return false;
    const p = clamp((vh - r.top) / (vh * 0.8));
    if (Math.abs(p - prev) < 0.001) return false;
    prev = p;
    bars.forEach((b, i) => {
      const k = clamp(p * 1.5 - (i / n) * 0.5);
      // fermés, les stores laissent toujours passer un fil de vidéo
      const e = 0.84 * (1 - Math.pow(k, 1.6));
      b.style.transform = `scaleY(${e.toFixed(3)})`;
      b.style.visibility = e < 0.01 ? 'hidden' : '';
    });
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
    img.alt = 'Portrait de Loïc Morel';
    img.width = 800; img.height = 1000;
    img.src = base + 'img/lignes/portrait-encre.webp';
    el.querySelector('.stage-box').prepend(img);
  }
}

async function initStages() {
  const els = $$('.stage[data-stage]');
  if (!els.length) return;
  const mod = await import('./lines.js');
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
      const words = (works ? works.items.map((w) => w.t) : ['Bitcoin']).join(' ').split(/\s+/).filter(Boolean);
      st = new LineStage(el, {
        figure: (w, h) => ({ canvas: portraitCanvas(img, w, h, { bg: '#9e9e9e', height: 0.96 }), invert: true }),
        words, pitch: [7, 6], thick: [0.07, 0.8], lensR: [112, 86], mag: 2.3, drawn: reduce, drawK: 7, drawC: 5.3,
      });
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
        letters: true, ink: '#F2F2EE', paper: '#183F8F', pitch: [6, 3.5], thick: [0.1, 0.84], lensR: [0, 0], mag: 1, drawn: reduce, drawK: 40, drawC: 12.6,
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
  if (st.kind === 'name') {
    const hit = (p) => {
      if (!st.letters) return null;
      const rows = st.ampRows || 1;
      const row = Math.min(rows - 1, Math.floor((p.y / st.h) * rows));
      return st.letters.find((L) => L.row === row && p.x >= L.x0 && p.x <= L.x1) || null;
    };
    const move = (e) => {
      if (!st.letters) return;
      const L = hit(pos(e));
      st.letters.forEach((l) => { l.target = l === L ? 1 : 0; });
      kick();
    };
    box.addEventListener('pointermove', move);
    box.addEventListener('pointerdown', move);
    const leave = () => { if (st.letters) st.letters.forEach((l) => { l.target = 0; }); kick(); };
    box.addEventListener('pointerleave', leave);
    box.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') leave(); });
    box.addEventListener('pointercancel', leave);
    return;
  }
  box.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    const p = pos(e); st.mouse.x = p.x; st.mouse.y = p.y; st.lensTarget = 1; kick();
  });
  box.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' && e.buttons === 0 && e.pressure === 0) return;
    const p = pos(e); st.mouse.x = p.x; st.mouse.y = p.y;
    st.lensTarget = 1; clearTimeout(release); kick();
  });
  box.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { st.lensTarget = 0; kick(); } });
  box.addEventListener('pointerdown', (e) => {
    const p = pos(e);
    st.mouse.x = p.x; st.mouse.y = p.y;
    if (e.pointerType !== 'mouse') { st.mx.v = p.x; st.my.v = p.y; st.lensTarget = 1; }
    if (!reduce) st.tap(p.x, p.y);
    clearTimeout(release); kick();
  });
  const up = (e) => {
    if (e.pointerType === 'mouse') return;
    clearTimeout(release);
    release = setTimeout(() => { st.lensTarget = 0; kick(); }, 1800);
  };
  box.addEventListener('pointerup', up);
  box.addEventListener('pointercancel', () => { st.lensTarget = 0; kick(); });
}

/* ---------- Démarrage ---------- */
initBar();
initMenu();
initTradesIndex();
initReveal();
initMagnetic();
initCopy();
initSlides();
initWorks();
initDict();
initGerfaut();
initLenis();
kick();
const startStages = () => initStages().catch(() => $$('.stage[data-stage]').forEach(staticStage));
if (document.readyState === 'complete') requestAnimationFrame(startStages);
else window.addEventListener('load', () => requestAnimationFrame(startStages), { once: true });
