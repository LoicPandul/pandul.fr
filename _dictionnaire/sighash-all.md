---
title: "SIGHASH_ALL"
slug: "sighash-all"
permalink: /dictionnaire/sighash-all/
category: "PROTOCOLE"
letter: "S"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "SIGHASH FLAG"
  slug: "sighash-flag"
next_in_category:
  title: "SIGHASH_ALL | SIGHASH_ACP"
  slug: "sighash-all-sighash-acp"
cross_references:
  - title: "SIGHASH FLAG"
    slug: "sighash-flag"
  - title: "SIGHASH_ALL | SIGHASH_ACP"
    slug: "sighash-all-sighash-acp"
---

Type de SigHash Flag utilisé dans les signatures des transactions Bitcoin pour indiquer que la signature s'applique à tous les composants de la transaction. En utilisant `SIGHASH_ALL`, le signataire couvre tous les inputs et tous les outputs. Cela signifie que ni les inputs ni les outputs ne peuvent être modifiés après la signature sans invalider celle-ci. Ce type de SigHash Flag est le plus courant dans les transactions Bitcoin, car il assure une finalité et une intégrité complètes de la transaction.