// Moteur de lignes : une image (portrait, lettre, nom) dessinée par des lignes horizontales
// dont l'épaisseur suit l'ombre, coupées en mots, avec une loupe de lecture.
// WebGL 1, un quad plein écran par panneau. Voir design/direction.md, section 9.

const VERT = `attribute vec2 aPos; varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uDpr;
uniform sampler2D uFigA;
uniform sampler2D uFigB;
uniform vec2 uInv;
uniform float uMorph;
uniform sampler2D uText;
uniform float uHasText;
uniform sampler2D uAmp;
uniform float uHasAmp;
uniform float uAmpRows;
uniform float uPitch;
uniform vec2 uThick;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform vec3 uMark;
uniform vec2 uMouse;
uniform float uLens;
uniform float uLensR;
uniform float uMag;
uniform vec2 uLensShape;
uniform float uVignette;
uniform float uDraw;
uniform float uFlat;
uniform float uTime;
uniform float uWave;
uniform vec4 uRipple;
uniform vec3 uHi[4];
uniform float uHiOn;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main(){
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uRes;
  vec2 q = p;

  // Loupe : agrandit ce qui est sous le curseur.
  vec2 d = p - uMouse;
  // loupe : un rectangle arrondi (barre de lecture, uLensShape = étirement horizontal, vertical) ou un cercle ;
  // distance exacte au bord, en pixels, pour un bord net et un filet d'un pixel
  vec2 hb = uLensR * uLensShape;
  float rc = uLensShape.x == uLensShape.y ? hb.y : hb.y * 0.42;
  vec2 dq = abs(d) - hb + rc;
  float sd = length(max(dq, 0.0)) + min(max(dq.x, dq.y), 0.0) - rc;
  float lensOn = uLens * step(0.5, uLensR);
  float lens = lensOn * (1.0 - smoothstep(-1.0, 0.0, sd));
  float ring = lensOn * (1.0 - smoothstep(0.35, 1.1, abs(sd + 0.5)));
  q = mix(p, uMouse + d / uMag, lens);

  // Ondulation légère liée à la vitesse de défilement, onde d'un toucher.
  q.y += uWave * sin(q.x * 0.017 + uTime * 2.2) * 3.0;
  if (uRipple.w > 0.0) {
    float rd = length(p - uRipple.xy);
    float front = uRipple.z * 560.0;
    float ring = exp(-pow((rd - front) / 52.0, 2.0));
    q.y += sin((rd - front) * 0.085) * ring * 10.0 * uRipple.w;
  }

  // Lettre survolée (pied de page) : ses lignes s'épaississent jusqu'à la remplir et passent au jaune.
  float amp = 0.0;
  if (uHasAmp > 0.5) {
    float band = uRes.y / uAmpRows;
    float k = floor(clamp(q.y, 0.0, uRes.y - 0.01) / band);
    vec4 at = texture2D(uAmp, vec2(clamp(q.x / uRes.x, 0.0, 1.0), (k + 0.5) / uAmpRows));
    float yn = q.y / uRes.y;
    amp = at.r * step(at.g - 0.004, yn) * step(yn, at.b + 0.004);
  }

  float ly = q.y / uPitch;
  float row = floor(ly);
  float f = fract(ly) - 0.5;
  float yc = (row + 0.5) * uPitch;
  vec2 uvf = vec2(q.x / uRes.x, yc / uRes.y);
  float inside = step(0.0, uvf.x) * step(uvf.x, 1.0) * step(0.0, uvf.y) * step(uvf.y, 1.0);

  float va = texture2D(uFigA, uvf).r; va = mix(va, 1.0 - va, uInv.x);
  float vb = texture2D(uFigB, uvf).r; vb = mix(vb, 1.0 - vb, uInv.y);
  float n = vnoise(vec2(row * 0.61, q.x * 0.011));
  float m = smoothstep(n - 0.18, n + 0.18, uMorph * 1.36 - 0.18);
  float v = mix(va, vb, m) * inside;
  // bords fondus : près des bords du panneau, les lignes s'affinent jusqu'au trait le plus fin
  if (uVignette > 0.0) {
    float ex = smoothstep(0.0, 0.16, min(uvf.x, 1.0 - uvf.x));
    float ey = smoothstep(0.0, 0.10, uvf.y) * smoothstep(0.0, 0.07, 1.0 - uvf.y);
    v *= mix(1.0, ex * ey, uVignette);
  }
  float thin = 1.0 - 0.9 * 4.0 * m * (1.0 - m);
  v = mix(v, 0.3, uFlat);
  float t = mix(uThick.x, uThick.y, v) * thin;
  float lit = amp * smoothstep(0.35, 0.6, v);
  t = mix(t, 0.97, lit * 0.8);

  float word = 1.0;
  // Les blancs entre les mots se referment dans les zones sombres, pour garder le modelé.
  if (uHasText > 0.5) word = mix(texture2D(uText, uvf).g, 1.0, smoothstep(0.6, 0.88, v));

  // Tracé : chaque ligne s'écrit de gauche à droite, un peu après la précédente.
  float rows = uRes.y / uPitch;
  float head = uDraw * 2.0 - (row / rows) * 0.75;
  float drawn = 1.0 - smoothstep(head - 0.05, head, uvf.x);

  float aa = 0.8 / (uPitch * uDpr);
  float halfT = t * 0.5;
  float bar = (1.0 - smoothstep(halfT - aa, halfT + aa, abs(f))) * step(0.004, halfT);
  float ink = bar * word * drawn;

  if (uHasText > 0.5 && lens > 0.001) {
    float g = texture2D(uText, vec2(q.x / uRes.x, q.y / uRes.y)).r;
    ink = mix(ink, g * drawn, smoothstep(0.0, 1.0, lens));
  }
  // Titre survolé : sa ligne est surlignée en jaune, comme au surligneur.
  float hi = 0.0;
  if (uHiOn > 0.5) {
    for (int i = 0; i < 4; i++) {
      vec3 sg = uHi[i];
      if (sg.y < sg.z && abs(row - sg.x) < 0.5 && q.x >= sg.y - 3.0 && q.x <= sg.z + 3.0) hi = 1.0;
    }
  }
  vec3 bg = mix(uPaper, uMark, hi);
  vec3 lineCol = mix(uInk, uMark, lit);
  gl_FragColor = vec4(mix(mix(bg, lineCol, ink), uInk, ring), 1.0);
}`;

