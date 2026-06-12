---
title: "BARE-MULTISIG"
slug: "bare-multisig"
permalink: /dictionnaire/bare-multisig/
category: "PROTOCOLE"
letter: "B"
layout: definition
description: "Modèle de script standard P2MS utilisé pour établir des conditions de dépense sur un UTXO."
french_term: "MULTISIG BRUT"
category_slug: "protocole"
prev_in_category:
  title: "ASSUME VALID"
  slug: "assume-valid"
next_in_category:
  title: "BASE58CHECK"
  slug: "base58check"
cross_references:
  - title: "P2MS"
    slug: "p2ms"
  - title: "P2SH"
    slug: "p2sh"
  - title: "BIP-0011"
    slug: "bip-0011"
---

Modèle de script standard P2MS utilisé pour établir des conditions de dépense sur un UTXO. Il permet de bloquer des bitcoins à l'aide de plusieurs clés publiques. Pour dépenser ces bitcoins, il faut fournir une signature avec un nombre prédéfini de clés privées associées. Par exemple, un P2MS `2/3` dispose de `3` clés publiques avec `3` clés privées secrètes associées. Pour dépenser les bitcoins bloqués avec ce script P2MS, il faut réaliser une signature avec au moins `2` parmi les `3` clés privées. C'est un système de sécurisation à seuil (*threshold*). Ce script a été standardisé en 2011 par Gavin Andresen, avec la publication du BIP-0011, alors qu'il venait de récupérer la maintenance du client principal de Bitcoin. L'opcode `OP_CHECKMULTISIG`, sur lequel il repose, existait déjà dans le code source original de Bitcoin, mais les scripts qui l'utilisaient n'étaient pas standards avant cette proposition. Aujourd'hui, le P2MS n'est utilisé qu'à la marge par certaines applications. L'extrême majorité des multisignatures modernes emploient d'autres modèles de scripts comme le P2SH, le P2WSH ou le P2TR. Par rapport à ceux-ci, le P2MS est extrêmement trivial. Les clés publiques le constituant sont dévoilées dès la réception de la transaction. L'utilisation d'un P2MS est également plus chère que les autres scripts multisignatures.