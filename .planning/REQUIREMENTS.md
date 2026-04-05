# Requirements: pandul.fr

**Defined:** 2026-04-05
**Core Value:** Mettre en valeur la richesse du catalogue de contenus educatifs Bitcoin de Loic Morel a travers une interface moderne, epuree et fonctionnelle.

## v1 Requirements

### UI/UX Design

- [ ] **UI-01**: Design noir pur (#000) / blanc pur (#FFF) avec accent orange #D44A1A utilise avec parcimonie
- [ ] **UI-02**: Layout responsive mobile-first (CSS Grid/Flexbox, pas de framework)
- [ ] **UI-03**: Navigation simplifiee : Accueil, Dictionnaire, A propos + icones X/GitHub
- [ ] **UI-04**: Suppression complete du blog (fichiers, nav, dossier post)
- [ ] **UI-05**: Typographie moderne optimisee pour la lecture longue (line-height, max-width)

### Portfolio (Accueil)

- [ ] **PORT-01**: Cards visuelles avec thumbnails pour toutes les categories (formations, tutoriels, articles, podcasts, interviews, productions)
- [ ] **PORT-02**: Categorisation claire des contenus avec navigation par section
- [ ] **PORT-03**: Hero section avec proposition de valeur et stats (formations, articles, definitions)
- [ ] **PORT-04**: Liens externes avec indicateur visuel (icone, ouverture nouvel onglet)
- [ ] **PORT-05**: SEO metadata et Open Graph pour previews sur X/reseaux sociaux

### Dictionnaire - Pipeline de donnees

- [ ] **DICT-01**: Script de sync Node.js pour transformer les donnees du repo Dictionnaire en pages Jekyll
- [ ] **DICT-02**: Resolution des cross-references UUID en slugs dans le sync script
- [ ] **DICT-03**: Reecriture des chemins d'images au sync
- [ ] **DICT-04**: Generation de l'index JSON pour la recherche (titres uniquement)

### Dictionnaire - Pages et navigation

- [ ] **DICT-05**: 1408 pages de definition statiques (titre, contenu, categorie, terme anglais, cross-refs, images)
- [ ] **DICT-06**: Recherche par titre en temps reel (JS vanilla, filtrage cote client)
- [ ] **DICT-07**: Navigation alphabetique A-Z
- [ ] **DICT-08**: 19 pages de categorie listant les definitions
- [ ] **DICT-09**: Cross-references cliquables ("Voir aussi") sur chaque definition
- [ ] **DICT-10**: Breadcrumbs : Dictionnaire > Categorie > Terme
- [ ] **DICT-11**: Affichage stats : "1408 definitions dans 19 categories"

### Dictionnaire - Page vitrine du livre

- [ ] **BOOK-01**: Section promo du livre physique avec image de couverture
- [ ] **BOOK-02**: Liens d'achat Amazon (broche B0GV1N6S1W + relie B0GV1X52YD)
- [ ] **BOOK-03**: Lien Bitcoin Bazar (placeholder https://bitcoinbazar.fr/)

### Accessibilite et performance

- [ ] **PERF-01**: Page load < 2s sur toutes les pages
- [ ] **PERF-02**: Navigation accessible (ARIA labels, focus states, skip links)
- [ ] **PERF-03**: Contact visible (email, Lightning)

## v2 Requirements

### Dictionary Enhancements

- **DICT-V2-01**: Print-friendly CSS pour les pages de definition
- **DICT-V2-02**: Smooth scroll-to-letter dans la vue alphabetique
- **DICT-V2-03**: Keyboard-first search UX (arrow keys, Enter to select)

### Portfolio Enhancements

- **PORT-V2-01**: Dark mode toggle
- **PORT-V2-02**: Animations/transitions subtiles sur les cards

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full-text search dans les definitions | Index JSON ballonne de 50KB a 500KB+, lent sur mobile, titres suffisants |
| Framework JS (React, Vue, Alpine) | Ajoute complexite build, casse simplicite GitHub Pages, Jekyll + vanilla JS suffit |
| Commentaires/contributions sur definitions | Necessite backend, moderation, spam. Contributions via GitHub repo |
| Multi-langue du dictionnaire | Explosion de scope (1408 x N langues). Une langue bien faite > plusieurs bacles |
| Blog | Explicitement exclu. Loic publie sur plateformes externes (Bitstack, PBN) |
| CMS / interface admin | Git-based workflow suffit pour audience technique Bitcoin |
| Infinite scroll | Casse Ctrl+F, bouton retour, bookmarks. Navigation par lettre preferable |
| Analytics | Audience Bitcoin sensible a la vie privee. Si besoin, Plausible/Umami post-launch |
| Sync automatique temps reel | GitHub Pages rebuild au push suffit. Script manuel = simple et controlable |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| UI-01 | Phase 1 | Pending |
| UI-02 | Phase 1 | Pending |
| UI-03 | Phase 1 | Pending |
| UI-04 | Phase 1 | Pending |
| UI-05 | Phase 1 | Pending |
| PORT-01 | Phase 4 | Pending |
| PORT-02 | Phase 4 | Pending |
| PORT-03 | Phase 4 | Pending |
| PORT-04 | Phase 4 | Pending |
| PORT-05 | Phase 4 | Pending |
| DICT-01 | Phase 2 | Pending |
| DICT-02 | Phase 2 | Pending |
| DICT-03 | Phase 2 | Pending |
| DICT-04 | Phase 2 | Pending |
| DICT-05 | Phase 3 | Pending |
| DICT-06 | Phase 3 | Pending |
| DICT-07 | Phase 3 | Pending |
| DICT-08 | Phase 3 | Pending |
| DICT-09 | Phase 3 | Pending |
| DICT-10 | Phase 3 | Pending |
| DICT-11 | Phase 3 | Pending |
| BOOK-01 | Phase 1 | Pending |
| BOOK-02 | Phase 1 | Pending |
| BOOK-03 | Phase 1 | Pending |
| PERF-01 | Phase 5 | Pending |
| PERF-02 | Phase 5 | Pending |
| PERF-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0

---
*Requirements defined: 2026-04-05*
*Last updated: 2026-04-05 after roadmap creation*
