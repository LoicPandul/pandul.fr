// Ce que je fais : les mêmes lignes dessinent trois pages, une par métier.
// Une page de tutoriel qui s'écrit, une page de documentation dont les commandes se cochent,
// un éditeur de code et sa signature vérifiée. Chaque mot est un trait ; une règle de lecture
// (le curseur, le doigt ou le défilement) rend les mots lisibles là où elle passe.

const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const HEX = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const C = {
  ink: HEX('#183F8F'), deep: HEX('#11306F'), paper: HEX('#F2F2EE'), sheet: HEX('#FAFAF7'),
  plate: HEX('#D6DCE8'), pale: HEX('#C9D3EA'), soft: HEX('#4B5F8E'), mark: HEX('#FFD24A'),
  bar: HEX('#8A9BC8'), barDark: HEX('#6F82B4'), bone: HEX('#E7EBF3'), cream: HEX('#F4E2A1'), code: HEX('#5B77B8'),
};
const mixc = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const rgba = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

const F_TEXT = '"Literata", "Literata Repli", Georgia, serif';
const F_UI = '"Mona Sans", "Mona Repli", system-ui, sans-serif';
const F_CODE = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

/* ---------- Mise en page des trois pages ---------- */

// Interligne : élargi quand la page a de la place, pour qu'elle remplisse son panneau.
let G = 1;

// Un « stylo » qui pose les mots en traits, avec retour à la ligne.
function makePen(ctx, out) {
  return function flow(text, o) {
    const font = `${o.weight || 500} ${o.size}px ${o.family}`;
    ctx.font = font;
    const space = ctx.measureText(' ').width;
    const lh = (o.lh || o.size * 1.8) * G;
    const max = o.w;
    let x = o.x, y = o.y + lh / 2, first = true;
    const indent = o.indent || 0;
    const words = text.split(' ');
    for (let wi = 0; wi < words.length; wi++) {
      let word = words[wi];
      if (!word) { x += space; continue; }
      let ww = ctx.measureText(word).width;
      // un mot plus long que la ligne (la clé publique) se coupe au caractère
      while (ww > max && word.length > 1) {
        let n = word.length;
        while (n > 1 && ctx.measureText(word.slice(0, n)).width > o.x + max - x) n--;
        if (n < 4 && x > o.x) { x = o.x + indent; y += lh; continue; }
        const head = word.slice(0, n);
        push(head, x, y, ctx.measureText(head).width);
        word = word.slice(n); ww = ctx.measureText(word).width;
        x = o.x + indent; y += lh;
      }
      if (!first && x + ww > o.x + max) { x = o.x + indent; y += lh; }
      push(word, x, y, ww);
      x += ww + space;
      first = false;
    }
    function push(word, bx, by, bw) {
      const col = typeof o.col === 'function' ? o.col(word) : o.col;
      out.push({ word, font, size: o.size, lh, x: bx, y: by, w: bw, h: Math.max(2, o.size * (o.thick || 0.36) * 1.25), col, tcol: o.tcol || C.ink, write: o.write || 0, show: !!o.show });
    }
    return y + lh / 2;
  };
}

