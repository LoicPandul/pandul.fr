---
title: "MULTI PROTOCOL COMMITMENT"
slug: "multi-protocol-commitment"
permalink: /dictionnaire/multi-protocol-commitment/
category: "RGB"
letter: "M"
layout: definition
category_slug: "rgb"
prev_in_category:
  title: "INVOICE RGB"
  slug: "invoice-rgb"
next_in_category:
  title: "OWNED STATE"
  slug: "owned-state"
cross_references:
  - title: "TRANSITION BUNDLE"
    slug: "transition-bundle"
  - title: "ANCHOR"
    slug: "anchor"
---

Dans le cadre du protocole RGB, le MPC désigne la structure d'arbre de Merkle conçue pour intégrer, au sein d'une unique transaction Bitcoin, plusieurs *Transition Bundles* issus de contrats distincts. Ce mécanisme permet de regrouper divers engagements, lesquels correspondent à des contrats ou des actifs différents, en un seul point d'ancrage. En consolidant ces transitions dans une structure hiérarchisée, le MPC optimise l'occupation de l'espace de bloc, afin de réduire les frais de transaction et d'améliorer l'efficacité de l'utilisation de la blockchain.