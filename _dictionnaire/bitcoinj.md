---
title: "BITCOINJ"
slug: "bitcoinj"
permalink: /dictionnaire/bitcoinj/
category: "OUTIL"
letter: "B"
layout: definition
category_slug: "outil"
prev_in_category:
  title: "BITCOIN CORE GUI-QML"
  slug: "bitcoin-core-gui-qml"
next_in_category:
  title: "BITREFILL"
  slug: "bitrefill"
cross_references:
  - title: "IMPLÉMENTATION DE BITCOIN"
    slug: "implementation-de-bitcoin"
  - title: "SIMPLIFIED PAYMENT VERIFICATION"
    slug: "simplified-payment-verification"
---

Bibliothèque open source qui implémente le protocole Bitcoin en Java, créée par Mike Hearn en 2011. Elle est conçue pour fonctionner en mode SPV (*Simplified Payment Verification*) : au lieu de télécharger l'intégralité de la blockchain, elle ne récupère que les entêtes de blocs et utilise les filtres de Bloom pour identifier les transactions pertinentes. Ce fonctionnement léger la rend adaptée aux appareils mobiles et aux environnements à ressources limitées. Bitcoinj a servi de base à de nombreux projets, notamment l'app Bitcoin Wallet (qui n'existe plus), Bisq ou encore RSK.