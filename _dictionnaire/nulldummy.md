---
title: "NULLDUMMY"
slug: "nulldummy"
permalink: /dictionnaire/nulldummy/
category: "PROTOCOLE"
letter: "N"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "NULL DATA"
  slug: "null-data"
next_in_category:
  title: "NVERSION"
  slug: "nversion"
cross_references:
  - title: "DUMMY ELEMENT"
    slug: "dummy-element"
  - title: "BIP-0147"
    slug: "bip-0147"
---

Règle de consensus introduite avec le BIP-0147 dans le soft fork SegWit qui exige que l'élément factice (« *dummy element* ») utilisé dans les opcodes `OP_CHECKMULTISIG` et `OP_CHECKMULTISIGVERIFY` soit un tableau d'octets vide (`OP_0`). Cette mesure a été mise en place pour éliminer un vecteur de malléabilité en interdisant toute valeur autre que `OP_0` pour cet élément.
