---
title: "OP_RETURN - 0X6A"
slug: "op-return-0x6a"
permalink: /dictionnaire/op-return-0x6a/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_PUSHDATA4 - 0X4E"
  slug: "op-pushdata4-0x4e"
next_in_category:
  title: "OP_RIPEMD160 - 0XA6"
  slug: "op-ripemd160-0xa6"
cross_references:
  - title: "NULL DATA"
    slug: "null-data"
  - title: "UTXO"
    slug: "utxo"
---

Signale un script invalide, ce qui rend l'output qui le contient non dépensable de manière prouvée. Les nœuds du réseau peuvent donc supprimer cet output de leurs UTXO set. `OP_RETURN` est souvent utilisé pour inscrire des données arbitraires dans la blockchain.