---
title: "MODÈLE DE TRANSACTION"
slug: "modele-de-transaction"
permalink: /dictionnaire/modele-de-transaction/
category: "PROTOCOLE"
letter: "M"
layout: definition
english_term: "TRANSACTION PATTERN"
category_slug: "protocole"
prev_in_category:
  title: "MILLIBITCOIN"
  slug: "millibitcoin"
next_in_category:
  title: "MTP - MEDIAN TIME PAST"
  slug: "mtp-median-time-past"
cross_references:
  - title: "ANALYSE DE CHAINE"
    slug: "analyse-de-chaine"
  - title: "PAIEMENT SIMPLE"
    slug: "paiement-simple"
---

Un *pattern* de transaction est simplement un modèle ou une structure globale de transaction typique, que l'on peut retrouver sur la blockchain, et dont on connaît l'interprétation vraisemblable qui nous sera utile dans le cadre d'une analyse de chaîne. Lorsque l'on étudie les *patterns*, on va s'attarder sur une seule transaction que l'on va analyser à un niveau élevé (contrairement aux heuristiques internes et externes d'analyse de chaîne). En d'autres termes, nous allons uniquement regarder le nombre d'UTXOs en inputs et le nombre d'UTXOs en outputs, sans nous attarder sur les détails plus spécifiques ou l'environnement de la transaction. À partir du modèle observé, nous pourrons interpréter la nature de la transaction. On va alors rechercher des caractéristiques sur sa structure et en déduire une interprétation vraisemblable.

*En anglais, on parle de « patterns ».*