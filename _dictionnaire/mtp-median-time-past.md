---
title: "MTP - MEDIAN TIME PAST"
slug: "mtp-median-time-past"
permalink: /dictionnaire/mtp-median-time-past/
category: "PROTOCOLE"
letter: "M"
layout: definition
french_term: "TEMPS MÉDIAN PASSÉ"
category_slug: "protocole"
prev_in_category:
  title: "MODÈLE DE TRANSACTION"
  slug: "modele-de-transaction"
next_in_category:
  title: "NAT - NETWORK-ADJUSTED TIME"
  slug: "nat-network-adjusted-time"
cross_references:
  - title: "TIMELOCK"
    slug: "timelock"
  - title: "NLOCKTIME"
    slug: "nlocktime"
---

Concept utilisé dans le protocole Bitcoin pour déterminer une marge sur l'horodatage consensuel du réseau. Le MTP est défini comme la médiane des horodatages des 11 derniers blocs minés. L'utilisation de cet indicateur permet d'éviter les désaccords entre les nœuds sur l'heure exacte en cas de décalage. Le MTP était initialement utilisé pour vérifier la validité de l'horodatage des blocs par rapport au passé. Depuis le BIP-0113, il est également utilisé comme référentiel du temps du réseau pour vérifier la validité des opérations de verrouillages temporels (`nLockTime`, `OP_CHECKLOCKTIMEVERIFY`, `nSequence` et `OP_CHECKSEQUENCEVERIFY`).