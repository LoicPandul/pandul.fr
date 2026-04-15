---
title: "FULL RBF"
slug: "full-rbf"
permalink: /dictionnaire/full-rbf/
category: "PROTOCOLE"
letter: "F"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "FRAIS DE TRANSACTION"
  slug: "frais-de-transaction"
next_in_category:
  title: "GENÈSE"
  slug: "genese"
cross_references:
  - title: "RBF - REPLACE-BY-FEE"
    slug: "rbf-replace-by-fee"
  - title: "MEMPOOL"
    slug: "mempool"
---

Politique de mempool qui permet le remplacement de toute transaction non confirmée par une autre transaction qui dépense au moins un même input, mais qui offre des frais plus élevés, indépendamment du fait que la transaction originale ait signalé ou non sa disponibilité au remplacement via le *flag* RBF (champ `nSequence`). Dans le RBF classique (opt-in RBF), seules les transactions qui ont explicitement activé ce signal peuvent être remplacées. Le Full RBF supprime cette restriction.

Cette politique a été introduite dans Bitcoin Core via l'option de configuration `mempoolfullrbf`, disponible à partir de la version 24.0 (novembre 2022) avec une valeur par défaut à `0` (désactivée). À partir de la version 28.0 (octobre 2024), cette option a été activée par défaut (`mempoolfullrbf=1`), ce qui fait du Full RBF le comportement standard de Bitcoin Core.

Le Full RBF a fait l'objet de débats intenses dans la communauté. Ses partisans argumentent qu'il améliore l'efficacité du marché des frais et renforce la sécurité en éliminant la fausse impression que les transactions non signalées RBF seraient irrévocables avant confirmation. Ses opposants soulignaient qu'il complique les cas d'usage qui reposaient sur l'acceptation de transactions non confirmées (transactions « zero-conf »), notamment dans le commerce de détail.