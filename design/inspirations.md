# Inspirations : ce qui rend chaque site fort, et ce que j'en prends

Méthode : chaque page ouverte avec Playwright sans écran (1440 × 900), une capture à l'arrivée, une après un balayage de la souris, trois après défilement, et une vidéo de la session. Pour les fiches recent.design, la vidéo de démonstration a été téléchargée et découpée en images avec ffmpeg (planches de 6 images). Pour les fiches Awwwards et Brutalist Websites, j'ai aussi capturé le site réel.

Fichiers de travail (non versionnés) : `.taste-skill/inspirations/` (captures, `frames/` pour les planches et images extraites, `videos/` pour les vidéos sources, `rec/` pour les enregistrements de session).

## Les douze inspirations de Loïc

### 1. Earth Timeline (recent.design/i/l9294qq)
- **Mise en page** : un seul objet au centre (un globe 3D), un titre de deux mots dessous, une réglette de graduations en bas. Rien d'autre à l'écran.
- **Typographie** : deux tailles seulement, la date en gras et la légende en gris à côté (« 4.6 billion years ago / Protoplanet »).
- **Motion** : le globe change de surface et de couleur à chaque ère ; la transition est un fondu de matière, pas un glissement.
- **Souris** : la réglette est faite de traits verticaux ; ceux qui sont proches du curseur grandissent, comme le Dock de macOS. On fait défiler 13,8 milliards d'années en glissant.
- **Ce que j'en prends** : la réglette de traits qui grandissent sous le curseur. Chez Loïc, chaque trait sera une publication réelle (246 au total, tirées de `_data`), et glisser dessus lit leur titre.

### 2. Krea Agent Onboarding (recent.design/i/t865vsj)
- **Mise en page** : une fenêtre modale au centre, des images qui flottent autour en désordre contrôlé, puis l'interface se range en grille quand on avance.
- **Typographie** : sobre, petite, l'image porte tout.
- **Motion** : les images d'arrière-plan s'envolent et se recomposent entre les étapes, transitions longues et douces.
- **Souris** : survol simple ; c'est la chorégraphie entre étapes qui marque.
- **Ce que j'en prends** : l'idée qu'un même ensemble d'éléments se recompose d'une étape à l'autre au lieu d'être remplacé. Chez Loïc, ce sont les lignes du panneau qui se recomposent d'une figure à la suivante.

### 3. Crumple Changelog (recent.design/i/94h2ciu)
- **Mise en page** : une affiche par mise à jour, centrée, une réglette en dessous, un titre de site en serif à gauche.
- **Typographie** : chaque affiche a sa propre typo manuscrite très grasse ; contraste avec le titre classique du site.
- **Motion** : l'affiche se froisse en boule de papier en 3D quand on passe à la suivante. La matière (papier, grain) rend la transition physique.
- **Souris** : on glisse la réglette pour froisser ; un clic sur l'affiche passe à la suivante.
- **Ce que j'en prends** : une transition qui a une matière. Chez Loïc la matière est la ligne : les figures ne se fondent pas, leurs lignes s'épaississent, se tordent et se redressent.

### 4. Fallengrey Studio (recent.design/i/3lhe3e6)
- **Mise en page** : un nom minuscule au centre au chargement, puis une couronne de projets en orbite ; une rangée de logos clients en bas.
- **Typographie** : quasi absente, petite, en minuscules.
- **Motion** : la couronne tourne et se défait en carrousel plat quand on change de mode.
- **Souris** : le curseur fait tourner la couronne ; clic pour ouvrir un projet.
- **Ce que j'en prends** : les logos clients toujours visibles et calmes, en monochrome, sans cadre. Pas la couronne 3D (trop d'images de projets qu'on n'a pas).

### 5. Cloudflare Customer Story Cards (recent.design/i/q1jsa1k)
- **Mise en page** : des cartes hautes, le logo du client en haut, une phrase en bas, et au milieu le logo redessiné en barres verticales animées.
- **Typographie** : une seule taille de phrase, blanc sur fond plein.
- **Motion** : les barres changent de hauteur et de luminosité en continu, si bien que le logo semble respirer.
- **Souris** : des poignées permettent de redimensionner les zones (c'est une démo d'outil), le fond suit.
- **Ce que j'en prends** : c'est la source directe du concept. Une image (portrait, logo, lettre) se dessine par des lignes dont l'épaisseur suit la luminosité. Chez Loïc les lignes sont horizontales, comme des lignes de texte, et elles réagissent au curseur.