const UNIFORMS = ['uMark', 'uRes', 'uDpr', 'uFigA', 'uFigB', 'uInv', 'uMorph', 'uText', 'uHasText', 'uAmp', 'uHasAmp', 'uAmpRows',
  'uPitch', 'uThick', 'uInk', 'uPaper', 'uMouse', 'uLens', 'uLensR', 'uMag', 'uLensShape', 'uVignette', 'uDraw', 'uFlat', 'uTime', 'uWave', 'uRipple', 'uHi[0]', 'uHiOn'];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

// Ressort critique amorti : rapproche value de target.
export function spring(s, target, dt, k = 170, c = 16) {
  const a = k * (target - s.v) - c * s.vel;
  s.vel += a * dt;
  s.v += s.vel * dt;
  return Math.abs(target - s.v) > 0.0005 || Math.abs(s.vel) > 0.0005;
}

export function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) { return false; }
}

export class LineStage {
  constructor(el, o) {
    this.el = el;
    this.box = el.querySelector('.stage-box') || el;
    this.canvas = el.querySelector('canvas');
    this.o = Object.assign({ ink: '#183F8F', paper: '#F2F2EE', pitch: [7, 6], thick: [0.08, 0.78], lensR: [110, 84], mag: 2.3, ampRows: 1 }, o);
    this.gl = null;
    this.w = 0; this.h = 0; this.dpr = 1;
    this.mouse = { x: -999, y: -999 };
    this.mx = { v: -999, vel: 0 }; this.my = { v: -999, vel: 0 };
    this.lens = { v: 0, vel: 0 }; this.lensTarget = 0;
    this.draw = { v: o.drawn ? 1 : 0, vel: 0 }; this.drawTarget = o.drawn ? 1 : 0;
    this.morph = 0; this.morphFrom = 0; this.morphStart = 0; this.morphing = false;
    this.flat = 0; this.wave = 0;
    this.ripple = null;
    this.amp = null; this.ampData = null;
    this.dirty = true;
    this.time = 0;
    this.hi = new Float32Array(12);
    this.hiOn = 0;
    this.rowSegs = [];
    this.onLost = this.onLost.bind(this);
    this.onRestored = this.onRestored.bind(this);
  }

