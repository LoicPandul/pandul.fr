---
title: "CHEMIN PRIMAIRE"
slug: "chemin-primaire"
permalink: /dictionnaire/chemin-primaire/
category: "PORTEFEUILLE"
letter: "C"
layout: definition
english_term: "PRIMARY PATH"
category_slug: "portefeuille"
prev_in_category:
  title: "CHEMIN DE RÉCUPÉRATION"
  slug: "chemin-de-recuperation"
next_in_category:
  title: "CLÉ ÉTENDUE"
  slug: "cle-etendue"
cross_references:
  - title: "MINISCRIPT"
    slug: "miniscript"
---

Dans un logiciel de portefeuille utilisant Miniscript, comme Liana par exemple, le chemin primaire fait référence à l'ensemble de clés permettant des dépenses immédiates des fonds, sans aucune condition temporelle. Ce chemin est toujours accessible et est utilisé pour la gestion quotidienne des bitcoins, sans nécessiter d'attente (*timelock*) contrairement aux chemins de récupération. Prenons l'exemple d'un script qui intègre 2 clés distinctes : la clé A, qui autorise la dépense immédiate des bitcoins, et la clé B, qui permet de les dépenser après un délai défini par un *timelock* de 52 560 blocs. Dans cet exemple, la clé A provient du chemin primaire, tandis que la clé B provient du chemin de récupération.
