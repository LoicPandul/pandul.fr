---
title: "OP_ENDIF - 0X68"
slug: "op-endif-0x68"
permalink: /dictionnaire/op-endif-0x68/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_IF - 0X63"
    slug: "op-if-0x63"
  - title: "OP_ELSE - 0X67"
    slug: "op-else-0x67"
---

Marque la fin d'une structure de contrôle conditionnelle initiée par un `OP_IF` ou un `OP_NOTIF`, normalement suivis par un ou plusieurs `OP_ELSE`. Il indique que l'exécution du script doit continuer au-delà de la structure conditionnelle, quelle que soit la branche qui a été exécutée. Autrement dit, `OP_ENDIF` permet de délimiter la fin des blocs conditionnels dans les scripts.