  init() {
    if (this.gl) return true;
    const gl = this.canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return false;
    this.gl = gl;
    // Rendu logiciel (pas de carte graphique) : on dessine en densité 1 pour ménager le processeur.
    try {
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const name = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '';
      this.lowPower = /swiftshader|llvmpipe|software|basic render/i.test(name);
    } catch (e) { this.lowPower = false; }
    this.canvas.addEventListener('webglcontextlost', this.onLost, false);
    this.canvas.addEventListener('webglcontextrestored', this.onRestored, false);
    const prog = this.program(VERT, FRAG);
    if (!prog) { this.gl = null; return false; }
    this.prog = prog;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.u = {};
    for (const n of UNIFORMS) this.u[n] = gl.getUniformLocation(prog, n);
    this.tex = { a: this.texture(), b: this.texture(), text: this.texture(), amp: this.texture() };
    gl.uniform1i(this.u.uFigA, 0); gl.uniform1i(this.u.uFigB, 1); gl.uniform1i(this.u.uText, 2); gl.uniform1i(this.u.uAmp, 3);
    gl.uniform3fv(this.u.uInk, hex(this.o.ink));
    gl.uniform3fv(this.u.uPaper, hex(this.o.paper));
    gl.uniform3fv(this.u.uMark, hex(this.o.mark || '#FFD24A'));
    this.inv = [0, 0];
    this.resize(true);
    this.el.classList.add('is-live');
    return true;
  }

  program(vs, fs) {
    const gl = this.gl;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    const p = gl.createProgram();
    gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  }

  texture() {
    const gl = this.gl, t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    return t;
  }

