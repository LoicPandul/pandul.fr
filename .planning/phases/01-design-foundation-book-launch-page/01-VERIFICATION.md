---
phase: 01-design-foundation-book-launch-page
verified: 2026-04-05T18:00:00Z
status: human_needed
score: 5/5 must-haves verified
re_verification:
  previous_status: human_needed
  previous_score: 8/8
  gaps_closed: []
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "Visual appearance at desktop (1440px) and mobile (375px)"
    expected: "White background, black text, orange accent (#D04819) on hover states. Header shows brand logo + Loïc Morel + Accueil, Dictionnaire, À propos + X/GitHub icons. Hamburger menu visible and functional at 375px. Footer shows black card with brand left / nav right on mobile, multi-column on desktop."
    why_human: "CSS rendering, font loading (Outfit headings + Inter body), and visual hierarchy cannot be verified by grep."
  - test: "Book promo layout on /dictionnaire/ at 1440px and 375px"
    expected: "Desktop: cover image left, book info right with two filled orange buttons (Amazon Broché, Amazon Relié) and one filled black button (Bitcoin Bazar). Mobile: image centered on top, info below, buttons stack vertically."
    why_human: "Flexbox responsive layout rendering and button appearance require browser verification."
  - test: "Click Amazon Broché link on /dictionnaire/"
    expected: "Opens https://www.amazon.fr/dp/B0GV1N6S1W in a new tab."
    why_human: "Link target behavior requires browser."
  - test: "Click Amazon Relié link on /dictionnaire/"
    expected: "Opens https://www.amazon.fr/dp/B0GV1X52YD in a new tab."
    why_human: "Link target behavior requires browser."
  - test: "Navigate to /blog/ after deletion"
    expected: "404 page displayed — blog is fully deleted."
    why_human: "HTTP response code and page rendering require browser."
  - test: "Avatar image on /a-propos/"
    expected: "Profile image displays centered with rounded corners. No layout break from removal of p style wrapper."
    why_human: "Visual centering via CSS display:block + margin auto (avatar--center) requires browser to confirm."
---

# Phase 1: Design Foundation & Book Launch Page — Verification Report

**Phase Goal:** Users see a modern, clean site with the book promotion front and center before launch day
**Verified:** 2026-04-05T18:00:00Z
**Status:** human_needed
**Re-verification:** Yes — second re-verification pass (previous status: human_needed, previous score: 8/8 automated). No code changes since last verification. Human UAT items remain pending.

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Site renders with black/white/orange palette and modern typography across mobile and desktop | VERIFIED | `--bg: #FFFFFF`, `--fg: #000000`, `--accent: #D04819` in style.css; Outfit (heading) + Inter (body) @font-face declarations; line-height 1.7; clamp() fluid sizing; no old #FF5C00 or JetBrains Mono/Manrope as primary fonts |
| 2 | Navigation shows exactly three items (Accueil, Dictionnaire, À propos) plus X and GitHub icons | VERIFIED | default.html lines 28-30: all 3 text nav links confirmed; X icon links to x.com/Loic_Pandul with aria-label="X (anciennement Twitter)" (2 occurrences); GitHub icon with aria-label="GitHub" (2 occurrences); no twitter.com; no blog link |
| 3 | Blog pages, blog navigation link, and post directory no longer exist on the site | VERIFIED | blog.md absent on disk; post/ directory exists but contains 0 tracked files (6 empty subdirectory shells — Git artifact, no Jekyll build impact); jekyll-feed removed from _config.yml; no blog link in nav |
| 4 | Dictionary landing page displays book cover image, Amazon purchase links (broche + relie), and Bitcoin Bazar link | VERIFIED | dictionnaire.md: `<section class="book-promo">` with cover img (loading=eager, relative_url filter); Amazon B0GV1N6S1W and B0GV1X52YD (both btn-primary, target=_blank, rel=noopener); bitcoinbazar.fr (btn-secondary, target=_blank, rel=noopener) |
| 5 | All pages are responsive and readable on a 375px-wide mobile screen | VERIFIED | style.css is mobile-first: base targets 375px; min-width 720px and min-width 980px for tablet/desktop enhancements; max-width 380px only for edge-case font size; hamburger menu on mobile via CSS (display:none on .site-nav at max-width 719px, .nav-toggle shown); no inline styles in dictionnaire.md, apropos.md, index.md |

