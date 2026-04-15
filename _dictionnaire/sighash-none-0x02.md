---
title: "SIGHASH_NONE - 0X02"
slug: "sighash-none-0x02"
permalink: /dictionnaire/sighash-none-0x02/
category: "PROTOCOLE"
letter: "S"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "SIGHASH_ANYPREVOUTANYSCRIPT"
  slug: "sighash-anyprevoutanyscript"
next_in_category:
  title: "SIGHASH_NONE | SIGHASH_ACP"
  slug: "sighash-none-sighash-acp"
cross_references:
  - title: "SIGHASH FLAG"
    slug: "sighash-flag"
  - title: "SIGHASH_ALL"
    slug: "sighash-all"
---

Type de SigHash Flag utilisé dans les signatures des transactions Bitcoin pour indiquer que la signature s'applique à tous les inputs de la transaction, mais à aucun de ses outputs. L'utilisation de `SIGHASH_NONE` implique que le signataire s'engage uniquement sur les entrées, mais permet que les sorties restent indéterminées ou modifiables après la signature. Ce type de signature est utile dans les cas où le signataire souhaite autoriser d'autres parties à décider de la manière dont les bitcoins seront distribués dans cette transaction.