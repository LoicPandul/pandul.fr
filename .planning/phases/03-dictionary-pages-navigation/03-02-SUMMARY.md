---
phase: 03-dictionary-pages-navigation
plan: 02
subsystem: definition-pages
tags: [definition-layout, breadcrumbs, cross-references, lightbox, book-cta, prev-next-nav]
dependency_graph:
  requires: [03-01]
  provides: [enriched-definition-layout, definition-css, lightbox-js]
  affects: [03-03, 03-04]
tech_stack:
  added: []
  patterns: [lightbox-modal, pill-navigation, breadcrumb-nav, focus-management]
key_files:
  created: []
  modified:
    - _layouts/definition.html
    - assets/css/style.css
    - assets/js/main.js
decisions:
  - "Search bar placed above breadcrumbs on definition pages for consistent access"
  - "Cross-references rendered as pills instead of bullet list for better UX"
  - "Lightbox uses innerHTML for trusted sync-script content (no user input vector)"
metrics:
  duration: 136s
  completed: "2026-04-05T18:43:23Z"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 03 Plan 02: Definition Page Enrichment Summary

Enriched definition layout with 7 sections (search bar, breadcrumbs, category badge with English term, content, cross-reference pills, prev/next navigation, book CTA) plus lightbox JS for image zoom with keyboard support and focus management.

## Tasks Completed

### Task 1: Rewrite definition layout with all enrichments
- **Commit:** 5f555bd
- **Files:** `_layouts/definition.html`
- Replaced minimal definition layout with full enriched version
- Added search bar with combobox ARIA role at top
- Added breadcrumbs (Dictionnaire > Category > Term) with aria-label="Fil d'Ariane"
- Added category badge linking to category page via page.category_slug
- Added English term display (conditional on page.english_term)
- Replaced cross-reference bullet list with pill-style links in a "Voir aussi" section
- Added prev/next navigation within same category with aria-labels
- Added book CTA with Bitcoin Bazar, Amazon purchase links and GitHub contribute button

### Task 2: Add CSS for definition page components + lightbox JS
- **Commit:** 1bfb450
- **Files:** `assets/css/style.css`, `assets/js/main.js`
- Added `--surface: #F5F5F5` CSS variable to `:root` block
- Added breadcrumbs styles with `>` separator and muted colors
- Added category badge with uppercase, surface background, hover transition
- Added definition meta flex layout for badge + English term
- Added cross-ref pills with rounded borders, hover inversion (fg/bg swap)
- Added prev/next nav with border-top separator and accent hover
- Added book CTA with border, heading, buttons, and contribute section
- Added `.btn-sm` variant (8px 16px padding, 14px font, 36px min-height)
- Added mobile responsive rules: CTA buttons stack, nav stacks at 719px
- Added lightbox overlay with fade transition, z-index 2000, 85% dark backdrop
- Added lightbox close button and responsive image sizing
- Added lightbox JS: click-to-open on definition images, Escape/click-to-close, focus restore

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED
