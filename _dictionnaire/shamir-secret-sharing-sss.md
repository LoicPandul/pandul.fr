---
title: "SHAMIR SECRET SHARING - SSS"
slug: "shamir-secret-sharing-sss"
permalink: /dictionnaire/shamir-secret-sharing-sss/
category: "CRYPTOGRAPHIE"
letter: "S"
layout: definition
french_term: "PARTAGE DE SECRET DE SHAMIR"
category_slug: "cryptographie"
prev_in_category:
  title: "SHA512"
  slug: "sha512"
next_in_category:
  title: "SIGN-TO-CONTRACT"
  slug: "sign-to-contract"
cross_references:
  - title: "CODEX32"
    slug: "codex32"
  - title: "SIGNATURE NUMÉRIQUE"
    slug: "signature-numerique"
  - title: "FROST"
    slug: "frost"
---

Schéma cryptographique de partage de secret conçu par Adi Shamir en 1979. Il permet de diviser un secret en n parts distinctes, de sorte qu'un minimum de t parts soit nécessaire pour reconstruire le secret original, tandis que t-1 parts ou moins ne révèlent aucune information à son sujet. Le paramétrage (t, n) est défini lors de la création des parts.

Dans l'écosystème Bitcoin, le partage de secret de Shamir est utilisé dans plusieurs contextes. Le protocole Codex32, formalisé dans le BIP-0093, repose sur ce schéma pour permettre la sauvegarde et la reconstruction manuelle de graines. C'est également une option proposée sur les *hardware wallets* Trezor. Les protocoles de signatures à seuil comme FROST s'appuient également sur ce mécanisme lors de la phase de génération distribuée de clés.