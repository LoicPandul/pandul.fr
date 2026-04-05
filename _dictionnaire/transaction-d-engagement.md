---
title: "TRANSACTION D'ENGAGEMENT"
slug: "transaction-d-engagement"
permalink: /dictionnaire/transaction-d-engagement/
category: "LIGHTNING NETWORK"
letter: "T"
layout: definition
english_term: "COMMITMENT TRANSACTION"
category_slug: "lightning-network"
prev_in_category:
  title: "TRAMPOLINE ROUTING"
  slug: "trampoline-routing"
next_in_category:
  title: "TRANSACTION DE FINANCEMENT"
  slug: "transaction-de-financement"
cross_references:
  - title: "CANAL DE PAIMENT"
    slug: "canal-de-paiment"
  - title: "FORCE CLOSE"
    slug: "force-close"
---

Dans le contexte d'un canal bidirectionnel au sein de Lightning, la transaction d'engagement est une transaction que les deux parties créent et signent, sans toutefois la publier sur la chaîne principale. Elle représente l'état actuel de la répartition des fonds entre les parties d'un canal, chaque paiement Lightning résultant en une nouvelle transaction d'engagement. Ces transactions sont valides, mais ne sont diffusées que lorsque le canal est clôturé unilatéralement. Elles contiennent des sorties pour chaque partie, reflétant la répartition des fonds selon les paiements Lightning effectués depuis l'ouverture du canal. Des mécanismes de pénalité sont associés pour dissuader les parties de diffuser des états obsolètes du canal, c'est-à-dire de vieilles transactions d'engagement qui reflètent une mauvaise répartition des fonds.