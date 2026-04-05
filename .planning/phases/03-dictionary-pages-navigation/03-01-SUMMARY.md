---
phase: 03-dictionary-pages-navigation
plan: 01
subsystem: dictionary-navigation
tags: [sync-script, jekyll-collections, category-pages, letter-pages, prev-next-navigation]
dependency_graph:
  requires: [02-01]
  provides: [category-pages, letter-pages, prev-next-data, category-slug-field]
  affects: [03-02, 03-03, 03-04]
tech_stack:
  added: []
  patterns: [multi-pass-sync, slugify-normalization, jekyll-collection-generation]
key_files:
  created:
    - _layouts/category.html
    - _layouts/letter.html
  modified:
    - _scripts/sync-dictionnaire.js
    - _config.yml
decisions:
  - "Reuse slugify() for all slug generation ensuring consistency (T-03-01)"
  - "Re-generate definition files in pass 5 after enriching with prev/next data"
  - "Generate all 26 letter pages even when definition_count is 0"
metrics:
  duration: 182s
  completed: "2026-04-05T18:18:28Z"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 03 Plan 01: Category/Letter Pages and Prev/Next Navigation Summary

Extended sync script with 3 new passes (5-7) to generate 19 category pages, 26 letter pages, and enrich all 1408 definitions with category_slug and prev/next navigation data. Created Jekyll layouts for category and letter index pages with breadcrumbs, A-Z bar, and category badges.

## Tasks Completed

### Task 1: Extend sync script with category/letter page generation and prev/next computation
- **Commit:** 6b89b5c
- **Files:** `_scripts/sync-dictionnaire.js`
- Added `slugify()` function with NFD normalization and strict alphanumeric filter (T-03-01)
- Pass 5: groups definitions by category, sorts alphabetically within each, computes prev/next links, adds `category_slug` to front matter, re-generates all 1408 definition files
- Pass 6: generates 19 category pages in `_categorie/` with `definition_count` and `letters_with_definitions` array
- Pass 7: generates 26 letter pages in `_lettre/` (all A-Z including empty letters with count 0)
- All string values passed through existing `escapeYaml()` (T-03-02)

### Task 2: Configure Jekyll collections and create category + letter layouts
- **Commit:** 1f5794b
- **Files:** `_config.yml`, `_layouts/category.html`, `_layouts/letter.html`
- Added `categorie` and `lettre` collections to `_config.yml` with permalink patterns
- Added default layout assignments for both new collections
- `_layouts/category.html`: breadcrumbs with aria-label, A-Z anchor nav (disabled letters grayed out via `letters_with_definitions`), definitions grouped by first letter with heading anchors
- `_layouts/letter.html`: breadcrumbs, definition list with category badge links, empty state message for letters with 0 definitions
- Jekyll build succeeds in ~26s, producing 19 category pages at `/dictionnaire/categorie/{slug}/` and 26 letter pages at `/dictionnaire/lettre/{x}/`

## Verification Results

| Check | Result |
|-------|--------|
| `node _scripts/sync-dictionnaire.js` runs without errors | PASS |
| `ls _categorie/ \| wc -l` returns 19 | PASS (19) |
| `ls _lettre/ \| wc -l` returns 26 | PASS (26) |
| `_dictionnaire/acinq.md` contains category_slug and next_in_category | PASS |
| `jekyll build` succeeds | PASS (26.3s) |
| `ls _site/dictionnaire/categorie/ \| wc -l` returns 19 | PASS (19) |
| `ls _site/dictionnaire/lettre/ \| wc -l` returns 26 | PASS (26) |

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None. All data is wired through the sync script and Jekyll collections.

## Self-Check: PASSED
