---
title: "OP_PUSHDATA4 - 0X4E"
slug: "op-pushdata4-0x4e"
permalink: /dictionnaire/op-pushdata4-0x4e/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_PUSHDATA2 - 0X4D"
    slug: "op-pushdata2-0x4d"
  - title: "OP_PUSHDATA1 - 0X4C"
    slug: "op-pushdata1-0x4c"
---

Permet de pousser une très grande quantité de données sur la pile. Il est suivi de quatre octets (petit-boutistes) qui indiquent la longueur des données à pousser (jusqu'à environ 4,3 Go). Cet opcode est utilisé pour insérer de très grandes données dans les scripts, bien que son usage soit extrêmement rare en raison des limitations pratiques de la taille des transactions.