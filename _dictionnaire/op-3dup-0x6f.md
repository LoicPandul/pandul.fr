---
title: "OP_3DUP - 0X6F"
slug: "op-3dup-0x6f"
permalink: /dictionnaire/op-3dup-0x6f/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_DUP - 0X76"
    slug: "op-dup-0x76"
  - title: "OP_2DUP - 0X6E"
    slug: "op-2dup-0x6e"
---

Duplique les trois éléments en haut de la pile, puis les place en haut de la pile. Par exemple, si la pile est :

```text
A
B
C
D
```

`OP_3DUP` produira :

```text
A
B
C
A
B
C
D
```