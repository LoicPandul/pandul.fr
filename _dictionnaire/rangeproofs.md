---
title: "RANGEPROOFS"
slug: "rangeproofs"
permalink: /dictionnaire/rangeproofs/
category: "CRYPTOGRAPHIE"
letter: "R"
layout: definition
french_term: "PREUVES DE PORTÉE"
category_slug: "cryptographie"
prev_in_category:
  title: "RACINE DE MERKLE"
  slug: "racine-de-merkle"
next_in_category:
  title: "RIPEMD160"
  slug: "ripemd160"
cross_references:
  - title: "CONFIDENTIAL TRANSACTIONS"
    slug: "confidential-transactions"
  - title: "BULLETPROOFS"
    slug: "bulletproofs"
---

Type de preuve à divulgation nulle de connaissance (*zero-knowledge proof*) utilisé dans les *Confidential Transactions* pour démontrer qu'un montant engagé se situe dans un intervalle valide, sans en révéler la valeur exacte. Les *rangeproofs* empêchent un utilisateur de créer des montants négatifs ou excessivement élevés qui permettraient de générer frauduleusement des unités monétaires, tout en préservant la confidentialité de la transaction.

Dans les premières implémentations des *Confidential Transactions* sur Liquid, les *rangeproofs* reposaient sur des signatures en anneau de Borromée (*Borromean ring signatures*). Ce mécanisme est destiné à être remplacé par les *Bulletproofs++*, qui produisent des preuves plus compactes et plus efficaces à vérifier.