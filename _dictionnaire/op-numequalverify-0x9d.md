---
title: "OP_NUMEQUALVERIFY - 0X9D"
slug: "op-numequalverify-0x9d"
permalink: /dictionnaire/op-numequalverify-0x9d/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_NUMEQUAL - 0X9C"
    slug: "op-numequal-0x9c"
  - title: "OP_VERIFY - 0X69"
    slug: "op-verify-0x69"
---

Combine les opérations `OP_NUMEQUAL` et `OP_VERIFY`. Il compare numériquement les deux éléments au sommet de la pile. Si les valeurs sont égales, `OP_NUMEQUALVERIFY` supprime le résultat vrai de la pile et continue l'exécution du script. Si les valeurs ne sont pas égales, le résultat est faux et le script échoue immédiatement.