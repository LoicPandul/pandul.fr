---
title: "BOLT-11"
slug: "bolt-11"
permalink: /dictionnaire/bolt-11/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
cross_references:
  - title: "BOLT"
    slug: "bolt"
  - title: "BOLT-12"
    slug: "bolt-12"
---

Spécification qui définit le format d'encodage des factures de paiement Lightning (*payment requests*), conçu pour être compatible avec les codes QR. Une facture BOLT-11 est encodée en Bech32 et se compose de trois parties : un préfixe lisible indiquant le réseau et un montant optionnel (avec des multiplicateurs `m`, `u`, `n`, `p`), une section de données contenant un horodatage et des champs étiquetés (*tagged fields*), et une signature ECDSA. Les champs étiquetés transportent le hash de paiement, le secret de paiement, la description, le délai d'expiration, des indices de routage pour les canaux privés et des flags de fonctionnalités. BOLT-11 est progressivement complété par BOLT-12 qui apporte des factures réutilisables et une meilleure confidentialité.