---
title: "OP_FROMALTSTACK - 0X6C"
slug: "op-fromaltstack-0x6c"
permalink: /dictionnaire/op-fromaltstack-0x6c/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_TOALTSTACK - 0X6B"
    slug: "op-toaltstack-0x6b"
  - title: "PILE"
    slug: "pile"
---

Retire le sommet de la pile alternative (*alt stack*) et le place sur le sommet de la pile principale (*main stack*). Cet opcode est utilisé pour récupérer des données stockées temporairement sur la pile alternative. Pour simplifier, c'est l'opération inverse de `OP_TOALTSTACK`.