---
title: "BOLT-08"
slug: "bolt-08"
permalink: /dictionnaire/bolt-08/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "BOLT-07"
  slug: "bolt-07"
next_in_category:
  title: "BOLT-09"
  slug: "bolt-09"
cross_references:
  - title: "BOLT"
    slug: "bolt"
---

Spécification qui définit la couche de transport chiffrée et authentifiée du Lightning Network. Elle repose sur le protocole Noise, où l'initiateur doit connaître la clé publique du répondeur avant la connexion. Le *handshake* se déroule en trois actes, au terme desquels les deux pairs partagent des clés de session.