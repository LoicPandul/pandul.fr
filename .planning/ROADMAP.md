# Roadmap: pandul.fr

## Overview

This roadmap delivers a complete UI/UX redesign of pandul.fr and integrates a 1408-entry interactive Bitcoin dictionary. The book launch page ships first (book release in ~1 week), then the sync script unlocks all dictionary features, followed by dictionary pages/navigation, an independent portfolio redesign, and a final polish pass for performance and accessibility.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design Foundation & Book Launch Page** - New design system (black/white/orange) with responsive layout, simplified navigation, blog removal, and time-critical book promotion page
- [ ] **Phase 2: Dictionary Data Pipeline** - Sync script that transforms 1408 definitions from external repo into Jekyll collection files, resolves cross-references, rewrites image paths, and generates search index
- [x] **Phase 3: Dictionary Pages & Navigation** - 1408 definition pages with full metadata, real-time title search, alphabetical and category browsing, cross-references, and breadcrumbs
- [ ] **Phase 4: Portfolio Redesign** - Homepage redesign with visual content cards, hero section, category navigation, external link indicators, and SEO metadata (gap closure in progress)
- [ ] **Phase 5: Polish & Accessibility** - Performance optimization, ARIA accessibility, and contact information visibility

## Phase Details

### Phase 1: Design Foundation & Book Launch Page
**Goal**: Users see a modern, clean site with the book promotion front and center before launch day
**Depends on**: Nothing (first phase)
**Requirements**: UI-01, UI-02, UI-03, UI-04, UI-05, BOOK-01, BOOK-02, BOOK-03
**Success Criteria** (what must be TRUE):
  1. Site renders with black/white/orange palette and modern typography across mobile and desktop
  2. Navigation shows exactly three items (Accueil, Dictionnaire, A propos) plus X and GitHub icons
  3. Blog pages, blog navigation link, and post directory no longer exist on the site
  4. Dictionary landing page displays book cover image, Amazon purchase links (broche + relie), and Bitcoin Bazar link
  5. All pages are responsive and readable on a 375px-wide mobile screen
**Plans**: 2 plans
Plans:
- [x] 01-01-PLAN.md — Complete design system overhaul: new font pair, CSS rewrite, header/footer/button redesign
- [x] 01-02-PLAN.md — Content pages cleanup, book promo verification, blog deletion, visual checkpoint

### Phase 2: Dictionary Data Pipeline
**Goal**: Running the sync script produces a complete, correct set of Jekyll collection files ready for build
**Depends on**: Phase 1
**Requirements**: DICT-01, DICT-02, DICT-03, DICT-04
**Success Criteria** (what must be TRUE):
  1. Running `node _scripts/sync-dictionnaire.js` generates 1408 markdown files in `_dictionnaire/` with correct YAML front matter
  2. Cross-reference UUIDs in definition files are resolved to valid `/dictionnaire/{slug}/` URLs
  3. Image paths in definitions point to copied assets that exist in the site's assets directory
  4. A JSON search index file is generated containing title, slug, category, and letter for all 1408 entries
**Plans**: 2 plans
Plans:
- [x] 02-01-PLAN.md — Config Jekyll collection + layout definition minimal + script sync complet (1408 defs, cross-refs, images, index JSON)
- [x] 02-02-PLAN.md — Script de validation automatisee + verification humaine des artefacts generes

### Phase 3: Dictionary Pages & Navigation
**Goal**: Users can browse, search, and navigate the full 1408-entry dictionary interactively
**Depends on**: Phase 2
**Requirements**: DICT-05, DICT-06, DICT-07, DICT-08, DICT-09, DICT-10, DICT-11
**Success Criteria** (what must be TRUE):
  1. Each definition page displays its title, markdown content, category badge, English term, and clickable cross-reference links
  2. Typing in the search bar filters definitions by title in real time (accent-insensitive)
  3. User can browse definitions via A-Z letter navigation and via 19 category pages
  4. Breadcrumb navigation shows Dictionnaire > Categorie > Terme on each definition page
  5. Dictionary landing page displays stats ("1408 definitions dans 19 categories")
**Plans**: 4 plans
Plans:
- [x] 03-01-PLAN.md — Extend sync script (category/letter pages, prev/next nav) + Jekyll collections config + category/letter layouts
- [x] 03-02-PLAN.md — Enrich definition layout (breadcrumbs, badge, pills, nav, CTA, lightbox) + CSS + JS
- [x] 03-03-PLAN.md — Redesign landing page (stats, search, A-Z, categories) + search autocomplete JS + CSS
- [x] 03-04-PLAN.md — Visual and functional verification checkpoint

### Phase 4: Portfolio Redesign
**Goal**: Users discover the full breadth of educational content through an attractive, organized homepage
**Depends on**: Phase 1
**Requirements**: PORT-01, PORT-02, PORT-03, PORT-04, PORT-05
**Success Criteria** (what must be TRUE):
  1. Homepage displays content as visual cards with thumbnails organized by category (formations, tutoriels, articles, podcasts, interviews, productions)
  2. User can navigate between content categories via section links on the homepage
  3. Hero section communicates who Loic is and highlights key stats (formations, articles, definitions)
  4. External links are visually indicated and open in new tabs
  5. Sharing a page URL on X or social media shows correct Open Graph preview (title, description, image)
**Plans**: 6 plans
Plans:
- [x] 04-01-PLAN.md — YAML data layer (3 category files) + Liquid homepage template with hero, section nav, cards, and SEO
- [x] 04-02-PLAN.md — CSS styling for all homepage components (cards, hero, nav, badges, responsive) + JS verification
- [x] 04-03-PLAN.md — Visual and functional verification checkpoint
- [x] 04-04-PLAN.md — Gap closure: French accents in all YAML data files + audio-video.yml platform fixes and deletions
- [x] 04-05-PLAN.md — Gap closure: Hero redesign, dictionary section redesign, logo badges, emoji removal, mobile responsive
- [ ] 04-06-PLAN.md — Gap closure: Visual verification checkpoint
**UI hint**: yes

### Phase 5: Polish & Accessibility
**Goal**: The site loads fast, is accessible to all users, and provides contact information
**Depends on**: Phase 3, Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. All pages load in under 2 seconds on a standard connection (including definition pages)
  2. Site is keyboard-navigable with visible focus states, ARIA labels on interactive elements, and skip-to-content links
  3. User can find contact information (email, Lightning address) from any page
**Plans**: 3 plans
Plans:
- [ ] 05-01-PLAN.md — Conditional KaTeX loading, skip-to-content link, aria-labels, math flags, archived font deletion
- [ ] 05-02-PLAN.md — CSS media query consolidation, skip-to-content styles, focus states
- [ ] 05-03-PLAN.md — Repository cleanup (git rm --cached planning files) + visual verification checkpoint

## Progress

**Execution Order:**
Phases execute in numeric order. Phase 4 depends only on Phase 1 (not Phase 2/3) and could overlap with Phases 2-3.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design Foundation & Book Launch Page | 0/2 | Replanned | - |
| 2. Dictionary Data Pipeline | 0/2 | Planned | - |
| 3. Dictionary Pages & Navigation | 0/4 | Planned | - |
| 4. Portfolio Redesign | 3/6 | Gap closure | - |
| 5. Polish & Accessibility | 0/3 | Planned | - |
