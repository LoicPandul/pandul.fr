/**
 * sync-dictionnaire.js
 *
 * Script de synchronisation du repo Dictionnaire vers les pages Jekyll.
 * Genere 1408 fichiers .md dans _dictionnaire/, copie les images,
 * resout les cross-references UUID en objets {title, slug},
 * et produit un index de recherche JSON.
 *
 * Usage : node _scripts/sync-dictionnaire.js [--source PATH] [--dry-run]
 *
 * Zero dependency — utilise uniquement fs, path, process natifs.
 */

const fs = require('fs');
const path = require('path');

// --- Parsing des arguments CLI ---

const args = process.argv.slice(2);
let sourcePath = path.resolve('..', 'Dictionnaire');
let dryRun = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--source' && args[i + 1]) {
    sourcePath = path.resolve(args[i + 1]);
    i++;
  } else if (args[i] === '--dry-run') {
    dryRun = true;
  }
}

const rootDir = path.resolve(__dirname, '..');
const definitionsSourceDir = path.join(sourcePath, 'definitions', 'fr');
const outputDir = path.join(rootDir, '_dictionnaire');
const imagesOutputBase = path.join(rootDir, 'assets', 'img', 'dictionnaire');
const searchIndexPath = path.join(rootDir, 'assets', 'data', 'search-index.json');

// --- Verification du dossier source ---

if (!fs.existsSync(definitionsSourceDir)) {
  console.error(`ERREUR : le dossier source n'existe pas : ${definitionsSourceDir}`);
  console.error(`Verifiez le chemin avec --source PATH`);
  process.exit(1);
}

// --- Fonctions utilitaires ---

/**
 * Parse le YAML minimaliste du repo Dictionnaire.
 * Format connu : uuid, title, slug, category, english_term, french_term,
 * assets (liste de {filename}), cross_references (liste d'UUIDs), version.
 */
function parseMetadata(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const result = {};
  let currentKey = null;
  let currentList = null;

  for (const line of lines) {
    // Cle de niveau 0
    const keyMatch = line.match(/^([a-z_]+):\s*(.*)$/);
    if (keyMatch) {
      const key = keyMatch[1];
      const value = keyMatch[2].trim();

      if (value === '' || value === undefined) {
        // Debut d'une liste
        currentKey = key;
        currentList = [];
        result[key] = currentList;
      } else {
        // Valeur simple — retirer les guillemets
        result[key] = value.replace(/^"(.*)"$/, '$1');
        currentKey = null;
        currentList = null;
      }
      continue;
    }

    // Item de liste (indente avec 2 espaces + tiret)
    if (currentKey && currentList !== null) {
      const listMatch = line.match(/^\s{2}-\s+(.*)$/);
      if (listMatch) {
        const itemValue = listMatch[1].trim();

        if (currentKey === 'assets') {
          // Format: filename: "image-N.png"
          const filenameMatch = itemValue.match(/^filename:\s*"?([^"]+)"?$/);
          if (filenameMatch) {
            currentList.push({ filename: filenameMatch[1] });
          }
        } else {
          // cross_references ou autre liste de strings
          currentList.push(itemValue.replace(/^"(.*)"$/, '$1'));
        }
      }
    }
  }

  return result;
}

/**
 * Echappe les caracteres speciaux pour le front matter YAML.
 * Protege contre l'injection YAML (T-02-02).
 */
function escapeYaml(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Recrit les chemins d'images relatifs en chemins absolus Jekyll.
 * ./assets/image-N.png -> /assets/img/dictionnaire/{slug}/image-N.png
 */
function rewriteImagePaths(content, slug) {
  return content.replace(
    /!\[([^\]]*)\]\(\.\/assets\/([^)]+)\)/g,
    `![$1](/assets/img/dictionnaire/${slug}/$2)`
  );
}

/**
 * Genere le front matter YAML pour une definition.
 * Toutes les valeurs string sont entre guillemets doubles avec echappement.
 */
function generateFrontMatter(def) {
  let fm = '---\n';
  fm += `title: "${escapeYaml(def.title)}"\n`;
  fm += `slug: "${escapeYaml(def.slug)}"\n`;
  fm += `permalink: /dictionnaire/${def.slug}/\n`;
  fm += `category: "${escapeYaml(def.category)}"\n`;
  fm += `letter: "${def.slug[0].toUpperCase()}"\n`;
  fm += `layout: definition\n`;

  if (def.english_term) {
    fm += `english_term: "${escapeYaml(def.english_term)}"\n`;
  }
  if (def.french_term) {
    fm += `french_term: "${escapeYaml(def.french_term)}"\n`;
  }

  if (def.resolvedRefs && def.resolvedRefs.length > 0) {
    fm += `cross_references:\n`;
    for (const ref of def.resolvedRefs) {
      fm += `  - title: "${escapeYaml(ref.title)}"\n`;
      fm += `    slug: "${escapeYaml(ref.slug)}"\n`;
    }
  }

  fm += '---';
  return fm;
}

// --- Algorithme principal ---

console.log('=== Sync Dictionnaire ===');
console.log(`Source : ${definitionsSourceDir}`);
console.log(`Destination : ${outputDir}`);
if (dryRun) console.log('MODE DRY RUN — aucun fichier ne sera ecrit');
console.log('');

// Passe 1 : construire la map UUID et collecter les definitions
const uuidMap = new Map();
const definitions = [];
let imageCount = 0;
let unresolvedCount = 0;

