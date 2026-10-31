# pandul.fr V3 : direction artistique

Version 2, 25 octobre 2026. Écrite avant tout code, à partir des inspirations (`design/inspirations.md`), du profil de Loïc et des trois skills de design (design-taste-frontend, frontend-design, ui-ux-pro-max). La version 1 a été critiquée par un relecteur indépendant ; la section 13 liste ses douze objections et ce que j'ai changé pour chacune.

## 1. Le concept : « Lignes »

Tout ce que Loïc produit s'écrit en lignes. Des lignes de texte (185 tutoriels et articles, 6 formations, plus de 1 400 définitions), des lignes de code (Gerfaut, ses versions signées), et Bitcoin lui-même, une seule ligne de blocs qui ne casse jamais.

Le site est donc dessiné avec une seule matière : **la ligne d'écriture**, une ligne horizontale coupée en mots, d'épaisseur variable, à l'encre bleue sur papier. Elle dessine trois images, pas plus :

1. **Son portrait**, fait des titres réels de ses 246 contenus publiés. Chaque ligne du portrait est une ligne de ces titres ; son épaisseur suit l'ombre du visage. Une loupe de lecture suit le curseur (ou le doigt) et rend les mots lisibles : on lit littéralement ce qu'il a écrit dans son visage.
2. **Une lettre du dictionnaire**, géante, qui change quand on tire une autre définition.
3. **Son nom**, dans le pied de page, dont chaque lettre réagit seule.

Partout ailleurs, la ligne revient sous une forme fonctionnelle : la réglette des 246 publications (un trait par contenu), les stores qui s'ouvrent sur la vidéo de Gerfaut, le trait qui se trace sous un lien, le trait de la section en cours dans la barre.

La phrase de l'idée, telle que l'exige design-taste-frontend :

> Sur ce site, **les titres des 246 contenus que Loïc a publiés** deviennent **les lignes qui dessinent son visage, et la réglette qu'on parcourt pour les ouvrir un par un**.

Test du concurrent : un autre rédacteur Bitcoin n'a ni ces 246 titres, ni ce visage, ni ce dictionnaire. Le procédé vient du métier (écrire des lignes), la matière n'appartient qu'à lui.

Ce qui n'est pas le concept : pas de cubes de blocs en 3D, pas de pièce ₿ dorée, pas de terminal vert, pas de texte qui se « déchiffre » en caractères aléatoires, pas de portrait de billet de banque (les lignes sont coupées en mots et le sujet se lit, ce n'est pas une gravure fiduciaire).

## 2. Inventaire du sujet

1. Son nom, **Loïc Morel** (la marque publique) ; **Pandul** reste le nom de l'Ei et du domaine, en arrière-plan.
2. **Marseille**, 96 Rue Paradis, 13006.
3. **2020** : Bitcoin l'accroche par sa technique, sa monnaie et sa philosophie. **2021** : Bitstack lui confie son blog, premier client.
4. **246 contenus publiés**, comptés dans `_data` : 104 tutoriels et 6 formations Plan ₿ Academy, 81 articles Bitstack, 44 épisodes de Space Kek, 7 vidéos et interview Découvre Bitcoin, 2 interviews Cryptoast, 1 Grand Angle Bitcoin, 1 How to Bitcoin.
5. **Plus de 1 400 définitions** dans le Dictionnaire de Bitcoin, aussi imprimé (Bitcoin Bazar, Amazon), sous CC BY-NC-SA 4.0. Il est rangé par lettres (les anciennes adresses `/dictionnaire/lettre/a/` existent toujours).
6. **Deux publics** : les débutants et les développeurs.
7. **Sa méthode** : il lit le code source avant d'écrire, il teste chaque commande.
8. **Gerfaut**, son portefeuille watch-only (Android, Linux, macOS, Windows), et ses versions **signées avec minisign**.
9. **Dix clients**, deux époques : depuis 2026 Second, Liana et Wizard Sardine ; de 2021 à 2025 Plan ₿ Network, Bitstack, Space Kek, Découvre Bitcoin, Cryptoast, Grand Angle Bitcoin, How to Bitcoin.
10. **Ses outils** : Markdown, Git, GitHub. Il travaille comme un développeur.
11. **Son ton** : sobre, direct, pédagogique, concret. Jamais « crypto », « Web3 », « expert » ni « passionné ».

## 3. L'argument de la page, dans l'ordre

