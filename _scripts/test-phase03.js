/**
 * test-phase03.js
 *
 * Validation automatisee des artefacts de la Phase 03 :
 * pages de navigation du dictionnaire (categories, lettres, prev/next, search, layouts, landing).
 *
 * Usage : node _scripts/test-phase03.js
 *
 * Exit code 0 si tous les tests passent, 1 sinon.
 * Zero dependency — utilise uniquement fs, path, process natifs.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dictDir = path.join(rootDir, '_dictionnaire');
const categorieDir = path.join(rootDir, '_categorie');
const lettreDir = path.join(rootDir, '_lettre');
const searchIndexPath = path.join(rootDir, 'assets', 'data', 'search-index.json');
const dictionnaireMdPath = path.join(rootDir, 'dictionnaire.md');
const definitionLayoutPath = path.join(rootDir, '_layouts', 'definition.html');
const categoryLayoutPath = path.join(rootDir, '_layouts', 'category.html');
const letterLayoutPath = path.join(rootDir, '_layouts', 'letter.html');

const totalTests = 13;
let passed = 0;
let failed = 0;

function pass(num, msg) {
  console.log(`[${num}/${totalTests}] PASS: ${msg}`);
  passed++;
}

function fail(num, msg) {
  console.log(`[${num}/${totalTests}] FAIL: ${msg}`);
  failed++;
}

/**
 * Selectionne N fichiers aleatoires dans un tableau.
 */
function pickRandom(arr, n) {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

/**
 * Extrait le front matter YAML (entre les deux ---) d'un contenu de fichier.
 * Retourne null si pas de front matter valide.
 */
function extractFrontMatter(content) {
  if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
    return null;
  }
  const secondIdx = content.indexOf('\n---', 4);
  if (secondIdx === -1) return null;
  return content.substring(4, secondIdx);
}

/**
 * Normalisation accent-insensitive — meme logique que dict-search.js.
 * Utilise NFD + suppression des diacritiques + toLowerCase.
 */
function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// === Execution des tests ===

console.log('=== Validation Phase 03 — Navigation dictionnaire ===');
console.log('');

// -----------------------------------------------------------------------
// Gap 1a (DICT-05/DICT-09) : category_slug present dans les definitions
// -----------------------------------------------------------------------
{
  const testNum = 1;
  const mdFiles = fs.readdirSync(dictDir).filter(f => f.endsWith('.md'));
  const sample = pickRandom(mdFiles, 30);
  let ok = true;
  let errorMsg = '';

  for (const file of sample) {
    const content = fs.readFileSync(path.join(dictDir, file), 'utf8');
    const fm = extractFrontMatter(content);
    if (!fm) {
      ok = false;
      errorMsg = `${file}: front matter absent`;
      break;
    }
    if (!/^category_slug:/m.test(fm)) {
      ok = false;
      errorMsg = `${file}: champ 'category_slug' absent du front matter`;
      break;
    }
  }

  if (ok) {
    pass(testNum, `category_slug present dans le front matter (echantillon 30 definitions)`);
  } else {
    fail(testNum, errorMsg);
  }
}

// -----------------------------------------------------------------------
// Gap 1b (DICT-05/DICT-09) : prev_in_category / next_in_category presents
// Au moins certaines definitions ont des liens prev/next (pas premiere/derniere)
// -----------------------------------------------------------------------
{
  const testNum = 2;
  const mdFiles = fs.readdirSync(dictDir).filter(f => f.endsWith('.md'));
  // On cherche un fichier qui a les deux champs (definitions au milieu d'une categorie)
  let foundPrev = 0;
  let foundNext = 0;

  for (const file of mdFiles) {
    const content = fs.readFileSync(path.join(dictDir, file), 'utf8');
    const fm = extractFrontMatter(content);
    if (!fm) continue;
    if (/^prev_in_category:/m.test(fm)) foundPrev++;
    if (/^next_in_category:/m.test(fm)) foundNext++;
    if (foundPrev >= 10 && foundNext >= 10) break;
  }

  if (foundPrev >= 10 && foundNext >= 10) {
    pass(testNum, `prev_in_category (${foundPrev}) et next_in_category (${foundNext}) presents dans les definitions`);
  } else {
    fail(testNum, `prev_in_category: ${foundPrev} occurrences, next_in_category: ${foundNext} occurrences (attendu >= 10 chacun)`);
  }
}

