/**
 * test-sync.js
 *
 * Script de validation automatisee post-sync.
 * Verifie les 6 criteres de qualite des artefacts generes par sync-dictionnaire.js.
 *
 * Usage : node _scripts/test-sync.js
 *
 * Exit code 0 si tous les tests passent, 1 sinon.
 * Zero dependency — utilise uniquement fs, path, process natifs.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dictDir = path.join(rootDir, '_dictionnaire');
const searchIndexPath = path.join(rootDir, 'assets', 'data', 'search-index.json');
const imagesDir = path.join(rootDir, 'assets', 'img', 'dictionnaire');

let passed = 0;
let failed = 0;
const totalTests = 6;

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
 * Compte recursivement les fichiers avec une extension donnee dans un dossier.
 */
function countFilesRecursive(dir, ext) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFilesRecursive(fullPath, ext);
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      count++;
    }
  }
  return count;
}

// === Execution des tests ===

console.log('=== Validation post-sync ===');

// --- Test 1 : Nombre de fichiers MD ---
const mdFiles = fs.readdirSync(dictDir).filter(f => f.endsWith('.md'));
const expectedMdCount = 1408;

if (mdFiles.length === expectedMdCount) {
  pass(1, `${expectedMdCount} fichiers MD generes`);
} else {
  fail(1, `attendu ${expectedMdCount}, obtenu ${mdFiles.length}`);
}

// --- Test 2 : Front matter valide sur un echantillon ---
const sampleFiles = pickRandom(mdFiles, 20);
const requiredKeys = ['title', 'slug', 'permalink', 'category', 'letter', 'layout'];
let fmValid = true;
let fmError = '';

for (const file of sampleFiles) {
  const filePath = path.join(dictDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontMatter(content);

  if (fm === null) {
    fmValid = false;
    fmError = `${file}: front matter absent ou mal forme`;
    break;
  }

  // Verifier les cles obligatoires
  for (const key of requiredKeys) {
    const keyRegex = new RegExp(`^${key}:`, 'm');
    if (!keyRegex.test(fm)) {
      fmValid = false;
      fmError = `${file}: cle manquante '${key}'`;
      break;
    }
  }
  if (!fmValid) break;

  // Verifier que layout vaut definition
  const layoutMatch = fm.match(/^layout:\s*(.+)$/m);
  if (!layoutMatch || layoutMatch[1].trim() !== 'definition') {
    fmValid = false;
    fmError = `${file}: layout n'est pas 'definition'`;
    break;
  }

  // Verifier que permalink suit le pattern /dictionnaire/{slug}/
  const slugMatch = fm.match(/^slug:\s*"?([^"\n]+)"?$/m);
  const permalinkMatch = fm.match(/^permalink:\s*(.+)$/m);
  if (slugMatch && permalinkMatch) {
    const slug = slugMatch[1].trim();
    const permalink = permalinkMatch[1].trim();
    if (permalink !== `/dictionnaire/${slug}/`) {
      fmValid = false;
      fmError = `${file}: permalink '${permalink}' ne correspond pas au slug '${slug}'`;
      break;
    }
  }
}

if (fmValid) {
  pass(2, 'front matter valide sur 20 echantillons');
} else {
  fail(2, `front matter invalide dans ${fmError}`);
}

// --- Test 3 : Pas d'UUIDs bruts dans les cross-references ---
const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
let uuidClean = true;
let uuidError = '';

for (const file of sampleFiles) {
  const filePath = path.join(dictDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontMatter(content);

  if (fm && uuidRegex.test(fm)) {
    uuidClean = false;
    uuidError = file;
    break;
  }
}

if (uuidClean) {
  pass(3, 'aucun UUID brut dans les cross-references');
} else {
  fail(3, `UUID brut trouve dans ${uuidError}`);
}

// --- Test 4 : Index JSON valide ---
try {
  const indexContent = fs.readFileSync(searchIndexPath, 'utf8');
  const index = JSON.parse(indexContent);
  const expectedIndexCount = 1408;

  if (!Array.isArray(index)) {
    fail(4, 'search-index.json n\'est pas un tableau');
  } else if (index.length !== expectedIndexCount) {
    fail(4, `attendu ${expectedIndexCount} entrees, obtenu ${index.length}`);
  } else {
    const indexKeys = ['title', 'slug', 'category', 'letter'];
    let indexValid = true;
    let indexError = '';

    for (let i = 0; i < index.length; i++) {
      const entry = index[i];
      for (const key of indexKeys) {
        if (!(key in entry)) {
          indexValid = false;
          indexError = `entree ${i} (${entry.title || '?'}): cle manquante '${key}'`;
          break;
        }
      }
      if (!indexValid) break;

      // Verifier que letter est une lettre majuscule A-Z
      if (!/^[A-Z]$/.test(entry.letter)) {
        indexValid = false;
        indexError = `entree ${i} (${entry.title}): letter '${entry.letter}' n'est pas A-Z`;
        break;
      }
    }

    if (indexValid) {
      pass(4, `search-index.json valide (${expectedIndexCount} entrees)`);
    } else {
      fail(4, indexError);
    }
  }
} catch (err) {
  fail(4, `erreur lecture/parse search-index.json: ${err.message}`);
}

// --- Test 5 : Images copiees ---
const expectedImageCount = 54;
const actualImageCount = countFilesRecursive(imagesDir, '.png');

if (actualImageCount === expectedImageCount) {
  pass(5, `${expectedImageCount} images copiees`);
} else {
  fail(5, `attendu ${expectedImageCount}, obtenu ${actualImageCount}`);
}

// --- Test 6 : Chemins d'images recrits ---
let imagePathsOk = true;
let imagePathError = '';
let filesWithImages = 0;

for (const file of mdFiles) {
  const filePath = path.join(dictDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Chercher les references d'images Markdown
  const imageRefs = content.match(/!\[[^\]]*\]\([^)]+\)/g);
  if (!imageRefs || imageRefs.length === 0) continue;

  filesWithImages++;

  for (const ref of imageRefs) {
    // Extraire le chemin
    const pathMatch = ref.match(/\(([^)]+)\)/);
    if (!pathMatch) continue;
    const imgPath = pathMatch[1];

    // Verifier que le chemin utilise /assets/img/dictionnaire/ et pas ./assets/
    if (imgPath.startsWith('./assets/') || !imgPath.startsWith('/assets/img/dictionnaire/')) {
      imagePathsOk = false;
      imagePathError = `${file}: chemin non recrit '${imgPath}'`;
      break;
    }
  }
  if (!imagePathsOk) break;
}

if (imagePathsOk && filesWithImages > 0) {
  pass(6, `chemins d'images recrits correctement (${filesWithImages} fichiers avec images)`);
} else if (filesWithImages === 0) {
  fail(6, 'aucun fichier avec images trouve');
} else {
  fail(6, `chemin non recrit dans ${imagePathError}`);
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
