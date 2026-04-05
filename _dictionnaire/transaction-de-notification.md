---
title: "TRANSACTION DE NOTIFICATION"
slug: "transaction-de-notification"
permalink: /dictionnaire/transaction-de-notification/
category: "CONFIDENTIALITÉ"
letter: "T"
layout: definition
english_term: "NOTIFICATION TRANSACTION"
category_slug: "confidentialite"
prev_in_category:
  title: "TRANSACTION COLLABORATIVE"
  slug: "transaction-collaborative"
next_in_category:
  title: "TUMBLEBIT"
  slug: "tumblebit"
cross_references:
  - title: "BIP-0047"
    slug: "bip-0047"
  - title: "PAYNYM"
    slug: "paynym"
---

Transaction Bitcoin spécifique utilisée dans le cadre du protocole BIP-0047 (codes de paiement réutilisables). La transaction de notification constitue la première étape nécessaire pour établir un lien de paiement entre deux utilisateurs via leurs codes de paiement respectifs.

Concrètement, lorsque Alice souhaite envoyer des paiements à Bob en utilisant son code de paiement, elle doit d'abord lui envoyer une transaction de notification. Cette transaction contient, dans un output `OP_RETURN`, le code de paiement d'Alice chiffré à l'aide d'un secret partagé calculé avec ECDH (*Elliptic-Curve Diffie-Hellman*). Bob, en surveillant son adresse de notification, peut déchiffrer cette information et découvrir le code de paiement d'Alice. Il peut alors dériver les adresses correspondantes pour identifier les paiements futurs d'Alice.

La transaction de notification n'a besoin d'être envoyée qu'une seule fois pour chaque paire d'utilisateurs. Les paiements suivants entre Alice et Bob ne nécessitent plus cette étape.