---
title: "MALLÉABILITÉ - TRANSACTION"
slug: "malleabilite-transaction"
permalink: /dictionnaire/malleabilite-transaction/
category: "PROTOCOLE"
letter: "M"
layout: definition
english_term: "TRANSACTION MALLEABILITY"
category_slug: "protocole"
prev_in_category:
  title: "MAJORITÉ ÉCONOMIQUE"
  slug: "majorite-economique"
next_in_category:
  title: "MASF"
  slug: "masf"
cross_references:
  - title: "SEGWIT"
    slug: "segwit"
  - title: "TXID - TRANSACTION IDENTIFIER"
    slug: "txid-transaction-identifier"
---

Se réfère à la possibilité de modifier légèrement la structure d'une transaction Bitcoin, sans en altérer l'effet, mais tout en changeant l'identifiant de transaction (*TXID*). Cette propriété peut être exploitée de manière malveillante pour induire en erreur les parties prenantes sur le statut d'une transaction, causant ainsi des problèmes comme la double dépense. La malléabilité était rendue possible par la flexibilité de la signature numérique utilisée. La malléabilité rendait notamment compliquée une implémentation du Lightning Network. Le soft fork SegWit a été introduit pour résoudre ce problème, en écartant les données malléables de la transaction du calcul du TXID.

*Bien que ce soit rare, on retrouve parfois le terme de « mutabilité » pour évoquer le même concept.*