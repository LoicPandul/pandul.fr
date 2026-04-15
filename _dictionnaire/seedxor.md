---
title: "SEEDXOR"
slug: "seedxor"
permalink: /dictionnaire/seedxor/
category: "PORTEFEUILLE"
letter: "S"
layout: definition
category_slug: "portefeuille"
prev_in_category:
  title: "SEEDSIGNER"
  slug: "seedsigner"
next_in_category:
  title: "SEGWIT V0"
  slug: "segwit-v0"
cross_references:
  - title: "XOR"
    slug: "xor"
  - title: "PHRASE DE RÉCUPÉRATION"
    slug: "phrase-de-recuperation"
  - title: "COLDCARD"
    slug: "coldcard"
---

Méthode de fractionnement d'une phrase de récupération Bitcoin en plusieurs parties à l'aide de l'opération XOR, introduite par Coinkite pour les portefeuilles matériels Coldcard. Le principe consiste à diviser une phrase mnémonique de 12 ou 24 mots en deux ou plusieurs fragments qui sont eux-mêmes des phrases BIP-0039 valides. Pour reconstituer la phrase originale, toutes les parties doivent être recombinées par XOR (schéma N-de-N, et non M-de-N).

Chaque fragment étant une phrase mnémonique fonctionnelle, il peut servir de portefeuille leurre chargé d'un petit montant, offrant ainsi une forme de déni plausible : un attaquant ne peut pas distinguer un fragment SeedXOR d'une phrase de récupération ordinaire. Le calcul peut être effectué manuellement à l'aide de feuilles de travail imprimables, ou directement sur un Coldcard.
