---
title: "SIGHASH_ANYPREVOUTANYSCRIPT"
slug: "sighash-anyprevoutanyscript"
permalink: /dictionnaire/sighash-anyprevoutanyscript/
category: "PROTOCOLE"
letter: "S"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "SIGHASH_ANYPREVOUT"
  slug: "sighash-anyprevout"
next_in_category:
  title: "SIGHASH_NONE - 0X02"
  slug: "sighash-none-0x02"
cross_references:
  - title: "SIGHASH_ANYPREVOUT"
    slug: "sighash-anyprevout"
  - title: "SIGHASH FLAG"
    slug: "sighash-flag"
---

Variante du SigHash Flag modificateur `SIGHASH_ANYPREVOUT` dans Bitcoin, introduite dans le BIP-0118. Ce SigHash fonctionne comme `SIGHASH_ANYPREVOUT`, mais en plus de ne pas s'engager sur l'UTXO spécifique dépensé, la signature ne s'engage ni sur le script (scriptCode/tapscript) ni sur le montant de l'input. Cela permet de réutiliser une même signature pour dépenser n'importe quel UTXO utilisant la même clé publique BIP-0118, quel que soit le script ou le montant associé.