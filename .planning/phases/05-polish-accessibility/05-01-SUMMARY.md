---
phase: 05-polish-accessibility
plan: 01
title: "Conditional KaTeX, Accessibility Markup & Font Cleanup"
subsystem: layouts, definitions, fonts
tags: [performance, accessibility, cleanup]
dependency_graph:
  requires: []
  provides: [conditional-katex, skip-to-content, aria-labels, math-flags]
  affects: [_layouts/default.html, _layouts/definition.html, _layouts/category.html, _layouts/letter.html, dictionnaire.md, 45 definition files, assets/fonts/archive]
tech_stack:
  added: []
  patterns: [liquid-conditional-loading, skip-to-content-wcag, aria-label-search]
key_files:
  created: []
  modified:
    - _layouts/default.html
    - _layouts/definition.html
    - _layouts/category.html
    - _layouts/letter.html
    - dictionnaire.md
    - 45 _dictionnaire/*.md files (math: true flag)
  deleted:
    - assets/fonts/archive/ (5 font files)
decisions:
  - "KaTeX wrapped in {% if page.math %} conditional to avoid 3 CDN requests on non-math pages"
  - "Skip-to-content link placed as first child of body before header"
  - "aria-label text uses unaccented French to match existing pattern in definition.html"
metrics:
  duration: "2min"
  completed: "2026-04-08"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 50
  files_deleted: 5
---

# Phase 05 Plan 01: Conditional KaTeX, Accessibility Markup & Font Cleanup Summary

Conditional KaTeX loading via Liquid page.math flag removes 3 CDN requests from ~1363 non-math pages; skip-to-content link and aria-labels added for WCAG keyboard navigation; 5 archived fonts deleted (~1MB).

## Tasks Completed

### Task 1: Conditional KaTeX, skip-to-content link, aria-labels, and math flags
**Commit:** 2b9c400

- Wrapped KaTeX CSS/JS block in `{% if page.math %}...{% endif %}` conditional in default.html
- Added `<a href="#main-content" class="skip-to-content">Aller au contenu principal</a>` as first element inside `<body>`
- Added `id="main-content"` to `<main>` element
- Added `aria-label="Rechercher une definition"` to search inputs in definition.html, category.html, letter.html, and dictionnaire.md
- Added `math: true` front matter flag to 45 definition files containing mathematical formulas

**Files modified:** 50 (5 layouts/pages + 45 definition files)

### Task 2: Delete archived fonts directory
**Commit:** 39f2761

- Verified style.css has zero references to archived fonts (Lora, Montserrat, old JetBrainsMono/Manrope copies)
- Deleted `assets/fonts/archive/` directory containing 5 unused font files
- Confirmed archive directory no longer exists

**Files deleted:** 5 (JetBrainsMono-Variable.ttf, Lora-Italic-Variable.ttf, Lora-Variable.ttf, Manrope-Variable.ttf, Montserrat-Variable.ttf)

## Deviations from Plan

None - plan executed exactly as written.

**Note:** The plan's acceptance criteria states `ls assets/fonts/` should show only Inter-Variable.ttf and Outfit-Variable.ttf, but the main fonts directory also contains JetBrainsMono-Variable.ttf and Manrope-Variable.ttf (pre-existing, not in the archive subdirectory). These are out of scope for this plan which only targets the archive/ subdirectory.

## Decisions Made

1. **KaTeX conditional pattern:** Used `{% if page.math %}` Liquid conditional as specified, keeping identical CDN URLs and delimiters configuration
2. **aria-label consistency:** Used unaccented "Rechercher une definition" to match existing pattern in definition.html (vs accented text in category.html/letter.html placeholders)
3. **Skip-to-content placement:** First child of `<body>`, before `<header>`, targeting `#main-content` on the `<main>` element

## Known Stubs

None.

## Verification Results

| Check | Result |
|-------|--------|
| `grep "if page.math" _layouts/default.html` | 1 match |
| `grep "skip-to-content" _layouts/default.html` | 1 match |
| `grep 'id="main-content"' _layouts/default.html` | 1 match |
| `grep -rl "math: true" _dictionnaire/ \| wc -l` | 45 |
| `test ! -d assets/fonts/archive` | PASS |
| aria-label on definition.html | Present |
| aria-label on category.html | Present |
| aria-label on letter.html | Present |
| aria-label on dictionnaire.md | Present |

## Self-Check: PASSED

All created/modified files verified on disk. All commit hashes found in git log. SUMMARY.md exists.
