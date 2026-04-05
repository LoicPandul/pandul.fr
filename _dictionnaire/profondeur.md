---
title: "PROFONDEUR"
slug: "profondeur"
permalink: /dictionnaire/profondeur/
category: "PORTEFEUILLE"
letter: "P"
layout: definition
english_term: "DEPTH"
category_slug: "portefeuille"
prev_in_category:
  title: "PORTEFEUILLE CHAUD"
  slug: "portefeuille-chaud"
next_in_category:
  title: "PROTON WALLET"
  slug: "proton-wallet"
cross_references:
  - title: "DÉRIVATION"
    slug: "derivation"
  - title: "CHEMIN DE DÉRIVATION"
    slug: "chemin-de-derivation"
---

Dans le cadre des portefeuilles HD (déterministes et hiérarchiques), la profondeur désigne le niveau spécifique d'une clé (publique ou privée), d'un code de chaîne, d'une clé étendue ou d'une adresse dans la structure de dérivation du portefeuille depuis la clé maîtresse. Chaque niveau de cette structure peut être vu comme un étage dans un arbre de clés, où la clé maîtresse se trouve à la racine (profondeur 0) et les niveaux suivants définissent divers attributs tels que :
l'objectif (profondeur 1), le type de devise (profondeur 2), le compte (profondeur 3), le type de chaîne (profondeur 4), et l'index de l'adresse spécifique (profondeur 5). 

![](/assets/img/dictionnaire/profondeur/image-1.png)

Pour passer d'une profondeur à une suivante, on utilise un processus de dérivation depuis une paire de clés parents vers une paire de clés filles.

*On parle également parfois d' « étage de dérivation » plutôt que de profondeur.*