**Score:** 5/5 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `assets/css/style.css` | Complete design system, `--accent: #D04819`, mobile-first breakpoints, .book-promo | VERIFIED | All design tokens present; Outfit + Inter @font-face; btn-primary/btn-secondary; .book-promo; .avatar--center; .pbn-thumb; min-width 720px and 980px breakpoints; no #0f0f0f footer bug |
| `assets/fonts/Outfit-Variable.ttf` | New heading font (geometric sans) | VERIFIED | File exists at assets/fonts/Outfit-Variable.ttf |
| `assets/fonts/Inter-Variable.ttf` | New body font (replaced Source Serif 4 per user feedback) | VERIFIED | File exists at assets/fonts/Inter-Variable.ttf |
| `assets/fonts/archive/` | Old fonts archived | VERIFIED | JetBrainsMono-Variable.ttf and Manrope-Variable.ttf present in archive/ |
| `_layouts/default.html` | Redesigned header with hamburger, x.com links, aria-labels | VERIFIED | nav-toggle button present; 2x x.com/Loic_Pandul with aria-label; 2x aria-label="GitHub"; nav-social-row span; no twitter.com |
| `assets/js/main.js` | Scroll hide + hamburger toggle, requestAnimationFrame, passive listener | VERIFIED | headerCard reference; requestAnimationFrame; `{ passive: true }`; navToggle hamburger logic; French comments |
| `dictionnaire.md` | Book promo section with cover image and all purchase links | VERIFIED | book-promo section; cover img with relative_url and loading=eager; B0GV1N6S1W; B0GV1X52YD; bitcoinbazar.fr; btn-primary + btn-secondary classes |
| `index.md` | Homepage without inline styles | VERIFIED | 0 style= occurrences |
| `apropos.md` | About page without inline styles, avatar--center class | VERIFIED | 0 style= occurrences; class="avatar avatar--center" on profile img |
| `_config.yml` | No jekyll-feed plugin | VERIFIED | Only jekyll-seo-tag, jekyll-sitemap, jekyll-redirect-from in plugins list |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `assets/css/style.css` | `_layouts/default.html` | CSS classes consumed by layout HTML | VERIFIED | site-header, header-card, site-nav, nav-toggle, footer-card all present in both files |
| `assets/css/style.css` | `assets/fonts/Outfit-Variable.ttf` | @font-face src declaration | VERIFIED | `url("../fonts/Outfit-Variable.ttf")` at line 9 |
| `assets/css/style.css` | `assets/fonts/Inter-Variable.ttf` | @font-face src declaration | VERIFIED | `url("../fonts/Inter-Variable.ttf")` at line 17 |
| `dictionnaire.md` | `assets/img/cover-dictionnaire.png` | img src with relative_url filter | VERIFIED | `{{ '/assets/img/cover-dictionnaire.png' \| relative_url }}` confirmed |
| `dictionnaire.md` | `https://www.amazon.fr/dp/B0GV1N6S1W` | anchor href | VERIFIED | Found with btn-primary, target=_blank, rel=noopener |
| `dictionnaire.md` | `https://www.amazon.fr/dp/B0GV1X52YD` | anchor href | VERIFIED | Found with btn-primary, target=_blank, rel=noopener |
| `dictionnaire.md` | `https://bitcoinbazar.fr/` | anchor href | VERIFIED | Found with btn-secondary, target=_blank, rel=noopener |
| `apropos.md` | `.avatar--center` in `assets/css/style.css` | CSS class applied to img | VERIFIED | class="avatar avatar--center" in apropos.md; .avatar--center defined in style.css |
| `assets/js/main.js` | `#headerCard` in `_layouts/default.html` | getElementById targeting header element | VERIFIED | id="headerCard" in default.html; `document.getElementById('headerCard')` in main.js |
| `assets/js/main.js` | `#navToggle` + `#siteNav` in `_layouts/default.html` | getElementById for hamburger toggle | VERIFIED | id="navToggle" and id="siteNav" in default.html; both targeted in main.js hamburger logic |