// -----------------------------------------------------------------------
// Gap 1c (DICT-05/DICT-09) : les slugs des cross-references resolvent vers un .md existant
// -----------------------------------------------------------------------
{
  const testNum = 3;
  const mdFiles = fs.readdirSync(dictDir).filter(f => f.endsWith('.md'));

  // Construire l'ensemble des slugs existants
  const existingSlugs = new Set(mdFiles.map(f => f.replace(/\.md$/, '')));

  // Parcourir un echantillon de fichiers avec cross_references
  const filesWithCrossRefs = mdFiles.filter(f => {
    const content = fs.readFileSync(path.join(dictDir, f), 'utf8');
    return /^cross_references:/m.test(extractFrontMatter(content) || '');
  });

  const sample = pickRandom(filesWithCrossRefs, 20);
  let ok = true;
  let errorMsg = '';
  let checkedCount = 0;

  for (const file of sample) {
    const content = fs.readFileSync(path.join(dictDir, file), 'utf8');
    const fm = extractFrontMatter(content);
    if (!fm) continue;

    // Extraire tous les slugs de cross-references (format YAML: "    slug: "value"")
    // Les slugs sous cross_references ont 4 espaces d'indentation sans tiret
    const slugMatches = fm.matchAll(/^\s+slug:\s+"?([^"\n\r]+)"?\s*$/gm);
    for (const match of slugMatches) {
      const refSlug = match[1].trim();
      if (!existingSlugs.has(refSlug)) {
        ok = false;
        errorMsg = `${file}: slug de cross-reference '${refSlug}' ne correspond a aucun fichier dans _dictionnaire/`;
        break;
      }
      checkedCount++;
    }
    if (!ok) break;
  }

  if (ok && checkedCount > 0) {
    pass(testNum, `tous les slugs de cross-references resolvent vers des fichiers existants (${checkedCount} slugs verifies)`);
  } else if (checkedCount === 0) {
    fail(testNum, 'aucun slug de cross-reference trouve dans l\'echantillon');
  } else {
    fail(testNum, errorMsg);
  }
}

