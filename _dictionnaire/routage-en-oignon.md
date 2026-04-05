---
title: "ROUTAGE EN OIGNON"
slug: "routage-en-oignon"
permalink: /dictionnaire/routage-en-oignon/
category: "RÉSEAU"
letter: "R"
layout: definition
english_term: "ONION ROUTING"
category_slug: "reseau"
prev_in_category:
  title: "RÉSEAU BITCOIN"
  slug: "reseau-bitcoin"
next_in_category:
  title: "SEED NODES"
  slug: "seed-nodes"
cross_references:
  - title: "TOR"
    slug: "tor-the-onion-router"
  - title: "LIGHTNING NETWORK"
    slug: "lightning-network"
---

Technique de communication qui consiste à encapsuler un message dans plusieurs couches de chiffrement successives, à la manière des pelures d'un oignon. Le message transite par une série de nœuds intermédiaires, et chaque nœud ne peut déchiffrer que la couche qui lui est destinée, révélant uniquement l'identité du nœud suivant. Aucun intermédiaire ne connaît à la fois l'expéditeur et le destinataire final du message.

Ce principe est la base du réseau Tor, où le trafic internet passe par plusieurs relais successifs pour anonymiser les connexions. Sur le Lightning Network, le routage en oignon est utilisé pour acheminer les paiements : chaque nœud de la route ne connaît que le nœud précédent et le nœud suivant, sans pouvoir déterminer l'origine ou la destination du paiement.
