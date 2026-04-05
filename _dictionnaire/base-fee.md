---
title: "BASE FEE"
slug: "base-fee"
permalink: /dictionnaire/base-fee/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
french_term: "FRAIS DE BASE"
cross_references:
  - title: "FEE RATE - LIGHTNING"
    slug: "fee-rate-lightning"
  - title: "MILLISATOSHI"
    slug: "millisatoshi"
---

Composante fixe des frais de routage sur le Lightning Network. Lorsqu'un nœud transmet un paiement pour le compte d'un autre, il peut prélever des frais composés de deux parties : le *base fee*, un montant constant facturé pour chaque paiement routé indépendamment de son montant, et le *fee rate*, une part proportionnelle au montant transféré. Le *base fee* est exprimé en millisatoshis et vaut typiquement 1 000 msat (soit 1 satoshi). Il est configurable par l'opérateur du nœud pour chaque canal.
