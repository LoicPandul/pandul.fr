---
title: "AUTOLOOP"
slug: "autoloop"
permalink: /dictionnaire/autoloop/
category: "LIGHTNING NETWORK"
letter: "A"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "ATOMIC MULTI-PATH PAYMENTS"
  slug: "atomic-multi-path-payments"
next_in_category:
  title: "BASE FEE"
  slug: "base-fee"
cross_references:
  - title: "LOOP"
    slug: "loop"
  - title: "LOOP IN"
    slug: "loop-in"
---

Fonctionnalité de Lightning Loop qui automatise les opérations de *Loop In* et de *Loop Out* en fonction de seuils prédéfinis. L'opérateur d'un nœud Lightning configure des limites de liquidité entrante et sortante pour ses canaux, et Autoloop déclenche automatiquement des *submarine swaps* lorsque ces seuils sont dépassés. Cela permet de maintenir un équilibre de liquidité sans intervention manuelle, ce qui est particulièrement utile pour les nœuds de routage qui doivent constamment ajuster la répartition de leurs fonds entre canaux pour maximiser les revenus de routage.
