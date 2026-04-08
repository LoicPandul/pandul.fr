---
title: "BULLETPROOFS"
slug: "bulletproofs"
permalink: /dictionnaire/bulletproofs/
category: "CRYPTOGRAPHIE"
letter: "B"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "BORROMEAN RING SIGNATURES"
  slug: "borromean-ring-signatures"
next_in_category:
  title: "CHACHA20-POLY1305"
  slug: "chacha20-poly1305"
cross_references:
  - title: "CONFIDENTIAL TRANSACTIONS"
    slug: "confidential-transactions"
  - title: "ZKP - ZERO-KNOWLEDGE PROOF"
    slug: "zkp-zero-knowledge-proof"
math: true
---

Système de preuves à divulgation nulle de connaissance (*zero-knowledge proofs*) utilisé notamment dans les *Confidential Transactions* pour vérifier qu'un montant engagé dans une transaction se situe dans un intervalle valide, sans révéler sa valeur. Les Bulletproofs ont été introduits en 2017 par Bünz, Bootle, Boneh, Poelstra, Wuille et Maxwell. Ils remplacent les preuves de portée antérieures (*Borromean ring signatures*) en produisant des preuves significativement plus compactes, dont la taille croît de manière logarithmique ($$O(\log n)$$) par rapport au nombre de bits représentant la valeur.

Une évolution nommée Bulletproofs++, proposée par Liam Eagen, Sanket Kanjalkar, Tim Ruffing et Jonas Nick, améliore encore l'efficacité en termes de génération et de vérification. Sur Liquid, l'adoption des Bulletproofs a permis de réduire la taille des transactions confidentielles, diminuant ainsi les frais et ralentissant la croissance de la chaîne.