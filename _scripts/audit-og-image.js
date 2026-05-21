#!/usr/bin/env node
// Phase 17 — SO-06 audit dimensions OG images (zero deps).
// Parse PNG IHDR chunk (bytes 16-23) + check poids < 1 MB.
// Exit 1 si fails > 0 (signal de finding, pas blocker).

const fs = require('fs');

const TARGETS = [
  'assets/img/social-card.png',
  'assets/img/dictionnaire-social-card.png',
];
const MAX_BYTES = 1024 * 1024;  // 1 MB seuil SO-06
const TARGET_W = 1200;          // valeur déclarée _data/seo.yml og.default_image_width
const TARGET_H = 630;           // valeur déclarée _data/seo.yml og.default_image_height

function readPngDims(file) {
  const b = fs.readFileSync(file);
  // Magic bytes PNG : 0x89 0x50 0x4E 0x47
  if (b[0] !== 0x89 || b[1] !== 0x50 || b[2] !== 0x4e || b[3] !== 0x47) {
    return { error: 'not PNG' };
  }
  return {
    width: b.readUInt32BE(16),
    height: b.readUInt32BE(20),
    bytes: b.length,
  };
}

let fails = 0;
const results = [];
for (const f of TARGETS) {
  const d = readPngDims(f);
  if (d.error) {
    console.log(`${f}: ${d.error} — FAIL`);
    fails++;
    continue;
  }
  const ratio = (d.width / d.height).toFixed(2);
  const isOg1200x630 = d.width === TARGET_W && d.height === TARGET_H;
  const underLimit = d.bytes < MAX_BYTES;
  const verdict = isOg1200x630 && underLimit ? 'OK' : 'FAIL';
  if (verdict === 'FAIL') fails++;
  results.push({ file: f, ...d, ratio, verdict });
  console.log(`${f}: ${d.width}×${d.height} (ratio ${ratio}), ${d.bytes} B — ${verdict}`);
}

// Bloc cohérence _data/seo.yml (Pitfall #8 — mensonge dimensions déclarées vs réelles)
console.log(`\n--- Cohérence _data/seo.yml ---`);
console.log(`Déclaré : og.default_image_width=${TARGET_W}, og.default_image_height=${TARGET_H}`);
const social = results.find(r => r.file === 'assets/img/social-card.png');
if (social) {
  console.log(`Réel social-card.png : ${social.width}×${social.height}`);
  if (social.width !== TARGET_W || social.height !== TARGET_H) {
    console.log(`⚠ Incohérence : crawlers font confiance au meta tag — mensonge structuré.`);
    console.log(`Options Wave 2 : (a) corriger seo.yml à dimensions réelles, (b) re-export PNG (out of scope D-12), (c) defer 1.3.`);
  }
}

process.exit(fails > 0 ? 1 : 0);
