#!/usr/bin/env node
// Phase 16 self-test harness (Plan 16-02 — D-06, D-07, T-02, T-03, SO-01, SO-02) — zero deps.
// Étend test-validate-jsonld.js avec les fixtures pour les 3 nouveaux checks (#5, #6, #7) et le régime budget tiered.
// Usage : node _scripts/test-validate-jsonld-phase16.js
// Exit  : 0 si toutes les fixtures sont classées correctement, 1 sinon.
// Réf   : .planning/phases/16-per-layout-json-ld-title-meta-templates/16-02-PLAN.md tasks Task 1-3.

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// --- Helpers ----------------------------------------------------------------

// Wrap a JSON-LD payload into a minimal HTML page with a valid title + meta description (≥70 chars)
// to isolate the JSON-LD-specific failures from check #5/#7 noise in Task 1 fixtures.
const VALID_TITLE = '<title>Page test validator</title>';
const VALID_META = '<meta name="description" content="Description de test pour le validator Phase 16 — longueur suffisante pour passer le check 5 sans probleme.">';
const VALID_HEAD = '<head>' + VALID_TITLE + VALID_META;

function wrap(jsonld, bodyText) {
  bodyText = bodyText || 'Contenu visible aleatoire pour le test du validator JSON-LD Phase 16.';
  return '<html>' + VALID_HEAD +
    '<script type="application/ld+json">' + jsonld + '</script>' +
    '</head><body>' + bodyText + '</body></html>';
}

// --- Fixtures ---------------------------------------------------------------

// Task 1 — whitelist T-02 : BreadcrumbList sans inLanguage doit PASSER
const breadcrumb_ok = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://pandul.fr/#website', 'inLanguage': 'fr' },
    { '@type': 'BreadcrumbList', '@id': 'https://pandul.fr/page/#breadcrumb',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://pandul.fr/' }
      ]
    }
  ]
}));

// Task 1 — whitelist strict : DefinedTerm sans inLanguage doit FAIL
const definedterm_missing_lang = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'DefinedTerm', '@id': 'https://pandul.fr/d/utxo/#term', 'name': 'UTXO' }
  ]
}));

// Task 1 — budget tier sitewide : 3 entries ~1224 bytes doit PASSER
const sitewide_budget_ok = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://pandul.fr/#website', 'inLanguage': 'fr', 'name': 'Pandul', 'url': 'https://pandul.fr/' },
    { '@type': 'Organization', '@id': 'https://pandul.fr/#organization', 'inLanguage': 'fr', 'name': 'Pandul', 'url': 'https://pandul.fr/' },
    { '@type': 'Person', '@id': 'https://pandul.fr/#person-loic', 'inLanguage': 'fr', 'name': 'Loic Morel' }
  ]
}));

// Task 1 — budget tier detail : 5 entries avec DefinedTerm ~1900 bytes doit PASSER (sitewide tier 1.5KB FAIL, detail tier 3KB PASS)
const detail_budget_ok = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://pandul.fr/#website', 'inLanguage': 'fr', 'name': 'Pandul', 'url': 'https://pandul.fr/' },
    { '@type': 'Organization', '@id': 'https://pandul.fr/#organization', 'inLanguage': 'fr', 'name': 'Pandul', 'url': 'https://pandul.fr/' },
    { '@type': 'Person', '@id': 'https://pandul.fr/#person-loic', 'inLanguage': 'fr', 'name': 'Loic Morel' },
    { '@type': 'DefinedTerm', '@id': 'https://pandul.fr/d/utxo/#term', 'inLanguage': 'fr', 'name': 'UTXO',
      'description': 'Sigle de Unspent Transaction Output, designant une sortie de transaction Bitcoin non encore depensee.',
      'inDefinedTermSet': { '@id': 'https://pandul.fr/dictionnaire/#termset' } },
    { '@type': 'AboutPage', '@id': 'https://pandul.fr/d/utxo/#about', 'inLanguage': 'fr',
      'mainEntity': { '@id': 'https://pandul.fr/d/utxo/#term' } }
  ]
}), 'Sigle de Unspent Transaction Output, designant une sortie de transaction Bitcoin non encore depensee.');

