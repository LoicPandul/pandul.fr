#!/usr/bin/env node
// Phase 17 — DI-02 audit slugs on _dictionnaire/*.md (zero deps).
// 3 dimensions : (1) non-ASCII, (2) length > 60, (3) doublons sémantiques.
// Pitfall #6 : filter paires BIP (`/^bip-\d{4}$/`) pour réduire le bruit.

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] || '_dictionnaire';

// 1. Collecte des slugs
const slugs = [];
for (const f of fs.readdirSync(ROOT).filter(n => n.endsWith('.md'))) {
  const c = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const m = c.match(/^slug:\s*"([^"]+)"/m);
  if (m) slugs.push(m[1]);
}

// 2. Dimensions 1+2 (pré-audit researcher : 0 dans l'état actuel)
const nonAscii = slugs.filter(s => /[^a-z0-9-]/.test(s));
const tooLong = slugs.filter(s => s.length > 60);

// 3. Dimension 3 — Levenshtein DP O(N×M) avec fenêtre glissante + filter BIP
function levenshtein(a, b) {
  if (a.length < b.length) [a, b] = [b, a];
  const m = a.length, n = b.length;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

const sorted = slugs.slice().sort();
const W = 10;  // fenêtre glissante
const BIP_RE = /^bip-\d{4}$/;
const duplicates = [];
for (let i = 0; i < sorted.length; i++) {
  for (let j = i + 1; j < Math.min(i + W, sorted.length); j++) {
    const a = sorted[i], b = sorted[j];
    // Skip paires BIP (Pitfall #6)
    if (BIP_RE.test(a) && BIP_RE.test(b)) continue;
    const d = levenshtein(a, b);
    const minLen = Math.min(a.length, b.length);
    if (d <= 2 || (d / minLen) < 0.15) {
      duplicates.push({ a, b, distance: d, ratio: (d / minLen).toFixed(2) });
    }
  }
}

// Stats longueur
const lengths = slugs.map(s => s.length).sort((a, b) => a - b);
const pct = (arr, p) => arr[Math.floor(arr.length * p)];

console.log(`# DI-02 audit : URL slug audit\n`);
console.log(`**Total** : ${slugs.length} slugs\n`);
console.log(`## Stats longueur\n`);
console.log(`- median=${pct(lengths, 0.5)}, p95=${pct(lengths, 0.95)}, max=${lengths[lengths.length - 1]}\n`);
console.log(`## Dimension 1 — Accents / non-ASCII (${nonAscii.length})\n`);
console.log(nonAscii.length ? nonAscii.map(s => `- \`${s}\``).join('\n') : '_Aucune violation — RAS_\n');
console.log(`\n## Dimension 2 — Longueur > 60 chars (${tooLong.length})\n`);
console.log(tooLong.length ? tooLong.map(s => `- \`${s}\` (${s.length} chars)`).join('\n') : '_Aucune violation — RAS_\n');
console.log(`\n## Dimension 3 — Doublons sémantiques (${duplicates.length})\n`);
console.log('| Slug A | Slug B | Levenshtein | Ratio |');
console.log('|--------|--------|-------------|-------|');
for (const d of duplicates) console.log(`| \`${d.a}\` | \`${d.b}\` | ${d.distance} | ${d.ratio} |`);
console.log(`\n## Recommendations v1.3\n`);
console.log(`Décision "no rewrite v1.2" locked — préservation 6 mois link equity sur 1408 pages.`);
console.log(`Aucune action sur les éventuels doublons identifiés. Évaluable v1.3+.\n`);
