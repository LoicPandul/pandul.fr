---
phase: 01-design-foundation-book-launch-page
plan: 02
subsystem: design-system
tags: [typography, mobile, responsive, buttons, hamburger-menu]
dependency_graph:
  requires: [01-01]
  provides: [refined-design-system, mobile-hamburger, inter-font]
  affects: [assets/css/style.css, assets/js/main.js, _layouts/default.html, assets/fonts/]
tech_stack:
  added: [Inter variable font]
  removed: [Source Serif 4 variable font]
  patterns: [hamburger-menu, filled-buttons, mobile-first-responsive, css-filter-hover, 2col-mobile-footer]
key_files:
  created:
    - assets/fonts/Inter-Variable.ttf
  modified:
    - assets/css/style.css
    - assets/js/main.js
    - _layouts/default.html
  deleted:
    - assets/fonts/SourceSerif4-Variable.ttf
decisions:
  - "Inter chosen over DM Sans / Plus Jakarta Sans for body text -- best pairing with Outfit, proven readability, widely supported"
  - "Brand-name weight reduced from 700 to 500 for subtler appearance"
  - "Nav links increased from 400 to 500 for better visibility"
  - "Header hover uses accent color only (no background box), matching footer style"
  - "Round 1: Orange buttons use outlined/ghost pattern -- reversed in round 2 to filled static"
  - "Hamburger menu uses CSS-only animation (3 bars to X) with minimal JS toggle"
  - "Round 1: Mobile footer uses vertical nav -- replaced in round 2 with compact 2-column layout"
  - "Round 2: Buttons inverted to filled static + outlined hover (orange bg + white text, black bg + white text)"
  - "Round 2: Removed prose max-width so content aligns with header width"
  - "Round 2: CSS filter used for SVG icon hover orange effect (img tags cannot use currentColor)"
  - "Round 2: Mobile footer 2-column layout (brand left, nav right) for compact vertical space"
metrics:
  duration: 4m
  completed: 2026-04-05T15:37:12Z
  tasks_completed: 4
  tasks_total: 4
requirements_completed: [UI-04, BOOK-01, BOOK-02, BOOK-03]
---

# Phase 01 Plan 02: Design Refinement from User Feedback Summary

Inter sans-serif body font paired with Outfit headings, hamburger mobile menu, refined typography weights, filled buttons with outlined hover, compact 2-column mobile footer, and orange hover on social icons.

## What Was Done

### Task 1 (already complete): Content pages cleanup + book promo verification
No changes needed -- content pages were already correct from Plan 01-01 execution.

### Task 2: Replace body font (Source Serif 4 -> Inter)
- Removed serif font Source Serif 4 per user feedback (no serifs wanted)
- Downloaded and added Inter variable font (879KB, weights 100-900)
- Updated CSS @font-face declaration and --font-body variable
- Inter pairs naturally with Outfit: both geometric, but Inter is neutral for body while Outfit is distinctive for headings
- **Commit:** `4c3fb2e`

### Task 3: Typography weights and hover style adjustments
- Reduced .brand-name font-weight from 700 to 500 in both header and footer
- Increased .site-nav and .footer-nav link font-weight from 400 to 500
- Removed background hover effect on header nav links (was rgba white box)
- Header hover now uses accent color only, matching footer hover style
- **Commit:** `7784600`

### Task 4: Orange button outlined/ghost style
- btn-primary default: white background, orange text, orange border
- btn-primary hover: orange background, white text (filled)
- btn-secondary (black "Acheter sur Bitcoin Bazar") left unchanged per user approval
- **Commit:** `9ff3dd5`

### Task 5: Mobile hamburger menu + improved footer
- Added hamburger button (3 bars) to header HTML, hidden on desktop via CSS
- Mobile nav hidden by default, toggles open/closed on hamburger tap
- Hamburger animates to X icon when menu is open (CSS transforms)
- Nav links close menu on click for smooth navigation
- Mobile footer redesigned: vertical nav with pill-shaped hover, larger brand, better spacing
- Removed legacy small-screen nav overrides that conflicted with hamburger
- **Commit:** `04c9dda`

## Round 2: User Feedback Fixes

### Fix 1: Content width alignment
- Removed `max-width: var(--prose)` constraint on `.site-main p, li, blockquote, dd, dt`
- Main content now fills the full `--wrap` width (1100px), aligning with the header edges
- **Commit:** `b02df7d`

