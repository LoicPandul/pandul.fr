---
title: "FINALITÉ DE TRANSACTION"
slug: "finalite-de-transaction"
permalink: /dictionnaire/finalite-de-transaction/
category: "PROTOCOLE"
letter: "F"
layout: definition
english_term: "TRANSACTION FINALITY"
cross_references:
  - title: "CONFIRMATION"
    slug: "confirmation"
  - title: "DOUBLE DÉPENSE"
    slug: "double-depense"
---

Concept qui désigne le moment à partir duquel une transaction est considérée comme irréversible et définitivement inscrite dans la blockchain. Sur Bitcoin, la finalité est probabiliste plutôt qu'absolue : chaque nouveau bloc ajouté au-dessus du bloc qui contient la transaction rend sa réversion exponentiellement plus difficile et coûteuse. Par convention, une transaction est généralement considérée comme finale après 6 confirmations, soit environ une heure, car la probabilité qu'un attaquant puisse réorganiser la chaîne, ou bien qu'un embranchement naturel arrive sur une telle profondeur est extrêmement faible. Cependant, pour des montants modestes, une ou deux confirmations peuvent être jugées suffisantes.