---
title: "SCHNORR"
slug: "schnorr-protocole"
permalink: /dictionnaire/schnorr-protocole/
category: "CRYPTOGRAPHIE"
letter: "S"
layout: definition
english_term: "SCHNORR PROTOCOL"
category_slug: "cryptographie"
prev_in_category:
  title: "ROAST"
  slug: "roast"
next_in_category:
  title: "SECP256K1"
  slug: "secp256k1"
cross_references:
  - title: "ECDSA"
    slug: "ecdsa"
  - title: "TAPROOT"
    slug: "taproot"
---

Le protocole de Schnorr est un algorithme de signatures électroniques établi sur la cryptographie sur les courbes elliptiques (ECC). Il est utilisé sur Bitcoin pour dériver une clé publique à partir d'une clé privée et pour signer une transaction avec une clé privée. Sur Bitcoin, tout comme ECDSA, Schnorr est établi sur l'exploitation de la courbe elliptique `secp256k1`, caractérisée par l'équation : $y^2 = x^3 + 7$. Le protocole de signature de Schnorr est implémenté dans le protocole Bitcoin depuis novembre 2021 avec l'activation de la mise à jour Taproot.