function page(i, W, H, f, ctx, rich = false) {
  // chaque métier a sa planche : bleu-gris, jaune pâle, bleu pâle
  const L = { boxes: {}, bars: [], texts: [], checks: [], net: null, fit: true, f, rich, plate: [C.plate, C.cream, C.pale][i] };
  const flow = makePen(ctx, L.bars);
  const pad = Math.round(Math.max(12, W * 0.045));
  const box = (k, x, y, w, h, col, r = 0) => { L.boxes[k] = { x, y, w, h, col, r }; };
  const text = (k, s, x, y, size, weight, family, col, align = 'left') => L.texts.push({ k, s, x, y, font: `${weight} ${size}px ${family}`, col, align });
  const narrow = W < 460;

  if (i === 0) {
    // Une page de tutoriel, posée sur la planche
    const sw = Math.min(W - 2 * pad, Math.max(H * 0.82, W * 0.8));
    const sx = (W - sw) / 2, sy = pad, sh = H - 2 * pad;
    box('sheet', sx, sy, sw, sh, C.sheet, 4);
    const ip = Math.max(16, sw * 0.085);
    const x0 = sx + ip, w0 = sw - 2 * ip;
    let y = sy + ip * 0.9;
    text('a-tag', 'BTC 202', x0, y + f * 0.5, f * 0.82, 700, F_UI, C.soft);
    y += f * 1.7;
    // le titre se lit toujours
    ctx.font = `780 ${f * 1.72}px ${F_UI}`;
    const hl = wrap(ctx, 'Mettre en place son premier nœud Bitcoin', w0);
    hl.forEach((s, n) => text('a-h' + n, s, x0, y + f * 1.72 * (0.55 + n * 1.12), f * 1.72, 780, F_UI, C.ink));
    y += f * 1.72 * (hl.length * 1.12) + f * 0.9;
    y = flow("Un nœud vérifie lui-même chaque bloc et chaque transaction. Vous n'avez plus besoin de croire un serveur sur parole pour connaître votre solde.",
      { x: x0, y, w: w0, size: f, family: F_TEXT, lh: f * 1.75, col: C.bar, write: 1 });
    y += f * 0.9;
    const bh = narrow ? f * 4.2 : Math.min(f * 7.2, Math.max(f * 4.6, sh * 0.2));
    box('block', x0, y, w0, bh, C.bone, 3);
    L.net = { x: x0, y, w: w0, h: bh };
    y += bh + f * 0.35;
    if (!narrow) y = flow('Votre nœud parle directement aux autres nœuds du réseau.', { x: x0, y, w: w0, size: f * 0.8, weight: 520, family: F_UI, lh: f * 1.5, col: C.bar, thick: 0.3, write: 1 });
    y += f * 0.7;
    const steps = ['Télécharger Bitcoin Core', 'Vérifier la signature du fichier', 'Lancer la première synchronisation'];
    steps.forEach((s, n) => {
      const cy = y + f * 0.95;
      L.texts.push({ k: 'a-n' + n, s: String(n + 1), x: x0 + f * 0.62, y: cy, font: `760 ${f * 0.78}px ${F_UI}`, col: C.ink, align: 'center', dot: f * 0.62 });
      y = flow(s, { x: x0 + f * 1.8, y, w: w0 - f * 1.8, size: f * 0.95, weight: 620, family: F_UI, lh: f * 1.9, col: C.barDark, thick: 0.4, write: 1 });
    });
    L.fit = y < sy + sh - ip * 0.6;
  } else if (i === 1) {
    // Une page de documentation, dans une fenêtre
    const sx = pad, sy = pad, sw = W - 2 * pad, sh = H - 2 * pad;
    box('sheet', sx, sy, sw, sh, C.sheet, 4);
    const th = f * 2.3;
    box('top', sx, sy, sw, th, C.bone, 4);
    flow('docs / installation', { x: sx + f, y: sy + (th - f * 1.4) / 2, w: sw, size: f * 0.78, weight: 560, family: F_UI, lh: f * 1.4, col: C.bar, thick: 0.32 });
    const nav = ['Installation', 'Premiers pas', 'Configuration', 'Référence de la CLI', 'Notes de version'];
    let mx, mw, y;
    if (!narrow) {
      const nw = Math.round(sw * 0.27);
      box('side', sx, sy + th, nw, sh - th, C.bone, 0);
      let ny = sy + th + f * 1.1;
      nav.forEach((s, n) => {
        if (n === 0) box('note', sx + f * 0.55, ny + f * 0.1, nw - f * 1.1, f * 1.7, C.mark, 2);
        ny = flow(s, { x: sx + f, y: ny, w: nw - f * 1.6, size: f * 0.86, weight: n ? 560 : 700, family: F_UI, lh: f * 1.9, col: n ? C.bar : C.ink, thick: 0.34 });
      });
      mx = sx + nw + f * 1.4; mw = sw - nw - f * 2.6; y = sy + th + f * 1.2;
    } else {
      // téléphone : le menu passe en une ligne d'onglets
      let nx = sx + f * 0.9; const ny = sy + th + f * 0.5;
      nav.slice(0, 3).forEach((s, n) => {
        ctx.font = `${n ? 560 : 700} ${f * 0.86}px ${F_UI}`;
        const ww = ctx.measureText(s).width;
        if (n === 0) box('note', nx - f * 0.35, ny + f * 0.1, ww + f * 0.7, f * 1.7, C.mark, 2);
        flow(s, { x: nx, y: ny, w: ww + 2, size: f * 0.86, weight: n ? 560 : 700, family: F_UI, lh: f * 1.9, col: n ? C.bar : C.ink, thick: 0.34 });
        nx += ww + f * 1.3;
      });
      box('side', sx, sy + th, sw, f * 2.4, C.bone, 0);
      mx = sx + f * 0.9; mw = sw - f * 1.8; y = sy + th + f * 3.4;
    }
    text('b-h', 'Installation', mx, y + f * 0.9, f * 1.6, 780, F_UI, C.ink);
    y += f * 2.4;
    y = flow("Téléchargez l'archive de votre système et le fichier des empreintes, puis vérifiez l'archive avant de l'ouvrir.",
      { x: mx, y, w: mw, size: f * 0.95, family: F_TEXT, lh: f * 1.7, col: C.bar });
    y += f * 0.9;
    const cs = f * (narrow ? 0.95 : 0.84), clh = cs * 2;
    const rows = [
      ['$ sha256sum --check --ignore-missing SHA256SUMS', 1],
      ['app-1.4.2-linux.tar.gz: OK', 0],
      ['$ tar -xzf app-1.4.2-linux.tar.gz', 1],
      ['$ ./app --version', 1],
      ['app 1.4.2', 0],
    ];
    if (narrow) rows.splice(3);
    const cy0 = y;
    y += cs * 0.9;
    const cw = mw - f * 2.6;
    let k = 0;
    rows.forEach(([s, chk]) => {
      const ry = y;
      y = flow(s, { x: mx + cs, y, w: cw, size: cs, family: F_CODE, lh: clh, indent: cs * 1.2, thick: 0.42,
        col: (w) => (w === '$' ? C.mark : chk ? C.pale : C.barDark), tcol: chk ? C.paper : C.pale });
      if (!narrow && y - ry > clh * 1.5) L.fit = false;
      if (chk) L.checks.push({ k: 'b-k' + k, x: mx + mw - f * 1.1, y: ry + clh / 2, s: f * 0.5, col: C.mark, at: 0.18 + k++ * 0.2 });
    });
    y += cs * 0.9;
    box('block', mx, cy0, mw, y - cy0, C.ink, 5);
    y += f * 1;
    const ny0 = y;
    y = flow("Si l'empreinte ne correspond pas, n'ouvrez pas l'archive.", { x: mx + f, y: y + f * 0.2, w: mw - f, size: f * 0.9, weight: 560, family: F_UI, lh: f * 1.7, col: C.barDark, thick: 0.36 });
    box('rule', mx, ny0, 3, y - ny0 + f * 0.2, C.mark, 0);
    if (rich) {
      // une deuxième partie quand le panneau est haut
      y += f * 1.6;
      text('b-h2', 'Mise à jour', mx, y + f * 0.7, f * 1.25, 760, F_UI, C.ink);
      y += f * 2;
      y = flow('Pour passer à une nouvelle version, remplacez le binaire : votre dossier de données reste en place.',
        { x: mx, y, w: mw, size: f * 0.95, family: F_TEXT, lh: f * 1.7, col: C.bar });
    }
    L.fit = L.fit && y < sy + sh - f;
  } else {
    // Un éditeur de code, puis le terminal qui vérifie la signature
    const sx = pad, sy = pad, sw = W - 2 * pad, sh = H - 2 * pad;
    box('sheet', sx, sy, sw, sh, C.ink, 4);
    const th = f * 2.3;
    box('top', sx, sy, sw, th, C.deep, 4);
    ctx.font = `620 ${f * 0.82}px ${F_UI}`;
    const tw = ctx.measureText('adresses.rs').width + f * 2;
    box('note', sx + f * 0.4, sy + f * 0.4, tw, th - f * 0.4, C.ink, 3);
    text('c-tab', 'adresses.rs', sx + f * 1.4, sy + th / 2 + f * 0.2, f * 0.82, 620, F_UI, C.paper);
    const cs = f * (narrow ? 0.95 : 0.86), clh = cs * 1.95;
    const gw = cs * 3.2;
    box('side', sx, sy + th, gw, sh - th, C.deep, 0);
    const lines = [
      '// Gerfaut ne connaît que la clé publique étendue :',
      '// il suit le solde, sans jamais pouvoir dépenser.',
      'pub fn adresses(xpub: &Xpub, n: u32) -> Vec<Address> {',
      '    (0..n)',
      '        .map(|i| derive(xpub, i))',
      '        .collect()',
      '}',
    ];
    if (rich) lines.push('', '#[test]', 'fn dix_adresses() {', '    let xpub = Xpub::from_str(XPUB_TEST).unwrap();', '    assert_eq!(adresses(&xpub, 10).len(), 10);', '}');
    const KW = new Set(['pub', 'fn', '->', '|i|', '&Xpub,', 'u32)', 'Vec<Address>', '#[test]', 'let', 'assert_eq!(adresses(&xpub,']);
    let y = sy + th + cs * 0.8;
    const x0 = sx + gw + cs * 1.1, w0 = sw - gw - cs * 2;
    let ln = 1;
    for (const s of lines) {
      const lead = s.match(/^ */)[0].length;
      ctx.font = `500 ${cs}px ${F_CODE}`;
      const ind = ctx.measureText(' ').width * lead;
      const comment = s.startsWith('//');
      const ry = y;
      y = flow(s.trimStart(), { x: x0 + ind, y, w: w0 - ind, size: cs, family: F_CODE, lh: clh, indent: cs * 2.4, thick: 0.42,
        col: (w) => (comment ? C.code : KW.has(w) ? C.mark : C.pale), tcol: comment ? C.pale : C.paper });
      if (!narrow && y - ry > clh * 1.5) L.fit = false;
      text('c-l' + ln, String(ln), sx + gw - cs * 0.7, ry + clh / 2, Math.max(10, cs * 0.8), 500, F_CODE, C.code, 'right');
      ln++;
    }
    // le terminal en bas
    const tx = sx + f * 0.8, tW = sw - f * 1.6;
    const tl = [];
    const tflow = makePen(ctx, tl);
    let ty = 0;
    ty = tflow('$ minisign -Vm gerfaut.apk -P RWTz3c4gUmglCX5Uvjthigz1ts3TS3ZSdhRNpFgOJRW/Wr4XjGlqTR3O', { x: tx + f * 0.8, y: ty, w: tW - f * 2.2, size: cs, family: F_CODE, lh: clh, indent: cs * 1.2, thick: 0.42,
      col: (w) => (w === '$' ? C.mark : C.pale), tcol: C.paper, write: 2, show: true });
    const oy = ty;
    ty = tflow('Signature and comment signature verified', { x: tx + f * 0.8 + f * 1.4, y: ty + cs * 0.2, w: tW - f * 4, size: cs, weight: 600, family: F_CODE, lh: clh, thick: 0.42, col: C.mark, tcol: C.mark, write: 3, show: true });
    const tH = ty + cs * 1.6;
    const tY = sy + sh - f * 0.8 - tH;
    tl.forEach((b) => { b.y += tY + cs * 0.8; L.bars.push(b); });
    box('block', tx, tY, tW, tH, C.deep, 5);
    L.checks.push({ k: 'c-k', x: tx + f * 1.35, y: tY + cs * 0.8 + oy + cs * 0.2 + clh / 2, s: f * 0.5, col: C.mark, at: 0.82 });
    L.fit = L.fit && y < tY - f * 0.5;
  }
  // ordre d'écriture : chaque trait connaît sa part du texte à écrire
  for (const g of [1, 2, 3]) {
    const bs = L.bars.filter((b) => b.write === g);
    const total = bs.reduce((s, b) => s + b.word.length + 1, 0) || 1;
    let c = 0;
    for (const b of bs) { b.c0 = c / total; c += b.word.length + 1; b.c1 = c / total; }
  }
  return L;
}

