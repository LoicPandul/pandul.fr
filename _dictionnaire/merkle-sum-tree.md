---
title: "MERKLE SUM TREE"
slug: "merkle-sum-tree"
permalink: /dictionnaire/merkle-sum-tree/
category: "INFORMATIQUE"
letter: "M"
layout: definition
cross_references:
  - title: "ARBRE DE MERKLE"
    slug: "arbre-de-merkle"
  - title: "TAPROOT ASSETS PROTOCOL"
    slug: "taproot-assets-protocol"
---

Variante d'un arbre de Merkle dans laquelle chaque nœud porte non seulement le hash des nœuds ou feuilles situés en dessous, mais également la somme de leurs valeurs. La racine de l'arbre contient ainsi le hash de l'ensemble des données et la somme totale de toutes les valeurs des feuilles. Cette structure permet de vérifier simultanément l'intégrité des données et la cohérence des montants. Dans le protocole Taproot Assets, les *Merkle Sum Trees* sont utilisés pour engager les soldes d'actifs dans la blockchain Bitcoin, garantissant qu'aucun actif ne peut être créé ou détruit sans modifier la racine de l'arbre.
