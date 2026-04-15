---
title: "COOPERATIVE CLOSE"
slug: "cooperative-close"
permalink: /dictionnaire/cooperative-close/
category: "LIGHTNING NETWORK"
letter: "C"
layout: definition
french_term: "FERMETURE COOPÉRATIVE"
category_slug: "lightning-network"
prev_in_category:
  title: "COMMITMENT FEE"
  slug: "commitment-fee"
next_in_category:
  title: "DUAL FUNDING"
  slug: "dual-funding"
cross_references:
  - title: "FORCE CLOSE"
    slug: "force-close"
  - title: "CANAL DE PAIMENT"
    slug: "canal-de-paiment"
---

Fermeture d'un canal Lightning réalisée avec l'accord mutuel des deux parties. C'est la méthode de fermeture la plus avantageuse : les deux partenaires du canal signent conjointement une transaction de clôture qui redistribue les fonds vers leurs adresses respectives, sans timelock.

Contrairement à une fermeture forcée (*force close*), où une transaction d'engagement unilatérale est diffusée et impose un *timelock* avant que les fonds ne soient accessibles, la fermeture coopérative produit une transaction simple. Les frais de minage sont donc réduits (puisqu'ils peuvent être ajustés au marché de frais du moment), et les fonds sont disponibles dès la confirmation de la transaction.
