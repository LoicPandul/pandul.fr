---
title: "SIGHASH_ANYPREVOUT"
slug: "sighash-anyprevout"
permalink: /dictionnaire/sighash-anyprevout/
category: "PROTOCOLE"
letter: "S"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "SIGHASH_ALL | SIGHASH_ACP"
  slug: "sighash-all-sighash-acp"
next_in_category:
  title: "SIGHASH_ANYPREVOUTANYSCRIPT"
  slug: "sighash-anyprevoutanyscript"
cross_references:
  - title: "BIP-0118"
    slug: "bip-0118"
  - title: "SIGHASH FLAG"
    slug: "sighash-flag"
---

Proposition d'implémentation d'un nouveau SigHash Flag modificateur dans Bitcoin, introduite avec le BIP-0118. `SIGHASH_ANYPREVOUT` permet une plus grande flexibilité dans la gestion des transactions, en particulier pour des applications avancées comme les canaux de paiement sur le Lightning Network et la mise à jour Eltoo. Le `SIGHASH_ANYPREVOUT` permet de ne lier la signature à aucun UTXO spécifique antérieur (*Any Previous Output*). Utilisé en combinaison avec `SIGHASH_ALL`, il permettrait de signer tous les inputs et tous les outputs d'une transaction, mais sans s'engager sur l'UTXO spécifique dépensé par chaque input. Cela permettrait de réutiliser la signature pour différentes transactions, tant que certaines conditions spécifiées sont remplies.

*Ce SigHash modificateur `SIGHASH_ANYPREVOUT` est hérité de l'idée du `SIGHASH_NOINPUT` initialement proposée par Joseph Poon en 2016 pour améliorer son idée du Lightning Network.*