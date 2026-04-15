---
title: "OP_EVAL"
slug: "op-eval"
permalink: /dictionnaire/op-eval/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_EQUALVERIFY - 0X88"
  slug: "op-equalverify-0x88"
next_in_category:
  title: "OP_FALSE - 0X00"
  slug: "op-false-0x00"
cross_references:
  - title: "P2SH"
    slug: "p2sh"
  - title: "SCRIPTPUBKEY"
    slug: "scriptpubkey"
---

Opcode proposé par Gavin Andresen en 2011. Il prend le script situé au sommet de la pile, l'exécute comme s'il faisait partie du `scriptPubKey`, et place son résultat sur la pile. `OP_EVAL` a été abandonné en raison de préoccupations liées à la complexité de cet opcode, qui sera finalement supplanté par P2SH.