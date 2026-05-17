/**
 * test-pass9-helpers.js
 *
 * Tests unitaires pour stripMarkdownForExtract() et computeMetaDescription()
 * implementees dans sync-dictionnaire.js (Pass 9, D-02).
 *
 * Couvre Test 1-6 du plan 16-01 Task 1 <behavior>.
 * Zero dependency. Exit 0 si tous les tests passent, 1 sinon.
 *
 * NOTE : ce script importe les helpers depuis sync-dictionnaire.js. Comme
 * sync-dictionnaire.js est un script top-level executable, les helpers ne
 * sont pas exposes via module.exports. On utilise donc une evaluation par
 * extraction de source -- approche minimale qui evite d'introduire un
 * pattern d'export juste pour les tests (Pitfall T-05 : pas de refonte
 * structurelle non demandee).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const syncPath = path.join(__dirname, 'sync-dictionnaire.js');
const syncSrc = fs.readFileSync(syncPath, 'utf8');

// Extraire les deux fonctions par leur signature -- pattern stable car
// le plan impose leur position juste apres hasLatex() (ligne ~155).
function extractFn(src, name) {
  const re = new RegExp(`function ${name}\\s*\\([^)]*\\)\\s*\\{`);
  const m = re.exec(src);
  if (!m) return null;
  // Trouver la fermeture de l'accolade en comptant les depths
  let depth = 0;
  let i = m.index;
  let start = -1;
  while (i < src.length) {
    if (src[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (src[i] === '}') {
      depth--;
      if (depth === 0) {
        return src.substring(m.index, i + 1);
      }
    }
    i++;
  }
  return null;
}

const stripSrc = extractFn(syncSrc, 'stripMarkdownForExtract');
const computeSrc = extractFn(syncSrc, 'computeMetaDescription');

if (!stripSrc || !computeSrc) {
  console.error('FAIL : impossible d\'extraire stripMarkdownForExtract ou computeMetaDescription depuis sync-dictionnaire.js');
  console.error(`  stripMarkdownForExtract: ${stripSrc ? 'OK' : 'MANQUANT'}`);
  console.error(`  computeMetaDescription:  ${computeSrc ? 'OK' : 'MANQUANT'}`);
  process.exit(1);
}

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(stripSrc + '\n' + computeSrc, sandbox);
const { stripMarkdownForExtract, computeMetaDescription } = sandbox;

let passed = 0;
let failed = 0;
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}

// --- Test 1 (positive) ---
test('Test 1 : UTXO body retourne string [70,155] sans markdown brut', () => {
  const body = 'Sigle de **Unspent Transaction Output**. Un UTXO est une sortie de transaction non depensee du protocole Bitcoin. Chaque UTXO peut etre consomme une seule fois.';
  const out = computeMetaDescription(body);
  assert(typeof out === 'string', 'doit retourner une string');
  assert(out.length >= 70 && out.length <= 155, `len=${out.length} hors [70,155] : "${out}"`);
  assert(!out.includes('**'), 'ne doit pas contenir **');
  assert(out.startsWith('Sigle de Unspent Transaction Output'), `doit commencer par "Sigle de Unspent Transaction Output" : "${out}"`);
});

// --- Test 2 (LaTeX strip T-04) ---
test('Test 2 : LaTeX $$..$$ et $..$ strippe avant split de phrase', () => {
  const body = '$$K = P + M$$ Cette formule decrit l\'addition de points sur courbe elliptique utilisee par Bitcoin pour deriver les cles publiques.';
  const out = computeMetaDescription(body);
  assert(typeof out === 'string', 'doit retourner une string');
  assert(out.length >= 70 && out.length <= 155, `len=${out.length} hors [70,155]`);
  assert(!out.includes('$'), `ne doit contenir aucun $ : "${out}"`);
});

// --- Test 3 (truncation) ---
test('Test 3 : body 500 chars retourne string <=155 chars terminee par ...', () => {
  const body = 'Le Bitcoin est une monnaie numerique decentralisee. ' + 'Cette phrase tres tres longue continue avec beaucoup beaucoup beaucoup de mots pour depasser largement la limite de 155 caracteres sans aucun point intermediaire afin de forcer la troncation au dernier espace avant 152 caracteres ce qui necessite une troncation propre par l algorithme implemente.';
  const out = computeMetaDescription(body);
  assert(typeof out === 'string', 'doit retourner une string');
  assert(out.length <= 155, `len=${out.length} > 155`);
  assert(out.endsWith('...'), `doit terminer par ... : "${out}"`);
});

// --- Test 4 (concatenation) ---
test('Test 4 : premiere phrase courte concatenee avec la suivante', () => {
  // Premiere phrase 40 chars + deuxieme phrase qui amene au-dessus de 70
  const body = 'Bitcoin est une monnaie numerique libre. Elle a ete creee par Satoshi Nakamoto en 2008 pour offrir une alternative decentralisee.';
  const out = computeMetaDescription(body);
  assert(typeof out === 'string', 'doit retourner une string');
  assert(out.length >= 70 && out.length <= 155, `len=${out.length} hors [70,155] : "${out}"`);
  assert(out.includes('Bitcoin est une monnaie'), 'doit inclure premiere phrase');
  assert(out.includes('Satoshi') || out.includes('alternative'), `doit inclure du contenu de la 2eme phrase : "${out}"`);
});

// --- Test 5 (edge case omit) ---
test('Test 5 : body vide retourne null (jamais fallback fabrique)', () => {
  assert(computeMetaDescription('') === null, 'body vide -> null');
  assert(computeMetaDescription(null) === null, 'body null -> null');
  assert(computeMetaDescription(undefined) === null, 'body undefined -> null');
});

// --- Test 6 (markdown strip) ---
test('Test 6 : markdown brut [], (), *, `, ![]() strippes', () => {
  const body = '[texte](url) avec *italic* et **bold** et `code` et ![img](path) -- la phrase utile doit etre ici, suffisamment longue pour la fenetre de description meta.';
  const out = computeMetaDescription(body);
  assert(typeof out === 'string', 'doit retourner une string');
  assert(!out.includes('**'), `ne doit pas contenir ** : "${out}"`);
  // Note : les () peuvent rester en cas de texte content type "(quelque chose)" -- on verifie l'absence de pattern markdown
  assert(!/\[[^\]]+\]\(/.test(out), `ne doit pas contenir [..]( : "${out}"`);
  assert(!/!\[/.test(out), `ne doit pas contenir ![ : "${out}"`);
  assert(!/`[^`]+`/.test(out), `ne doit pas contenir backticks : "${out}"`);
});

// --- Test 7 (bonus : LaTeX inline mixte) ---
test('Test 7 (bonus) : LaTeX inline $...$ mixte avec texte', () => {
  const body = 'Soit $x = 1$ la valeur de reference. Le protocole Bitcoin utilise cette notation pour exprimer des grandeurs cryptographiques precises.';
  const out = computeMetaDescription(body);
  if (out === null) return; // tolere si corpus est juste insuffisant apres strip
  assert(!out.includes('$'), `ne doit contenir aucun $ : "${out}"`);
});

// --- Test 8 (bonus : pas de double ponctuation avant '...') ---
test('Test 8 (bonus) : troncation evite la double-ponctuation avant ...', () => {
  const body = 'Une phrase qui contient des points intermediaires et qui se termine par. Une autre phrase tres longue, avec virgules et points-virgules; sans ponctuation finale lourde, juste continue avec des mots et des mots et encore des mots pour forcer la troncation.';
  const out = computeMetaDescription(body);
  if (typeof out !== 'string') return;
  // Si tronque, ne doit pas avoir patterns type ".......", ",...", ";..."
  assert(!/[.,;:!?]\.\.\.$/.test(out), `pas de double ponctuation avant ... : "${out}"`);
});

// --- Test 9 (bonus : stripMarkdownForExtract direct) ---
test('Test 9 (bonus) : stripMarkdownForExtract retire les list markers et blockquotes', () => {
  const body = '> Citation introductive\n- premier item\n- deuxieme item\nTexte normal qui suit avec assez de contenu pour etre significatif.';
  const stripped = stripMarkdownForExtract(body);
  assert(!stripped.startsWith('>'), 'pas de >');
  assert(!stripped.match(/^- /m), 'pas de list markers ligne par ligne');
  assert(stripped.includes('Texte normal'), 'preserve le texte normal');
});

// === Execution ===
console.log('=== Tests Pass 9 helpers ===');
for (const t of tests) {
  try {
    t.fn();
    console.log(`PASS: ${t.name}`);
    passed++;
  } catch (err) {
    console.log(`FAIL: ${t.name}`);
    console.log(`      ${err.message}`);
    failed++;
  }
}

console.log('');
console.log(`=== ${passed}/${tests.length} tests PASSED ===`);
process.exit(failed > 0 ? 1 : 0);