// Task 1 — budget tier hub : 6 entries CollectionPage + ItemList volumineux doit PASSER
const hubItems = [];
for (let i = 0; i < 30; i++) {
  hubItems.push({ '@type': 'ListItem', 'position': i + 1, 'url': 'https://pandul.fr/d/terme-' + i + '/', 'name': 'Terme numero ' + i + ' avec un nom descriptif assez long pour gonfler le payload' });
}
const hub_budget_ok = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://pandul.fr/#website', 'inLanguage': 'fr', 'name': 'Pandul', 'url': 'https://pandul.fr/' },
    { '@type': 'Organization', '@id': 'https://pandul.fr/#organization', 'inLanguage': 'fr', 'name': 'Pandul', 'url': 'https://pandul.fr/' },
    { '@type': 'Person', '@id': 'https://pandul.fr/#person-loic', 'inLanguage': 'fr', 'name': 'Loic Morel' },
    { '@type': 'CollectionPage', '@id': 'https://pandul.fr/dictionnaire/#page', 'inLanguage': 'fr', 'name': 'Dictionnaire Bitcoin' },
    { '@type': 'DefinedTermSet', '@id': 'https://pandul.fr/dictionnaire/#termset', 'inLanguage': 'fr', 'name': 'Dictionnaire Bitcoin' },
    { '@type': 'ItemList', '@id': 'https://pandul.fr/dictionnaire/#itemlist', 'itemListElement': hubItems }
  ]
}));

// Task 1 — budget tier detail OVERFLOW : 5 entries ~3500 bytes doit FAIL "Budget exceeded (detail)"
const detail_budget_overflow = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://pandul.fr/#a', 'inLanguage': 'fr' },
    { '@type': 'Organization', '@id': 'https://pandul.fr/#b', 'inLanguage': 'fr' },
    { '@type': 'Person', '@id': 'https://pandul.fr/#c', 'inLanguage': 'fr' },
    { '@type': 'DefinedTerm', '@id': 'https://pandul.fr/d/x/#term', 'inLanguage': 'fr', 'name': 'X',
      'description': 'X'.repeat(2200) },
    { '@type': 'AboutPage', '@id': 'https://pandul.fr/d/x/#about', 'inLanguage': 'fr' }
  ]
}));

// Task 2 — check #5 meta description : valide
const meta_valid = '<html><head><title>OK</title>' +
  '<meta name="description" content="Phrase d\'exactement de septante caracteres qui passe la limite minimale et reste sous le maximum largement.">' +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","inLanguage":"fr","name":"Pandul"}]}</script>' +
  '</head><body>Contenu visible.</body></html>';

// Task 2 — check #5 meta trop court (5 chars)
const meta_too_short = '<html><head><title>OK</title>' +
  '<meta name="description" content="Court">' +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","inLanguage":"fr","name":"Pandul"}]}</script>' +
  '</head><body>Contenu visible.</body></html>';

// Task 2 — check #5 meta trop long (200 chars)
const longDesc = 'a'.repeat(200);
const meta_too_long = '<html><head><title>OK</title>' +
  '<meta name="description" content="' + longDesc + '">' +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","inLanguage":"fr","name":"Pandul"}]}</script>' +
  '</head><body>Contenu visible.</body></html>';

// Task 2 — check #5 pas de meta : PASSE (skip)
const meta_absent = '<html><head><title>OK</title>' +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","inLanguage":"fr","name":"Pandul"}]}</script>' +
  '</head><body>Contenu visible.</body></html>';

// Task 2 — check #7 title valide (12 chars)
const title_ok = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [{ '@type': 'WebSite', '@id': 'https://pandul.fr/#website', 'inLanguage': 'fr', 'name': 'Pandul' }]
}));

// Task 2 — check #7 title trop long (70 chars > 65 limit)
const longTitle = 'A'.repeat(70);
const title_too_long = '<html><head><title>' + longTitle + '</title>' + VALID_META +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","inLanguage":"fr","name":"Pandul"}]}</script>' +
  '</head><body>Contenu visible aleatoire.</body></html>';

// Task 3 — check #6 substring direct : PASSE
const c6_substring = '<html>' + VALID_HEAD +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"DefinedTerm","@id":"https://pandul.fr/d/utxo/#term","inLanguage":"fr","name":"UTXO","description":"Sigle de Unspent Transaction Output"}]}</script>' +
  '</head><body><h1>UTXO</h1><p>Sigle de Unspent Transaction Output, designant une sortie de transaction.</p></body></html>';

// Task 3 — check #6 substring case-insensitive + diacritiques : PASSE
const c6_diacritics = '<html>' + VALID_HEAD +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"DefinedTerm","@id":"https://pandul.fr/d/ete/#term","inLanguage":"fr","name":"Ete","description":"été chaud"}]}</script>' +
  '</head><body><p>Cet ETE CHAUD est intense et l\'on transpire abondamment dehors quotidiennement.</p></body></html>';

// Task 3 — check #6 word overlap ≥80% : PASSE (4/5 mots > 3 chars)
const c6_overlap_ok = '<html>' + VALID_HEAD +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"DefinedTerm","@id":"https://pandul.fr/d/x/#term","inLanguage":"fr","name":"X","description":"alpha beta gamma delta epsilon"}]}</script>' +
  '</head><body><p>Voici un texte alpha avec beta puis gamma et enfin delta mais pas le dernier.</p></body></html>';

