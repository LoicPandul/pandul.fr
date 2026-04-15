---
title: "WITNESS TRANSACTION"
slug: "witness-transaction"
permalink: /dictionnaire/witness-transaction/
category: "RGB"
letter: "W"
layout: definition
category_slug: "rgb"
prev_in_category:
  title: "VALENCY"
  slug: "valency"
cross_references:
  - title: "SINGLE-USE SEAL"
    slug: "single-use-seal"
  - title: "MULTI PROTOCOL COMMITMENT"
    slug: "multi-protocol-commitment"
---

Dans le cadre du protocole RGB, la Witness Transaction désigne la transaction Bitcoin qui clôt le Single-use Seal autour d'un message intégrant un Multi Protocol Commitment (MPC). Cette opération consiste à dépenser un UTXO existant, fermant ainsi le sceau précédent, tout en créant un nouvel output contenant un engagement vers une nouvelle définition de sceau, afin de verrouiller l'engagement contractuel inscrit dans le protocole. La Witness Transaction constitue donc une preuve on-chain que l'état du contrat RGB a été fixé à un instant précis.