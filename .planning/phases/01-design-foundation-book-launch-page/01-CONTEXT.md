# Phase 1: Design Foundation & Book Launch Page - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Nouveau design system (noir/blanc/orange) avec layout responsive, navigation simplifiée, suppression du blog, et page de promotion du livre dictionnaire de Bitcoin. Le site doit être entièrement repensé visuellement — moderne, sobre, professionnel, et distinctif selon les standards 2026.

</domain>

<decisions>
## Implementation Decisions

### Direction visuelle globale
- **D-01:** Design entièrement repensé — pas des ajustements cosmétiques de l'existant, mais une refonte visuelle complète
- **D-02:** Esthétique visée : très moderne, sobre, professionnel, original — conforme aux standards de sites distinctifs en 2026
- **D-03:** Palette noir (#000) / blanc (#FFF) / orange (#D04819) conservée comme base, adaptable par phase si nécessaire pour la cohérence
- **D-04:** Utiliser les skills frontend-design et ui-ux-pro-max pour un design distinctif et professionnel — pas de design générique AI

### Typographie
- **D-05:** Changer les deux polices actuelles (JetBrains Mono + Manrope) — binôme actuel jugé incohérent
- **D-06:** Registre titres : géométrique / moderne (style propre et technique, cohérent avec l'univers Bitcoin)
- **D-07:** Registre corps : police classique et lisible, assortie aux titres
- **D-08:** Le nouveau binôme doit être moderne et cohérent avec le design noir/blanc/orange

### Espacement et arrondis
- **D-09:** Système d'espacement CSS actuel (--space-xs à --space-3xl, 4px à 64px) conservé tel quel
- **D-10:** Coins arrondis (actuellement 10-14px) — à ajuster en cohérence avec le nouveau binôme typographique

### Header et navigation
- **D-11:** Structure de navigation conservée : 3 liens (Accueil, Dictionnaire, À propos) + 2 icônes (X, GitHub)
- **D-12:** Header entièrement repensé — disposition actuelle des éléments jugée incohérente (logo, nom, liens, icônes) sur desktop et mobile
- **D-13:** Comportement sticky/masquage au scroll : à repenser dans la refonte globale

### Boutons
- **D-14:** Boutons à repenser complètement — bug actuel : hover orange sur orange rend le texte illisible (.btn-primary:hover)
- **D-15:** Bouton primaire et secondaire doivent avoir des états hover/focus lisibles et distinctifs

### Footer
- **D-16:** Footer à repenser avec le reste pour cohérence globale — structure de contenu correcte (logo, nav, contact, socials, copyright)
- **D-17:** Bug mobile : liens de navigation du footer apparaissent avec un fond gris incohérent (background: #0f0f0f sur .footer-nav a)

### Claude's Discretion
- Choix final du binôme de polices (dans le registre géométrique/moderne pour titres + classique lisible pour corps)
- Valeur exacte des coins arrondis
- Adaptation de la palette par phase si nécessaire pour la cohérence
- Disposition et animation du header
- Design complet des boutons (couleurs, formes, états)
- Redesign du footer mobile

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design system
- `assets/css/style.css` — CSS actuel à refondre, contient les variables de palette et d'espacement à conserver
- `_layouts/default.html` — Layout unique Jekyll, structure HTML sémantique (header, main, footer)

### Page livre
- `dictionnaire.md` — Page dictionnaire avec section promo livre (cover, liens Amazon, Bitcoin Bazar)

### Configuration
- `_config.yml` — Configuration Jekyll, langue fr, plugins SEO/sitemap

### Skills de design
- `.claude/skills/frontend-design/SKILL.md` — Skill pour design distinctif et production-grade
- `.claude/skills/ui-ux-pro-max/SKILL.md` — Skill UI/UX avec styles, palettes, font pairings

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/fonts/` — Contient les polices variables actuelles (à remplacer) + archive de polices non utilisées (Lora, Montserrat)
- `assets/img/logo.svg` — Logo SVG du site, réutilisable
- `assets/img/cover-dictionnaire.png` — Cover du livre, utilisée sur la page dictionnaire
- `assets/js/main.js` — JS minimal (42 lignes) : header scroll + liens externes

### Established Patterns
- CSS custom properties sur `:root` pour le theming — pattern à conserver et enrichir
- Layout single-page Jekyll : un seul `default.html` pour tout le site
- Responsive mobile-first avec breakpoints 720px et 980px
- `clamp()` pour les tailles fluides

### Integration Points
- Toutes les pages passent par `_layouts/default.html` — le header/footer y sont définis
- `assets/css/style.css` est le seul fichier CSS — toute la refonte s'y fait
- `assets/js/main.js` gère le comportement scroll du header — à adapter si le header change

</code_context>

<specifics>
## Specific Ideas

- "Je veux un site très moderne, et qui tranche avec ce que j'avais actuellement, qu'il soit nouveau, repensé entièrement"
- "Un design différent de ce que j'avais, très moderne, très joli, qui va avec les standards de sites originaux en 2026, mais en même temps qui reste sobre et professionnel"
- "Utilise les skills frontend-design et ui-ux-pro-max pour un design distinctif et pro. Pas de design générique AI" (mentionné à chaque décision)
- "Police plus classique pour le corps et cohérente et originale pour le titre. Trouver un binôme de polices moderne et cohérent"
- Bug boutons : "les boutons ne sont pas bien au niveau du passage de la souris dessus car ils sont orange sur orange, on voit plus le texte"
- Bug footer mobile : "on dirait qu'il y a du gris sur les menus sur mobile uniquement"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-design-foundation-book-launch-page*
*Context gathered: 2026-04-05*
