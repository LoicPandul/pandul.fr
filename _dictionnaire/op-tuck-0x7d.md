---
title: "OP_TUCK - 0X7D"
slug: "op-tuck-0x7d"
permalink: /dictionnaire/op-tuck-0x7d/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_SWAP - 0X7C"
    slug: "op-swap-0x7c"
  - title: "PILE"
    slug: "pile"
---

Copie l'élément situé au sommet de la pile et l'insère entre le deuxième élément et le troisième élément de la pile. Par exemple, si la pile est :

```text
A
B
C
D
```

`OP_TUCK` va dupliquer le sommet `A` et le placer en troisième position. La pile en sortie sera :

```text
A
B
A
C
D
```