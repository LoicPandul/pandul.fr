---
title: "ONION MESSAGE"
slug: "onion-message"
permalink: /dictionnaire/onion-message/
category: "LIGHTNING NETWORK"
letter: "O"
layout: definition
french_term: "MESSAGE EN OIGNON"
category_slug: "lightning-network"
prev_in_category:
  title: "OFFER"
  slug: "offer"
next_in_category:
  title: "OUTBOUND CAPACITY"
  slug: "outbound-capacity"
cross_references:
  - title: "ROUTAGE EN OIGNON"
    slug: "routage-en-oignon"
  - title: "BOLT-12"
    slug: "bolt-12"
---

Messages légers et flexibles transmis entre pairs sur le Lightning Network en utilisant le routage en oignon, sans nécessiter l'envoi de fonds ni le verrouillage de liquidité. Contrairement aux paiements Lightning qui passent par les HTLC, les onion messages sont simplement relayés de pair en pair le long de connexions existantes, ce qui les rend gratuits pour l'expéditeur.

Les onion messages constituent la brique de communication du protocole BOLT-12 (*offers*). Ils permettent à un payeur de contacter un destinataire pour demander une invoice, même sans canal direct entre eux. Grâce aux *blinded paths*, le destinataire peut recevoir ces messages sans révéler son identité ni sa position dans le réseau : il construit une route chiffrée vers lui-même depuis un nœud populaire, ce qui dilue son identité parmi de nombreux candidats possibles.

Au-delà des *offers*, les onion messages ouvrent la voie aux paiements asynchrones : un LSP peut retenir un paiement et utiliser un onion message pour signaler que le destinataire est en ligne, éliminant ainsi l'obligation pour le receveur d'être connecté en permanence.
