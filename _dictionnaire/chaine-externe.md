---
title: "CHAINE EXTERNE"
slug: "chaine-externe"
permalink: /dictionnaire/chaine-externe/
category: "PORTEFEUILLE"
letter: "C"
layout: definition
english_term: "EXTERNAL KEYCHAIN"
category_slug: "portefeuille"
prev_in_category:
  title: "CAKE WALLET"
  slug: "cakewallet"
next_in_category:
  title: "CHAINE INTERNE"
  slug: "chaine-interne"
cross_references:
  - title: "CHEMIN DE DÉRIVATION"
    slug: "chemin-de-derivation"
---

Dans la dérivation des portefeuilles déterministes et hiérarchiques, la chaîne externe est une branche de dérivation utilisée pour générer des adresses de réception destinées à recevoir des paiements venus de l'extérieur, c'est-à-dire d'un autre portefeuille. Chaque compte tel que défini en profondeur 3 dispose de deux chaînes en profondeur 4 : une chaîne externe et une chaîne interne (également appelée « change »). La chaîne externe est dérivée avec un index de `/0/`.  La chaîne externe dérive des adresses destinées à être communiquées publiquement, c'est-à-dire les adresses que l'on nous propose lorsque l'on clique sur le bouton « recevoir » dans notre logiciel de portefeuille.

![](/assets/img/dictionnaire/chaine-externe/image-1.png)
