---
title: "OP_TXHASH - 0XBD"
slug: "op-txhash-0xbd"
permalink: /dictionnaire/op-txhash-0xbd/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_TUCK - 0X7D"
  slug: "op-tuck-0x7d"
next_in_category:
  title: "OP_VAULT - 0XBB"
  slug: "op-vault-0xbb"
cross_references:
  - title: "BIP-0346"
    slug: "bip-0346"
  - title: "OP_CHECKTEMPLATEVERIFY - 0XB3"
    slug: "op-checktemplateverify-0xb3"
---

Opcode `0xbd` proposé dans le BIP-0346 pour Tapscript, en remplacement de `OP_SUCCESS189`. Il fournit un mécanisme généraliste d'introspection de transaction qui produit un hash configurable à partir de certains champs de la transaction de dépense.

L'opcode retire du sommet de la pile un élément appelé `TxFieldSelector`, une structure sérialisée qui détermine quels champs de la transaction doivent être inclus dans le hash. Ce sélecteur permet de cibler, au choix : des champs globaux (version, locktime, index de l'input courant), des champs par input (prevouts, séquences, scriptSigs, valeurs et scriptPubkeys des UTXO dépensés, annexes Taproot) et des champs par output (scriptPubkeys, valeurs). Il offre aussi plusieurs modes de sélection des inputs et outputs : tous, uniquement celui de l'index courant, les N premiers, ou un ensemble d'indices individuels. Après validation du sélecteur, l'opcode pousse sur la pile le hash `SHA256` de 32 octets calculé à partir des champs sélectionnés.

Avec un `TxFieldSelector` vide, `OP_TXHASH` produit un hash sémantiquement équivalent à celui de `OP_CHECKTEMPLATEVERIFY`, ce qui en fait une généralisation stricte du BIP-0119. Combiné avec `OP_CHECKSIGFROMSTACK`, il permettrait de construire des hashs de signature arbitraires et d'émuler `SIGHASH_ANYPREVOUT` ainsi que d'autres modes de signature. Cette proposition est pour le moment toujours en brouillon.