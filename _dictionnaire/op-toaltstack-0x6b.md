---
title: "OP_TOALTSTACK - 0X6B"
slug: "op-toaltstack-0x6b"
permalink: /dictionnaire/op-toaltstack-0x6b/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_FROMALTSTACK - 0X6C"
    slug: "op-fromaltstack-0x6c"
  - title: "PILE"
    slug: "pile"
---

Prend le sommet de la pile principale (*main stack*) et le déplace vers la pile alternative (*alt stack*). Cet opcode permet de stocker temporairement des données à part pour une utilisation ultérieure dans le script. L'élément déplacé est donc supprimé de la pile principale. On utilisera ensuite `OP_FROMALTSTACK` pour le remettre au sommet de la pile principale.