---
title: "OFFER"
slug: "offer"
permalink: /dictionnaire/offer/
category: "LIGHTNING NETWORK"
letter: "O"
layout: definition
french_term: "OFFRE / DEMANDE DE PAIEMENT RÉUTILISABLE"
category_slug: "lightning-network"
prev_in_category:
  title: "NWC - NOSTR WALLET CONNECT"
  slug: "nwc-nostr-wallet-connect"
next_in_category:
  title: "ONION MESSAGE"
  slug: "onion-message"
cross_references:
  - title: "BOLT"
    slug: "bolt"
  - title: "LIGHTNING NETWORK"
    slug: "lightning-network"
---

Dans le cadre de BOLT-12, les « *offers* » sont des QR codes statiques pour effectuer plusieurs paiements sur le Lightning Network. Contrairement aux invoices classiques, les *offers* peuvent être réutilisées. Elles permettent de générer plusieurs demandes d'invoices. Lorsqu'un utilisateur scanne un QR code contenant une *offer*, il envoie un message pour demander une nouvelle invoice au nœud Lightning associé. Le nœud répond avec une invoice que le payeur peut utiliser. Les *offers* permettent ainsi de disposer d'un identifiant unique pour recevoir de nombreux paiements de la part de plusieurs utilisateurs différents sur Lightning.