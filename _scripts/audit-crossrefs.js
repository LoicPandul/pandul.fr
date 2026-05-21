#!/usr/bin/env node
// Phase 17 — DI-01 audit cross-references on _dictionnaire/*.md (zero deps).
// Usage : node _scripts/audit-crossrefs.js [_dictionnaire/]
// Pattern : validate-jsonld.js + parseMetadata sync-dictionnaire.js L67

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] || '_dictionnaire';

function parseFrontMatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = m[1];
  const slugMatch = fm.match(/^slug:\s*"([^"]+)"/m);
  const titleMatch = fm.match(/^title:\s*"([^"]+)"/m);
  const catMatch = fm.match(/^category:\s*"([^"]+)"/m);
  // Sous-bloc cross_references[] : `- title: "..."` puis `slug: "..."`
  const refsRe = /^\s+-\s+title:\s*"([^"]+)"\n\s+slug:\s*"([^"]+)"/gm;
  const refs = [];
  let r; while ((r = refsRe.exec(fm)) !== null) refs.push({ title: r[1], slug: r[2] });
  return {
    slug: slugMatch ? slugMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null,
    category: catMatch ? catMatch[1] : null,
    refs: refs.map(r => r.slug),
  };
}

const outbound = new Map();  // slug -> Set<slug>
const inbound = new Map();   // slug -> Set<slug>
const metadata = new Map();  // slug -> { title, category }

for (const f of fs.readdirSync(ROOT).filter(n => n.endsWith('.md'))) {
  const c = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const p = parseFrontMatter(c);
  if (!p || !p.slug) continue;
  outbound.set(p.slug, new Set(p.refs));
  metadata.set(p.slug, { title: p.title, category: p.category });
  for (const r of p.refs) {
    if (!inbound.has(r)) inbound.set(r, new Set());
    inbound.get(r).add(p.slug);
  }
}

const slugs = [...metadata.keys()];
const noOutbound = slugs.filter(s => (outbound.get(s) || new Set()).size === 0);
const noInbound = slugs.filter(s => (inbound.get(s) || new Set()).size === 0);
const isolated = slugs.filter(s =>
  (outbound.get(s) || new Set()).size === 0 &&
  (inbound.get(s) || new Set()).size === 0
);

// Stats
const outCounts = slugs.map(s => (outbound.get(s) || new Set()).size).sort((a, b) => a - b);
const inCounts = slugs.map(s => (inbound.get(s) || new Set()).size).sort((a, b) => a - b);
const pct = (arr, p) => arr[Math.floor(arr.length * p)];

// Top 5 inbound (slugs les plus cités)
const topInbound = slugs
  .map(s => ({ slug: s, count: (inbound.get(s) || new Set()).size }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);

console.log(`# DI-01 audit : cross-references completeness\n`);
console.log(`**Total** : ${slugs.length} définitions\n`);
console.log(`## Stats\n`);
console.log(`- Outbound : median=${pct(outCounts, 0.5)}, p95=${pct(outCounts, 0.95)}, max=${outCounts[outCounts.length - 1]}`);
console.log(`- Inbound  : median=${pct(inCounts, 0.5)}, p95=${pct(inCounts, 0.95)}, max=${inCounts[inCounts.length - 1]}\n`);
console.log(`## Top 5 inbound (slugs les plus cités)\n`);
for (const t of topInbound) {
  const m = metadata.get(t.slug);
  console.log(`- \`${t.slug}\` (${t.count} entrantes) — ${m ? m.title : ''}`);
}
console.log(`\n## Sans cross-ref sortante (${noOutbound.length})\n`);
for (const s of noOutbound) {
  const m = metadata.get(s);
  console.log(`- \`${s}\` — ${m.title} (${m.category})`);
}
console.log(`\n## Sans cross-ref entrante (${noInbound.length})\n`);
console.log(`<details><summary>Liste complète (${noInbound.length} entries)</summary>\n`);
for (const s of noInbound) {
  const m = metadata.get(s);
  console.log(`- \`${s}\` — ${m.title}`);
}
console.log(`</details>\n`);
console.log(`## Complètement isolées (${isolated.length})\n`);
for (const s of isolated) {
  const m = metadata.get(s);
  console.log(`- \`${s}\` — ${m.title} (${m.category})`);
}
