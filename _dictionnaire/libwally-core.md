---
title: "LIBWALLY-CORE"
slug: "libwally-core"
permalink: /dictionnaire/libwally-core/
category: "OUTIL"
letter: "L"
layout: definition
category_slug: "outil"
prev_in_category:
  title: "KRUX"
  slug: "krux"
next_in_category:
  title: "LIGHTNING NETWORK+"
  slug: "lightning-network-plus"
cross_references:
  - title: "LIBSECP256K1"
    slug: "libsecp256k1"
  - title: "BITCOIN CORE"
    slug: "bitcoin-core"
---

Bibliothèque cryptographique et utilitaire *open source* développée par Blockstream, conçue pour faciliter l'intégration de fonctions Bitcoin dans des applications. Elle fournit des primitives bas niveau pour la gestion des clés, la construction de transactions, l'encodage d'adresses et les opérations sur les PSBT.

Libwally-core est écrite en C pour être portable et performante, avec des *bindings* disponibles pour Python, Java, JavaScript et d'autres langages. Elle s'appuie sur `libsecp256k1` pour les opérations cryptographiques sur la courbe elliptique.

Elle est notamment utilisée comme dépendance centrale de Core Lightning (CLN) pour toutes les opérations liées aux portefeuilles et aux transactions. D'autres projets comme Green Wallet de Blockstream l'utilisent également.
