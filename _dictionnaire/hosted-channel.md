---
title: "HOSTED CHANNEL"
slug: "hosted-channel"
permalink: /dictionnaire/hosted-channel/
category: "LIGHTNING NETWORK"
letter: "H"
layout: definition
french_term: "CANAL HÉBERGÉ"
category_slug: "lightning-network"
prev_in_category:
  title: "HODL INVOICE"
  slug: "hodl-invoice"
next_in_category:
  title: "HTLC"
  slug: "htlc"
cross_references:
  - title: "TURBO CHANNEL"
    slug: "turbo-channel"
  - title: "CANAL DE PAIMENT"
    slug: "canal-de-paiment"
---

Canal Lightning qui n'est pas ancré dans une transaction on-chain, contrairement aux canaux classiques. Un *hosted channel*, aussi appelé « canal custodial » ou « canal virtuel », ne repose sur aucune transaction de financement sur la blockchain Bitcoin : il n'existe qu'au niveau du protocole Lightning, sans garantie de règlement on-chain.

Le fonctionnement implique deux rôles asymétriques : un hôte, qui fournit le canal avec de la liquidité de son côté, et un client, qui utilise ce canal pour accéder au réseau Lightning. Les fonds restent sous la garde de l'hôte, ce qui rend le modèle custodial. Toutefois, par rapport aux portefeuilles custodials traditionnels, les *hosted channels* offrent des garanties supplémentaires : le client génère lui-même ses factures et contrôle les préimages de paiement, ce qui rend la fraude détectable. L'hôte et le client échangent des données d'état signées mutuellement, ce qui fournit une preuve cryptographique du solde dû. L'ouverture et la fermeture de ces canaux ne coûtent rien en frais de minage, ce qui facilite l'intégration de nouveaux utilisateurs sur le Lightning Network à moindre coût.
