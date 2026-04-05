---
title: "MOSTRO"
slug: "mostro"
permalink: /dictionnaire/mostro/
category: "OUTIL"
letter: "M"
layout: definition
cross_references:
  - title: "NOSTR"
    slug: "nostr"
  - title: "LIGHTNING NETWORK"
    slug: "lightning-network"
  - title: "KYC - KNOW YOUR CUSTOMER"
    slug: "kyc-know-your-customer"
---

Protocole d'échange pair-à-pair de bitcoins sans KYC, construit sur Nostr. Mostro permet d'acheter et de vendre des bitcoins contre des monnaies fiat via le Lightning Network. Le protocole utilise des *hold invoices* Lightning comme mécanisme de séquestre : les bitcoins du vendeur sont verrouillés dans une facture en attente et ne sont libérés vers l'acheteur qu'après confirmation de la réception du paiement fiat. L'utilisation de Nostr comme couche de communication rend le système résistant à la censure, contrairement aux solutions centralisées. Mostro est écrit en Rust et open source.