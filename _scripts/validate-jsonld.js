#!/usr/bin/env node
// Phase 15+16 validator — zero deps.
// 7 checks bloquants :
//   1. JSON.parse (Phase 15)
//   2. Budget @graph tiered (sitewide ≤1.5KB/3, detail ≤3KB/5, hub ≤30KB/6) — D-06 / T-03
//   3. inLanguage:"fr" avec whitelist BreadcrumbList/ItemList/ListItem — T-02
//   4. @id refs cohérents (Phase 15)
//   5. <meta name="description"> length ∈ [70, 155] — SO-02 / D-06
//   6. description JSON-LD substring-or-≥80%-word-overlap du body texte — anti-C3 / D-06
//   7. <title> ≤ 65 chars — SO-01 / D-07
// Usage : node _scripts/validate-jsonld.js _site/
// Exit  : 0 si tout passe, 1 si ≥1 erreur, 2 si répertoire racine introuvable.

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] || '_site';
const SKIP_PATTERNS = [/[\\/]404\.html$/, /[\\/]redirect_from[\\/]/];

// Phase 16 : régime budget différentiel (T-03 mitigation, D-06)
const BUDGET_TIERS = {
  hub:      { maxBytes: 30000, maxEntries: 6, label: 'hub' },       // CollectionPage / DefinedTermSet
  detail:   { maxBytes: 3000,  maxEntries: 5, label: 'detail' },    // DefinedTerm / AboutPage
  sitewide: { maxBytes: 1536,  maxEntries: 3, label: 'sitewide' }   // homepage / fallback
};

// Phase 16 : whitelist des types qui n'héritent PAS de inLanguage (T-02 mitigation).
// BreadcrumbList et ItemList descendent de Intangible, pas de CreativeWork.
const INLANGUAGE_EXEMPT_TYPES = new Set(['BreadcrumbList', 'ItemList', 'ListItem']);

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

/**
 * Phase 16 (D-06, T-03) : classify a page @graph to determine budget tier.
 * - hub : page contient CollectionPage ou DefinedTermSet (categorie/lettre/dictionnaire)
 * - detail : page contient DefinedTerm ou AboutPage (definition/a-propos)
 * - sitewide : aucun primary type (homepage, autres)
 */
function classifyPage(graphArray) {
  const types = (graphArray || []).map(function (e) { return e && e['@type']; }).filter(Boolean);
  if (types.indexOf('CollectionPage') >= 0 || types.indexOf('DefinedTermSet') >= 0) {
    return BUDGET_TIERS.hub;
  }
  if (types.indexOf('DefinedTerm') >= 0 || types.indexOf('AboutPage') >= 0) {
    return BUDGET_TIERS.detail;
  }
  return BUDGET_TIERS.sitewide;
}

function validateInLanguage(graphArray, errors) {
  for (const entity of graphArray) {
    if (!entity || typeof entity !== 'object') continue;
    if (entity['@type'] === undefined) continue;
    if (INLANGUAGE_EXEMPT_TYPES.has(entity['@type'])) continue;  // T-02 — exempté BreadcrumbList/ItemList/ListItem
    if (entity.inLanguage !== 'fr') {
      errors.push('Entity ' + entity['@type'] + ' (@id=' + entity['@id'] + ') missing inLanguage:"fr"');
    }
  }
}

// Phase 16 (D-06, SO-02) — check #5 : meta description length ∈ [70, 155]
const META_DESC_RE = /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i;
function checkMetaDescription(html, errors) {
  const m = html.match(META_DESC_RE);
  if (!m) return;  // pas de meta description → skip (404 et redirect_from déjà filtrés en amont)
  const desc = m[1].trim();
  const len = desc.length;
  if (len < 70 || len > 155) {
    errors.push('Meta description length ' + len + ' out of [70,155] : "' + desc.substring(0, 50) + '..."');
  }
}

