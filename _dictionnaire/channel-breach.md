---
title: "CHANNEL BREACH"
slug: "channel-breach"
permalink: /dictionnaire/channel-breach/
category: "LIGHTNING NETWORK"
letter: "C"
layout: definition
french_term: "VIOLATION DE CANAL"
category_slug: "lightning-network"
prev_in_category:
  title: "CHANNEL ANNOUNCEMENT"
  slug: "channel-announcement"
next_in_category:
  title: "CHANNEL FACTORIES"
  slug: "channel-factories"
cross_references:
  - title: "TRANSACTION D'ENGAGEMENT"
    slug: "transaction-d-engagement"
  - title: "WATCHTOWER"
    slug: "watchtower"
---

Tentative de triche sur le Lightning Network, dans laquelle un pair publie une ancienne transaction d'engagement (*commitment transaction*) pour tenter de récupérer un solde qui ne lui revient plus. Lorsqu'un tel état révoqué est diffusé sur la blockchain, la contrepartie dispose d'un délai défini par le *timelock* pour détecter cette fraude et publier une transaction de justice qui lui permet de récupérer l'intégralité des fonds du canal.

La détection d'une violation de canal peut être assurée directement par le nœud s'il est en ligne, ou déléguée à une *watchtower* qui surveille la blockchain en permanence. Si la violation n'est pas contestée avant l'expiration du *timelock*, le tricheur conserve les fonds indûment récupérés.
