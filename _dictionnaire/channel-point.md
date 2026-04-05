---
title: "CHANNEL POINT"
slug: "channel-point"
permalink: /dictionnaire/channel-point/
category: "LIGHTNING NETWORK"
letter: "C"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "CHANNEL LEASE"
  slug: "channel-lease"
next_in_category:
  title: "CHANNEL RESERVE"
  slug: "channel-reserve"
cross_references:
  - title: "LND"
    slug: "lnd"
  - title: "FORCE CLOSE"
    slug: "force-close"
---

Identifiant unique d'un canal Lightning sur la blockchain Bitcoin. Il se compose du TXID de la transaction de financement du canal suivi de l'index de la sortie correspondante, sous la forme `txid:output_index`. Par exemple : `a3f2...b7c:0` désigne la première sortie de la transaction de financement. Le *channel point* permet de retrouver la transaction on-chain qui a établi le canal et sert de référence dans les commandes d'administration du nœud, par exemple pour fermer un canal spécifique ou consulter ses détails.