---
title: "BOLT-05"
slug: "bolt-05"
permalink: /dictionnaire/bolt-05/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "BOLT-04"
  slug: "bolt-04"
next_in_category:
  title: "BOLT-07"
  slug: "bolt-07"
cross_references:
  - title: "BOLT"
    slug: "bolt"
---

Spécification qui définit le comportement des nœuds Lightning lorsqu'un canal est fermé on-chain. Elle couvre trois scénarios : la fermeture coopérative, la fermeture unilatérale (publication d'une transaction d'engagement) et la fermeture par révocation (tentative de fraude). Le BOLT-05 détaille la résolution de chaque type de sortie (sorties locales, distantes, d'ancrage et HTLC), les règles de surveillance de la blockchain jusqu'à ce que tous les fonds soient irrévocablement résolus (100 blocs de profondeur), et les transactions de pénalité permettant de saisir la totalité des fonds du canal lorsqu'un ancien état révoqué est publié. La spécification précise également les mécanismes d'augmentation de frais (*fee bumping*) via les sorties d'ancrage.