---
title: "OP_2DUP - 0X6E"
slug: "op-2dup-0x6e"
permalink: /dictionnaire/op-2dup-0x6e/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_2DROP - 0XD6"
  slug: "op-2drop-0xd6"
next_in_category:
  title: "OP_2OVER - 0X70"
  slug: "op-2over-0x70"
cross_references:
  - title: "OP_DUP - 0X76"
    slug: "op-dup-0x76"
  - title: "OP_3DUP - 0X6F"
    slug: "op-3dup-0x6f"
---

Duplique les deux éléments en haut de la pile, puis les place en haut de la pile. Par exemple, si la pile est :

```text
A
B
C
D
```

`OP_2DUP` produira : 

```text
A
B
A
B
C
D
```