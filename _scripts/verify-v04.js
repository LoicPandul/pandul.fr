#!/usr/bin/env node
// Phase 18 V-04 (D-V04-01) - diff git audit zero-deps.
// Verifie qu entre SHA-v1.1-end et HEAD post-Phase-18, aucun body Markdown
// des fichiers source visibles n a ete modifie - uniquement ajouts/modifs en
// front matter YAML (et alt-only changes Phase 17 SO-04 exemptes).
//
// Usage : node _scripts/verify-v04.js {SHA_FROM}..{SHA_TO}
// Exit  : 0 si zero violation, 1 si >=1 violation, 2 si erreur fatale.

const { execSync } = require('child_process');

const RANGE = process.argv[2];
if (!RANGE || !RANGE.includes('..')) {
  console.error('Usage: node _scripts/verify-v04.js {SHA_FROM}..{SHA_TO}');
  console.error('Example: node _scripts/verify-v04.js 9cbd99f..HEAD');
  process.exit(2);
}

// Whitelist fichiers source visibles a auditer par-fichier (D-V04-01)
const ROOT_FILES = ['index.md', 'apropos.md', 'dictionnaire.md', '404.md', 'bloc-zero.md'];

// Glob _dictionnaire/*.md = 1408 fichiers, audit agrege statistiquement
const DICT_GLOB = '_dictionnaire/';

// Pattern detection alt-only changes (Phase 17 SO-04 exemption D-05) - Pitfall 4
// Matche les lignes diff qui sont des images Markdown : +![alt](path) ou -![alt](path)
const ALT_LINE_PATTERN = /^[+-]!\[[^\]]*\]\(/;

/**
 * Verifie si un fichier est nouveau dans le range (cree entre SHA_FROM et SHA_TO).
 * Si oui, on l exempte de l audit body (pas de baseline a comparer).
 */
function isNewFile(diff) {
  return /^new file mode/m.test(diff);
}

/**
 * Parse un diff git unified format pour un fichier .md.
 * Distingue lignes du bloc front matter (entre les deux ---) vs body Markdown.
 *
 * Heuristique : compte cumulatif des occurrences "^---$" au fil des hunks.
 * - Avant la 2e occurrence : front matter
 * - Apres la 2e occurrence : body
 *
 * Returns : {fm_added, fm_removed, body_added, body_removed, body_alt_only_added, body_alt_only_removed}
 */
function classifyDiff(diff) {
  const result = {
    fm_added: 0, fm_removed: 0,
    body_added: 0, body_removed: 0,
    body_alt_only_added: 0, body_alt_only_removed: 0
  };
  const lines = diff.split('\n');
  let dashCount = 0;  // 0 = pre-front-matter, 1 = in front matter, 2+ = body
  let inHunk = false;

  for (const line of lines) {
    // Hunk header (@@ -... +... @@) — set inHunk flag, tracking dashCount global per file
    if (line.startsWith('@@')) {
      inHunk = true;
      continue;
    }
    if (!inHunk) continue;

    // Detecter les marqueurs YAML front matter --- (peut etre +, -, ou context " ")
    // On compte les --- visibles dans le diff (donc dans context ou added/removed)
    const stripped = line.replace(/^[+\- ]/, '').trim();
    if (stripped === '---') {
      dashCount++;
      continue;
    }

    // Classer les lignes ajoutees/supprimees selon le bloc
    if (line.startsWith('+') && !line.startsWith('+++')) {
      if (dashCount < 2) {
        result.fm_added++;
      } else {
        if (ALT_LINE_PATTERN.test(line)) {
          result.body_alt_only_added++;
        } else {
          result.body_added++;
        }
      }
    } else if (line.startsWith('-') && !line.startsWith('---')) {
      if (dashCount < 2) {
        result.fm_removed++;
      } else {
        if (ALT_LINE_PATTERN.test(line)) {
          result.body_alt_only_removed++;
        } else {
          result.body_removed++;
        }
      }
    }
  }

  return result;
}

let violations = 0;
let auditedRoot = 0;
let auditedDict = 0;
let exemptNew = 0;
let exemptAltOnly = 0;

console.log(`\n=== V-04 audit : range ${RANGE} ===\n`);
console.log(`-- Root files (par-fichier) :`);

// Audit per-fichier ROOT_FILES (5 fichiers, log detaille)
for (const file of ROOT_FILES) {
  try {
    const diff = execSync(`git diff --no-color ${RANGE} -- ${file}`, { encoding: 'utf8' });
    auditedRoot++;
    if (!diff.trim()) {
      console.log(`OK ${file} : pas de changement`);
      continue;
    }
    if (isNewFile(diff)) {
      exemptNew++;
      console.log(`EXEMPT ${file} : nouveau fichier dans le range (pas de baseline)`);
      continue;
    }
    const c = classifyDiff(diff);
    if (c.body_added > 0 || c.body_removed > 0) {
      console.error(`VIOLATION ${file} : body lines added=${c.body_added} removed=${c.body_removed}`);
      violations++;
    } else {
      console.log(`OK ${file} : ${c.fm_added} added / ${c.fm_removed} removed (front matter only)`);
    }
  } catch (err) {
    console.warn(`WARN ${file} : ${err.message}`);
  }
}

console.log(`\n-- _dictionnaire/*.md (agregat stats + log par-violation) :`);

// Audit _dictionnaire/*.md (1408 fichiers, agregat stats + log per-violation)
try {
  const dictFiles = execSync(`git diff --no-color ${RANGE} --name-only -- ${DICT_GLOB}`, { encoding: 'utf8' })
    .trim().split('\n').filter(Boolean);
  console.log(`Found ${dictFiles.length} modified files in ${DICT_GLOB}`);
  for (const file of dictFiles) {
    auditedDict++;
    const diff = execSync(`git diff --no-color ${RANGE} -- ${file}`, { encoding: 'utf8' });
    if (isNewFile(diff)) {
      exemptNew++;
      continue;
    }
    const c = classifyDiff(diff);
    if (c.body_added > 0 || c.body_removed > 0) {
      console.error(`VIOLATION ${file} : body lines added=${c.body_added} removed=${c.body_removed}`);
      violations++;
    } else if (c.body_alt_only_added > 0 || c.body_alt_only_removed > 0) {
      exemptAltOnly++;
    }
  }
} catch (err) {
  console.warn(`WARN dict scan : ${err.message}`);
}

console.log(`\n=== Summary ===`);
console.log(`Audited     : ${auditedRoot} root files, ${auditedDict} _dictionnaire/*.md files`);
console.log(`Exempt new  : ${exemptNew} (new files in range, no baseline)`);
console.log(`Exempt alts : ${exemptAltOnly} (alt-only changes Phase 17 SO-04 D-05)`);
console.log(`Violations  : ${violations}`);
process.exit(violations > 0 ? 1 : 0);