function wrap(ctx, s, max) {
  const out = []; let line = '';
  for (const w of s.split(' ')) {
    const t = line ? line + ' ' + w : w;
    if (line && ctx.measureText(t).width > max) { out.push(line); line = w; } else line = t;
  }
  if (line) out.push(line);
  return out;
}

export function build(i, W, H, ctx) {
  let L = null;
  // le plus grand corps qui tient : chaque page remplit son panneau
  for (let f = Math.min(25, W / 19); f >= 8.5; f -= 0.25) {
    L = page(i, W, H, f, ctx);
    if (L.fit) break;
  }
  // une page plus fournie si elle tient sans trop rapetisser le texte
  if (i > 0 && W >= 460) {
    for (let f = L.f; f >= L.f * 0.86; f -= 0.25) {
      const R = page(i, W, H, f, ctx, true);
      if (R.fit) { L = R; break; }
    }
  }
  // puis le plus grand interligne qui tient encore
  const f = L.f;
  for (let g = 1.4; g > 1; g -= 0.05) {
    G = g;
    const L2 = page(i, W, H, f, ctx, L.rich);
    if (L2.fit) { L = L2; break; }
  }
  G = 1;
  // étendue du texte, pour que la règle de lecture parcoure la page et pas le vide
  const ys = L.bars.map((b) => b.y).concat(L.texts.map((t) => t.y));
  L.top = Math.min(...ys); L.bottom = Math.max(...ys);
  return L;
}

