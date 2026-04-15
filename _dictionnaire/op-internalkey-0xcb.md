---
title: "OP_INTERNALKEY - 0XCB"
slug: "op-internalkey-0xcb"
permalink: /dictionnaire/op-internalkey-0xcb/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_IFDUP - 0X73"
  slug: "op-ifdup-0x73"
next_in_category:
  title: "OP_LESSTHAN - 0X9F"
  slug: "op-lessthan-0x9f"
cross_references:
  - title: "TAPROOT"
    slug: "taproot"
  - title: "BIP-0349"
    slug: "bip-0349"
---

Opcode proposé dans le BIP-0349 pour être ajouté à Tapscript (`0xcb`), qui pousse la clé interne Taproot (*internal key*) sur la pile. Concrètement, lorsqu'un script dans une feuille Taproot a besoin de connaître la clé publique qui a servi à construire la sortie, il peut appeler `OP_INTERNALKEY` au lieu de devoir inclure cette clé en dur dans le script. Le résultat est la représentation *x-only* de 32 octets de la clé interne.