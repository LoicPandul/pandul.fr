---
title: "OUTPOINT"
slug: "outpoint"
permalink: /dictionnaire/outpoint/
category: "PROTOCOLE"
letter: "O"
layout: definition
french_term: "POINT DE SORTIE"
category_slug: "protocole"
prev_in_category:
  title: "ORPHELIN"
  slug: "orphelin"
next_in_category:
  title: "OUTPUT"
  slug: "output"
cross_references:
  - title: "UTXO"
    slug: "utxo"
  - title: "INPUT"
    slug: "input"
---

Référence unique à une sortie de transaction (*output*). Il est constitué de deux éléments :
* `txid` : l'identifiant de la transaction qui a créé l'output ;
* `vout` : l'index de l'output dans la transaction.

La combinaison de ces deux éléments permet d'identifier précisément un output de transaction. Par exemple, si une transaction a un `txid` de `abc...123` et que l'index de l'output est `0`, l'outpoint sera noté :

```text
abc...123:0
```

L'outpoint est utilisé dans les inputs (`vin`) d'une nouvelle transaction pour indiquer quel UTXO est dépensé.

*Le terme « outpoint » est souvent utilisé comme synonyme de « UTXO ».*