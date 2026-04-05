---
title: "OP_CHECKHASHVERIFY - CHV"
slug: "op-checkhashverify-chv"
permalink: /dictionnaire/op-checkhashverify-chv/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_EVAL"
    slug: "op-eval"
  - title: "P2SH"
    slug: "p2sh"
---

Nouvel opcode proposé en 2012 dans le BIP-0017 par Luke Dashjr qui permet de disposer des mêmes fonctionnalités que `OP_EVAL` ou P2SH. Il aurait dû permettre de hacher la fin du `scriptSig`, de comparer le résultat avec le haut de la pile et rendre la transaction invalide si les deux hachages ne correspondaient pas. Cet opcode n'a jamais été implémenté.