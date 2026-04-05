---
title: "OP_RETURN - 0X6A"
slug: "op-return-0x6a"
permalink: /dictionnaire/op-return-0x6a/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "NULL DATA"
    slug: "null-data"
  - title: "UTXO"
    slug: "utxo"
---

Signale un script invalide, ce qui rend l'output qui le contient non dépensable de manière prouvée. Les nœuds du réseau peuvent donc supprimer cet output de leurs UTXO set. `OP_RETURN` est souvent utilisé pour inscrire des données arbitraires dans la blockchain.