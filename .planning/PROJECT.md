# pandul.fr — Refonte UI/UX & Dictionnaire Interactif

## What This Is

Site personnel et professionnel de Loic Morel, specialiste en pedagogie Bitcoin. Portfolio de contenus educatifs (formations Plan B Academy, tutoriels, articles Bitstack, podcast Space Kek, productions Decouvre Bitcoin, interviews) et dictionnaire interactif de Bitcoin (1408 definitions). Site Jekyll heberge sur GitHub Pages.

## Core Value

Mettre en valeur la richesse du catalogue de contenus educatifs Bitcoin de Loic Morel a travers une interface moderne, epuree et fonctionnelle.

## Requirements

### Validated

- Validated: Site Jekyll fonctionnel heberge sur GitHub Pages — existant
- Validated: Portfolio de contenus organise par categories (formations, tutoriels, articles, podcasts, interviews) — existant
- Validated: Page a propos — existante
- Validated: Navigation avec liens X et GitHub — existant
- Validated: CNAME pandul.fr configure — existant
- Validated: Licence CC BY-SA 4.0 — existant

### Active

- [ ] Page d'accueil portfolio reorganisee : meme contenu mais presentation soignee, lisible, attrayante (pas de simples listes brutes)
- [ ] Dictionnaire interactif : 1408 definitions generees en pages Jekyll statiques depuis le repo Dictionnaire via script de sync
- [ ] Recherche par titre en temps reel : index JSON genere au build, filtrage JS cote client
- [ ] Une page par definition : titre, contenu markdown, categorie, terme anglais, cross-references, images
- [ ] Navigation par lettre alphabetique et par categorie dans le dictionnaire

### Validated in Phase 2

- Validated: Dictionnaire interactif — 1408 definitions generees en pages Jekyll depuis le repo Dictionnaire via script sync Node.js zero-dependency
- Validated: Script de sync — `node _scripts/sync-dictionnaire.js` genere fichiers MD, resout cross-refs UUID, copie images, genere index JSON
- Validated: Index JSON de recherche — 1408 entrees avec title, slug, category, letter dans `assets/data/search-index.json`

### Validated in Phase 1

- Validated: Refonte UI/UX — design noir (#000) / blanc (#FFF) / accent orange #D04819, responsive mobile-first
- Validated: Navigation simplifiee — Accueil, Dictionnaire, A propos + icones X/GitHub
- Validated: Suppression du blog — blog.md, post/, jekyll-feed supprimes
- Validated: Page dictionnaire vitrine du livre — cover, liens Amazon (broche/relie), Bitcoin Bazar
- Validated: Design responsive mobile-first — breakpoints 720px, 980px

### Out of Scope

- Blog — Loic ne fait pas de blog, suppression complete
- Framework JS (React, Vue) — Jekyll natif suffit, pas de complexite inutile
- Recherche full-text dans le contenu des definitions — recherche par titre uniquement
- Base de donnees — tout est statique, genere au build
- Submodule git pour le repo Dictionnaire — script de sync prefere pour la flexibilite

## Context

- Site existant fonctionnel mais UI datee : listes brutes, presentation fouillie, mal organisee
- Repo Dictionnaire separe (C:\Users\loicm\Documents\GitHub\Dictionnaire) avec 1408 definitions structurees : metadata.yaml (uuid, title, slug, category, english_term, cross_references) + definition.md + assets/images
- Le livre physique "Dictionnaire de Bitcoin" sort dans ~1 semaine
- Liens Amazon disponibles : Broche (B0GV1N6S1W), Relie (B0GV1X52YD)
- Lien Bitcoin Bazar : placeholder https://bitcoinbazar.fr/ en attendant le lien definitif
- Branche actuelle : refonte-ui
- Stack : Jekyll, GitHub Pages, CSS 57%, HTML 31%, JS 12%
- Palette : noir pur (#000), blanc pur (#FFF), accent orange #D04819 (avec parcimonie)
- Phase 1 complete : design system Outfit + Inter, hamburger mobile, book promo full-width
- Phase 2 complete : pipeline de donnees dictionnaire — 1408 definitions sync, cross-refs, images, index JSON

## Constraints

- **Hebergement**: GitHub Pages — pas de backend, tout statique
- **Stack**: Jekyll — ne pas changer de generateur
- **Performance**: 1408 pages de definitions doivent etre generees sans casser le build GitHub Pages
- **Donnees**: Script de sync depuis le repo Dictionnaire local, pas de submodule
- **Timeline**: Page dictionnaire/livre prioritaire (sortie livre dans ~1 semaine)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Jekyll natif pour le dictionnaire interactif | Pas de framework JS, SEO parfait, coherence avec le site existant | — Pending |
| Script de sync pour les donnees du dictionnaire | Plus flexible qu'un submodule, permet transformation des donnees au passage | — Pending |
| Recherche par titre uniquement (pas full-text) | 1408 definitions = index JSON leger, suffisant pour trouver un terme | — Pending |
| Page dictionnaire double fonction (livre + interactif) | Evite la multiplication des pages, parcours naturel : decouvrir le livre → explorer en ligne | — Pending |
| Suppression complete du blog | Pas utilise, simplifie la nav et la maintenance | Validated Phase 1 |
| Accent orange #D04819 au lieu de #D44A1A | Conformite WCAG AA (4.54:1 sur blanc vs 4.38:1) | Validated Phase 1 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-05 after Phase 2 completion*
