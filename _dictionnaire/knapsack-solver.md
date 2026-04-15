---
title: "KNAPSACK SOLVER"
slug: "knapsack-solver"
permalink: /dictionnaire/knapsack-solver/
category: "PORTEFEUILLE"
letter: "K"
layout: definition
category_slug: "portefeuille"
prev_in_category:
  title: "KEYSTORE"
  slug: "keystore"
next_in_category:
  title: "LABEL"
  slug: "label"
cross_references:
  - title: "BRANCH-AND-BOUND"
    slug: "branch-and-bound"
---

Ancienne méthode utilisée pour la sélection de pièces dans le portefeuille de Bitcoin Core avant la version 0.17. Le *Knapsack Solver* tente de résoudre le problème de sélection de pièces en choisissant de manière itérative et aléatoire des UTXOs, et en les additionnant par sous-ensembles, dans l'objectif de minimiser les frais et la taille de la transaction. Cette méthode a depuis été remplacée par le *Branch-and-Bound*.