// -----------------------------------------------------------------------
// Gap 2 (DICT-06) : recherche accent-insensitive par prefix fonctionne sur search-index.json
// -----------------------------------------------------------------------
{
  const testNum = 4;

  let index;
  try {
    index = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  } catch (err) {
    fail(testNum, `impossible de lire search-index.json: ${err.message}`);
    index = null;
  }

  if (index) {
    // Reimplementation de la logique de recherche de dict-search.js
    function search(query) {
      if (!query || query.length === 0) return [];
      const q = normalize(query);
      const prefix = [];
      const wordStart = [];
      const substring = [];
      for (const entry of index) {
        const t = normalize(entry.title);
        if (t.startsWith(q)) {
          prefix.push(entry);
        } else if (t.includes('-' + q) || t.includes(' ' + q)) {
          wordStart.push(entry);
        } else if (t.includes(q)) {
          substring.push(entry);
        }
      }
      return [...prefix, ...wordStart, ...substring].slice(0, 12);
    }

    let ok = true;
    const erreurs = [];

    // Cas 1 : recherche sans accent "cle" doit trouver des termes contenant "CLÉ" (accent)
    // "CLÉ DE RÉVOCATION" existe dans l'index (category PORTEFEUILLE)
    const resultats1 = search('cle');
    const trouveTitre1 = resultats1.find(e => normalize(e.title).startsWith('cle'));
    if (!trouveTitre1) {
      ok = false;
      erreurs.push('recherche "cle" (sans accent) ne trouve pas de terme commencant par "cle" (ex: "CLÉ DE RÉVOCATION")');
    }

    // Cas 2 : recherche avec accent "clé" doit trouver les memes termes que "cle"
    const resultats2 = search('clé');
    const trouveTitre2 = resultats2.find(e => normalize(e.title).startsWith('cle'));
    if (!trouveTitre2) {
      ok = false;
      erreurs.push('recherche "clé" (avec accent) ne trouve pas de terme commencant par "cle"');
    }

    // Cas 3 : "cle" et "clé" doivent donner le meme premier resultat (normalisation symetrique)
    if (trouveTitre1 && trouveTitre2 && trouveTitre1.slug !== trouveTitre2.slug) {
      ok = false;
      erreurs.push(
        `"cle" et "cle" (accent) ne donnent pas le meme premier resultat: ` +
        `"${trouveTitre1.title}" vs "${trouveTitre2.title}"`
      );
    }

    // Cas 4 : recherche "eclair" (sans accent) doit trouver "ECLAIR" qui existe dans l'index
    const resultats4 = search('eclair');
    const trouveTitre4 = resultats4.find(e => normalize(e.title).startsWith('eclair'));
    if (!trouveTitre4) {
      ok = false;
      erreurs.push('recherche "eclair" (sans accent) ne trouve pas "ECLAIR"');
    }

    // Cas 5 : recherche "utxo" doit retourner des resultats (terme tres courant)
    const resultats5 = search('utxo');
    if (resultats5.length === 0) {
      ok = false;
      erreurs.push('recherche "utxo" retourne 0 resultats');
    }

    // Cas 6 : recherche vide retourne tableau vide
    const resultats6 = search('');
    if (resultats6.length !== 0) {
      ok = false;
      erreurs.push('recherche vide devrait retourner [], obtenu ' + resultats6.length + ' resultats');
    }

    // Cas 7 : les resultats du prefix arrivent avant les substring
    const resultats7 = search('bit');
    if (resultats7.length > 1) {
      const premierResult = normalize(resultats7[0].title);
      if (!premierResult.startsWith('bit')) {
        ok = false;
        erreurs.push(`le premier resultat de "bit" devrait commencer par "bit", obtenu "${resultats7[0].title}"`);
      }
    }

    if (ok) {
      pass(testNum, `recherche accent-insensitive par prefix fonctionne sur search-index.json (7 cas valides)`);
    } else {
      fail(testNum, erreurs.join(' | '));
    }
  }
}

// -----------------------------------------------------------------------
// Gap 3a (DICT-07) : 19 fichiers dans _categorie/ avec front matter correct
// -----------------------------------------------------------------------
{
  const testNum = 5;

  if (!fs.existsSync(categorieDir)) {
    fail(testNum, `dossier _categorie/ absent`);
  } else {
    const catFiles = fs.readdirSync(categorieDir).filter(f => f.endsWith('.md'));

    if (catFiles.length !== 19) {
      fail(testNum, `attendu 19 fichiers dans _categorie/, obtenu ${catFiles.length}`);
    } else {
      const requiredKeys = ['title', 'slug', 'permalink', 'layout', 'definition_count'];
      let ok = true;
      let errorMsg = '';

      for (const file of catFiles) {
        const content = fs.readFileSync(path.join(categorieDir, file), 'utf8');
        const fm = extractFrontMatter(content);

        if (!fm) {
          ok = false;
          errorMsg = `${file}: front matter absent`;
          break;
        }

        for (const key of requiredKeys) {
          if (!new RegExp(`^${key}:`, 'm').test(fm)) {
            ok = false;
            errorMsg = `${file}: champ obligatoire '${key}' absent`;
            break;
          }
        }
        if (!ok) break;

        // Verifier layout: category
        const layoutMatch = fm.match(/^layout:\s*(.+)$/m);
        if (!layoutMatch || layoutMatch[1].trim() !== 'category') {
          ok = false;
          errorMsg = `${file}: layout n'est pas 'category' (obtenu '${layoutMatch ? layoutMatch[1].trim() : 'absent'}')`;
          break;
        }

        // Verifier permalink pattern
        const slug = file.replace(/\.md$/, '');
        if (!fm.includes(`/dictionnaire/categorie/${slug}/`)) {
          ok = false;
          errorMsg = `${file}: permalink ne contient pas '/dictionnaire/categorie/${slug}/'`;
          break;
        }

        // Verifier definition_count est un entier positif
        const countMatch = fm.match(/^definition_count:\s*(\d+)/m);
        if (!countMatch || parseInt(countMatch[1], 10) < 1) {
          ok = false;
          errorMsg = `${file}: definition_count absent ou egal a 0`;
          break;
        }
      }

      if (ok) {
        pass(testNum, `19 fichiers de categorie avec front matter valide (layout, permalink, definition_count)`);
      } else {
        fail(testNum, errorMsg);
      }
    }
  }
}

