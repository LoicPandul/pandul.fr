---
title: "DUAL FUNDING"
slug: "dual-funding"
permalink: /dictionnaire/dual-funding/
category: "LIGHTNING NETWORK"
letter: "D"
layout: definition
french_term: "FINANCEMENT DOUBLE"
category_slug: "lightning-network"
prev_in_category:
  title: "COOPERATIVE CLOSE"
  slug: "cooperative-close"
next_in_category:
  title: "ECLAIR"
  slug: "eclair"
cross_references:
  - title: "LIQUIDITÉS"
    slug: "liquidites"
  - title: "CHANNEL FACTORIES"
    slug: "channel-factories"
---

Lors de l'ouverture d'un canal Lightning, le *dual funding* permet aux deux participants d'y bloquer des bitcoins. Contrairement au modèle traditionnel où un seul nœud finance le canal, cette méthode permet aux deux parties de le financer, ce qui permet d'équilibrer ses liquidités immédiatement.

Le *dual funding* est inclus dans la version 2 du protocole de construction des canaux, qui utilise une phase de négociation. Les deux parties collaborent pour créer la transaction de financement en échangeant des messages pour ajouter ou retirer des bitcoins jusqu'à ce que la transaction soit finalisée.