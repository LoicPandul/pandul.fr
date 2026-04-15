---
title: "OP_2ROT - 0X71"
slug: "op-2rot-0x71"
permalink: /dictionnaire/op-2rot-0x71/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_2OVER - 0X70"
  slug: "op-2over-0x70"
next_in_category:
  title: "OP_2SWAP - 0X72"
  slug: "op-2swap-0x72"
cross_references:
  - title: "OP_ROT - 0X7B"
    slug: "op-rot-0x7b"
  - title: "OP_2SWAP - 0X72"
    slug: "op-2swap-0x72"
---

Déplace les deux éléments qui se trouvent à la sixième et à la cinquième place du sommet de la pile vers le sommet. Par exemple, si la pile est :

```text
A
B
C
D
E
F
```

`OP_2ROT` produira :

```text
E
F
A
B
C
D
```