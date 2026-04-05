---
title: "OP_PUSHDATA2 - 0X4D"
slug: "op-pushdata2-0x4d"
permalink: /dictionnaire/op-pushdata2-0x4d/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_PUSHDATA1 - 0X4C"
  slug: "op-pushdata1-0x4c"
next_in_category:
  title: "OP_PUSHDATA4 - 0X4E"
  slug: "op-pushdata4-0x4e"
cross_references:
  - title: "OP_PUSHDATA1 - 0X4C"
    slug: "op-pushdata1-0x4c"
  - title: "OP_PUSHDATA4 - 0X4E"
    slug: "op-pushdata4-0x4e"
---

Permet de pousser une grande quantité de données sur la pile. Il est suivi de deux octets (petit-boutistes) qui spécifient la longueur des données à pousser (jusqu'à 65 535 octets). Il est utilisé pour insérer des données plus volumineuses dans les scripts.