// Phase 16 (D-07, SO-01) — check #7 : title length ≤ 65 chars
const TITLE_RE = /<title>([^<]*)<\/title>/i;
function checkTitleLength(html, errors) {
  const m = html.match(TITLE_RE);
  if (!m) return;  // pas de title (improbable, mais skip safely)
  const title = m[1].trim();
  if (title.length > 65) {
    errors.push('Title length ' + title.length + ' > 65 chars : "' + title + '"');
  }
}

// Phase 16 (D-06, check #6, anti-C3) — extraction du body texte d'une page HTML
function extractBodyText(html) {
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let body = bodyMatch[1];
  body = body.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style\b[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<!--[\s\S]*?-->/g, '');
  body = body.replace(/<[^>]+>/g, ' ');
  body = body.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&#39;/g, "'")
             .replace(/&quot;/g, '"');
  return body.replace(/\s+/g, ' ').trim();
}

// Phase 16 — normalisation case + diacritique-insensible pour comparison
function normalizeForCompare(s) {
  return s.toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')  // strip diacritics (combining marks)
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Phase 16 — word overlap ratio (set intersection / set size of needle), mots > 2 chars seulement
function wordOverlap(needle, haystack) {
  const nwords = new Set(normalizeForCompare(needle).split(/\s+/).filter(function (w) { return w.length > 2; }));
  const hwords = new Set(normalizeForCompare(haystack).split(/\s+/).filter(function (w) { return w.length > 2; }));
  if (nwords.size === 0) return 1;
  let hits = 0;
  nwords.forEach(function (w) { if (hwords.has(w)) hits++; });
  return hits / nwords.size;
}

// Phase 16 — check #6 : every description in @graph must substring-or-≥80%-overlap body text (anti-C3 / seuil 0.8)
function checkDescriptionVsVisible(html, parsedGraph, errors) {
  const body = extractBodyText(html);
  if (!body) return;  // page sans body — skip
  const normBody = normalizeForCompare(body);
  for (const entity of parsedGraph) {
    if (!entity || typeof entity !== 'object') continue;
    if (!entity.description || typeof entity.description !== 'string') continue;
    const desc = entity.description;
    const normDesc = normalizeForCompare(desc);
    if (normDesc.length === 0) continue;
    if (normBody.indexOf(normDesc) >= 0) continue;  // PASS — substring direct
    const overlap = wordOverlap(desc, body);
    if (overlap < 0.8) {
      errors.push('Entity ' + entity['@type'] + ' description not in body (overlap=' + (overlap * 100).toFixed(0) + '%) : "' + desc.substring(0, 60) + '..."');
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

    // Check 1: JSON.parse (faire en premier pour classifier le @graph)
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      errors.push('JSON.parse failed: ' + e.message);
      continue;
    }
    const graph = parsed['@graph'] || [parsed];
    const graphArr = Array.isArray(graph) ? graph : [graph];
    // Check 2 (D-06, T-03): budget tier classification
    const budget = classifyPage(graphArr);
    if (bytes > budget.maxBytes) {
      errors.push('Budget exceeded (' + budget.label + '): ' + bytes + 'B > ' + budget.maxBytes + 'B');
    }
    if (graphArr.length > budget.maxEntries) {
      errors.push('@graph has ' + graphArr.length + ' entries (max ' + budget.maxEntries + ' for ' + budget.label + ')');
    }
    // Check 3: inLanguage (whitelist T-02 appliqué dans validateInLanguage)
    validateInLanguage(graphArr, errors);
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
    // Check 6 (Phase 16, D-06, anti-C3) : description JSON-LD doit substring/overlap le body texte
    checkDescriptionVsVisible(html, graphArr, errors);
  }
  // Phase 16 — checks page-level (un seul appel par fichier HTML, pas par JSON-LD block)
  checkMetaDescription(html, errors);
  checkTitleLength(html, errors);
  if (errors.length) {
    totalErrors += errors.length;
    console.error('\n' + file);
    errors.forEach(function (e) { console.error('  - ' + e); });
  }
}

console.log('\nScanned: ' + totalFiles + ' files, ' + totalBlocks + ' JSON-LD blocks');
console.log('Errors: ' + totalErrors);
process.exit(totalErrors > 0 ? 1 : 0);
