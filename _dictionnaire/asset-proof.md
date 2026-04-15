---
title: "ASSET PROOF"
slug: "asset-proof"
permalink: /dictionnaire/asset-proof/
category: "COUCHE SUPÉRIEURE"
letter: "A"
layout: definition
french_term: "PREUVE D'ACTIF"
category_slug: "couche-superieure"
prev_in_category:
  title: "ASSET MERGE"
  slug: "asset-merge"
next_in_category:
  title: "ASSET SPLIT"
  slug: "asset-split"
cross_references:
  - title: "TAPROOT ASSETS PROTOCOL"
    slug: "taproot-assets-protocol"
---

Preuve cryptographique permettant de vérifier l'existence, la propriété et la provenance d'un actif émis via le protocole Taproot Assets. Une *asset proof* contient le script d'actif ainsi que le chemin dans le *Sparse Merkle Sum Tree* menant à la feuille du détenteur concerné. Le destinataire peut reconstruire partiellement l'arbre, tweaker la clé publique de l'émetteur et vérifier que la transaction de genèse existe bien sur la blockchain Bitcoin.