### 6. Animated Footer Logo (recent.design/i/96clvkf)
- **Mise en page** : un pied de page classique (colonnes de liens) et, dessous, le nom de la marque en lettres géantes sur toute la largeur.
- **Typographie** : les lettres sont dessinées en contour gris, avec leurs points de Bézier visibles.
- **Motion** : au survol, une lettre se remplit d'un coup en couleur vive, puis s'éteint.
- **Souris** : chaque lettre réagit seule, ce qui invite à balayer le mot.
- **Ce que j'en prends** : le nom « Loïc Morel » en lettres géantes dans le pied de page, chaque lettre faite de lignes. Au survol (ou au doigt), les lignes de la lettre s'écartent puis se resserrent avec un ressort, et la lettre se remplit.

### 7. The Design Office (recent.design/i/6h05y5p)
- **Mise en page** : fond blanc, nom du studio en trois lignes au centre du haut, quatre liens aux coins ; les projets défilent un par un au centre, très petits, beaucoup d'air.
- **Typographie** : une grotesque neutre en petit corps, centrée.
- **Motion** : chaque projet entre en douceur, l'objet présenté en photo détourée, puis un plein écran photo.
- **Souris** : une étiquette suit le curseur avec le nom du projet survolé.
- **Ce que j'en prends** : la retenue autour d'un seul objet fort, et l'étiquette contextuelle près du curseur (reprise dans la réglette des publications).

### 8. Alim Joldaspayev (recent.design/i/ltdfyfe)
- **Mise en page** : le site est une toile de Figma : chaque page est un cadre avec ses poignées de sélection, et deux curseurs nommés (« Client », « Alim ») se promènent dessus.
- **Typographie** : un nom très gras, serré, puis des titres courts.
- **Motion** : la caméra glisse d'un cadre à l'autre ; galerie de projets en perspective 3D.
- **Souris** : le vrai curseur cohabite avec des curseurs simulés, ce qui raconte la collaboration.
- **Ce que j'en prends** : un concept tiré du métier lui-même (l'outil du designer devient l'interface). Chez Loïc, le métier est la ligne écrite, et le site est dessiné en lignes.

### 9. Relevo & Vinco (awwwards.com/sites/relevo-vinco, site réel relevovinco.com)
- **Mise en page** : tout le site est une feuille de carton kraft ; les titres sont embossés dans la matière, en capitales grasses, ferrés à gauche ; un paragraphe court à droite.
- **Typographie** : une grotesque très grasse en capitales, avec des phrases-manifestes courtes (« Ink fades. Foil peels. Pressure stays. »).
- **Motion** : au défilement, les lignes du titre passent de creusées à saillantes, une à une ; la lumière rasante bouge.
- **Souris** : la lumière suit le curseur et fait jouer le relief.
- **Ce que j'en prends** : le concept est la matière du client (le carton pressé), poussé partout. Chez Loïc, la matière est la ligne. Et des phrases-titres courtes et affirmées.

### 10. David Estrada (awwwards.com/sites/david-estrada, site réel david-estrada.dev)
- **Mise en page** : un nom gigantesque qui déborde en bas de l'écran ; des icônes 3D d'outils posées autour ; puis « Selected work » en très grand avec les projets qui passent devant.
- **Typographie** : grotesque très grasse, tracking serré, mots qui débordent.
- **Motion** : les études de cas glissent par-dessus le titre géant ; les icônes flottent.
- **Souris** : pastilles magnétiques, étiquette « Visit my profile » qui suit le curseur.
- **Ce que j'en prends** : l'échelle (titres de section énormes) et les boutons magnétiques. Pas les icônes 3D gonflées.