---

### Data-Flow Trace (Level 4)

Not applicable — this phase produces static HTML pages. All content is authored directly in Markdown/HTML with no dynamic data rendering.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| 2 @font-face declarations (new fonts) | `grep -c "@font-face" assets/css/style.css` | 2 | PASS |
| No old fonts as primary faces | `grep "JetBrains Mono\|Manrope\|SourceSerif4" assets/css/style.css` | 0 matches | PASS |
| Design tokens present | `grep -- "--accent: #D04819" assets/css/style.css` | Found | PASS |
| Mobile-first breakpoints | `grep "min-width: 720px" assets/css/style.css` | Found | PASS |
| No desktop-first breakpoints | `grep "max-width: 720px\|max-width: 640px\|max-width: 980px" assets/css/style.css` | 0 matches | PASS |
| No footer mobile gray bug | `grep "#0f0f0f" assets/css/style.css` | 0 matches | PASS |
| btn-primary hover has non-orange text | `grep "btn-primary:hover" -A 3 assets/css/style.css` | color: var(--accent) on white bg | PASS |
| No invalid font weights | `grep "font-weight: 450\|font-weight: 600" assets/css/style.css` | 0 matches | PASS |
| x.com links (2 occurrences in layout) | `grep -c "x.com/Loic_Pandul" _layouts/default.html` | 2 | PASS |
| aria-label updated (2 occurrences) | `grep -c "anciennement Twitter" _layouts/default.html` | 2 | PASS |
| No twitter.com in layout | `grep "twitter.com" _layouts/default.html` | 0 matches | PASS |
| blog.md absent | `test ! -f blog.md` | Confirmed absent | PASS |
| post/ has 0 tracked files | `find post/ -type f` | 0 files | PASS |
| Amazon broche ASIN | `grep "B0GV1N6S1W" dictionnaire.md` | Found | PASS |
| Amazon relie ASIN | `grep "B0GV1X52YD" dictionnaire.md` | Found | PASS |
| Bitcoin Bazar link | `grep "bitcoinbazar.fr" dictionnaire.md` | Found | PASS |
| No inline styles in content pages | `grep -c "style=" index.md; grep -c "style=" apropos.md; grep -c "style=" dictionnaire.md` | 0, 0, 0 | PASS |
| avatar--center CSS class exists | `grep "avatar--center" assets/css/style.css` | Found | PASS |
| headerCard targeted by JS | `grep "headerCard" assets/js/main.js` | Found | PASS |
| requestAnimationFrame in JS | `grep -c "requestAnimationFrame" assets/js/main.js` | 1 | PASS |
| passive scroll listener | `grep "passive" assets/js/main.js` | Found | PASS |
| jekyll-feed removed from config | `grep -c "jekyll-feed" _config.yml` | 0 | PASS |
| New font files present | `ls assets/fonts/` | Inter-Variable.ttf, Outfit-Variable.ttf | PASS |
| Old fonts archived | `ls assets/fonts/archive/` | JetBrainsMono-Variable.ttf, Manrope-Variable.ttf present | PASS |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| UI-01 | Plan 01 | Design noir/blanc avec accent orange | SATISFIED | `--bg: #FFFFFF`, `--fg: #000000`, `--accent: #D04819` in style.css. Note: REQUIREMENTS.md specifies `#D44A1A` but UI-SPEC and implementation consistently use `#D04819` — minor spec discrepancy, implementation is internally consistent |
| UI-02 | Plan 01 | Layout responsive mobile-first | SATISFIED | min-width 720px and 980px breakpoints; base styles target 375px; hamburger menu for mobile nav |
| UI-03 | Plan 01 | Navigation: Accueil, Dictionnaire, À propos + X/GitHub icons | SATISFIED | 3 text nav links confirmed in default.html + X and GitHub icon links; no blog link |
| UI-04 | Plan 02 | Suppression complète du blog | SATISFIED | blog.md deleted; post/ directory has 0 tracked files (empty shells — Git artifact only); jekyll-feed removed; no blog nav link |
| UI-05 | Plan 01 | Typographie moderne pour lecture longue | SATISFIED | line-height 1.7; clamp() fluid sizing; Outfit headings + Inter body (replaced JetBrains Mono + Manrope) |
| BOOK-01 | Plan 02 | Section promo du livre avec image de couverture | SATISFIED | `<section class="book-promo">` with eager-loading cover image confirmed in dictionnaire.md |
| BOOK-02 | Plan 02 | Liens Amazon broche B0GV1N6S1W + relié B0GV1X52YD | SATISFIED | Both ASINs present with btn-primary, target=_blank, rel=noopener |
| BOOK-03 | Plan 02 | Lien Bitcoin Bazar | SATISFIED | bitcoinbazar.fr href with btn-secondary, target=_blank, rel=noopener |

