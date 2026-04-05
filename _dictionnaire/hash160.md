---
title: "HASH160"
slug: "hash160"
permalink: /dictionnaire/hash160/
category: "CRYPTOGRAPHIE"
letter: "H"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "GROTH16"
  slug: "groth16"
next_in_category:
  title: "HASH256"
  slug: "hash256"
cross_references:
  - title: "SHA256"
    slug: "sha256"
  - title: "RIPEMD160"
    slug: "ripemd160"
---

Fonction cryptographique utilisée sur Bitcoin notamment pour générer des adresses de réception Legacy et SegWit v0. Elle combine deux fonctions de hachage qui s'exécutent successivement sur l'input : d'abord SHA256, puis RIPEMD160. La sortie de cette fonction est donc de 160 bits.
$HASH160(x)\ =\ RIPEMD160(SHA256(x))$