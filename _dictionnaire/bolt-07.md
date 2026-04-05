---
title: "BOLT-07"
slug: "bolt-07"
permalink: /dictionnaire/bolt-07/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "BOLT-05"
  slug: "bolt-05"
next_in_category:
  title: "BOLT-08"
  slug: "bolt-08"
cross_references:
  - title: "BOLT"
    slug: "bolt"
---

Spécification qui définit le protocole de découverte pair-à-pair du réseau Lightning. Elle décrit les messages `node_announcement` (par lesquels les nœuds diffusent leur identité et leurs adresses de connexion), `channel_announcement` (qui prouvent l'existence d'un canal) et `channel_update` (qui publient les frais de routage et les délais d'expiration de chaque canal).

Le BOLT-07 établit les règles de diffusion échelonnée des annonces (*gossip*), le mécanisme d'élagage des canaux obsolètes ou fermés on-chain, et les protocoles de synchronisation par requêtes permettant aux nœuds de maintenir une vue cohérente de la topologie du réseau.