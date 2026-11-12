# Audit UI, UX et design de la V3 (12 novembre 2026)

Passe complète menée avec le skill design-ui. Captures pilotées (entrées figées à l'état final, états cliqués pour de vrai) de `/`, `/en/` et `/404.html`, à 1440 × 900 et 390 × 844, plus un contrôle à 768 × 1024. Mesures automatiques : débordement horizontal, erreurs de console, cibles tactiles.

## Cadrage

- **Design system** : écrit, `design/direction.md` (palette crème, encre, orange brûlé choisie par Loïc le 8 novembre 2026 ; Mona Sans et Literata ; jetons de `_includes/site.css`). Il garde la main : aucune couleur, police ni espacement nouveau, seulement ses jetons.
- **Pile** : Jekyll (GitHub Pages), HTML, CSS et JavaScript sans framework. shadcn/ui sert de référence de structure, sans dépendance.
- **Genre** : retouche d'un site vitrine déjà construit, avec design system.
- **Mode** : Persuader (le visiteur doit être convaincu de confier ses contenus).
- **Parcours** : lecture du design system, audit avant (étape 5), corrections au plus bas niveau (jeton, puis composant, puis écran), audit après. `design-taste-frontend` reste hors parcours : ses tirages contrediraient le design system.

Plages de contenu : titres de 16 à 95 caractères (« Reproducible builds: how to prove your Bitcoin Core or Liana binary matches the code? »), titres anglais dans la page française, 434 contenus, 0 résultat de recherche, termes du dictionnaire de 3 à 30 caractères en capitales (données synchronisées, jamais éditées).

Ne bouge pas : identité, textes, ordre des sections, comportements, décisions de Loïc listées plus bas.

## Trois tests

- **Échange** : réussi. Le visage écrit avec ses 434 titres, les dix marques réelles et le dictionnaire n'appartiennent qu'à lui.
- **Squelette** : réussi. Nom, titres affiche, champs noirs et cartes portent la hiérarchie sans les mots.
- **Suppression** : réussi. Chaque image porte un fait (portrait des titres, captures réelles de Second et de Gerfaut, couvertures des formations, lettre du terme affiché).

## Mesures avant

| Page | 1440 | 390 |
|---|---|---|
| `/` | 10 722 px de haut, aucun débordement, 0 erreur | 11 851 px, aucun débordement, 0 erreur |
| `/en/` | 10 600 px, aucun débordement, 0 erreur | 11 583 px, aucun débordement, 0 erreur |
| `/404.html` | 900 px, aucun débordement | 1 031 px, aucun débordement |

768 px : aucun débordement. Cibles tactiles sous 44 px au téléphone : seuls des liens dans une phrase (exemptés par WCAG 2.5.8) et l'interrupteur de langue, dont la zone de toucher est agrandie par `::after`.

## AUDIT DESIGN

Bilan : le site tient ses dix rounds de revue ; il reste un composant cassé (une variante de bouton jamais écrite), une grille qui laisse une carte orpheline à la tablette, deux boutons pleins qui se disputent la place dans le dictionnaire et un budget typographique dépassé dans « À la une ».

### PHASE 1 — Critique

- **Accueil, index des contenus (1440 et 390)** : « Afficher 24 de plus » et « Tout afficher » portent la classe `btn-outline`, qui n'existe pas dans `site.css` : ils sortent en bouton plein crème sur le champ noir, au même poids que l'appel principal → écrire la variante contour (fond transparent, bordure `--border-strong`, texte `--fg`, survol orange) → une commande secondaire doit avoir l'air secondaire, et le composant doit avoir ses deux variantes comme dans `direction.md`.
- **Accueil, « À la une » (600 à 959 px)** : la grille à deux colonnes met la carte Cryptoast seule sur sa ligne, moitié droite vide → la quatrième carte prend toute la ligne entre 600 et 959 px → trou visible à la tablette.
- **Projets, dictionnaire (1440 et 390)** : « Une autre définition » (dans la carte) et « Ouvrir le dictionnaire » (dessous) sont deux boutons pleins à 28 px l'un de l'autre → « Une autre définition » passe en variante contour, « Ouvrir le dictionnaire » reste l'action principale → deux actions principales empilées, l'œil ne sait pas laquelle compte.

### PHASE 2 — Raffinement

- **« À la une » (1440)** : trois tailles de titre dans quatre cartes (26 px, 18 px, 24 px) → une seule taille pour les trois cartes secondaires (1,125 rem), la formation garde le pas Titre → budget de trois tailles par vue (`craft.md`).
- **« À la une » (390)** : la première carte garde le pas Titre (26 px) dans un carrousel de cartes de 280 px : le titre passe sur quatre lignes alors que les voisines sont à 19 px → au téléphone, même taille pour toutes les cartes ; le grand titre seulement à partir de 600 px.
- **Index, ligne d'état (390 et 1440)** : « 0 contenus pour « zzzzqx » » → « 0 contenu » (en français, le singulier vaut jusqu'à 1).

### PHASE 3 — Finition

