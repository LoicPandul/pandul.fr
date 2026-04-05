---
title: "OP_IF - 0X63"
slug: "op-if-0x63"
permalink: /dictionnaire/op-if-0x63/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_HASH256 - 0XAA"
  slug: "op-hash256-0xaa"
next_in_category:
  title: "OP_IFDUP - 0X73"
  slug: "op-ifdup-0x73"
cross_references:
  - title: "OP_ELSE - 0X67"
    slug: "op-else-0x67"
  - title: "OP_ENDIF - 0X68"
    slug: "op-endif-0x68"
---

Exécute la portion suivante du script si la valeur au sommet de la pile est non nulle (vraie). Si la valeur est nulle (fausse), ces opérations sont sautées, passant directement à celles après `OP_ELSE`, s'il est présent. `OP_IF` permet de lancer une structure de contrôle conditionnelle dans un script. Il détermine le flux de contrôle dans un script en fonction d'une condition fournie au moment de l'exécution de la transaction. `OP_IF` s'utilise avec `OP_ELSE` et `OP_ENDIF` de la manière suivante : 

```text
<condition>
OP_IF
<opérations si la condition est vraie>
OP_ELSE
<opérations si la condition est fausse>
OP_ENDIF
```