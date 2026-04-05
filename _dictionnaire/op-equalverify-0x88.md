---
title: "OP_EQUALVERIFY - 0X88"
slug: "op-equalverify-0x88"
permalink: /dictionnaire/op-equalverify-0x88/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_EQUAL - 0X87"
    slug: "op-equal-0x87"
  - title: "OP_VERIFY - 0X69"
    slug: "op-verify-0x69"
---

Combine les fonctions de `OP_EQUAL` et `OP_VERIFY`. Il vérifie d'abord l'égalité des deux valeurs supérieures de la pile, puis exige que le résultat soit non nul, faute de quoi la transaction est invalide. `OP_EQUALVERIFY` est notamment utilisé dans les scripts de vérification d'adresse.