---
title: "BOS - BALANCE OF SATOSHIS"
slug: "bos-balance-of-satoshis"
permalink: /dictionnaire/bos-balance-of-satoshis/
category: "OUTIL"
letter: "B"
layout: definition
category_slug: "outil"
prev_in_category:
  title: "BOLTZ"
  slug: "boltz"
next_in_category:
  title: "BTCMAP"
  slug: "btcmap"
cross_references:
  - title: "LND"
    slug: "lnd"
  - title: "UMBREL"
    slug: "umbrel"
---

Outil en ligne de commande développé par Alex Bosworth pour gérer et optimiser un nœud Lightning fonctionnant sous LND. Il s'installe via npm (`npm install -g balanceofsatoshis`) et offre un ensemble de commandes accessibles par le préfixe `bos` pour consulter les balances, ajuster les frais de routage, rééquilibrer la liquidité entre canaux, ouvrir ou fermer des canaux, et surveiller l'activité du nœud.

Parmi ses fonctionnalités principales, `bos rebalance` permet de déplacer de la liquidité entre canaux via des paiements circulaires, `bos fees` d'ajuster dynamiquement les frais sortants avec des formules conditionnelles, et `bos accounting` de produire un relevé comptable des transactions. L'outil propose également une intégration Telegram pour recevoir des notifications et interagir avec son nœud à distance.