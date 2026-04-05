---
title: "DIFFIE-HELLMAN"
slug: "diffie-hellman"
permalink: /dictionnaire/diffie-hellman/
category: "CRYPTOGRAPHIE"
letter: "D"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "CRYPTOLOGIE"
  slug: "cryptologie"
next_in_category:
  title: "DKG"
  slug: "dkg"
cross_references:
  - title: "ECDH"
    slug: "ecdh"
  - title: "DLP - DISCRETE LOGARITHM PROBLEM"
    slug: "dlp-discreet-log-probleme"
---

Méthode cryptographique permettant à deux parties de générer un secret partagé sur un canal de communication non sécurisé. Ce secret peut ensuite servir à chiffrer la communication entre les deux parties. Diffie-Hellman utilise l'arithmétique modulaire pour que, même si un attaquant peut observer les échanges, il ne peut pas déduire le secret partagé sans résoudre un problème mathématique difficile : le logarithme discret. Sur Bitcoin, on utilise parfois une variante de DH utilisant une courbe elliptique nommée ECDH, notamment pour les protocoles d'adresse statiques comme les *Silent Payments* ou le BIP-0047.