| Section | Affirmation | Preuve sur la page |
| --- | --- | --- |
| Accueil | Je suis Loïc Morel, rédacteur technique Bitcoin et développeur. | Son nom en très grand, une phrase claire, son portrait fait de ses titres, un bouton « M'écrire ». |
| Ils me font confiance | Dix équipes de l'écosystème Bitcoin m'ont confié leur contenu depuis 2021. | Les dix marques visibles d'un coup, le travail fait pour chacune, puis la réglette des 246 contenus, tous ouvrables, et leur liste complète. |
| Ce que je fais | J'écris, je documente et je code, pour les débutants comme pour les développeurs. | Les chiffres réels, les 6 formations en liens, la capture de la documentation de Bark Pay, la commande minisign réelle. |
| Projets | Je construis mes propres outils. | Une vraie définition du dictionnaire, tirée au hasard ; la vidéo du premier lancement de Gerfaut et une capture Android. |
| Contact | On peut m'écrire directement. | L'adresse en très grand, copiable, et les autres canaux. |
| Pied de page | Signature. | Le nom en lignes, interactif ; mentions légales ; clé minisign. |

« Ils me font confiance » passe en deuxième position : c'est la section que Loïc veut la plus visible. Pas de témoignages inventés, pas de logos sans travail réel, pas de statistiques commerciales.

## 4. Ce que le tirage a donné, et ce que j'en garde

Tirage de design-taste-frontend (`draw.mjs`, secteur personal-portfolio, graine 486171054) : trois directions proposées (« quiet instrument », « split stage », « type only statement »). **Choix : split stage** pour l'accueil : un panneau pleine hauteur à côté d'une colonne de lecture, c'est la place du portrait vivant.

Gardé du tirage : l'accueil en deux moitiés ; la consigne de casser le partage et de varier le contenu de chaque section (la monotonie est l'échec n° 1 de cette direction) ; les règles maison (titres en deux lignes au plus, pas d'étiquette au-dessus des titres, pas de monospace hors code, pas de numérotation 01/02/03, pas de dégradé, pas d'ombre au repos, pas de verre dépoli, pas de cartes à icône).

Écarté, avec la raison :
- **La police (EB Garamond plafonné à 40 px) et la palette (rose poudré, sauge, ardoise)** : Loïc demande une identité « ultra moderne » choisie par moi, avec des lettres animées. J'ai utilisé `--keep palette,type` : la composition vient du tirage, palette et polices sont décidées ici.
- **Les photos d'ambiance « People »** : le site a ses propres images.
- **Le « fondu lent » comme mouvement signature** : remplacé par les lignes.

ui-ux-pro-max (`--design-system`, variance 8, motion 8) : récit au défilement, monochrome avec un bleu, coins droits, typographie grasse. Gardé. Écarté : la paire Caveat / Quicksand (manuscrite) et le bleu `#2563EB` de Tailwind.

## 5. Palette : une encre bleue, un papier

L'idée : **tout est écrit à l'encre bleue**, comme une copie ou une lettre au stylo. Le texte courant, les titres, les lignes, les boutons : une seule encre. Pas de noir nulle part. Une seule section inverse les rôles (Contact et pied de page : papier sur encre). C'est l'encre du pédagogue, pas le bleu d'une interface.

| Rôle | Nom | Valeur | Usage |
| --- | --- | --- | --- |
| Fond | Papier | `#F2F2EE` | Fond de toute la page. Presque neutre, à peine chaud, pas crème (chroma OKLCH 0,004 contre 0,010 pour le crème générique `#F4F1EA`). |
| Encre | Encre | `#183F8F` | Tout le texte, les titres, les lignes, le bouton principal, et le champ de la section Contact. OKLCH 0,39 / 0,14 / 262°. |
| Texte secondaire | Encre douce | `#4B5F8E` | Légendes et métadonnées seulement. |
| Plaque | Plaque | `#D6DCE8` | Fond des captures et du bloc de code, pour qu'elles aient la même assise. |
| Texte secondaire sur encre | Bleu pâle | `#C9D3EA` | Légendes dans la section Contact et le pied de page. |
| Surligneur | Jaune | `#FFD24A` | Toujours en fond derrière l'encre, jamais en texte : l'élément « en cours » (contenu lu dans la réglette, terme de la définition affichée) et la sélection de texte. C'est le geste du pédagogue qui surligne l'essentiel. |