**All 8 phase requirements satisfied (automated evidence).**

**Color discrepancy (non-blocking):** REQUIREMENTS.md UI-01 specifies `#D44A1A`; UI-SPEC and all implementation use `#D04819`. Different hex values. Implementation is internally consistent. Requires clarification with product owner before UI-01 can be formally closed.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `post/` (directory) | — | 6 empty subdirectory shells remain on disk | Info | Git artifact — 0 tracked files, no Jekyll build impact. Can be removed with `rm -rf post/` but has no effect on site output or goal achievement. |

No blocker or warning anti-patterns found in any modified content files.

---

### Human Verification Required

#### 1. Visual appearance at desktop and mobile

**Test:** Run `jekyll serve` and open http://localhost:4000. Check at 1440px and 375px viewport widths.
**Expected:** White background, black text, orange accent (#D04819) visible on hover states. Header shows brand logo + "Loïc Morel" + Accueil / Dictionnaire / À propos + X and GitHub icons at desktop. Hamburger menu button visible and functional at 375px — tap to reveal nav links vertically. Footer shows black card with brand + nav columns.
**Why human:** CSS rendering, font loading (Outfit for headings, Inter for body), and visual hierarchy cannot be verified by grep.

#### 2. Book promo layout on /dictionnaire/ at desktop and mobile

**Test:** Navigate to http://localhost:4000/dictionnaire/ at 1440px and 375px.
**Expected:** Desktop: cover image on the left, book title/description/buttons on the right. Two orange filled buttons (Amazon Broché, Amazon Relié) and one black filled button (Acheter sur Bitcoin Bazar). Mobile: image centered on top, info below, all three buttons stacked vertically.
**Why human:** Flexbox responsive layout rendering and button visual appearance require browser verification.

#### 3. Amazon Broché link behavior

**Test:** Click "Amazon — Broché" on /dictionnaire/.
**Expected:** Opens https://www.amazon.fr/dp/B0GV1N6S1W in a new tab.
**Why human:** Link target behavior requires browser.

#### 4. Amazon Relié link behavior

**Test:** Click "Amazon — Relié" on /dictionnaire/.
**Expected:** Opens https://www.amazon.fr/dp/B0GV1X52YD in a new tab.
**Why human:** Link target behavior requires browser.

#### 5. /blog/ returns 404

**Test:** Navigate to http://localhost:4000/blog/ in browser.
**Expected:** Site 404 page displayed — blog is fully removed.
**Why human:** HTTP response code and page rendering require browser.

#### 6. Avatar image on /a-propos/

**Test:** Navigate to http://localhost:4000/a-propos/.
**Expected:** Profile image displays centered with rounded corners. No layout break from removal of the `<p style="text-align:center">` wrapper — centering now via .avatar--center CSS class.
**Why human:** Visual centering via CSS display:block + margin:auto requires browser to confirm correct rendering.

---

## Gaps Summary

No gaps. All 5/5 observable truths are verified by automated evidence. All 8 phase requirements are satisfied.

The phase is blocked at `human_needed` exclusively because 6 visual/browser behaviors cannot be verified programmatically. No code changes have occurred since the previous verification — automated checks continue to pass. Once the 6 human tests above are completed and approved, the phase can advance to `passed`.

**Non-blocking observation:** Empty post/ directory shells (6 subdirectories, 0 files) remain on disk. No Jekyll impact. Can be cleaned with `rm -rf post/`.

---

_Verified: 2026-04-05T18:00:00Z_
_Verifier: Claude (gsd-verifier)_
