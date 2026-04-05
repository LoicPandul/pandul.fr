---
phase: 01-design-foundation-book-launch-page
plan: 02
subsystem: ui
tags: [html, markdown, css, book-promo]

requires:
  - phase: 01-01
    provides: CSS design system with book-promo, btn-primary, btn-secondary classes
provides:
  - Book promotion section on dictionary page with cover image and purchase links
  - Clean content pages without inline styles
affects: [dictionnaire, homepage, about]

tech-stack:
  added: []
  patterns: [CSS class-based styling instead of inline styles]

key-files:
  created: []
  modified:
    - dictionnaire.md
    - index.md
    - apropos.md
    - assets/css/style.css

key-decisions:
  - "Amazon links use amazon.fr domain with ASINs B0GV1N6S1W (broche) and B0GV1X52YD (relie)"
  - "Bitcoin Bazar URL is placeholder (bitcoinbazar.fr)"
  - "Book promo uses eager loading for cover image (above the fold)"
  - "All inline styles moved to CSS classes (avatar, pbn-thumb)"

patterns-established:
  - "Content pages use CSS classes exclusively, no inline styles"

requirements-completed: [BOOK-01, BOOK-02, BOOK-03]

duration: 3min
completed: 2026-04-05
---

# Plan 02: Book Promo & Content Cleanup Summary

**Dictionary page now displays book promotion with cover image, Amazon purchase links (broche + relie), and Bitcoin Bazar link; all content pages cleaned of inline styles.**

## What Was Built

1. **Book promo section on dictionnaire.md** — Complete rewrite with `<section class="book-promo">` containing cover image (eager loading), two Amazon CTA buttons (broche B0GV1N6S1W, relie B0GV1X52YD), and Bitcoin Bazar secondary CTA. Old content (846 definitions, PDF download, contribution steps) replaced with concise 1408-definition description.

2. **Inline style cleanup** — Removed `<style>` block and 6 inline `style=""` attributes from index.md (moved to `.pbn-thumb` CSS classes). Removed inline styles from apropos.md avatar image (uses `.avatar .avatar--center` CSS classes).

## Deviations

None. All tasks executed as planned.

## Self-Check: PASSED

- [x] dictionnaire.md contains book-promo section with all required elements
- [x] Amazon ASINs B0GV1N6S1W and B0GV1X52YD present
- [x] bitcoinbazar.fr link present
- [x] No inline styles in dictionnaire.md, apropos.md, or index.md
- [x] CSS classes added to style.css (avatar, avatar--center, pbn-thumb)
- [x] All links have target="_blank" rel="noopener"