// -----------------------------------------------------------------------
// Gap 3b (DICT-07) : 26 fichiers dans _lettre/ avec front matter correct
// -----------------------------------------------------------------------
{
  const testNum = 6;

  if (!fs.existsSync(lettreDir)) {
    fail(testNum, `dossier _lettre/ absent`);
  } else {
    const letFiles = fs.readdirSync(lettreDir).filter(f => f.endsWith('.md'));

    if (letFiles.length !== 26) {
      fail(testNum, `attendu 26 fichiers dans _lettre/, obtenu ${letFiles.length}`);
    } else {
      const requiredKeys = ['title', 'slug', 'permalink', 'layout', 'letter', 'definition_count'];
      let ok = true;
      let errorMsg = '';

      for (const file of letFiles) {
        const content = fs.readFileSync(path.join(lettreDir, file), 'utf8');
        const fm = extractFrontMatter(content);

        if (!fm) {
          ok = false;
          errorMsg = `${file}: front matter absent`;
          break;
        }

        for (const key of requiredKeys) {
          if (!new RegExp(`^${key}:`, 'm').test(fm)) {
            ok = false;
            errorMsg = `${file}: champ obligatoire '${key}' absent`;
            break;
          }
        }
        if (!ok) break;

        // Verifier layout: letter
        const layoutMatch = fm.match(/^layout:\s*(.+)$/m);
        if (!layoutMatch || layoutMatch[1].trim() !== 'letter') {
          ok = false;
          errorMsg = `${file}: layout n'est pas 'letter' (obtenu '${layoutMatch ? layoutMatch[1].trim() : 'absent'}')`;
          break;
        }

        // Verifier que le slug correspond au nom du fichier (lettre minuscule a-z)
        const slug = file.replace(/\.md$/, '');
        if (!/^[a-z]$/.test(slug)) {
          ok = false;
          errorMsg = `${file}: slug '${slug}' n'est pas une lettre minuscule a-z`;
          break;
        }

        // Verifier permalink pattern
        if (!fm.includes(`/dictionnaire/lettre/${slug}/`)) {
          ok = false;
          errorMsg = `${file}: permalink ne contient pas '/dictionnaire/lettre/${slug}/'`;
          break;
        }

        // Verifier letter est une majuscule A-Z
        const letterMatch = fm.match(/^letter:\s*"?([A-Z])"?/m);
        if (!letterMatch) {
          ok = false;
          errorMsg = `${file}: champ 'letter' absent ou n'est pas une majuscule A-Z`;
          break;
        }

        // Verifier definition_count est un entier >= 0
        const countMatch = fm.match(/^definition_count:\s*(\d+)/m);
        if (!countMatch) {
          ok = false;
          errorMsg = `${file}: definition_count absent ou non-numerique`;
          break;
        }
      }

      // Verifier que tous les 26 lettres A-Z sont couverts
      if (ok) {
        const slugs = letFiles.map(f => f.replace(/\.md$/, ''));
        for (const letter of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
          if (!slugs.includes(letter)) {
            ok = false;
            errorMsg = `lettre '${letter}' manquante dans _lettre/`;
            break;
          }
        }
      }

      if (ok) {
        pass(testNum, `26 fichiers de lettre (A-Z) avec front matter valide (layout, permalink, letter, definition_count)`);
      } else {
        fail(testNum, errorMsg);
      }
    }
  }
}

// -----------------------------------------------------------------------
// Gap 3c (DICT-07) : letters_with_definitions present dans les pages categorie
// -----------------------------------------------------------------------
{
  const testNum = 7;

  if (!fs.existsSync(categorieDir)) {
    fail(testNum, `dossier _categorie/ absent`);
  } else {
    const catFiles = fs.readdirSync(categorieDir).filter(f => f.endsWith('.md'));
    let ok = true;
    let errorMsg = '';

    for (const file of catFiles) {
      const content = fs.readFileSync(path.join(categorieDir, file), 'utf8');
      const fm = extractFrontMatter(content);

      if (!fm || !/^letters_with_definitions:/m.test(fm)) {
        ok = false;
        errorMsg = `${file}: champ 'letters_with_definitions' absent`;
        break;
      }
    }

    if (ok) {
      pass(testNum, `champ letters_with_definitions present dans toutes les pages categorie`);
    } else {
      fail(testNum, errorMsg);
    }
  }
}

// -----------------------------------------------------------------------
// Gap 4a (DICT-08/DICT-10) : _layouts/definition.html contient breadcrumbs
// -----------------------------------------------------------------------
{
  const testNum = 8;
  const content = fs.readFileSync(definitionLayoutPath, 'utf8');
  const hasBreadcrumbNav = content.includes('aria-label="Fil d\'Ariane"');
  const hasBreadcrumbClass = content.includes('class="breadcrumbs"');
  const hasAriaCurrentPage = content.includes('aria-current="page"');

  if (hasBreadcrumbNav && hasBreadcrumbClass && hasAriaCurrentPage) {
    pass(testNum, `_layouts/definition.html contient le nav breadcrumb (aria-label, class, aria-current)`);
  } else {
    const manquants = [];
    if (!hasBreadcrumbNav) manquants.push('aria-label="Fil d\'Ariane"');
    if (!hasBreadcrumbClass) manquants.push('class="breadcrumbs"');
    if (!hasAriaCurrentPage) manquants.push('aria-current="page"');
    fail(testNum, `_layouts/definition.html: elements manquants: ${manquants.join(', ')}`);
  }
}

// -----------------------------------------------------------------------
// Gap 4b (DICT-08/DICT-10) : _layouts/category.html contient breadcrumbs
// -----------------------------------------------------------------------
{
  const testNum = 9;
  const content = fs.readFileSync(categoryLayoutPath, 'utf8');
  const hasBreadcrumbNav = content.includes('aria-label="Fil d\'Ariane"');
  const hasBreadcrumbClass = content.includes('class="breadcrumbs"');
  const hasAriaCurrentPage = content.includes('aria-current="page"');

  if (hasBreadcrumbNav && hasBreadcrumbClass && hasAriaCurrentPage) {
    pass(testNum, `_layouts/category.html contient le nav breadcrumb (aria-label, class, aria-current)`);
  } else {
    const manquants = [];
    if (!hasBreadcrumbNav) manquants.push('aria-label="Fil d\'Ariane"');
    if (!hasBreadcrumbClass) manquants.push('class="breadcrumbs"');
    if (!hasAriaCurrentPage) manquants.push('aria-current="page"');
    fail(testNum, `_layouts/category.html: elements manquants: ${manquants.join(', ')}`);
  }
}

