---
title: "TRANSACTION DE FINANCEMENT"
slug: "transaction-de-financement"
permalink: /dictionnaire/transaction-de-financement/
category: "LIGHTNING NETWORK"
letter: "T"
layout: definition
english_term: "FUNDING TRANSACTION"
category_slug: "lightning-network"
prev_in_category:
  title: "TRANSACTION D'ENGAGEMENT"
  slug: "transaction-d-engagement"
next_in_category:
  title: "TRANSACTION DE PÉNALITÉ"
  slug: "transaction-de-penalite"
cross_references:
  - title: "TRANSACTION D'ENGAGEMENT"
    slug: "transaction-d-engagement"
  - title: "CHANNEL POINT"
    slug: "channel-point"
---

Transaction Bitcoin on-chain qui marque l'ouverture d'un canal de paiement sur le Lightning Network. Elle envoie des fonds vers une adresse multisignature 2/2 contrôlée conjointement par les deux parties du canal. Ces fonds constituent la capacité totale du canal et ne peuvent être dépensés que si les deux participants signent ensemble.

Avant de publier la transaction de financement sur la blockchain, l'initiateur du canal construit d'abord une transaction d'engagement (*commitment transaction*) signée par les deux parties. Cette précaution garantit que l'initiateur pourra récupérer ses fonds même si son pair devient non coopératif. Le canal est considéré comme ouvert une fois que la transaction de financement est confirmée. Son identifiant de sortie (`txid:output_index`) constitue le *channel point*, qui sert de référence unique pour identifier le canal durant toute sa durée de vie.