#!/usr/bin/env node
// Phase 15 validator (D-03, D-04) — zero deps.
// 4 checks bloquants : JSON.parse / budget @graph (≤3 entries, ≤1.5 KB) / inLanguage:"fr" / @id refs cohérents.
// Usage : node _scripts/validate-jsonld.js _site/
// Exit  : 0 si tout passe, 1 si au moins 1 erreur, 2 si répertoire racine introuvable.
// Réf   : .planning/phases/15-schema-infrastructure-sitewide-entities/15-RESEARCH.md §Code Examples Ex 7.

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] || '_site';
const SKIP_PATTERNS = [/[\\/]404\.html$/, /[\\/]redirect_from[\\/]/];
const MAX_GRAPH_ENTRIES = 3;          // GE-14
const MAX_JSONLD_BYTES = 1536;        // GE-14 (1.5 KB)

// Regex éprouvée empiriquement (RESEARCH §A4) — ne PAS modifier (T-15-02).
const SCRIPT_RE = /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function walkHtml(dir, out) {
  out = out || [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function collectIdRefs(obj, refs) {
  refs = refs || [];
  if (Array.isArray(obj)) {
    obj.forEach(function (o) { collectIdRefs(o, refs); });
  } else if (obj && typeof obj === 'object') {
    if (obj['@id'] !== undefined && Object.keys(obj).length === 1) {
      // Pure reference object {"@id": "..."}
      refs.push(obj['@id']);
    }
    Object.values(obj).forEach(function (v) { collectIdRefs(v, refs); });
  }
  return refs;
}

function collectDefinedIds(obj, ids) {
  ids = ids || new Set();
  if (Array.isArray(obj)) {
    obj.forEach(function (o) { collectDefinedIds(o, ids); });
  } else if (obj && typeof obj === 'object') {
    if (obj['@id'] !== undefined && Object.keys(obj).length > 1) ids.add(obj['@id']);
    Object.values(obj).forEach(function (v) { collectDefinedIds(v, ids); });
  }
  return ids;
}

function validateInLanguage(graphArray, errors) {
  for (const entity of graphArray) {
    if (!entity || typeof entity !== 'object') continue;
    if (entity['@type'] === undefined) continue;
    if (entity.inLanguage !== 'fr') {
      errors.push('Entity ' + entity['@type'] + ' (@id=' + entity['@id'] + ') missing inLanguage:"fr"');
    }
  }
}

if (!fs.existsSync(ROOT)) {
  console.error('ERROR: root directory not found: ' + ROOT);
  console.error('Run "bundle exec jekyll build" first.');
  process.exit(2);
}

let totalErrors = 0;
let totalFiles = 0;
let totalBlocks = 0;

for (const file of walkHtml(ROOT)) {
  if (SKIP_PATTERNS.some(function (re) { return re.test(file); })) continue;
  totalFiles++;
  const html = fs.readFileSync(file, 'utf8');
  let match;
  const errors = [];
  // Reset regex state for each file (gi flag is stateful)
  SCRIPT_RE.lastIndex = 0;
  while ((match = SCRIPT_RE.exec(html)) !== null) {
    totalBlocks++;
    const raw = match[1];
    const bytes = Buffer.byteLength(raw, 'utf8');

    // Check 2a: budget bytes
    if (bytes > MAX_JSONLD_BYTES) {
      errors.push('Budget exceeded: ' + bytes + 'B > ' + MAX_JSONLD_BYTES + 'B');
    }
    // Check 1: JSON.parse
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      errors.push('JSON.parse failed: ' + e.message);
      continue;
    }
    // Check 2b: budget entries
    const graph = parsed['@graph'] || [parsed];
    if (Array.isArray(graph) && graph.length > MAX_GRAPH_ENTRIES) {
      errors.push('@graph has ' + graph.length + ' entries (max ' + MAX_GRAPH_ENTRIES + ')');
    }
    // Check 3: inLanguage
    validateInLanguage(Array.isArray(graph) ? graph : [graph], errors);
    // Check 4: @id ref integrity
    const defined = collectDefinedIds(parsed);
    const refs = collectIdRefs(parsed);
    for (const ref of refs) {
      const isLocal = defined.has(ref);
      const isAbsolute = /^https?:\/\//.test(ref);
      if (!isLocal && !isAbsolute) {
        errors.push('Dangling @id reference: "' + ref + '" (not in @graph, not absolute IRI)');
      }
    }
  }
  if (errors.length) {
    totalErrors += errors.length;
    console.error('\n' + file);
    errors.forEach(function (e) { console.error('  - ' + e); });
  }
}

console.log('\nScanned: ' + totalFiles + ' files, ' + totalBlocks + ' JSON-LD blocks');
console.log('Errors: ' + totalErrors);
process.exit(totalErrors > 0 ? 1 : 0);