Choix du bleu : j'ai comparé côte à côte six encres avec les bleus de Coinbase et Base (`#0052FF`), de Tailwind (`#1D4ED8`, `#1E40AF`) et des cartes Cloudflare (`#3D3DD6`) (capture `.taste-skill/lab/palette.jpg`). Le bleu de la version 1 (`#2337C6`) tombait à 4° de Cloudflare et entre deux bleus de Tailwind. `#183F8F` est moins saturé (chroma 0,14 contre 0,22 à 0,26 pour les bleus d'interface) et légèrement plus vert : il se lit comme l'encre d'un stylo bille, pas comme un bouton.

Contrastes calculés (WCAG 2.x) :

| Paire | Rapport | Seuil |
| --- | --- | --- |
| Encre sur papier | 8,72 | AAA |
| Encre sur plaque | 7,5 env. | AAA |
| Encre douce sur papier | 5,62 | AA |
| Papier sur encre | 8,72 | AAA |
| Bleu pâle sur encre | 6,52 | AA |
| Encre sur surligneur | 6,79 | AA |

Le jaune n'a que 1,26:1 sur le papier : il ne porte jamais de texte, il ne fait que surligner sous de l'encre.

Interdits vérifiés : rien de Liana (noir `#141414`, vert `#00FF66`), de Wizard Sardine (noir `#0C0C0C`), de Second (blanc et noir bleuté, DM Sans), ni de Gerfaut (sarcelle `#0E7490`). Pas de noir, pas de vert, pas de violet, pas de crème, pas de terracotta. Pas de mode sombre.

## 6. Typographie

Deux familles, et la paire raconte les deux métiers : une grotesque de machine pour ce qui se lit d'un coup d'œil, une serif de livre pour ce qui se lit vraiment.

- **Mona Sans** (SIL OFL, auto-hébergée). Fichier réduit aux axes utilisés : graisse 400 à 900, largeur 75 à 100 %, caractères latins et ₿ : 71 Ko. Nom, titres, chiffres, navigation, boutons, légendes. Titres en **graisse 860, largeur 75 %** (condensée noire), interligne 0,88, approche −0,02 em.
- **Literata** (SIL OFL, auto-hébergée). Graisse 380 à 620, taille optique 12 à 48 : 69 Ko. Texte courant et phrases d'accroche. Le signe ₿, absent de Literata, est pris dans Mona Sans par `unicode-range`.

Échelle, cinq tailles :

| Pas | Taille | Police | Usage |
| --- | --- | --- | --- |
| Affiche | `clamp(2.75rem, 9.6vw, 10rem)` | Mona Sans 860 / 75 % | Nom (h1), titres de section (h2), adresse e-mail |
| Titre | `clamp(1.625rem, 2.3vw, 2.375rem)` | Mona Sans 760 / 100 % | Sous-titres (h3), chiffres |
| Accroche | `clamp(1.3125rem, 1.7vw, 1.75rem)` | Literata 420, interligne 1,32 | Une phrase d'accroche par section |
| Texte | `clamp(1.0625rem, 1.05vw, 1.1875rem)` | Literata 400, interligne 1,6 | Texte courant, 45 à 70 caractères par ligne |
| Petit | `0.9375rem` | Mona Sans 560 | Légendes, navigation, boutons, métadonnées |

Vérifications à 360 px (largeur utile 320 px, affiche à 44 px) : « Loïc Morel » tient sur une ligne, « Ils me font confiance », « Un sujet Bitcoin à expliquer ? » et « Ce que je fais » tiennent en deux lignes, `info@pandul.fr` tient sur une ligne. Chaque titre est mesuré dans le navigateur à 360, 390, 768, 1024 et 1440 px pendant la construction.

Chargement : préchargement de Mona Sans (le titre), `font-display: swap`, et une police de repli calée sur ses mesures (`size-adjust`, `ascent-override`) pour que le titre ne déborde pas et ne saute pas pendant le chargement. Pas de texte sous 15 px. Chiffres tabulaires dans la réglette. Majuscules accentuées. Espaces insécables avant `:`, `;`, `!`, `?`. Tout est aligné à gauche.

## 7. Grille et cadre

- 12 colonnes, gouttière `clamp(16px, 1.6vw, 24px)`, marges extérieures égales `clamp(20px, 2.8vw, 40px)` des deux côtés, partout.
- Les grandes images (portrait, lettre, vidéo de Gerfaut, nom du pied de page) vont jusqu'au bord ; le texte garde toujours la marge.
- Écart entre sections : `clamp(112px, 13vw, 208px)` ; toujours plus grand que tout écart interne.
- Coins droits partout. Une seule forme de bouton : rectangle plein, 52 px de haut (48 px au moins au doigt).
- Points de rupture : 600, 960, 1200 px. L'accueil passe en deux colonnes à partir de 960 px ; à 768 px tout est empilé.