/* ---------- Écriture : quelle part de chaque page est déjà là ---------- */
function reveal(b, q) {
  if (!b.write) return 1;
  // tutoriel : le texte s'écrit pendant les trois premiers quarts ; terminal : la commande se tape, puis la sortie
  const p = b.write === 1 ? 0.3 + 0.7 * clamp(q / 0.7) : b.write === 2 ? clamp((q - 0.12) / 0.55) : clamp((q - 0.76) / 0.12);
  return clamp((p - b.c0) / Math.max(0.0001, b.c1 - b.c0));
}

/* ---------- Dessin ---------- */
function rr(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Mélange deux pages : les traits glissent de leur place dans l'une à leur place dans l'autre.
function blend(A, B, t, qa, qb) {
  const boxes = [];
  const keys = new Set([...Object.keys(A.boxes), ...Object.keys(B.boxes)]);
  const te = ease(t);
  for (const k of keys) {
    const a = A.boxes[k], b = B.boxes[k];
    if (a && b) boxes.push({ x: lerp(a.x, b.x, te), y: lerp(a.y, b.y, te), w: lerp(a.w, b.w, te), h: lerp(a.h, b.h, te), r: lerp(a.r, b.r, te), col: mixc(a.col, b.col, te), a: 1, k });
    else if (a) boxes.push({ ...a, a: 1 - te, k });
    else boxes.push({ ...b, a: te, k });
  }
  // la planche d'abord, la feuille ensuite, les blocs par-dessus
  const order = { sheet: 0, top: 1, side: 1, block: 2, note: 3, rule: 3 };
  boxes.sort((p, q) => (order[p.k] ?? 2) - (order[q.k] ?? 2));
  const n = Math.max(A.bars.length, B.bars.length);
  const bars = [];
  const S = 0.6;
  // les lignes glissent l'une après l'autre, du haut vers le bas de la page
  const y0 = Math.min(A.top, B.top), y1 = Math.max(A.bottom, B.bottom);
  for (let i = 0; i < n; i++) {
    const a = A.bars[i], b = B.bars[i];
    const yy = a && b ? Math.min(a.y, b.y) : (a || b).y;
    const tt = ease(clamp(t * (1 + S) - S * clamp((yy - y0) / Math.max(1, y1 - y0))));
    const wa = a ? a.w * reveal(a, qa) : 0, wb = b ? b.w * reveal(b, qb) : 0;
    if (a && b) bars.push({ x: lerp(a.x, b.x, tt), y: lerp(a.y, b.y, tt), w: lerp(wa, wb, tt), h: lerp(a.h, b.h, tt), col: mixc(a.col, b.col, tt), src: tt < 0.5 ? a : b, full: tt < 0.5 ? a.w : b.w, a: 1 });
    else if (a) bars.push({ x: a.x, y: a.y, w: wa * (1 - tt), h: a.h, col: a.col, src: a, full: a.w, a: 1 - tt });
    else bars.push({ x: b.x, y: b.y, w: wb * tt, h: b.h, col: b.col, src: b, full: b.w, a: tt });
  }
  const fa = clamp(1 - t * 2.2), fb = clamp(t * 2.2 - 1.2);
  const texts = [...A.texts.map((x) => ({ ...x, a: fa })), ...(A === B ? [] : B.texts.map((x) => ({ ...x, a: fb })))];
  const checks = [...A.checks.map((x) => ({ ...x, a: fa, k: clamp((qa - x.at) / 0.08) })), ...(A === B ? [] : B.checks.map((x) => ({ ...x, a: fb, k: clamp((qb - x.at) / 0.08) })))];
  const net = A.net && (A === B ? 1 : fa) > 0 ? { ...A.net, a: A === B ? 1 : fa, q: qa } : (B.net && fb > 0 ? { ...B.net, a: fb, q: qb } : null);
  // le curseur d'écriture du tutoriel, au bout du dernier mot posé
  let caret = null;
  const writing = A.bars.length && A.bars[0].write === 1 ? [A, qa, 1 - te] : (B.bars.length && B.bars[0].write === 1 ? [B, qb, te] : null);
  if (writing && writing[1] < 0.7 && writing[2] > 0.5) {
    for (let i = bars.length - 1; i >= 0; i--) {
      const bb = bars[i];
      if (bb.src.write === 1 && bb.w > 0.5) { caret = { x: bb.x + bb.w + 2, y: bb.y, h: bb.src.font.match(/(\d+(\.\d+)?)px/)[1] * 1.1 }; break; }
    }
  }
  const dark = (A.boxes.sheet.col === C.ink ? 1 - te : 0) + (B.boxes.sheet.col === C.ink ? te : 0);
  const plate = mixc(A.plate, B.plate, te);
  return { boxes, bars, texts, checks, net, caret, dark, plate };
}

function drawCheck(ctx, c) {
  if (c.k <= 0 || c.a <= 0) return;
  const s = c.s * (0.6 + 0.4 * ease(c.k));
  ctx.save();
  ctx.globalAlpha = c.a * Math.min(1, c.k * 1.5);
  ctx.strokeStyle = rgba(c.col);
  ctx.lineWidth = Math.max(1.6, c.s * 0.34);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const p = ease(c.k);
  ctx.beginPath();
  ctx.moveTo(c.x - s, c.y);
  const mx = c.x - s * 0.3, my = c.y + s * 0.7;
  if (p < 0.4) { const u = p / 0.4; ctx.lineTo(lerp(c.x - s, mx, u), lerp(c.y, my, u)); }
  else { const u = (p - 0.4) / 0.6; ctx.lineTo(mx, my); ctx.lineTo(lerp(mx, c.x + s, u), lerp(my, c.y - s * 0.75, u)); }
  ctx.stroke();
  ctx.restore();
}

function drawNet(ctx, n) {
  // votre nœud au centre, relié à ses pairs ; des messages circulent quand on défile
  const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
  const rx = n.w * 0.36, ry = n.h * 0.32;
  const R = Math.max(4, n.h * 0.09);
  ctx.save();
  ctx.globalAlpha = n.a;
  const peers = 7;
  for (let i = 0; i < peers; i++) {
    const ang = -Math.PI / 2 + (i / peers) * Math.PI * 2 + 0.3;
    const px = cx + Math.cos(ang) * rx, py = cy + Math.sin(ang) * ry;
    ctx.strokeStyle = rgba(C.bar); ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    const u = (n.q * 2.4 + i / peers) % 1;
    ctx.fillStyle = rgba(C.ink);
    ctx.beginPath(); ctx.arc(lerp(px, cx, u), lerp(py, cy, u), Math.max(1.6, R * 0.28), 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(C.sheet); ctx.strokeStyle = rgba(C.ink); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(px, py, R * 0.62, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  ctx.fillStyle = rgba(C.ink);
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = rgba(C.mark);
  ctx.beginPath(); ctx.arc(cx, cy, R * 0.42, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawScene(ctx, W, H, M, words, lens) {
  for (const b of M.boxes) {
    if (b.a <= 0.002 || b.w <= 0.5 || b.h <= 0.5) continue;
    ctx.globalAlpha = b.a;
    ctx.fillStyle = rgba(b.col);
    rr(ctx, b.x, b.y, b.w, b.h, b.r);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (M.net) drawNet(ctx, M.net);
  for (const b of M.bars) {
    if (b.w <= 0.4 || b.a <= 0.01) continue;
    // la sortie du terminal se lit toujours ; le reste seulement sous la règle
    // sous la règle : seulement les mots entiers, posés sur la ligne qu'elle lit
    const inside = words && Math.abs(b.y - lens.y) < lens.h * 0.32 && b.x >= lens.x - lens.w / 2 + 2 && b.x + b.full <= lens.x + lens.w / 2 - 2;
    if ((inside || b.src.show) && Math.abs(b.w - b.full) < 0.5) {
      ctx.globalAlpha = b.a;
      ctx.font = b.src.font;
      ctx.fillStyle = rgba(b.src.tcol);
      ctx.textBaseline = 'middle';
      ctx.fillText(b.src.word, b.x, b.y);
      continue;
    }
    ctx.globalAlpha = b.a;
    ctx.fillStyle = rgba(b.col);
    rr(ctx, b.x, b.y - b.h / 2, b.w, b.h, b.h / 2);
    ctx.fill();
  }
  for (const t of M.texts) {
    if (t.a <= 0.01) continue;
    ctx.globalAlpha = t.a;
    if (t.dot) {
      ctx.fillStyle = rgba(C.mark);
      ctx.beginPath(); ctx.arc(t.x, t.y, t.dot, 0, Math.PI * 2); ctx.fill();
    }
    ctx.font = t.font;
    ctx.fillStyle = rgba(t.col);
    ctx.textBaseline = 'middle';
    ctx.textAlign = t.align;
    ctx.fillText(t.s, t.x, t.y);
    ctx.textAlign = 'left';
  }
  ctx.globalAlpha = 1;
  for (const c of M.checks) drawCheck(ctx, c);
  if (M.caret && !words) {
    ctx.fillStyle = rgba(C.ink);
    ctx.fillRect(M.caret.x, M.caret.y - M.caret.h / 2, 2, M.caret.h);
  }
}

function render(st) {
  const { ctx, W, H, dpr } = st;
  const A = st.layouts[st.from], B = st.layouts[st.to];
  const M = blend(A, B, st.t, st.qa, st.qb);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = rgba(M.plate);
  ctx.fillRect(0, 0, W, H);
  drawScene(ctx, W, H, M, false, null);
  const l = st.lens;
  if (l.on > 0.01) {
    // la règle de lecture : sous elle, les traits redeviennent des mots
    ctx.save();
    rr(ctx, l.x - l.w / 2, l.y - l.h / 2, l.w, l.h, l.r);
    ctx.clip();
    ctx.globalAlpha = 1;
    drawScene(ctx, W, H, M, true, l);
    ctx.restore();
    ctx.globalAlpha = l.on;
    ctx.strokeStyle = rgba(l.dark ? C.mark : C.ink);
    ctx.lineWidth = 1.5;
    rr(ctx, l.x - l.w / 2, l.y - l.h / 2, l.w, l.h, l.r);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

/* ---------- Mise en route ---------- */
export async function initTrades({ frames, kick, reduce }) {
  const canvases = $$('canvas[data-trade-canvas]');
  const trades = $$('.trade[aria-labelledby]');
  if (!canvases.length || !trades.length) return;
  try {
    await Promise.all([document.fonts.load(`500 14px ${F_TEXT}`), document.fonts.load(`700 14px ${F_UI}`)]);
  } catch (e) { /* les polices de repli suffisent */ }
  const measure = document.createElement('canvas').getContext('2d');
  const stages = canvases.map((cv) => ({
    cv, ctx: cv.getContext('2d'), solo: cv.dataset.tradeCanvas !== 'all', idx: Number(cv.dataset.tradeCanvas) || 0,
    W: 0, H: 0, dpr: 1, layouts: null, from: 0, to: 0, t: 0, qa: 1, qb: 1, sig: '',
    lens: { x: 0, y: 0, w: 0, h: 0, r: 0, on: 0, tx: 0, ty: 0, hover: false, hold: 0 },
  }));

  function size(st) {
    const r = st.cv.getBoundingClientRect();
    st.W = Math.round(r.width); st.H = Math.round(r.height);
    if (!st.W || !st.H) { st.layouts = null; return; }
    st.dpr = Math.min(2, window.devicePixelRatio || 1);
    st.cv.width = Math.round(st.W * st.dpr); st.cv.height = Math.round(st.H * st.dpr);
    st.layouts = [0, 1, 2].map((i) => build(i, st.W, st.H, measure));
    st.sig = '';
  }
  const resizeAll = () => { stages.forEach(size); kick(); };
  resizeAll();
  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resizeAll, 120); }, { passive: true });
  document.fonts?.addEventListener?.('loadingdone', resizeAll);

  // le curseur (ou le doigt posé) déplace la règle de lecture
  for (const st of stages) {
    const cv = st.cv;
    const at = (e) => { const r = cv.getBoundingClientRect(); st.lens.tx = e.clientX - r.left; st.lens.ty = e.clientY - r.top; };
    cv.addEventListener('pointerenter', (e) => { at(e); if (e.pointerType === 'mouse') { st.lens.hover = true; st.lens.x = st.lens.tx; st.lens.y = st.lens.ty; } kick(); });
    cv.addEventListener('pointermove', (e) => { at(e); if (e.pointerType === 'mouse') st.lens.hover = true; else st.lens.hold = 2.2; kick(); });
    cv.addEventListener('pointerdown', (e) => { at(e); if (e.pointerType !== 'mouse') { st.lens.hold = 2.2; st.lens.x = st.lens.tx; st.lens.y = st.lens.ty; } kick(); });
    cv.addEventListener('pointerleave', () => { st.lens.hover = false; kick(); });
  }

  let sv = -1;
  frames.add((dt) => {
    const vh = window.innerHeight;
    let again = false;
    // l'état du grand panneau : quel métier, et où on en est dans sa lecture
    const line = vh * 0.5, m = vh * 0.16;
    const rs = trades.map((a) => a.getBoundingClientRect());
    const qs = rs.map((r) => clamp((line - r.top) / Math.max(1, r.height - m)));
    // le métier lu change quand son titre passe la ligne de lecture (la même règle que l'index) ; la page se transforme
    // alors en un temps fixe, pour ne jamais rester figée entre deux métiers si l'on s'arrête de défiler
    let target = 0;
    for (let i = 1; i < rs.length; i++) if (rs[i].top <= line) target = i;
    if (reduce || sv < 0) sv = target;
    else if (sv !== target && dt > 0) { const d = target - sv; sv = Math.abs(d) < dt * 1.8 ? target : sv + Math.sign(d) * dt * 1.8; again = true; }
    const s = sv;
    for (const st of stages) {
      if (!st.layouts) continue;
      const r = st.cv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      let from, to, t, qa, qb;
      if (st.solo) {
        const q = clamp((vh * 0.92 - r.top) / (vh * 0.62));
        from = to = st.idx; t = 0; qa = qb = reduce ? 1 : q;
      } else {
        from = clamp(Math.floor(s), 0, rs.length - 2); t = clamp(s - from); to = from + 1;
        qa = reduce ? 1 : qs[from]; qb = reduce ? 1 : qs[to];
        if (t === 0) { to = from; qb = qa; } else if (t === 1) { from = to; qa = qb; t = 0; }
      }
      // la règle : sous la souris, sinon elle descend la page au rythme du défilement
      const l = st.lens;
      const Lc = st.layouts[t < 0.5 ? from : to];
      const sheet = Lc.boxes.sheet;
      const f = Lc.f;
      l.hold = Math.max(0, l.hold - dt);
      const pinned = l.hover || l.hold > 0;
      let tx, ty, tw, th, on, px, py;
      const q = t < 0.5 ? qa : qb;
      if (pinned) { px = l.tx; py = l.ty; on = 1; }
      else { px = sheet.x + sheet.w / 2; py = lerp(Lc.top, Lc.bottom, q); on = reduce ? 0 : 1; }
      // pas de règle pendant que la page se transforme
      if (t > 0 && t < 1) on = 0;
      // la zone lue : le bloc (code, menu, terminal) sous le pointeur, sinon le texte courant de la page
      const inBox = (bx, x, y) => bx && x >= bx.x && x <= bx.x + bx.w && y >= bx.y && y <= bx.y + bx.h;
      const zones = ['block', 'side'].map((k) => Lc.boxes[k]).filter((bx) => bx && Lc.bars.some((b) => inBox(bx, b.x + 1, b.y)));
      let zone = pinned ? zones.find((bx) => inBox(bx, px, py)) || null : null;
      const inZone = (b) => (zone ? inBox(zone, b.x + 1, b.y) : !zones.some((bx) => inBox(bx, b.x + 1, b.y)));
      // seulement les lignes déjà écrites
      let pool = Lc.bars.filter((b) => inZone(b) && reveal(b, q) > 0.99);
      if (!pool.length) pool = Lc.bars;
      // la règle se cale sur la ligne la plus proche et l'englobe en entier : jamais de moitiés de mots
      let best = null;
      for (const b of pool) if (!best || Math.abs(b.y - py) < Math.abs(best.y - py)) best = b;
      if (best) {
        if (!pinned) zone = zones.find((bx) => inBox(bx, best.x + 1, best.y)) || null;
        const row = pool.filter((b) => Math.abs(b.y - best.y) < 1 && (zone ? inBox(zone, b.x + 1, b.y) : true));
        const x0 = Math.min(...row.map((b) => b.x)), x1 = Math.max(...row.map((b) => b.x + b.w));
        const padx = best.size * 0.7;
        if (zone) { tx = zone.x + zone.w / 2; tw = zone.w - 6; }
        else { tx = (x0 + x1) / 2; tw = x1 - x0 + padx * 2; }
        ty = best.y; th = Math.min(best.size * 2.05, best.lh * 0.96);
      } else { tx = px; ty = py; tw = f * 10; th = f * 2; }
      l.dark = best ? (best.tcol[0] + best.tcol[1] + best.tcol[2]) / 765 > 0.6 : 0;
      const k = pinned ? 1 - Math.pow(0.0005, dt) : 1 - Math.pow(0.002, dt);
      const first = !l.w;
      l.x = first ? tx : lerp(l.x, tx, k); l.y = first ? ty : lerp(l.y, ty, k);
      l.w = first ? tw : lerp(l.w, tw, k); l.h = first ? th : lerp(l.h, th, k);
      l.on = lerp(l.on, on, k); l.r = Math.min(l.h / 2, l.h * 0.42);
      const moving = Math.abs(l.x - tx) + Math.abs(l.y - ty) + Math.abs(l.w - tw) > 0.4 || Math.abs(l.on - on) > 0.01;
      if (moving || l.hold > 0) again = true;
      const sig = [from, to, t.toFixed(4), qa.toFixed(4), qb.toFixed(4), l.x.toFixed(1), l.y.toFixed(1), l.w.toFixed(1), l.on.toFixed(2)].join();
      if (sig === st.sig) continue;
      st.sig = sig;
      Object.assign(st, { from, to, t, qa, qb });
      render(st);
    }
    return again;
  });
  document.documentElement.classList.add('trades-on');
  kick();
}
