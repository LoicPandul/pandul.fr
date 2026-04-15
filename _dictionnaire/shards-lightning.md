---
title: "SHARDS - LIGHTNING"
slug: "shards-lightning"
permalink: /dictionnaire/shards-lightning/
category: "LIGHTNING NETWORK"
letter: "S"
layout: definition
french_term: "FRACTIONS"
category_slug: "lightning-network"
prev_in_category:
  title: "SCID - SHORT CHANNEL ID"
  slug: "scid-short-channel-id"
next_in_category:
  title: "SIDECAR CHANNEL"
  slug: "sidecar-channel"
cross_references:
  - title: "MPP - MULTI-PATH PAYMENTS"
    slug: "mpp-multi-path-payments"
---

Dans le cadre des *Multi-Path Payments (MPP)* ou des *Atomic Multi-Path Payments (AMP)*, un shard est une fraction d'un paiement global. Chaque shard représente une partie du paiement total qui est acheminée séparément via une route différente sur Lightning.

Dans le cadre des MPP, tous les shards partagent le même secret, alors que dans les AMP, chaque shard dispose d'un secret partiel unique. Le destinataire regroupe les shards pour reconstituer et finaliser le paiement complet. Ce mécanisme permet de contourner les limitations de liquidité sur un canal unique.
