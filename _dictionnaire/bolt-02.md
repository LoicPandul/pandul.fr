---
title: "BOLT-02"
slug: "bolt-02"
permalink: /dictionnaire/bolt-02/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "BOLT-01"
  slug: "bolt-01"
next_in_category:
  title: "BOLT-03"
  slug: "bolt-03"
cross_references:
  - title: "BOLT"
    slug: "bolt"
  - title: "TRANSACTION DE FINANCEMENT"
    slug: "transaction-de-financement"
---

Spécification qui définit le protocole pair-à-pair de gestion des canaux Lightning. Elle couvre l'intégralité du cycle de vie d'un canal : l'établissement (en version classique avec un seul financeur, et en version 2 avec financement bilatéral via construction interactive de transaction), le fonctionnement normal (ajout et résolution de HTLC, mise à jour des transactions d'engagement) et la fermeture coopérative. Le BOLT-02 spécifie également les mécanismes d'augmentation des frais par RBF, la mise au repos (*quiescence*) du canal pour les mises à jour de protocole, et le protocole de retransmission de messages en cas de reconnexion entre pairs.