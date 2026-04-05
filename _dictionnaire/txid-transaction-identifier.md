---
title: "TXID - TRANSACTION IDENTIFIER"
slug: "txid-transaction-identifier"
permalink: /dictionnaire/txid-transaction-identifier/
category: "PROTOCOLE"
letter: "T"
layout: definition
french_term: "IDENTIFIANT DE TRANSACTION"
category_slug: "protocole"
prev_in_category:
  title: "TX - TRANSACTION"
  slug: "tx-transaction"
next_in_category:
  title: "UASF"
  slug: "uasf"
cross_references:
  - title: "WTXID"
    slug: "wtxid"
---

Identifiant unique associé à chaque transaction Bitcoin. Il est généré en calculant le hachage `SHA256d` des données de la transaction. Le TXID sert de référence pour retrouver une transaction spécifique au sein de la blockchain. Il est également utilisé pour faire référence à un UTXO, via un *outpoint* qui est essentiellement la concaténation du TXID d'une transaction précédente et de l'index de l'output désigné (également appelé « *vout* »). Pour les transactions post-SegWit, le TXID ne prend plus en compte le témoin de la transaction, ce qui permet de supprimer la malléabilité.
