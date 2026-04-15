---
title: "ASSET SPLIT"
slug: "asset-split"
permalink: /dictionnaire/asset-split/
category: "COUCHE SUPÉRIEURE"
letter: "A"
layout: definition
french_term: "DIVISION D'ACTIFS"
category_slug: "couche-superieure"
prev_in_category:
  title: "ASSET PROOF"
  slug: "asset-proof"
next_in_category:
  title: "ATLC"
  slug: "atlc"
cross_references:
  - title: "TAPROOT ASSETS PROTOCOL"
    slug: "taproot-assets-protocol"
  - title: "ASSET MERGE"
    slug: "asset-merge"
---

Opération consistant à diviser un actif Taproot Assets en deux parties réparties dans des sorties Taproot distinctes. L'expéditeur met à jour le *Merkle-Sum Sparse Merkle Tree* de sa propre sortie en réduisant son solde, puis le destinataire construit un second arbre engagé dans une nouvelle sortie Taproot contenant les actifs reçus. Chaque transfert d'actifs entre détenteurs repose sur ce mécanisme de division. Les preuves d'actifs (*asset proofs*) doivent remonter jusqu'à la transaction de genèse pour attester la provenance des actifs après chaque *split*. C'est l'opération inverse d'un *asset merge*.