### 11. Malte Gruhl (brutalistwebsites.com/raw/maltegruhl.com, site réel maltegruhl.com)
- **Mise en page** : l'interview Brutalist est une colonne de texte serrée, de grands blocs d'images en noir et blanc, et un titre « RAW » énorme. Le site du studio : grandes vidéos en plein cadre, barre de navigation minuscule centrée.
- **Typographie** : capitales grasses, contraste brutal entre très grand et très petit.
- **Motion** : vidéos en boucle (textures, métal), projets qui défilent comme des affiches.
- **Souris** : peu d'effets ; la force tient aux images en mouvement.
- **Ce que j'en prends** : le contraste d'échelle franc, et au moins une image en mouvement réelle (la vidéo de Gerfaut).

### 12. dAPP BOI (dappboi.com)
- **Mise en page** : un bandeau défilant en haut et en bas, un titre énorme au centre, un rectangle bleu électrique derrière un portrait.
- **Typographie** : mélange d'une grotesque et d'une fonte pixel pour le nom.
- **Motion** : bandeaux continus ; les services sont des bulles bleues.
- **Souris** : peu.
- **Ce que j'en prends** : un portrait traité par un procédé graphique au lieu d'une simple photo, et un bleu franc qui occupe une surface entière. Pas le bandeau défilant ni le vocabulaire crypto.

## Recherche complémentaire : Sites of the Day récents (octobre et septembre 2026)

Liste lue sur awwwards.com/websites/sites_of_the_day le 25 octobre 2026, puis sites réels capturés.

- **Brandon Yasin** (SOTD 24 oct. 2026, brandonyasin.com) : une frise horizontale de photos de campagnes qui défile ; l'heure locale en direct dans la barre ; une signature manuscrite comme logo. À retenir : une donnée vivante (l'heure) dans un en-tête par ailleurs immobile.
- **Huy Phan Vol. 2** (SOTD 14 oct. 2026, huyml.co) : intro avec une illustration du designer qui pousse son nom hors de l'écran ; projets en cartes inclinées dans un tunnel, gros numéros flous. À retenir : un personnage qui interagit avec le nom ; à éviter : la numérotation géante 05/08.
- **Maria Vasilyeva** (SOTD 9 oct. 2026, mariavasilyeva.com) : une frise de vignettes de projets sur une ligne horizontale, qui s'ouvre en collage quand on la survole ; une ligne verticale fixe sert de tête de lecture. À retenir : la ligne comme tête de lecture d'une collection.
- **Jesper Landberg** (SOTD 29 sept. 2026, jesperlandberg.com) : projets sur un ruban courbe en 3D au-dessus d'une grille en perspective. À retenir : la qualité du WebGL ; à éviter : la grille de lignes (cliché).
- **Meer Mohsin** (SOTD 26 sept. 2026, meermohsin.me) : site 3D chargé, encore du lorem ipsum en ligne. Contre-exemple : l'effet ne remplace pas le contenu.
- **Nick Ho** (SOTD 11 oct. 2026, nickho-motorsports.nl), étudié par la bibliothèque du skill : les objets du métier du pilote deviennent la navigation (le numéro de voiture, le casque, le calendrier comme circuit). À retenir : le même principe, appliqué au métier de Loïc.

## Ce que je retiens pour pandul.fr

1. **Un procédé graphique tiré du métier, poussé partout** (Relevo & Vinco, Alim Joldaspayev, Nick Ho). Le métier de Loïc s'écrit en lignes : lignes de texte, lignes de code, et la chaîne de blocs, une seule ligne qui ne casse jamais. Le site sera dessiné en lignes.
2. **Une image faite de lignes qui réagissent au curseur** (Cloudflare Cards) : le portrait de Loïc, les logos des clients, le nom dans le pied de page.
3. **La réglette de traits qui grandissent sous le curseur** (Earth Timeline, Crumple) : la preuve de « Ils me font confiance », une publication par trait.
4. **Le nom géant et interactif en pied de page** (Animated Footer Logo).
5. **Des transitions qui ont une matière** (Crumple, Krea) : les lignes se recomposent d'une figure à l'autre.
6. **L'échelle** (David Estrada, Malte Gruhl) : des titres de section énormes face à un texte courant sobre.
7. **À éviter** : la grille de lignes en perspective, les gros numéros d'index, le bandeau défilant, les icônes 3D gonflées, le lorem ipsum, et tout ce qui rappelle le noir et vert de Liana, le noir de Wizard Sardine ou le blanc et DM Sans de Second.
