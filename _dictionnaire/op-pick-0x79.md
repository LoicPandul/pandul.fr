---
title: "OP_PICK - 0X79"
slug: "op-pick-0x79"
permalink: /dictionnaire/op-pick-0x79/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_OVER - 0X78"
  slug: "op-over-0x78"
next_in_category:
  title: "OP_PUSHDATA1 - 0X4C"
  slug: "op-pushdata1-0x4c"
cross_references:
  - title: "OP_ROLL - 0X7A"
    slug: "op-roll-0x7a"
  - title: "PILE"
    slug: "pile"
---

Duplique un élément de la pile et le place en haut de la pile, en fonction de la profondeur spécifiée par la valeur en haut de la pile avant l'opération. Par exemple, si la valeur en haut de la pile est `4`, `OP_PICK` va dupliquer le cinquième élément de la pile en partant du sommet (l'indexation commence à `0`), et il va placer cette copie au sommet.