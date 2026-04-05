---
title: "RUST BITCOIN"
slug: "rust-bitcoin"
permalink: /dictionnaire/rust-bitcoin/
category: "OUTIL"
letter: "R"
layout: definition
category_slug: "outil"
prev_in_category:
  title: "RTL - RIDE THE LIGHTNING"
  slug: "rtl-ride-the-lightning"
next_in_category:
  title: "SDK - SOFTWARE DEVELOPMENT KIT"
  slug: "sdk-software-development-kit"
cross_references:
  - title: "BITCOIN CORE"
    slug: "bitcoin-core"
  - title: "SECP256K1"
    slug: "secp256k1"
---

Bibliothèque *open source* écrite en Rust pour manipuler les structures de données et les messages du protocole Bitcoin. Elle permet de sérialiser et désérialiser des transactions, des blocs et des messages réseau, de gérer des clés privées, des adresses et la dérivation BIP-0032, ou encore de travailler avec des PSBT.

Rust Bitcoin n'est pas conçue pour la validation de consensus : des écarts, connus et inconnus, existent avec l'implémentation de référence Bitcoin Core, ce qui la rend inadaptée pour un nœud complet. Elle cible plutôt les développeurs qui construisent des portefeuilles, des explorateurs, des outils d'analyse ou tout logiciel qui interagit avec le réseau Bitcoin sans le valider intégralement.

Le projet, publié sous licence CC0 (domaine public), s'accompagne de *crates* compagnons comme `bitcoin_hashes`, `secp256k1` ou `miniscript`, et fonctionne en environnement `no-std` pour les systèmes embarqués.