---
phase: 02-dictionary-data-pipeline
plan: 01
subsystem: dictionary-data-pipeline
tags: [jekyll, dictionary, sync-script, data-pipeline, search-index]
dependency_graph:
  requires: []
  provides: [_dictionnaire/*.md, assets/data/search-index.json, assets/img/dictionnaire/*, _layouts/definition.html]
  affects: [_config.yml]
tech_stack:
  added: [node-script-zero-dep]
  patterns: [4-pass-pipeline, uuid-cross-ref-resolution, yaml-escape-injection-prevention]
key_files:
  created:
    - _scripts/sync-dictionnaire.js
    - _layouts/definition.html
    - _dictionnaire/ (1408 files)
    - assets/data/search-index.json
    - assets/img/dictionnaire/ (54 images)
  modified:
    - _config.yml
decisions:
  - Generated dictionary files committed to repo (GitHub Pages requires them, no custom build step available)
metrics:
  duration: 141s
  completed: "2026-04-05T16:51:48Z"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 02 Plan 01: Dictionary Data Pipeline Summary

Zero-dependency Node.js sync script generating 1408 Jekyll definition pages with resolved UUID cross-references, 54 copied images with rewritten paths, and a 155KB search index JSON.

## Task Results

| Task | Name | Commit | Status |
|------|------|--------|--------|
| 1 | Configure Jekyll dictionary collection and definition layout | 5fab87b | Done |
| 2 | Create sync script with cross-ref resolution, image copy, and JSON index | 144ffe4, bf0a741 | Done |

## Key Artifacts

### _scripts/sync-dictionnaire.js (313 lines)
- 4-pass algorithm: UUID map build, cross-ref resolution, file generation, search index
- Parses minimal YAML format specific to Dictionnaire repo (not a generic YAML parser)
- YAML value escaping via `escapeYaml()` prevents injection (threat T-02-02)
- Image path rewriting: `./assets/image-N.png` to `/assets/img/dictionnaire/{slug}/image-N.png`
- CLI args: `--source PATH` (default `../Dictionnaire`), `--dry-run`
- Line ending normalization: all output uses `\n` only

### _config.yml
- Added `collections.dictionnaire` with `output: true` and `permalink: /dictionnaire/:slug/`
- Merged `defaults` block with dictionary-specific `layout: definition` scope

### _layouts/definition.html
- Inherits from `default` layout
- Renders title, category, english_term, content, and cross-references as clickable links
- Will be enriched in Phase 3 with navigation and styles

### Generated Output (verified)
- 1408 `.md` files in `_dictionnaire/` with valid YAML front matter
- 54 PNG images in `assets/img/dictionnaire/`
- `assets/data/search-index.json`: 1408 entries, 155.4 KB, sorted by title (French locale)
- 0 unresolved cross-references

## Verification Results

| Check | Expected | Actual |
|-------|----------|--------|
| Definition files count | 1408 | 1408 |
| Image files count | 54 | 54 |
| Search index entries | 1408 | 1408 |
| Unresolved cross-refs | 0 | 0 |
| Front matter valid (acinq.md) | title, slug, permalink, category, letter, layout | All present |
| Cross-refs resolved (acinq.md) | title/slug objects | Confirmed (LIGHTNING NETWORK, PHOENIX) |
| Image paths rewritten (adresse-de-reception.md) | /assets/img/dictionnaire/ | Confirmed |
| Jekyll collection configured | dictionnaire with output: true | Confirmed |

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all data is fully wired from the Dictionnaire source repo.

## Notes

- 1 warning during execution: `image-1.png` missing for `bip` definition in source repo (pre-existing issue in Dictionnaire repo, not a script bug). The script correctly warns and continues. The image metadata declares 55 assets across 53 definitions, but only 54 physical files exist.

## Self-Check: PASSED

All files exist, all commits verified, all counts match expected values.
