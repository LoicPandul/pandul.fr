---
title: "OP_WITHIN - 0XA5"
slug: "op-within-0xa5"
permalink: /dictionnaire/op-within-0xa5/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_VERIFY - 0X69"
  slug: "op-verify-0x69"
next_in_category:
  title: "OPCODES"
  slug: "opcodes"
cross_references:
  - title: "OP_LESSTHAN - 0X9F"
    slug: "op-lessthan-0x9f"
  - title: "OP_GREATERTHANOREQUAL - 0XA2"
    slug: "op-greaterthanorequal-0xa2"
---

Vérifie si le premier élément en haut de la pile se trouve dans l'intervalle défini par les deuxième et troisième éléments supérieurs. Autrement dit, `OP_WITHIN` vérifie si le premier élément est supérieur ou égal au deuxième et inférieur au troisième. Si cette condition est vraie, il pousse `1` (vrai) sur la pile, sinon, il pousse `0` (faux).