  upload(t, source, unit) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  }

  get small() { return this.w < 600; }
  get pitch() { return this.small ? this.o.pitch[1] : this.o.pitch[0]; }

  resize(force) {
    if (!this.gl) return;
    const r = this.box.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    // téléphone : petits canevas, on peut monter à 2 pour la netteté
    const dpr = this.lowPower ? 1 : Math.min(w < 600 ? 2 : 1.5, window.devicePixelRatio || 1);
    // les variations de quelques pixels (barre d'adresse, légende) ne valent pas une reconstruction
    if (!force && Math.abs(w - this.w) < 3 && Math.abs(h - this.h) < 3 && dpr === this.dpr) return;
    this.w = w; this.h = h; this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.rebuild();
    this.dirty = true;
    // un canevas redimensionné est vidé : on le redessine tout de suite
    this.render(performance.now());
  }

  // Redessine les textures de figure (et de mots) à la taille du panneau.
  rebuild() {
    const fig = this.o.figure(this.w, this.h, this);
    if (fig) { this.setFigure(fig.canvas, fig.invert); }
    if (this.o.words) this.buildWords();
    if (this.o.letters) this.buildAmp();
  }

  setFigure(canvas, invert = false) {
    this.upload(this.tex.a, canvas, 0);
    this.upload(this.tex.b, canvas, 1);
    this.inv = [invert ? 1 : 0, invert ? 1 : 0];
    this.morph = 0; this.morphing = false;
    this.dirty = true;
  }

  // Recompose les lignes vers une nouvelle figure.
  morphTo(canvas, invert = false, duration = 1100) {
    if (!this.gl) return;
    this.upload(this.tex.b, canvas, 1);
    this.inv[1] = invert ? 1 : 0;
    this.morph = 0; this.morphStart = performance.now(); this.morphDur = duration; this.morphing = true;
    this.pendingA = { canvas, invert };
    this.dirty = true;
  }

  // Gabarit des mots (canal vert) et glyphes pour la loupe (canal rouge).
  buildWords() {
    const words = this.o.words; // [{ w: 'mot', ti: indice du titre }]
    const k = Math.min(2.5, 1800 / this.w);
    const W = Math.round(this.w * k), H = Math.round(this.h * k);
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.fillStyle = '#000'; x.fillRect(0, 0, W, H);
    const pitch = this.pitch * k;
    const size = pitch * 0.9;
    x.font = `500 ${size}px Literata, Georgia, serif`;
    x.textBaseline = 'middle';
    const space = x.measureText(' ').width * 1.1;
    const rows = Math.ceil(H / pitch);
    let wi = 0;
    x.globalCompositeOperation = 'lighter';
    this.rowSegs = [];
    for (let r = 0; r < rows; r++) {
      const yc = (r + 0.5) * pitch;
      // remplit la ligne de mots, puis justifie
      const line = [];
      let used = 0;
      while (true) {
        const word = words[wi % words.length];
        const ww = x.measureText(word.w).width;
        const need = line.length ? used + space + ww : ww;
        if (need > W && line.length) break;
        line.push([word, ww]); used = need; wi++;
        if (need > W) break;
      }
      const gaps = line.length - 1;
      const extra = gaps > 0 ? (W - used) / gaps : 0;
      let px = 0;
      const segs = [];
      for (const [word, ww] of line) {
        x.fillStyle = '#00ff00';
        x.fillRect(px, yc - pitch * 0.5, ww, pitch);
        x.fillStyle = '#ff0000';
        x.fillText(word.w, px, yc);
        const last = segs[segs.length - 1];
        if (last && last.ti === word.ti) last.x1 = (px + ww) / k;
        else segs.push({ ti: word.ti, x0: px / k, x1: (px + ww) / k });
        px += ww + space + extra;
      }
      this.rowSegs.push(segs);
    }
    this.upload(this.tex.text, c, 2);
    this.hasText = 1;
  }

  // Positions des lettres pour l'écartement (pied de page).
  buildAmp() {
    const rows = this.ampRows || 1;
    this.ampData = new Uint8Array(256 * rows * 4);
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.tex.amp);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.ampData);
    this.hasAmp = 1;
  }

  writeAmp(letters) {
    if (!this.ampData) return;
    const rows = this.ampRows || 1;
    const d = this.ampData;
    d.fill(0);
    for (const L of letters) {
      const a = Math.max(0, Math.min(1, L.s.v));
      if (a < 0.002) continue;
      const x0 = Math.floor((L.x0 / this.w) * 255), x1 = Math.ceil((L.x1 / this.w) * 255);
      for (let i = Math.max(0, x0 - 1); i <= Math.min(255, x1 + 1); i++) {
        const edge = i < x0 ? (i - x0 + 2) / 2 : i > x1 ? (x1 + 2 - i) / 2 : 1;
        const val = Math.round(255 * a * Math.max(0, Math.min(1, edge)));
        const o = (L.row * 256 + i) * 4;
        if (val > d[o]) { d[o] = val; d[o + 1] = Math.round(255 * L.y0 / this.h); d[o + 2] = Math.round(255 * L.y1 / this.h); }
      }
    }
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.tex.amp);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 256, rows, gl.RGBA, gl.UNSIGNED_BYTE, d);
    this.dirty = true;
  }

  // Titre (indice) sous un point du panneau, d'après le gabarit des mots.
  titleAt(x, y) {
    if (!this.rowSegs.length) return null;
    const r = Math.floor(y / this.pitch);
    const segs = this.rowSegs[r];
    if (!segs) return null;
    const s = segs.find((g) => x >= g.x0 - 4 && x <= g.x1 + 4);
    return s ? { ti: s.ti, row: r } : null;
  }

  // Surligne toutes les portions de ce titre sur la ligne visée et ses voisines.
  highlight(ti, row) {
    this.hi.fill(0);
    let n = 0;
    if (ti != null) {
      for (let r = Math.max(0, row - 1); r <= row + 1 && n < 4; r++) {
        for (const g of this.rowSegs[r] || []) if (g.ti === ti && n < 4) { this.hi.set([r, g.x0, g.x1], n * 3); n++; }
      }
    }
    this.hiOn = n ? 1 : 0;
    this.dirty = true;
  }

  tap(x, y) { this.ripple = { x, y, t0: performance.now() }; this.dirty = true; }

  // Avance les ressorts ; renvoie vrai si quelque chose bouge encore.
  step(dt, now) {
    let moving = false;
    if (this.mouse.x > -900) {
      if (this.mx.v < -900) { this.mx.v = this.mouse.x; this.my.v = this.mouse.y; }
      moving = spring(this.mx, this.mouse.x, dt, 260, 30) || moving;
      moving = spring(this.my, this.mouse.y, dt, 260, 30) || moving;
    }
    moving = spring(this.lens, this.lensTarget, dt, 120, 18) || moving;
    moving = spring(this.draw, this.drawTarget, dt, this.o.drawK || 9, this.o.drawC || 6) || moving;
    if (this.morphing) {
      const p = Math.min(1, (now - this.morphStart) / this.morphDur);
      this.morph = 1 - Math.pow(1 - p, 3);
      if (p >= 1) {
        this.morphing = false;
        if (this.pendingA) { this.upload(this.tex.a, this.pendingA.canvas, 0); this.inv[0] = this.pendingA.invert ? 1 : 0; this.pendingA = null; }
        this.morph = 0;
      }
      moving = true;
    }
    if (this.ripple) {
      const t = (now - this.ripple.t0) / 1400;
      if (t >= 1) this.ripple = null; else moving = true;
    }
    if (Math.abs(this.wave) > 0.01) moving = true;
    return moving;
  }

  render(now) {
    const gl = this.gl;
    if (!gl || gl.isContextLost()) return;
    const u = this.u;
    gl.uniform2f(u.uRes, this.w, this.h);
    gl.uniform1f(u.uDpr, this.dpr);
    gl.uniform2f(u.uInv, this.inv[0], this.inv[1]);
    gl.uniform1f(u.uMorph, this.morph);
    gl.uniform1f(u.uHasText, this.hasText || 0);
    gl.uniform1f(u.uHasAmp, this.hasAmp || 0);
    gl.uniform1f(u.uAmpRows, this.ampRows || 1);
    gl.uniform1f(u.uPitch, this.pitch);
    gl.uniform2f(u.uThick, this.o.thick[0], this.o.thick[1]);
    gl.uniform2f(u.uMouse, this.mx.v, this.my.v);
    gl.uniform1f(u.uLens, Math.max(0, this.lens.v));
    gl.uniform1f(u.uLensR, this.small ? this.o.lensR[1] : this.o.lensR[0]);
    gl.uniform1f(u.uMag, this.o.mag);
    const ls = this.o.lensShape || [1, 1];
    gl.uniform2f(u.uLensShape, ls[0], ls[1]);
    gl.uniform1f(u.uVignette, this.o.vignette || 0);
    gl.uniform1f(u.uDraw, Math.max(0, Math.min(1.2, this.draw.v)));
    gl.uniform1f(u.uFlat, this.flat);
    gl.uniform1f(u.uTime, now / 1000);
    gl.uniform1f(u.uWave, this.wave);
    gl.uniform3fv(u['uHi[0]'], this.hi);
    gl.uniform1f(u.uHiOn, this.hiOn);
    if (this.ripple) {
      const t = (now - this.ripple.t0) / 1400;
      gl.uniform4f(u.uRipple, this.ripple.x, this.ripple.y, t, (1 - t) * (1 - t));
    } else gl.uniform4f(u.uRipple, 0, 0, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.dirty = false;
  }

  onLost(e) { e.preventDefault(); this.lost = true; this.el.classList.remove('is-live'); this.el.classList.add('is-static'); }
  onRestored() { this.lost = false; this.gl = null; this.el.classList.remove('is-static'); this.init(); }

  dispose() {
    if (!this.gl) return;
    const ext = this.gl.getExtension('WEBGL_lose_context');
    this.canvas.removeEventListener('webglcontextlost', this.onLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onRestored);
    if (ext) ext.loseContext();
    this.gl = null;
    this.el.classList.remove('is-live');
  }
}

