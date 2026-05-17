/**
 * test-pass9-distribution.js
 *
 * Stat informationnelle (NON-test) post-sync : mesure la distribution
 * des longueurs de description dans _dictionnaire/*.md et liste les slugs
 * omis. Utilise pour le SUMMARY.md du plan 16-01.
 *
 * Zero dependency. Exit 0 toujours (informationnel, sauf si depasse 0 dans [70,155]).
 */

const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', '_dictionnaire');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const lengths = [];
const omittedList = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Match `description: "..."` permitting escaped quotes
  const m = content.match(/^description:\s*"((?:[^"\\]|\\.)*)"$/m);
  if (!m) {
    omittedList.push(f.replace(/\.md$/, ''));
    continue;
  }
  const unescaped = m[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  lengths.push(unescaped.length);
}

lengths.sort((a, b) => a - b);

function pct(arr, p) {
  if (arr.length === 0) return null;
  const idx = Math.min(arr.length - 1, Math.floor(arr.length * p));
  return arr[idx];
}

const outOfRange = lengths.filter(l => l < 70 || l > 155).length;

console.log(JSON.stringify({
  total_files: files.length,
  with_description: lengths.length,
  omitted: omittedList.length,
  omitted_slugs: omittedList,
  length_distribution: {
    min: lengths[0] || null,
    p25: pct(lengths, 0.25),
    median: pct(lengths, 0.5),
    p75: pct(lengths, 0.75),
    max: lengths[lengths.length - 1] || null
  },
  out_of_range_70_155: outOfRange
}, null, 2));

process.exit(outOfRange > 0 ? 1 : 0);
