---
title: "OP_HASH160 - 0XA9"
slug: "op-hash160-0xa9"
permalink: /dictionnaire/op-hash160-0xa9/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_GREATERTHANOREQUAL - 0XA2"
  slug: "op-greaterthanorequal-0xa2"
next_in_category:
  title: "OP_HASH256 - 0XAA"
  slug: "op-hash256-0xaa"
cross_references:
  - title: "SHA256"
    slug: "sha256"
  - title: "RIPEMD160"
    slug: "ripemd160"
---

Prend l'élément en haut de la pile et le remplace par son hachage en utilisant successivement les fonctions `SHA256` puis `RIPEMD160`. Ce processus en deux étapes génère une empreinte de 160 bits.
