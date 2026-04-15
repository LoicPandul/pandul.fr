---
title: "TAPROOT CHANNEL"
slug: "taproot-channel"
permalink: /dictionnaire/taproot-channel/
category: "LIGHTNING NETWORK"
letter: "T"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "SWAPROOT"
  slug: "swaproot"
next_in_category:
  title: "TRAMPOLINE ROUTING"
  slug: "trampoline-routing"
cross_references:
  - title: "TAPROOT"
    slug: "taproot"
  - title: "PTLC"
    slug: "ptlc"
---

Canal Lightning ancré dans une sortie Taproot (P2TR), plutôt que dans une sortie SegWit classique (P2WSH). Les *Taproot channels* tirent parti des améliorations apportées par le soft fork Taproot activé en novembre 2021 sur Bitcoin.

En cas de fermeture coopérative, un *Taproot channel* est plus efficace et plus confidentiel qu'un canal SegWit traditionnel : la transaction de fermeture ressemble à une dépense Taproot ordinaire via le *key path spend*, indiscernable d'un paiement simple on-chain. Cette propriété renforce la confidentialité des utilisateurs du Lightning Network.