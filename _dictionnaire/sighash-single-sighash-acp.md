---
title: "SIGHASH_SINGLE | SIGHASH_ACP"
slug: "sighash-single-sighash-acp"
permalink: /dictionnaire/sighash-single-sighash-acp/
category: "PROTOCOLE"
letter: "S"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "SIGHASH_SINGLE - 0X03"
  slug: "sighash-single-0x03"
next_in_category:
  title: "SIGNALING"
  slug: "signaling"
cross_references:
  - title: "SIGHASH FLAG"
    slug: "sighash-flag"
  - title: "SIGHASH_SINGLE - 0X03"
    slug: "sighash-single-0x03"
---

Type de SigHash Flag (`0x83`) combiné avec le modificateur `SIGHASH_ANYONECANPAY` (`SIGHASH_ACP`) utilisé dans les signatures des transactions Bitcoin. Cette combinaison spécifie que la signature s'applique à un seul input spécifique et uniquement à l'output ayant le même index que cet input. Les autres inputs et outputs peuvent être ajoutés ou modifiés par d'autres parties. Cette configuration est utile pour des transactions collaboratives où les participants peuvent ajouter leurs propres inputs pour financer un output spécifique.