### Fix 2: Mobile header social icons side by side
- Wrapped X and GitHub icon links in a `<span class="nav-social-row">` container in HTML
- Styled as horizontal flex row with `gap: 24px` on mobile
- Icons slightly larger at 22px (was 18px)
- **Commit:** `b02df7d`

### Fix 3: Compact mobile footer (2-column layout)
- Changed mobile footer from centered single-column to 2-column grid
- Left column: brand (logo + name, horizontal)
- Right column: nav links (right-aligned)
- Footer info spans full width below, separated by subtle border
- Reduced all vertical spacing for compact feel
- **Commit:** `b02df7d`

### Fix 4: Mobile footer social icons larger
- Increased `.bottom-social .icon img` to 24px on mobile (was 20px)
- **Commit:** `b02df7d`

### Fix 5: Desktop social icon hover (orange)
- Applied CSS filter on hover to turn SVG icons orange in both header and footer
- Filter: `invert(42%) sepia(93%) saturate(1700%) hue-rotate(8deg) brightness(90%) contrast(95%)`
- Added `transition: filter 0.15s ease` for smooth effect
- **Commit:** `b02df7d`

### Fix 6: Button style inversion
- btn-primary (orange): now filled by default (orange bg, white text), outlined on hover (white bg, orange text, orange border)
- btn-secondary (black): now filled by default (black bg, white text, black border), outlined on hover (white bg, black text, black border)
- Black button border uses `var(--fg, #000000)` -- true black, not gray
- **Commit:** `b02df7d`

## Commits

| Commit | Type | Description |
|--------|------|-------------|
| `4c3fb2e` | feat | Replace Source Serif 4 with Inter for body text |
| `7784600` | fix | Adjust header/footer typography weights and hover style |
| `9ff3dd5` | fix | Orange buttons use outlined/ghost style |
| `04c9dda` | feat | Mobile hamburger menu and improved mobile footer |
| `b02df7d` | fix | Round 2: content width, mobile icons, compact footer, button inversion, hover effects |

## Files Changed

| File | Action | Purpose |
|------|--------|---------|
| `assets/fonts/Inter-Variable.ttf` | created | Inter variable font for body text |
| `assets/fonts/SourceSerif4-Variable.ttf` | deleted | Removed serif font |
| `assets/css/style.css` | modified | Font swap, weight adjustments, hover fix, button style, hamburger CSS, mobile footer |
| `assets/js/main.js` | modified | Hamburger menu toggle logic |
| `_layouts/default.html` | modified | Hamburger button element added to header |

## Deviations from Plan

None -- all changes were direct responses to user feedback from the visual checkpoint. The plan's Task 2 (human-verify checkpoint) was replaced by this feedback-driven iteration.

## Decisions Made

1. **Inter over other candidates:** Inter chosen over DM Sans, Plus Jakarta Sans, and General Sans because it has the most proven track record for body text, excellent variable font support, and pairs cleanly with Outfit's geometric personality without competing.

2. **Weight 500 as middle ground:** Brand name at 500 (vs 700) is noticeable but not thin. Nav links at 500 (vs 400) are clearly readable without being bold.

3. **Color-only hover for header:** Removing the background box hover aligns header and footer interaction patterns, creating consistency.

4. **Outlined button pattern:** White bg with colored border is a common modern pattern that gives visual hierarchy (black filled button = primary action, orange outlined = secondary actions).

## Known Stubs

None -- all features are fully wired and functional.

## Self-Check: PASSED

- [x] assets/fonts/Inter-Variable.ttf exists
- [x] assets/fonts/SourceSerif4-Variable.ttf deleted
- [x] assets/css/style.css contains Inter font
- [x] assets/css/style.css contains font-weight: 500 (brand + nav)
- [x] assets/css/style.css contains hamburger CSS (.nav-toggle)
- [x] assets/js/main.js contains hamburger toggle logic
- [x] _layouts/default.html contains hamburger button element
- [x] Commits 4c3fb2e, 7784600, 9ff3dd5, 04c9dda all verified
- [x] Round 2: no max-width prose constraint on .site-main content
- [x] Round 2: .nav-social-row wrapper in HTML for horizontal mobile icons
- [x] Round 2: mobile footer 2-column grid (1fr 1fr)
- [x] Round 2: .bottom-social .icon img height 24px on mobile
- [x] Round 2: CSS filter hover on social icons (header + footer)
- [x] Round 2: btn-primary filled orange, btn-secondary filled black
- [x] Round 2: btn-secondary border-color uses var(--fg) (true black)
- [x] Round 2: Commit b02df7d verified
