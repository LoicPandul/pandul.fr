#!/usr/bin/env node
// Phase 15 self-test harness (T-15-02 mitigation) — zero deps.
// Prouve que _scripts/validate-jsonld.js rejette correctement chaque catégorie d'erreur.
// 6 fixtures synthétiques : clean_ok, broken_json, four_entries, oversized, missing_lang, dangling_ref.
// Usage : node _scripts/test-validate-jsonld.js
// Exit  : 0 si toutes les fixtures sont classées correctement, 1 sinon.
// Réf   : .planning/phases/15-schema-infrastructure-sitewide-entities/15-VALIDATION.md §Per-Task W0-01..W0-04.

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// --- Fixtures HTML inline -----------------------------------------------------
// Chaque fixture est une page HTML avec UN bloc <script type="application/ld+json">.
// Sauf clean_ok, toutes doivent faire fail le validator (exit 1).

const oversizedPayload = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [{
    '@type': 'WebSite',
    '@id': 'https://pandul.fr/#a',
    'inLanguage': 'fr',
    'description': 'X'.repeat(1600)
  }]
});

const FIXTURES = {
  // Check : valid 3-entity graph, all inLanguage:"fr", refs resolved, <1.5 KB → validator must ACCEPT
  clean_ok: '<html><head><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","url":"https://pandul.fr/","name":"Pandul","inLanguage":"fr"},{"@type":"Organization","@id":"https://pandul.fr/#organization","name":"Pandul","url":"https://pandul.fr/","inLanguage":"fr","founder":{"@id":"https://pandul.fr/#person-loic"}},{"@type":"Person","@id":"https://pandul.fr/#person-loic","name":"Loic","inLanguage":"fr","worksFor":{"@id":"https://pandul.fr/#organization"}}]}</script></head><body></body></html>',

  // Check 1 (JSON.parse) : trailing comma after last entry → reject
  broken_json: '<html><head><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","inLanguage":"fr",}]}</script></head></html>',

  // Check 2 (entries) : 4 entities > 3 → reject
  four_entries: '<html><head><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#a","inLanguage":"fr"},{"@type":"Organization","@id":"https://pandul.fr/#b","inLanguage":"fr"},{"@type":"Person","@id":"https://pandul.fr/#c","inLanguage":"fr"},{"@type":"WebPage","@id":"https://pandul.fr/#d","inLanguage":"fr"}]}</script></head></html>',

  // Check 2 (bytes) : payload > 1.5 KB via 1600-char description → reject
  oversized: '<html><head><script type="application/ld+json">' + oversizedPayload + '</script></head></html>',

  // Check 3 (inLanguage) : entity without inLanguage:"fr" → reject
  missing_lang: '<html><head><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","name":"Pandul"}]}</script></head></html>',

  // Check 4 (@id refs) : relative IRI "/#missing-org" not in @graph, not absolute → reject
  dangling_ref: '<html><head><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://pandul.fr/#website","inLanguage":"fr","publisher":{"@id":"/#missing-org"}}]}</script></head></html>'
};

// --- Run --------------------------------------------------------------------

const VALIDATOR = path.join(__dirname, 'validate-jsonld.js');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonld-test-'));

let passed = 0, failed = 0;

try {
  for (const [name, html] of Object.entries(FIXTURES)) {
    // Reset tmp dir per fixture (isolation)
    for (const f of fs.readdirSync(TMP)) {
      fs.unlinkSync(path.join(TMP, f));
    }
    fs.writeFileSync(path.join(TMP, 'index.html'), html);

    // Use process.execPath to bypass Windows .cmd shim quirks
    const result = spawnSync(process.execPath, [VALIDATOR, TMP], { encoding: 'utf8' });
    const expectedExit = (name === 'clean_ok') ? 0 : 1;
    const ok = result.status === expectedExit;

    if (ok) {
      console.log('[PASS] ' + name + ' (exit ' + result.status + ' as expected)');
      passed++;
    } else {
      console.error('[FAIL] ' + name + ': expected exit ' + expectedExit + ', got ' + result.status);
      if (result.stdout) console.error('  stdout: ' + result.stdout.trim());
      if (result.stderr) console.error('  stderr: ' + result.stderr.trim());
      failed++;
    }
  }
  console.log('\nSelf-test: ' + passed + ' passed, ' + failed + ' failed');
  process.exit(failed > 0 ? 1 : 0);
} finally {
  fs.rmSync(TMP, { recursive: true, force: true });
}