const letters = fs.readdirSync(definitionsSourceDir).filter(entry => {
  const fullPath = path.join(definitionsSourceDir, entry);
  return fs.statSync(fullPath).isDirectory() && /^[a-z]$/.test(entry);
}).sort();

for (const letter of letters) {
  const letterDir = path.join(definitionsSourceDir, letter);
  const slugDirs = fs.readdirSync(letterDir).filter(entry => {
    return fs.statSync(path.join(letterDir, entry)).isDirectory();
  }).sort();

  for (const slug of slugDirs) {
    const defDir = path.join(letterDir, slug);
    const metadataPath = path.join(defDir, 'metadata.yaml');

    if (!fs.existsSync(metadataPath)) {
      console.warn(`WARN : metadata.yaml manquant pour ${letter}/${slug}, ignore`);
      continue;
    }

    try {
      const metaContent = fs.readFileSync(metadataPath, 'utf8');
      const meta = parseMetadata(metaContent);
      meta._sourceDir = defDir;
      meta._letter = letter;

      if (meta.uuid) {
        uuidMap.set(meta.uuid, { slug: meta.slug, title: meta.title });
      }

      definitions.push(meta);
    } catch (err) {
      console.warn(`WARN : erreur lecture ${metadataPath} : ${err.message}`);
    }
  }
}

console.log(`Passe 1 : ${definitions.length} definitions trouvees, ${uuidMap.size} UUIDs indexes`);

// Passe 2 : resoudre les cross-references
for (const def of definitions) {
  def.resolvedRefs = [];
  if (def.cross_references && Array.isArray(def.cross_references)) {
    for (const uuid of def.cross_references) {
      const resolved = uuidMap.get(uuid);
      if (resolved) {
        def.resolvedRefs.push(resolved);
      } else {
        console.warn(`WARN : UUID non resolu ${uuid} dans ${def.slug}`);
        unresolvedCount++;
      }
    }
  }
}

console.log(`Passe 2 : cross-references resolues (${unresolvedCount} non resolues)`);

if (dryRun) {
  console.log('');
  console.log('=== DRY RUN — aucun fichier ecrit ===');
  console.log(`Definitions : ${definitions.length}`);
  console.log(`UUIDs non resolus : ${unresolvedCount}`);
  process.exit(0);
}

// Passe 3 : generer les fichiers
// Nettoyage du dossier _dictionnaire/
if (fs.existsSync(outputDir)) {
  const existingFiles = fs.readdirSync(outputDir);
  for (const file of existingFiles) {
    const filePath = path.join(outputDir, file);
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    }
  }
} else {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const def of definitions) {
  // Lire definition.md
  const defMdPath = path.join(def._sourceDir, 'definition.md');
  let content = '';
  if (fs.existsSync(defMdPath)) {
    content = fs.readFileSync(defMdPath, 'utf8').replace(/\r\n/g, '\n');
  } else {
    console.warn(`WARN : definition.md manquant pour ${def.slug}`);
  }

  // Recrire les chemins d'images
  content = rewriteImagePaths(content, def.slug);

  // Generer le front matter
  const frontMatter = generateFrontMatter(def);

  // Ecrire le fichier
  const outputFile = path.join(outputDir, `${def.slug}.md`);
  const fileContent = frontMatter + '\n\n' + content;
  fs.writeFileSync(outputFile, fileContent.replace(/\r\n/g, '\n'), 'utf8');

  // Copier les images si la definition en a
  if (def.assets && Array.isArray(def.assets) && def.assets.length > 0) {
    const imageDestDir = path.join(imagesOutputBase, def.slug);
    fs.mkdirSync(imageDestDir, { recursive: true });

    for (const asset of def.assets) {
      const srcImage = path.join(def._sourceDir, 'assets', asset.filename);
      const destImage = path.join(imageDestDir, asset.filename);

      if (fs.existsSync(srcImage)) {
        fs.copyFileSync(srcImage, destImage);
        imageCount++;
      } else {
        console.warn(`WARN : image manquante ${srcImage}`);
      }
    }
  }
}

console.log(`Passe 3 : ${definitions.length} fichiers MD generes, ${imageCount} images copiees`);

// Passe 4 : generer l'index de recherche
const searchIndex = definitions.map(def => ({
  title: def.title,
  slug: def.slug,
  category: def.category,
  letter: def.slug[0].toUpperCase()
})).sort((a, b) => a.title.localeCompare(b.title, 'fr'));

const dataDir = path.dirname(searchIndexPath);
fs.mkdirSync(dataDir, { recursive: true });

const indexJson = JSON.stringify(searchIndex, null, 2).replace(/\r\n/g, '\n');
fs.writeFileSync(searchIndexPath, indexJson + '\n', 'utf8');

const indexSizeKB = (Buffer.byteLength(indexJson, 'utf8') / 1024).toFixed(1);
console.log(`Passe 4 : search-index.json genere (${searchIndex.length} entrees, ${indexSizeKB} KB)`);

// Stats finales
console.log('');
console.log('=== Sync termine ===');
console.log(`Definitions : ${definitions.length}`);
console.log(`Images copiees : ${imageCount}`);
console.log(`Cross-references non resolues : ${unresolvedCount}`);
console.log(`Index de recherche : ${searchIndex.length} entrees (${indexSizeKB} KB)`);
