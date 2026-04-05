---
title: "BARE-MULTISIG"
slug: "bare-multisig"
permalink: /dictionnaire/bare-multisig/
category: "PROTOCOLE"
letter: "B"
layout: definition
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
---

Modèle de script standard P2MS utilisé pour établir des conditions de dépense sur un UTXO. Il permet de bloquer des bitcoins à l'aide de plusieurs clés publiques. Pour dépenser ces bitcoins, il faut fournir une signature avec un nombre prédéfini de clés privées associées. Par exemple, un P2MS `2/3` dispose de `3` clés publiques avec `3` clés privées secrètes associées. Pour dépenser les bitcoins bloqués avec ce script P2MS, il faut réaliser une signature avec au moins `2` parmi les `3` clés privées. C'est un système de sécurisation à seuil (*threshold*). Ce script a été inventé en 2011 par Gavin Andresen alors qu'il venait de récupérer la maintenance du client principal de Bitcoin. Aujourd'hui, le P2MS n'est utilisé qu'à la marge par certaines applications. L'extrême majorité des multisignatures modernes emploient d'autres modèles de scripts comme le P2SH ou le P2WSH. Par rapport à ceux-ci, le P2MS est extrêmement trivial. Les clés publiques le constituant sont dévoilées dès la réception de la transaction. L'utilisation d'un P2MS est également plus chère que les autres scripts multisignatures.