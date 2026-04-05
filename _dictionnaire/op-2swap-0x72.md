---
title: "OP_2SWAP - 0X72"
slug: "op-2swap-0x72"
permalink: /dictionnaire/op-2swap-0x72/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_SWAP - 0X7C"
    slug: "op-swap-0x7c"
  - title: "OP_2ROT - 0X71"
    slug: "op-2rot-0x71"
---

Échange les deux éléments situés au sommet de la pile avec les deux éléments situés juste en dessous d'eux. Par exemple, si la pile est :

```text
A
B
C
D
```

`OP_2SWAP` produira :

```text
C
D
A
B
```