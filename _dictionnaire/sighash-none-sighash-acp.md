---
title: "SIGHASH_NONE | SIGHASH_ACP"
slug: "sighash-none-sighash-acp"
permalink: /dictionnaire/sighash-none-sighash-acp/
category: "PROTOCOLE"
letter: "S"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "SIGHASH_NONE - 0X02"
  slug: "sighash-none-0x02"
next_in_category:
  title: "SIGHASH_SINGLE - 0X03"
  slug: "sighash-single-0x03"
cross_references:
  - title: "SIGHASH FLAG"
    slug: "sighash-flag"
  - title: "SIGHASH_NONE - 0X02"
    slug: "sighash-none-0x02"
---

Type de SigHash Flag (`0x82`) combiné avec le modificateur `SIGHASH_ANYONECANPAY` (`SIGHASH_ACP`) utilisé dans les signatures des transactions Bitcoin. Cette combinaison indique que la signature s'applique seulement à un input spécifique, sans engager aucun output. Cela permet aux autres participants de rajouter librement des inputs supplémentaires et de modifier tous les outputs de la transaction.