// -----------------------------------------------------------------------
// Gap 4c (DICT-08/DICT-10) : _layouts/letter.html contient breadcrumbs
// -----------------------------------------------------------------------
{
  const testNum = 10;
  const content = fs.readFileSync(letterLayoutPath, 'utf8');
  const hasBreadcrumbNav = content.includes('aria-label="Fil d\'Ariane"');
  const hasBreadcrumbClass = content.includes('class="breadcrumbs"');
  const hasAriaCurrentPage = content.includes('aria-current="page"');

  if (hasBreadcrumbNav && hasBreadcrumbClass && hasAriaCurrentPage) {
    pass(testNum, `_layouts/letter.html contient le nav breadcrumb (aria-label, class, aria-current)`);
  } else {
    const manquants = [];
    if (!hasBreadcrumbNav) manquants.push('aria-label="Fil d\'Ariane"');
    if (!hasBreadcrumbClass) manquants.push('class="breadcrumbs"');
    if (!hasAriaCurrentPage) manquants.push('aria-current="page"');
    fail(testNum, `_layouts/letter.html: elements manquants: ${manquants.join(', ')}`);
  }
}

// -----------------------------------------------------------------------
// Gap 5a (DICT-11) : dictionnaire.md contient "1408" (nombre de definitions)
// -----------------------------------------------------------------------
{
  const testNum = 11;
  const content = fs.readFileSync(dictionnaireMdPath, 'utf8');

  if (content.includes('1408')) {
    pass(testNum, `dictionnaire.md contient le chiffre "1408"`);
  } else {
    fail(testNum, `dictionnaire.md ne contient pas "1408"`);
  }
}

// -----------------------------------------------------------------------
// Gap 5b (DICT-11) : dictionnaire.md contient reference aux categories
// -----------------------------------------------------------------------
{
  const testNum = 12;
  const content = fs.readFileSync(dictionnaireMdPath, 'utf8');

  // La landing page doit contenir soit "19" (dans le hero stats) soit les liens de categorie
  const has19 = content.includes('19');
  const hasCategoryLinks = content.includes('/dictionnaire/categorie/');

  if (has19 && hasCategoryLinks) {
    pass(testNum, `dictionnaire.md contient la reference aux 19 categories et des liens de categorie`);
  } else {
    const manquants = [];
    if (!has19) manquants.push('"19"');
    if (!hasCategoryLinks) manquants.push('liens /dictionnaire/categorie/');
    fail(testNum, `dictionnaire.md: elements manquants: ${manquants.join(', ')}`);
  }
}

// -----------------------------------------------------------------------
// Gap 5c (DICT-11) : dictionnaire.md contient un dict-hero et les stats
// -----------------------------------------------------------------------
{
  const testNum = 13;
  const content = fs.readFileSync(dictionnaireMdPath, 'utf8');

  const hasDictHero = content.includes('class="dict-hero"');
  const hasDictStats = content.includes('dict-stats');
  const hasAZBar = content.includes('class="az-bar');
  const hasCategoryGrid = content.includes('class="category-grid"');

  if (hasDictHero && hasDictStats && hasAZBar && hasCategoryGrid) {
    pass(testNum, `dictionnaire.md contient le hero stats, la barre A-Z et la grille de categories`);
  } else {
    const manquants = [];
    if (!hasDictHero) manquants.push('class="dict-hero"');
    if (!hasDictStats) manquants.push('dict-stats');
    if (!hasAZBar) manquants.push('class="az-bar"');
    if (!hasCategoryGrid) manquants.push('class="category-grid"');
    fail(testNum, `dictionnaire.md: elements manquants: ${manquants.join(', ')}`);
  }
}

// === Resultat final ===
console.log('');
console.log(`=== ${passed}/${totalTests} tests PASSED ===`);

if (failed > 0) {
  console.log(`${failed} test(s) en echec`);
  process.exit(1);
} else {
  process.exit(0);
}
