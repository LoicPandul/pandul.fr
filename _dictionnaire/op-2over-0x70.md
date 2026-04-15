---
title: "OP_2OVER - 0X70"
slug: "op-2over-0x70"
permalink: /dictionnaire/op-2over-0x70/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_2DUP - 0X6E"
  slug: "op-2dup-0x6e"
next_in_category:
  title: "OP_2ROT - 0X71"
  slug: "op-2rot-0x71"
cross_references:
  - title: "OP_OVER - 0X78"
    slug: "op-over-0x78"
  - title: "OP_2DUP - 0X6E"
    slug: "op-2dup-0x6e"
---

Copie les deux éléments qui se trouvent à la quatrième et à la troisième place en partant du haut de la pile, puis les place en haut de la pile. Par exemple, si la pile est :

```text
A
B
C
D
```

`OP_2OVER` produira :

```text
C
D
A
B
C
D
```