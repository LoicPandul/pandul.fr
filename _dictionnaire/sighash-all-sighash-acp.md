---
title: "SIGHASH_ALL | SIGHASH_ACP"
slug: "sighash-all-sighash-acp"
permalink: /dictionnaire/sighash-all-sighash-acp/
category: "PROTOCOLE"
letter: "S"
layout: definition
cross_references:
  - title: "SIGHASH FLAG"
    slug: "sighash-flag"
  - title: "SIGHASH_ALL"
    slug: "sighash-all"
---

Type de SigHash Flag (`0x81`) combiné avec le modificateur `SIGHASH_ANYONECANPAY` (`SIGHASH_ACP`) utilisé dans les signatures des transactions Bitcoin. Cette combinaison spécifie que la signature s'applique à tous les outputs et uniquement à un input spécifique de la transaction. `SIGHASH_ALL | SIGHASH_ANYONECANPAY` permet à d'autres participants d'ajouter des inputs supplémentaires à la transaction après sa signature initiale. Elle est particulièrement utile dans des scénarios collaboratifs, comme les transactions de financement participatif, où différents contributeurs peuvent ajouter leurs propres inputs tout en préservant l'intégrité des outputs engagés par le signataire initial.