---
title: "REVOKEANDACK"
slug: "revokeandack"
permalink: /dictionnaire/revokeandack/
category: "LIGHTNING NETWORK"
letter: "R"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "RENDEZ-VOUS ROUTING"
  slug: "rendez-vous-routing"
next_in_category:
  title: "RUST-LIGHTNING"
  slug: "rust-lightning"
cross_references:
  - title: "TRANSACTION D'ENGAGEMENT"
    slug: "transaction-d-engagement"
  - title: "CHANNEL BREACH"
    slug: "channel-breach"
---

Message du protocole Lightning échangé entre deux pairs lors de la mise à jour de l'état d'un canal. Lorsqu'un nouveau paiement est routé ou qu'un HTLC est résolu, les deux parties construisent une nouvelle transaction d'engagement. Le message `revoke_and_ack` remplit deux fonctions simultanées : il révoque l'ancienne transaction d'engagement en transmettant la clé de révocation correspondante, et il accuse réception du nouvel état. Ce mécanisme garantit qu'à tout instant, seul le dernier état du canal est valide. Si un pair tentait de publier un état révoqué, la clé de révocation permettrait à la contrepartie de récupérer l'intégralité des fonds.