## 8. Les sections, une par une

Composition de chaque section, différente de sa voisine :

| Section | Ordinateur | Téléphone |
| --- | --- | --- |
| Accueil | Partage 50/50 : colonne texte, panneau portrait pleine hauteur | Nom, accroche, bouton, puis portrait (45svh au plus) |
| Clients | Pleine largeur : titre géant, mur des dix marques, bande de la réglette | Même ordre, marques en deux colonnes, réglette défilante |
| Ce que je fais | Titre collé à gauche, trois métiers qui défilent à droite | Empilé |
| Projets | Dictionnaire en partage (lettre en lignes à gauche) ; Gerfaut en bande vidéo pleine largeur | Empilé, lettre et vidéo pleine largeur |
| Contact + pied | Champ encre pleine largeur, adresse géante, nom en lignes sur toute la largeur | Même chose, nom sur deux lignes |

### Barre de navigation
Barre pleine couleur papier, 64 px (56 px sur téléphone), fixe : « Loïc Morel » à gauche, quatre liens (Clients, Activités, Projets, Contact), bouton « M'écrire ». Elle se cache quand on descend, revient quand on remonte. Le lien de la section en cours porte un trait de 2 px qui glisse. Sur téléphone : le nom et un bouton « Menu » qui ouvre un `<dialog>` plein écran en champ encre, liens en affiche, entrée décalée de 60 ms, fermeture par Échap. Les ancres ont `scroll-margin-top: 80px`.

### Accueil
```
┌──────────────── colonne papier ───────────────┬──────────── panneau papier ──────────┐
│ Loïc Morel   Clients Activités…   [M'écrire]  │ ── ── ─── ── ──── ── ─── ──          │
│                                               │ ─── lignes de titres réels ──        │
│ LOÏC                                          │ ── qui dessinent le visage ───       │
│ MOREL          (h1, affiche, 2 lignes)        │ ────── (environ 120 lignes) ──       │
│                                               │        ( loupe : les mots            │
│ Rédacteur technique spécialisé sur Bitcoin,   │          deviennent lisibles )       │
│ et développeur.               (accroche)      │                                      │
│ J'écris des tutoriels… (texte)                │                                      │
│ [M'écrire]  Voir mes clients                  │ Mon visage, écrit avec les titres de │
│                                               │ mes 246 contenus.        (légende)   │
└───────────────────────────────────────────────┴──────────────────────────────────────┘
```
Le portrait est recadré sur la tête et les épaules, le t-shirt blanc donne des lignes fines (pas un aplat). Au défilement, le portrait se défait : ses lignes se redressent et s'égalisent jusqu'à n'être plus qu'une page de texte, et il se reforme quand on remonte. Téléphone : nom, accroche, bouton, puis le portrait pleine largeur sur 45svh au plus.

