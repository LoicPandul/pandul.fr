---
title: "RACINE DE MERKLE"
slug: "racine-de-merkle"
permalink: /dictionnaire/racine-de-merkle/
category: "CRYPTOGRAPHIE"
letter: "R"
layout: definition
english_term: "MERKLE ROOT"
category_slug: "cryptographie"
prev_in_category:
  title: "PSEUDO-ALÉATOIRE"
  slug: "pseudo-aleatoire"
next_in_category:
  title: "RANGEPROOFS"
  slug: "rangeproofs"
cross_references:
  - title: "ARBRE DE MERKLE"
    slug: "arbre-de-merkle"
---

Condensat ou « *top hash* » d'un arbre de Merkle, qui représente un résumé de toutes les informations présentes dans l'arbre. Un arbre de Merkle est une structure d'accumulateur cryptographique, parfois également nommée « arbre de hachage ». Dans le cadre de Bitcoin, des arbres de Merkle sont utilisés pour organiser les transactions dans un bloc et pour faciliter la vérification rapide de l'inclusion d'une transaction spécifique. Ainsi, dans les blocs Bitcoin, la racine de Merkle est obtenue en hachant de manière successive les transactions par paires jusqu'à ce qu'il ne reste qu'un seul hachage (la racine de Merkle). Cette dernière est ensuite incluse dans l'entête du bloc correspondant. On retrouve également cet arbre de hachage dans UTREEXO, une structure permettant de condenser l'UTXO set des nœuds, et dans le MAST Taproot.
