---
title: "JOINSTR"
slug: "joinstr"
permalink: /dictionnaire/joinstr/
category: "CONFIDENTIALITÉ"
letter: "J"
layout: definition
category_slug: "confidentialite"
prev_in_category:
  title: "JOINMARKET"
  slug: "joinmarket"
next_in_category:
  title: "LABEL - SILENT PAYMENTS"
  slug: "label-silent-payments"
cross_references:
  - title: "COINJOIN"
    slug: "coinjoin"
  - title: "NOSTR"
    slug: "nostr"
---

Protocole de coinjoin décentralisé qui utilise Nostr comme couche de communication. Proposé en août 2022 par le développeur pseudonyme « 1440000bytes », il élimine le besoin d'un coordinateur central, qui constitue traditionnellement un point de défaillance dans les implémentations de coinjoin. Les participants inscrivent leurs sorties via des relais Nostr, puis le système crée une transaction Bitcoin partiellement signée (PSBT) que chaque participant signe individuellement. Une fois toutes les signatures collectées, la transaction combinée est diffusée sur le réseau.