// --- Figures ---------------------------------------------------------------

// Image recadrée façon « cover » dans un canevas de la taille du panneau (moitié de la résolution suffit).
export function coverCanvas(img, w, h, focusY = 0.2, scale = 0.5) {
  const c = document.createElement('canvas');
  c.width = Math.max(2, Math.round(w * scale)); c.height = Math.max(2, Math.round(h * scale));
  const x = c.getContext('2d');
  const ir = img.naturalWidth / img.naturalHeight, cr = c.width / c.height;
  let dw, dh;
  if (ir > cr) { dh = c.height; dw = dh * ir; } else { dw = c.width; dh = dw / ir; }
  const dx = (c.width - dw) / 2;
  const dy = (c.height - dh) * focusY;
  x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
  x.drawImage(img, dx, dy, dw, dh);
  return c;
}

// Portrait posé en bas du panneau, à 94 % de sa hauteur, sur un fond uni (la valeur du fond de la figure).
export function portraitCanvas(img, w, h, o = {}) {
  const scale = 0.5;
  const c = document.createElement('canvas');
  c.width = Math.max(2, Math.round(w * scale)); c.height = Math.max(2, Math.round(h * scale));
  const x = c.getContext('2d');
  x.fillStyle = o.bg || '#c4c4c4'; x.fillRect(0, 0, c.width, c.height);
  const iw = img.naturalWidth, ih = img.naturalHeight;
  if (o.crop) {
    // cadrage : la zone [x, y, largeur, hauteur] (en fractions de la photo) tient entière dans le panneau,
    // centrée, son bas posé sur le bas du panneau ; le reste de la photo déborde ou laisse voir le fond uni
    const [fx, fy, fw, fh] = o.crop;
    const sw = fw * iw, sh = fh * ih;
    const k = Math.min(c.width / sw, c.height / sh);
    x.drawImage(img, c.width / 2 - (fx * iw + sw / 2) * k, c.height - (fy * ih + sh) * k, iw * k, ih * k);
    return c;
  }
  const ir = iw / ih;
  let dh = c.height * (o.height || 0.94), dw = dh * ir;
  if (dw > c.width * 1.12) { dw = c.width * 1.12; dh = dw / ir; }
  x.drawImage(img, (c.width - dw) / 2, c.height - dh, dw, dh);
  return c;
}