- **Recherche de l'index (390)** : une fois un mot tapé, rien ne permet de l'effacer au doigt (la croix native est masquée, Échap n'existe qu'au clavier) → un bouton « Effacer » de 44 px dans le champ, à la place de la touche « / », visible seulement quand le champ est rempli.
- **Barre de défilement** : dessinée par le navigateur en gris neutre → `scrollbar-color` depuis la palette (`--bar-dark` sur `--paper`).
- **Titres h3 (`.title`)** : sans `text-wrap: balance`, alors que les titres affiche et l'accroche l'ont → l'ajouter.

### TOKENS À AJOUTER OU CHANGER

- Aucun. Toutes les corrections lisent les jetons existants (`--fg`, `--bg`, `--border-strong`, `--mark`, `--ink`, `--bar-dark`, `--paper`).

### NOTES D'IMPLÉMENTATION

- `_includes/site.css`, `.btn-outline` : non défini → `background: transparent; color: var(--fg); box-shadow: inset 0 0 0 1px var(--border-strong)` ; survol : fond `--mark`, texte `--ink`, filet `--mark`.
- `_includes/accueil.html`, bouton `data-dict-next` : `btn` → `btn btn-outline`.
- `_includes/site.css`, `.wb-4` entre 600 et 959 px : `grid-column: auto` → `1 / -1`.
- `_includes/site.css`, `.wb-2 .wb-title, .wb-3 .wb-title` (≥ 960 px) : ajouter `.wb-4 .wb-title` (1,125 rem, interligne 1,28).
- `_includes/site.css`, `.wb-1 .wb-title` : `var(--s-title)` partout → seulement à partir de 600 px.
- `assets/js/site.js`, `T.count` (français) : `n === 1` → `n <= 1`.
- `_includes/accueil.html` et `assets/js/site.js`, champ de recherche : bouton `.field-clear` (`hidden` tant que le champ est vide), qui vide le champ, relance la liste et rend le focus au champ.
- `_includes/site.css`, `html` : `scrollbar-color: var(--bar-dark) var(--paper)` ; `.title` : `text-wrap: balance`.

## Laissés tels quels (décisions de Loïc ou choix de la direction)

- Vide à droite sous « Développement » sur ordinateur (le panneau collé a besoin de cette hauteur pour se dessiner) : gardé par Loïc le 31 octobre 2026.
- Au téléphone, le texte de l'accueil sous le portrait et « Me contacter » seulement dans la barre : rounds 6 à 10.
- Termes du dictionnaire en capitales : ce sont les données du dictionnaire, synchronisées et jamais éditées ici.
- Titres affiche encore rayés tant qu'ils n'ont pas atteint la moitié de l'écran : c'est le mouvement réversible calé sur le défilement (section 10 de `direction.md`).
- Ligne d'état « 434 contenus » sans filtre : elle répète le total, mais elle situe la liste paginée (12 lignes sur 434) ; gardée.

## Audit après (commit 2d0d211)

Mêmes captures pilotées, mêmes largeurs.

| Page | 1440 | 390 |
|---|---|---|
| `/` | 10 734 px, aucun débordement, 0 erreur | 11 851 px, aucun débordement, 0 erreur |
| `/en/` | 10 612 px, aucun débordement, 0 erreur | 11 610 px, aucun débordement, 0 erreur |
| `/404.html` | 900 px, aucun débordement | 1 031 px, aucun débordement |

768 px : aucun débordement. Les 12 à 27 px de hauteur en plus viennent de la ligne des étiquettes de « À la une ».

Constats, un par un :

- Variante contour : écrite ; « Afficher N de plus », « Tout afficher » et « Une autre définition » sont en contour, passent à l'orange au survol, gardent leur taille. Corrigé.
- Carte orpheline à 768 px : la quatrième carte prend la ligne. Corrigé.
- Deux boutons pleins dans le dictionnaire : une seule action pleine (« Ouvrir le dictionnaire »). Corrigé.
- Tailles de titre de « À la une » : deux tailles (formation au pas Titre, 20 px pour les trois autres sur ordinateur ; une seule au téléphone). La flèche a quitté le coin bas droit pour la ligne des étiquettes : les titres gardent toute la largeur de la carte. Corrigé. Il reste un vide dans la carte Cryptoast sur ordinateur (titre court dans une carte de deux colonnes) : les titres sont alignés en bas de toutes les cartes, le vide est gardé.
- « 0 contenu » : corrigé.
- Effacer la recherche : bouton de 44 px, visible seulement champ rempli, qui rend le focus au champ ; Échap, « Tout afficher » et le retour arrière le tiennent à jour. Corrigé.
- Barre de défilement teintée et sous-titres équilibrés : faits (la barre ne se voit pas dans les captures sans affichage).

Revue par un sous-agent neuf (Sonnet), sur les captures avant et après : aucune régression, aucun débordement horizontal, corrections visibles. La revue neuve de `audit.md` (verdict ship, fix ou rebuild) ne s'applique pas : c'est une retouche, pas un écran neuf ni une refonte.
