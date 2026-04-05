---
title: "LIQUIDITY ADS"
slug: "liquidity-ads"
permalink: /dictionnaire/liquidity-ads/
category: "LIGHTNING NETWORK"
letter: "L"
layout: definition
french_term: "ANNONCES DE LIQUIDITÉ"
category_slug: "lightning-network"
prev_in_category:
  title: "LIQUIDITÉS"
  slug: "liquidites"
next_in_category:
  title: "LIQUIDITY SWAP"
  slug: "liquidity-swap"
cross_references:
  - title: "LIQUIDITÉS"
    slug: "liquidites"
  - title: "LIGHTNING NETWORK"
    slug: "lightning-network"
---

Mécanisme du protocole Lightning Network qui permet aux opérateurs de noeuds d'annoncer leur disponibilité à fournir de la liquidité entrante en échange d'une rémunération. Un noeud qui dispose de fonds peut publier une offre sur le réseau, en précisant le montant de liquidité qu'il est prêt à allouer, la durée de l'engagement et le tarif demandé. Lorsqu'un autre noeud a besoin de capacité entrante pour recevoir des paiements, il peut accepter cette offre et ouvrir un canal financé par le fournisseur de liquidité. Ce système crée un marché ouvert et décentralisé pour la liquidité sur Lightning, ce qui résout un problème récurrent pour les nouveaux noeuds qui ne peuvent pas recevoir de paiements sans capacité entrante. Les *liquidity ads* ont été formalisées dans la spécification du protocole Lightning, notamment via le message `node_announcement` qui permet aux nœuds d'annoncer leurs offres, et le protocole de *dual funding* (`open_channel2`) qui permet de négocier l'ouverture du canal. Ce système permet d'automatiser la négociation entre les parties sans intermédiaire de confiance.