### Ils me font confiance (pleine largeur, papier)
```
ILS ME FONT CONFIANCE                    (affiche ; les deux moitiés glissent l'une vers l'autre au défilement)
Depuis 2021, j'écris, je documente… (accroche)

Depuis 2026   [second]        [Liana]         [wizardsardine]          marques à 56 px de haut
              Bark : portefeuille,  Documentation du   Rédaction technique
              SDK, barkd, Bark Pay  portefeuille       pour le blog
De 2021 à 2025 [PLAN ₿ ACADEMY] [Bitstack] Space Kek [Découvre Bitcoin] [Cryptoast] [Grand Angle] How to Bitcoin
              104 tutoriels…   81 articles  44 épisodes  …                marques à 36 px de haut

246 contenus publiés  (h3)
« Titre du contenu lu »  Bitstack, article                    [Ouvrir]   (lecture, au-dessus des traits)
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||   (réglette)
Plan ₿ Academy          Bitstack            Space Kek       Découvre…     (noms des groupes)
▸ Voir la liste des 246 contenus   (details, liens réels)
```
- Les dix marques sont toujours visibles, en encre, sans cadre ni carte. Les huit logos officiels sont recolorés en encre par masque CSS ; Space Kek et How to Bitcoin, sans fichier vectoriel, sont redessinés en SVG d'après leurs images (Montserrat ExtraBold, Ubuntu Bold Italic). Chaque marque est un lien vers le site du client, avec son travail et son compteur réel dessous. Les clients depuis 2026 sont plus grands que les clients historiques : deux niveaux, pas une grille uniforme.
- Liana et Wizard Sardine sont deux entrées distinctes.
- **Réglette, ordinateur (960 px et plus)** : 246 traits sur toute la largeur (environ 5,5 px par trait), groupés par client dans l'ordre de la liste. Les traits proches du curseur grandissent (effet Dock). La lecture au-dessus affiche le titre (surligné en jaune), le client et le type ; « Ouvrir » est un vrai lien `<a>` mis à jour en direct ; un clic sur la réglette ouvre aussi le contenu.
- **Réglette, téléphone et tablette (moins de 960 px)** : une piste qui défile horizontalement avec ses traits espacés de 8 px, aimantés un par un (`scroll-snap`), sous un repère central fixe. Le contenu sous le repère s'affiche au-dessus de la piste, donc jamais sous le doigt. `touch-action: pan-x` sur la piste seulement. Les noms des groupes défilent avec la piste.
- **Clavier** : la réglette est un `role="slider"` : flèches pour un contenu, Page précédente et Page suivante pour sauter d'un client à l'autre, Début et Fin ; `aria-valuetext` donne le titre et le client. Le lien « Ouvrir » suit.
- **Liste complète** : un `<details>` « Voir la liste des 246 contenus » donne tous les liens, groupés par client (lecteurs d'écran, référencement, et sans JavaScript).

### Ce que je fais (titre collé à gauche, papier)
Le titre et l'accroche restent collés à gauche (colonnes 1 à 4) pendant que les trois métiers défilent à droite (colonnes 6 à 12), chacun avec sa preuve réelle :
- **Rédaction et pédagogie** : trois chiffres en pas Titre (185 tutoriels et articles, 6 formations, 55 podcasts, vidéos et interviews), puis les 6 formations Plan ₿ Academy en liste de liens (code du cours et titre). Au survol d'une formation, sa couverture apparaît près du curseur, traitée en encre (bichromie encre et papier) ; pas de rangée de cartes.
- **Documentation technique** : la capture de la documentation de Bark Pay sur une plaque, légendée.
- **Développement** : Gerfaut et minisign, et la vraie commande de vérification dans un bloc de code sur plaque.
- **Et aussi** : relecture, parcours de formation, ligne éditoriale, formats de livraison, en une phrase.

### Projets
- **Dictionnaire de Bitcoin** (partage) : à gauche, un panneau dessine en lignes la **lettre initiale** du terme affiché, géante (au moins 40 lignes dans la hauteur de la lettre). À droite : titre, texte, carte de définition (terme surligné, définition réelle, « Lire la définition complète », « Une autre définition »), bouton « Ouvrir le dictionnaire ». Une autre définition : la lettre se recompose. Sans JavaScript, la première définition est déjà dans le HTML.
- **Gerfaut** (bande pleine largeur) : la vidéo réelle du premier lancement, recadrée sur la fenêtre de l'application (sans le fond d'écran flou), pleine largeur. Au défilement, des stores couleur papier s'ouvrent ligne par ligne pour la révéler, et se referment si l'on remonte. Dessous : texte, bouton « Découvrir Gerfaut », capture Android à côté. Un bouton Pause est posé sur la vidéo (WCAG 2.2.2). Si le mode économie d'énergie bloque la lecture automatique, l'image d'affiche reste et le bouton devient Lecture.

### Contact et pied de page (champ encre)
- Titre « Un sujet Bitcoin à expliquer ? », une phrase, l'adresse `info@pandul.fr` au pas Affiche (lien `mailto:`), un bouton « Copier l'adresse » qui confirme « Adresse copiée » (`aria-live`). Puis X, GitHub, Lightning, Marseille en deux colonnes.
- « Loïc Morel » sur toute la largeur, dessiné en lignes papier sur l'encre (au moins 30 lignes par lettre ; sur deux lignes sous 600 px). Chaque lettre réagit seule : au survol ou sous le doigt, ses lignes s'écartent et s'épaississent, puis reviennent avec un ressort. Le nom en lignes est décoratif (`aria-hidden`).
- © 2021-2026 Ei Loïc Morel (Pandul), 96 Rue Paradis, 13006 Marseille ; la clé minisign ; les liens.

## 9. Le moteur de lignes

- **WebGL 1 écrit à la main** (environ 300 lignes), un shader de lignes partagé. Pour chaque pixel : on calcule la ligne à laquelle il appartient, on lit la figure (portrait, lettre ou nom) au centre de cette ligne, on en déduit l'épaisseur, on coupe la ligne en mots (gabarit des mots tiré du texte réel), on applique la loupe ou l'écartement, l'anticrénelage se fait sur un pixel.
- **Réglages** :

