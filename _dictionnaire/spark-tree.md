---
title: "SPARK TREE"
slug: "spark-tree"
permalink: /dictionnaire/spark-tree/
category: "COUCHE SUPÉRIEURE"
letter: "S"
layout: definition
french_term: "ARBRE SPARK"
category_slug: "couche-superieure"
prev_in_category:
  title: "SPARK SERVICE PROVIDER"
  slug: "spark-service-provider"
next_in_category:
  title: "SRC-20"
  slug: "src-20"
cross_references:
  - title: "SPARK"
    slug: "spark"
  - title: "EXIT TRANSACTION"
    slug: "exit-transaction"
---

Structure arborescente offchain utilisée dans le protocole Spark pour étendre un UTXO unique en plusieurs sous-unités de valeur, afin de résoudre le problème des statechains classiques qui imposaient le transfert d'un UTXO entier. L'arbre se compose de branches (*branch transactions*) et de feuilles (*leaf transactions*).

La racine de l'arbre correspond à l'UTXO on-chain (`Txn0`), dont la clé de l'opérateur est définitivement détruite. Les branches sont des transactions intermédiaires maintenues hors chaîne, sans timelock, qui ne peuvent être dépensées que par l'agrégation des clés de toutes les feuilles situées en dessous. Les feuilles sont les transactions terminales détenues par les utilisateurs individuels, chacune associée à une exit transaction avec un timelock relatif.

La division d'une feuille repose sur une propriété d'additivité des clés : la clé parente est scindée en plusieurs clés enfants dont la somme est égale à la clé originale ($$a_0 = a_1 + a_2 + \ldots + a_n$$). Cette propriété permet aussi la ré-agrégation des feuilles.
