---
title: "OP_HASH256 - 0XAA"
slug: "op-hash256-0xaa"
permalink: /dictionnaire/op-hash256-0xaa/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_HASH160 - 0XA9"
  slug: "op-hash160-0xa9"
next_in_category:
  title: "OP_IF - 0X63"
  slug: "op-if-0x63"
cross_references:
  - title: "SHA256"
    slug: "sha256"
---

Prend l'élément en haut de la pile et le remplace par son hachage en utilisant deux fois la fonction `SHA256`. L'entrée est hachée une première fois avec `SHA256` et le condensat est haché une seconde fois avec `SHA256`. Ce processus en deux étapes génère une empreinte de 256 bits.
