---
title: "COMMITMENT FEE"
slug: "commitment-fee"
permalink: /dictionnaire/commitment-fee/
category: "LIGHTNING NETWORK"
letter: "C"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "CLN - CORE-LIGHTNING"
  slug: "cln-core-lightning"
next_in_category:
  title: "COOPERATIVE CLOSE"
  slug: "cooperative-close"
cross_references:
  - title: "TRANSACTION D'ENGAGEMENT"
    slug: "transaction-d-engagement"
  - title: "ANCHOR"
    slug: "anchor"
---

Frais inclus dans la transaction d'engagement (*commitment transaction*) d'un canal Lightning. Cette transaction permet à chaque participant de récupérer ses fonds en cas de fermeture unilatérale du canal. Pour être confirmée dans un délai raisonnable, elle doit comporter des frais de minage suffisants.

Avec l'introduction des *anchor channels*, le *commitment fee* peut être fixé à un montant très faible lors de la négociation du canal. En effet, les *anchor outputs* permettent d'augmenter les frais au moment de la diffusion effective de la transaction d'engagement en y attachant un UTXO supplémentaire via le mécanisme de CPFP (*Child Pays For Parent*). Cela évite de surestimer les frais lors de la création du canal, tout en garantissant une confirmation rapide en cas de fermeture forcée.