| Panneau | Pas des lignes (ordinateur / téléphone) | Épaisseur min / max (en fraction du pas) | Figure |
| --- | --- | --- | --- |
| Portrait | 7 px / 6 px (≈ 120 et 64 lignes) | 0,08 / 0,78 | Photo noir et blanc, courbe de tons 10–235, gamma 0,9, épaisseur = ombre |
| Lettre du dictionnaire | 7 px / 5 px | 0,10 / 0,80 | Lettre en Mona Sans 860 / 75 %, 80 % de la hauteur du panneau |
| Nom du pied de page | 6 px / 3,5 px | 0,10 / 0,82 | « Loïc Morel » en Mona Sans 860 / 75 % |

- **Trois panneaux, trois canevas.** Chacun ne crée son contexte WebGL qu'à l'approche de l'écran et le libère quand il en est loin : au chargement, seul le portrait existe. J'écarte un canevas unique fixé à l'écran (proposé par le relecteur) : sur téléphone, le défilement natif déplace la page sur le compositeur alors que le canevas ne suit qu'à l'image suivante, et le dessin « flotte » d'une image derrière le texte. Densité de pixels plafonnée à 1,5 ; perte de contexte gérée ; démarrage après le premier affichage, quand le navigateur est libre.
- **Sans WebGL ou sans JavaScript** : le panneau affiche la vraie photo en bichromie encre et papier (CSS), la lettre et le nom en texte plein. Avec JavaScript et WebGL, aucune image n'est montrée avant le canevas : pas de bascule photo puis lignes. L'élément principal du premier affichage est le titre HTML.

## 10. Système de mouvement

