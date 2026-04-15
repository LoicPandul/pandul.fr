---
title: "FEE RATE - LIGHTNING"
slug: "fee-rate-lightning"
permalink: /dictionnaire/fee-rate-lightning/
category: "LIGHTNING NETWORK"
letter: "F"
layout: definition
french_term: "TAUX DE FRAIS LIGHTNING"
category_slug: "lightning-network"
prev_in_category:
  title: "FARADAY"
  slug: "faraday"
next_in_category:
  title: "FORCE CLOSE"
  slug: "force-close"
cross_references:
  - title: "BASE FEE"
    slug: "base-fee"
  - title: "LIGHTNING NETWORK"
    slug: "lightning-network"
---

Composante proportionnelle des frais de routage sur le Lightning Network. Pour chaque paiement transmis, un nœud peut prélever un *fee rate* calculé en proportion du montant routé, exprimé en parties par million (ppm). Par exemple, un *fee rate* de 100 ppm signifie que le nœud prélève 100 satoshis pour chaque million de satoshis routés. Le *fee rate* complète le *base fee*, qui est un montant fixe par transaction. L'ajustement du *fee rate* est un levier essentiel de la gestion d'un nœud de routage : un taux trop élevé dissuade le trafic, tandis qu'un taux trop bas ne compense pas le coût d'immobilisation de la liquidité dans le canal.
