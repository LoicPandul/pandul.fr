---
title: "PEERS.DAT"
slug: "peers-dat"
permalink: /dictionnaire/peers-dat/
category: "RÉSEAU"
letter: "P"
layout: definition
category_slug: "reseau"
prev_in_category:
  title: "PEER DISCOVERY"
  slug: "peer-discovery"
next_in_category:
  title: "POLITIQUE DE MEMPOOL"
  slug: "politique-de-mempool"
cross_references:
  - title: "PEER DISCOVERY"
    slug: "peer-discovery"
  - title: "ADDR.DAT"
    slug: "addr-dat"
  - title: "ADDRMAN"
    slug: "addrman"
---

Fichier dans lequel Bitcoin Core sérialise les tables du module `addrman` : la table « new » (adresses découvertes mais pas encore testées) et la table « tried » (adresses auxquelles le nœud s'est déjà connecté avec succès). Il contient les adresses IP des autres nœuds, les numéros de ports, les horodatages de dernière connexion et la clé de bucketing (`nKey`) qui détermine le placement des adresses dans les seaux.

Lors du premier lancement, le fichier n'existe pas et les tables sont vides : le nœud interroge les DNS seeds pour obtenir une liste initiale de pairs. Au fil des connexions, les adresses sont insérées dans les tables et `peers.dat` est périodiquement mis à jour. Il est également possible d'ajouter manuellement des adresses via l'option `-addnode` ou la commande RPC `addnode`.

Ce fichier a remplacé `addr.dat` à partir de Bitcoin Core 0.7.0 (2012), lorsque Pieter Wuille a introduit `addrman` avec son système de bucketing déterministe.