Tout ce qui bouge sert à **dessiner** (les lignes forment une image), **répondre** (au curseur, au doigt, au clic) ou **orienter** (dire où l'on est). Rien ne bouge pour décorer.

### Courbes et durées
| Nom | Valeur | Usage |
| --- | --- | --- |
| Sortie | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrées, recomposition, apparitions |
| Aller-retour | `cubic-bezier(0.65, 0, 0.35, 1)` | Menu |
| Ressort | raideur 170, amortissement 16 | Loupe, lettres du pied de page, boutons magnétiques |
| Réponse | 160 ms | Survol de lien, pression de bouton (échelle 0,97) |
| Interface | 320 ms | Menu, copie, changement de contenu lu |
| Entrée | 760 ms, décalage 70 ms | Titre, texte, image de chaque section ; montée de 24 px et opacité, une fois |
| Recomposition | 1 100 ms | La lettre du dictionnaire qui change |
| Tracé d'accueil | 1 600 ms | Les lignes du portrait s'écrivent de gauche à droite, une par une |

### Moments liés au défilement (réversibles, calés sur la position)
1. **Le portrait se défait** quand on quitte l'accueil : ses lignes se redressent en page de texte ; il se reforme quand on remonte.
2. **Le titre « Ils me font confiance »** : ses deux moitiés glissent l'une vers l'autre (translation seule) et s'alignent quand le titre atteint le tiers haut de l'écran.
3. **La réglette** se remplit : ses 246 traits poussent en vague de gauche à droite à mesure que la bande entre.
4. **Les stores de Gerfaut** s'ouvrent ligne par ligne sur la vidéo.
5. **Le nom du pied de page** s'écrit ligne par ligne à son arrivée.

### Moments déclenchés
- **Chargement** (le seul grand moment non sollicité) : les lettres du nom montent derrière un masque, le portrait s'écrit ligne par ligne.
- **Entrées de section** : titre, texte, image, décalés. Le contenu est visible sans JavaScript ; l'animation n'est ajoutée que si le script tourne.
- **Réponses** : loupe, Dock de la réglette, recomposition de la lettre, lettres du pied de page, boutons magnétiques, trait sous les liens, copie de l'adresse.

### Défilement doux
Lenis sur ordinateur à souris seulement ; désactivé au toucher et sous `prefers-reduced-motion`. Les ancres passent par Lenis avec le décalage de la barre. Aucune section épinglée qui confisque le défilement.

### Mouvement réduit (`prefers-reduced-motion: reduce`)
Pas de tracé (le portrait apparaît dessiné), pas de défilement doux, aucun des cinq moments liés au défilement (chacun est montré dans son état final : portrait formé, titre aligné, réglette pleine, stores ouverts, nom écrit), pas de vidéo en lecture automatique, entrées sans déplacement, recomposition remplacée par un fondu de 200 ms. La loupe reste, car elle ne bouge que sous la main de l'utilisateur.

### Performance (objectif 60 images par seconde)
Seulement `transform` et `opacity` dans le DOM ; les lignes sont calculées par le processeur graphique. Une seule boucle `requestAnimationFrame` pour tout le site, qui s'arrête quand rien ne bouge, quand l'onglet est caché et pour les panneaux hors écran. Écouteurs passifs. Le script est un module différé ; Lenis (environ 6 Ko compressé) est chargé seulement s'il sert.

## 11. Interactions : souris, doigt, clavier

| Élément | Souris | Doigt | Clavier |
| --- | --- | --- | --- |
| Portrait | Loupe de lecture qui suit le curseur : les lignes y deviennent des mots lisibles, agrandis | Glisser le doigt promène la loupe ; un toucher la pose 2 s à cet endroit. `touch-action: pan-y` : le défilement vertical reste libre | Décoratif (`aria-hidden`) ; la légende dit ce qu'il montre |
| Marques des clients | Survol : la marque passe au surligneur ; lien vers le client | Toucher : lien | Tab, anneau de focus |
| Réglette | Dock, lecture, clic pour ouvrir | Piste défilante aimantée, repère central, lecture au-dessus | `slider` : flèches, pages, Début, Fin ; lien « Ouvrir » |
| Formations | La couverture apparaît près du curseur | Liens simples | Liens simples |
| Lettre du dictionnaire | « Une autre définition » la recompose ; elle réagit au curseur comme le portrait (écartement des lignes) | Bouton | Bouton |
| Vidéo de Gerfaut | Stores au défilement, bouton Pause | Pareil | Bouton Pause |
| Nom du pied de page | Survol d'une lettre : ses lignes s'écartent avec un ressort | Glisser le doigt sur le nom | Décoratif |
| Boutons principaux | Attraction magnétique (8 px au plus), pression | Pression | Anneau de focus |
| Liens | Un trait se trace sous le lien | — | Anneau de focus |
| Copier l'adresse | « Adresse copiée » 2 s | Pareil | Entrée, annonce `aria-live` |

Anneau de focus : 3 px, décalé de 3 px, en encre sur papier et en papier sur encre (8,72:1 dans les deux cas). Pas de curseur personnalisé. Cibles tactiles de 44 × 44 px au moins.

## 12. Pile technique et contraintes

- **Jekyll**, tel quel : GitHub Pages le construit sans étape supplémentaire, et c'est lui qui produit les 1 454 pages de redirection du dictionnaire (collection `redirections`, mise en page `redirection-dictionnaire`), qui ne bougent pas.
- **HTML, CSS et JavaScript sans framework**, modules natifs servis tels quels, sans étape de build.
- **WebGL 1 maison** pour les trois panneaux ; **Lenis** (MIT) copié dans le dépôt.
- **Polices, images, scripts auto-hébergés** : la CSP de Cloudflare n'autorise que le domaine (`script-src 'self' 'unsafe-inline'`, `img-src 'self' data:`, `font-src 'self'`, pas de `blob:`). Les SVG des logos sont chargés depuis le domaine et dessinés dans un canevas sans le « teinter ». Les attributs `style` sont permis (`style-src 'unsafe-inline'`).
- **Données** : la réglette et la liste lisent `_data/ecrits.yml`, `_data/formations.yml` et `_data/audio-video.yml` au moment du build (Liquid → JSON dans la page). Ordre : celui des clients dans la liste, puis l'ordre des fichiers.
- **Vidéo** : recadrée avec ffmpeg sur la fenêtre de Gerfaut, H.264, image d'affiche en WebP, `muted playsinline loop`, chargée seulement à l'approche (`preload="none"`).
- **Carte de partage** (Open Graph) refaite dans la nouvelle identité.
- Objectifs mesurés : Lighthouse mobile performance ≥ 90 et accessibilité ≥ 95, aucun défilement horizontal de 360 à 1440 px, 0 échec à l'inspecteur de design-taste-frontend.

## 13. Critique de la version 1 et corrections

| Objection du relecteur | Correction |
| --- | --- |
| Des lignes horizontales ne savent pas dessiner des logos-mots (8 sur 10) ni un long terme | Logos en vrai SVG, terme en HTML. Les lignes ne dessinent que des formes grandes : visage, lettre géante, nom (au moins 30 lignes par lettre). |
| Le bleu est celui de Tailwind et de Cloudflare ; un aplat bleu à formes blanches fait Coinbase | Encre `#183F8F`, désaturée, comparée aux références ; le bleu devient l'encre du texte sur papier, un seul aplat (Contact). Section Nuit supprimée. |
| Le portrait en lignes claires sur bleu perd les cheveux et la barbe, le t-shirt fait un aplat, risque de « billet de banque » | Encre sur papier (épaisseur = ombre), recadrage tête et épaules, lignes coupées en mots tirés de ses 246 titres, loupe qui les rend lisibles. |
| « Ils me font confiance » trop bas, logos jamais visibles ensemble, rotation automatique non conforme | Deuxième section, dix marques visibles d'un coup, plus de rotation. |
| Réglette inutilisable au doigt | Piste défilante aimantée sous 960 px, 8 px par trait, repère central, lecture au-dessus, groupes nommés, clavier complet, liste complète. |
| Cinq contextes WebGL | Trois panneaux, contextes créés à l'approche et libérés, DPR plafonné, démarrage différé. Canevas unique écarté (raison en section 9). |
| Saut de mise en page au chargement des polices | Polices réduites aux axes utilisés, préchargement, repli calé sur les mesures. |
| Accueil téléphone raté (nom à 587 px) | Nom d'abord, portrait à 45svh au plus après le bouton. Tous les titres mesurés à 360 px. |
| Monotonie des partages gauche-droite | Six compositions différentes (section 8), dont la bande vidéo et la bande de réglette pleine largeur. |
| Images qui jurent (couvertures orange, vidéo sur fond flou) | Formations en liste avec couverture au survol traitée en encre ; captures sur plaque ; vidéo recadrée. |
| Lacunes d'accessibilité | Anneau de focus défini par fond, canevas `aria-hidden` avec légende, `touch-action` et écouteurs passifs, plaque plus marquée. |
| Peu d'animation liée au défilement | Cinq moments réversibles calés sur la position (section 10). |

## 14. Ressources

Disponibles : portrait de Loïc (noir et blanc et couleur), vidéo et capture de Gerfaut, marque de Gerfaut (`gerfaut-meta/brand/logo/gerfaut-mark.svg`), capture de la documentation de Bark Pay, couvertures des 6 formations, logos de 8 clients sur 10, 165 définitions extraites du dictionnaire.

Manquantes (remplacées proprement, listées dans le rapport) : logos de Space Kek et de How to Bitcoin (nom composé en Mona Sans) ; adresse définitive du dictionnaire (`dictionnaire_url` provisoire).

## 15. Écarts entre cette direction et la construction

Ce qui a changé en construisant, et pourquoi :

- **Portrait** : la photo noir et blanc avait un fond du même gris que la barbe (≈ 40 sur 255), aucune courbe ne les séparait. Le portrait vient donc de la photo couleur (fond bleu), détourée par la couleur, posée sur un fond uni de valeur moyenne. Les blancs entre les mots se referment dans les zones sombres pour garder le modelé du visage.
- **Défaire le portrait au défilement** : il ne commence que quand le panneau sort par le haut de l'écran (sinon, sur téléphone, le visage se défaisait alors qu'on le regardait encore).
- **Contextes WebGL** : créés à l'approche, mais jamais libérés ; hors écran, le panneau garde sa dernière image et ne dessine plus. Trois contextes au plus.
- **Rendu logiciel** (pas de carte graphique) : densité de pixels 1, pour ménager le processeur.
- **Réglette, clic** : un clic fixe la sélection (comportement d'un curseur) ; c'est le lien « Ouvrir » qui ouvre le contenu.
- **Formations** : une liste avec une vignette traitée en encre pour chaque cours, visible partout, au lieu d'une couverture qui suit le curseur (invisible au doigt).
- **Contact** : une vraie photo de Loïc, en bichromie encre, dont le fond se fond dans le champ bleu.
- **Lettres du pied de page** : la lettre survolée se remplit et passe au jaune ; l'écartement vertical créait des coutures dans les lignes du fond, il a été retiré.
- **Logos de Space Kek et How to Bitcoin** : leur nom composé en Mona Sans et converti en tracé SVG, pour qu'ils aient la même présence que les autres marques (à remplacer par les vrais logos).
- **Jaune** : il surligne aussi le survol des boutons, des marques et de l'adresse e-mail, et le métier en cours dans l'index de « Ce que je fais ».
- **Index des trois métiers** dans la colonne collée de « Ce que je fais » (à partir de 1200 px de large et 800 px de haut) : le métier lu est surligné, pour que la colonne épinglée change à chaque écran.
- **CSS** : insérée dans le `<head>` (deux pages seulement), polices préchargées. Lighthouse mobile passe de 89 à 96 (serveur compressé comme GitHub Pages) et 93 (serveur Python brut).
