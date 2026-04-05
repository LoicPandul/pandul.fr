---
title: "CIRCULAR REBALANCE"
slug: "circular-rebalance"
permalink: /dictionnaire/circular-rebalance/
category: "LIGHTNING NETWORK"
letter: "C"
layout: definition
french_term: "RÉÉQUILIBRAGE CIRCULAIRE"
category_slug: "lightning-network"
prev_in_category:
  title: "CHANNEL.DB"
  slug: "channel-db"
next_in_category:
  title: "CLÉ DE RÉVOCATION"
  slug: "cle-de-revocation"
cross_references:
  - title: "BOS - BALANCE OF SATOSHIS"
    slug: "bos-balance-of-satoshis"
  - title: "FEE RATE - LIGHTNING"
    slug: "fee-rate-lightning"
---

Paiement qu'un nœud Lightning s'envoie à lui-même en empruntant un chemin passant par d'autres nœuds du réseau. L'objectif est de déplacer de la liquidité d'un canal vers un autre sans ouvrir ni fermer de canal. Par exemple, si un nœud dispose de beaucoup de liquidité sortante sur un canal A mais manque de liquidité sortante sur un canal B, il peut s'envoyer un paiement circulaire qui sort par A et revient par B, rééquilibrant ainsi les deux canaux. Cette opération a un coût correspondant aux frais de routage prélevés par les nœuds intermédiaires.
