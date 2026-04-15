---
title: "OBJECTIF"
slug: "objectif"
permalink: /dictionnaire/objectif/
category: "PORTEFEUILLE"
letter: "O"
layout: definition
english_term: "PURPOSE"
category_slug: "portefeuille"
prev_in_category:
  title: "NUNCHUK"
  slug: "nunchuk"
next_in_category:
  title: "OPENDIME"
  slug: "opendime"
cross_references:
  - title: "CHEMIN DE DÉRIVATION"
    slug: "chemin-de-derivation"
---

Dans les portefeuilles déterministes et hiérarchiques (HD), l'objectif, défini par le BIP-0043, représente un niveau de dérivation spécifique. Cet index, situé à la première profondeur de l'arborescence de dérivation (`m / purpose' /`), identifie le standard de dérivation adopté par le portefeuille, afin de faciliter la compatibilité entre différents logiciels de gestion de portefeuille. Par exemple, dans le cas des adresses SegWit (BIP-0084), l'objectif est noté `/84'/`. Cette méthode permet d'organiser efficacement les clés entre les différents types d'adresses au sein d'un même portefeuille HD. Les index standards utilisés sont :
* Pour du P2PKH : `44'` ;
* Pour du P2WPKH-nested-in-P2SH : `49'` ;
* Pour du P2WPKH : `84'` ;
* Pour du P2TR : `86'`.

![](/assets/img/dictionnaire/objectif/image-1.png)