// Task 3 — check #6 word overlap <80% : FAIL
const c6_overlap_fail = '<html>' + VALID_HEAD +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"DefinedTerm","@id":"https://pandul.fr/d/x/#term","inLanguage":"fr","name":"X","description":"alpha beta gamma delta epsilon"}]}</script>' +
  '</head><body><p>Voici alpha et beta mais rien d\'autre du tout reellement.</p></body></html>';

// Task 3 — check #6 entité sans description : PASSE (skip)
const c6_no_description = wrap(JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [{ '@type': 'DefinedTerm', '@id': 'https://pandul.fr/d/x/#term', 'inLanguage': 'fr', 'name': 'X' }]
}));

const FIXTURES = {
  // Task 1
  breadcrumb_ok: { html: breadcrumb_ok, expected: 0, note: 'BreadcrumbList sans inLanguage doit PASSER (whitelist T-02)' },
  definedterm_missing_lang: { html: definedterm_missing_lang, expected: 1, note: 'DefinedTerm sans inLanguage doit FAIL (whitelist strict)' },
  sitewide_budget_ok: { html: sitewide_budget_ok, expected: 0, note: 'Sitewide tier 3 entries ~1224B doit PASSER (≤1.5KB/3)' },
  detail_budget_ok: { html: detail_budget_ok, expected: 0, note: 'Detail tier 5 entries ~1900B doit PASSER (≤3KB/5)' },
  hub_budget_ok: { html: hub_budget_ok, expected: 0, note: 'Hub tier 6 entries large ItemList doit PASSER (≤30KB/6)' },
  detail_budget_overflow: { html: detail_budget_overflow, expected: 1, note: 'Detail tier 5 entries ~3500B doit FAIL (>3KB)' },
  // Task 2
  meta_valid: { html: meta_valid, expected: 0, note: 'Meta description 114 chars doit PASSER' },
  meta_too_short: { html: meta_too_short, expected: 1, note: 'Meta description 5 chars doit FAIL ([70,155])' },
  meta_too_long: { html: meta_too_long, expected: 1, note: 'Meta description 200 chars doit FAIL ([70,155])' },
  meta_absent: { html: meta_absent, expected: 0, note: 'Pas de meta description doit PASSER (skip)' },
  title_ok: { html: title_ok, expected: 0, note: 'Title 23 chars doit PASSER (≤65)' },
  title_too_long: { html: title_too_long, expected: 1, note: 'Title 70 chars doit FAIL (>65)' },
  // Task 3
  c6_substring: { html: c6_substring, expected: 0, note: 'Description substring direct du body doit PASSER' },
  c6_diacritics: { html: c6_diacritics, expected: 0, note: 'Description avec diacritiques normalisee doit PASSER' },
  c6_overlap_ok: { html: c6_overlap_ok, expected: 0, note: 'Word overlap ≥80% doit PASSER' },
  c6_overlap_fail: { html: c6_overlap_fail, expected: 1, note: 'Word overlap <80% doit FAIL (anti-C3)' },
  c6_no_description: { html: c6_no_description, expected: 0, note: 'Entité sans description JSON-LD doit PASSER (skip)' }
};

// --- Run --------------------------------------------------------------------

const VALIDATOR = path.join(__dirname, 'validate-jsonld.js');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonld-test-p16-'));

let passed = 0, failed = 0;

try {
  for (const [name, fixture] of Object.entries(FIXTURES)) {
    for (const f of fs.readdirSync(TMP)) {
      fs.unlinkSync(path.join(TMP, f));
    }
    fs.writeFileSync(path.join(TMP, 'index.html'), fixture.html);

    const result = spawnSync(process.execPath, [VALIDATOR, TMP], { encoding: 'utf8' });
    const ok = result.status === fixture.expected;

    if (ok) {
      console.log('[PASS] ' + name + ' (exit ' + result.status + ') — ' + fixture.note);
      passed++;
    } else {
      console.error('[FAIL] ' + name + ': expected exit ' + fixture.expected + ', got ' + result.status);
      console.error('       ' + fixture.note);
      if (result.stdout) console.error('  stdout: ' + result.stdout.trim());
      if (result.stderr) console.error('  stderr: ' + result.stderr.trim());
      failed++;
    }
  }
  console.log('\nPhase 16 self-test: ' + passed + ' passed, ' + failed + ' failed');
  process.exit(failed > 0 ? 1 : 0);
} finally {
  fs.rmSync(TMP, { recursive: true, force: true });
}
