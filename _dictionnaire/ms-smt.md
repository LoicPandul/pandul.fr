---
title: "MS-SMT"
slug: "ms-smt"
permalink: /dictionnaire/ms-smt/
category: "INFORMATIQUE"
letter: "M"
layout: definition
category_slug: "informatique"
prev_in_category:
  title: "MIT X11"
  slug: "mit-x11"
next_in_category:
  title: "OCTET"
  slug: "octet"
cross_references:
  - title: "SMT - SPARSE MERKLE TREE"
    slug: "smt-sparse-merkle-tree"
  - title: "MERKLE SUM TREE"
    slug: "merkle-sum-tree"
---

Le *Merkle Sum Sparse Merkle Tree* (MS-SMT) est une structure de données combinant les propriétés d'un *Sparse Merkle Tree* (SMT) et d'un *Merkle Sum Tree*. Il permet à la fois de produire des preuves d'inclusion et de non-inclusion (grâce à sa nature « creuse » où chaque feuille a une position déterminée par le hash de sa clé), et de vérifier la conservation des sommes (grâce à la propagation des valeurs dans chaque nœud jusqu'à la racine). Dans le protocole Taproot Assets, le MS-SMT sert à engager les actifs dans la blockchain Bitcoin : sa racine est intégrée dans un tapscript d'une transaction Taproot. Cette structure garantit qu'il est possible de prouver qu'un actif existe, qu'un actif n'existe pas, et que le total des actifs émis est cohérent, empêchant toute inflation non autorisée.