// Texte blanc sur noir, ajusté dans le panneau ; renvoie aussi la position de chaque lettre.
export function textCanvas(lines, w, h, o = {}) {
  const scale = 0.5;
  const c = document.createElement('canvas');
  c.width = Math.max(2, Math.round(w * scale)); c.height = Math.max(2, Math.round(h * scale));
  const x = c.getContext('2d');
  x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = '#fff';
  x.textBaseline = 'alphabetic';
  const family = '"Mona Sans", sans-serif';
  const fill = o.fill || 0.86;
  const maxH = (h * (o.heightFill || 0.8)) / lines.length;
  // taille de police : la plus grande qui tient en largeur et en hauteur
  let size = maxH / 0.74;
  // La forme abrégée garde la largeur condensée ; fontStretch seul est remis à zéro par chaque x.font.
  const setFont = (s) => { x.font = `condensed 860 ${s}px ${family}`; try { x.fontStretch = 'condensed'; } catch (e) { /* ancien navigateur */ } };
  setFont(size * scale);
  const widest = Math.max(...lines.map((l) => x.measureText(l).width / scale));
  if (widest > w * fill) size *= (w * fill) / widest;
  setFont(size * scale);
  const letters = [];
  const capH = size * 0.74;
  const gap = (h - capH * lines.length) / (lines.length + 1);
  lines.forEach((line, row) => {
    const lw = x.measureText(line).width / scale;
    const left = o.align === 'left' ? w * (1 - fill) / 2 : (w - lw) / 2;
    const base = gap * (row + 1) + capH * (row + 1);
    x.fillText(line, left * scale, base * scale);
    // boîte de chaque lettre : son dessin réel (et non sa chasse), pour ne pas allumer la voisine
    let cx = left;
    for (const ch of line) {
      const m = x.measureText(ch);
      const cw = m.width / scale;
      const l0 = cx - (m.actualBoundingBoxLeft || 0) / scale, l1 = cx + (m.actualBoundingBoxRight || m.width) / scale;
      const y0 = base - (m.actualBoundingBoxAscent || size * 0.74) / scale, y1 = base + (m.actualBoundingBoxDescent || 0) / scale;
      if (ch.trim()) letters.push({ ch, x0: l0, x1: l1, y0, y1, row, s: { v: 0, vel: 0 }, target: 0 });
      cx += cw;
    }
  });
  return { canvas: c, letters };
}
