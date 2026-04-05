---
title: "POLITIQUE DE RELAIS DES TX"
slug: "politique-de-relais-des-tx"
permalink: /dictionnaire/politique-de-relais-des-tx/
category: "RÉSEAU"
letter: "P"
layout: definition
english_term: "TRANSACTION RELAY POLICY"
cross_references:
  - title: "POLITIQUE DE RELAIS"
    slug: "politique-de-relais"
  - title: "POLITIQUE DE MEMPOOL"
    slug: "politique-de-mempool"
---

Sous-ensemble de la politique de relais qui regroupe l'ensemble des règles appliquées par un nœud Bitcoin spécifiquement pour le traitement et la retransmission des transactions sur le réseau pair-à-pair. La politique de relais des transactions englobe notamment la politique de mempool et, par extension, les règles de standardisation.

Ces règles déterminent si une transaction reçue d'un pair sera acceptée, stockée dans la mempool, puis retransmise aux autres nœuds du réseau. Elles vont au-delà du simple format des transactions individuelles (couvert par les règles de standardisation) et incluent également des considérations liées à la gestion du réseau.

Comme toutes les règles de politique, la politique de relais des transactions est configurée localement par chaque nœud et peut varier de l'un à l'autre. Elle se distingue de la politique de relais au sens large, qui couvre également des aspects non liés aux transactions, comme le traitement des blocs ou la gestion des connexions avec les pairs.