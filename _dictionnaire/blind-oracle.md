---
title: "BLIND ORACLE"
slug: "blind-oracle"
permalink: /dictionnaire/blind-oracle/
category: "COUCHE SUPÉRIEURE"
letter: "B"
layout: definition
french_term: "ORACLE AVEUGLE"
category_slug: "couche-superieure"
prev_in_category:
  title: "BITVM"
  slug: "bitvm"
next_in_category:
  title: "BRC-20"
  slug: "brc-20"
cross_references:
  - title: "ORACLE"
    slug: "oracle"
  - title: "ZKP - ZERO-KNOWLEDGE PROOF"
    slug: "zkp-zero-knowledge-proof"
  - title: "SECURE ELEMENT"
    slug: "secure-element"
---

Protocole cryptographique dans lequel un oracle exécute des opérations (signature, chiffrement) sur un message confidentiel transmis par un utilisateur, sans pouvoir en connaître le contenu. L'utilisateur peut ensuite vérifier la validité du résultat sans avoir exposé le message original à l'oracle. Ce mécanisme repose généralement sur des techniques de chiffrement aveugle (*blind cryptography*), comme les signatures aveugles ou les schémas d'engagement.

Dans le contexte de Bitcoin, le concept de *blind oracle* est utilisé notamment dans le *hardware wallet* Jade de Blockstream. Le portefeuille chiffre la phrase de récupération localement et utilise un oracle distant pour la protection par code PIN, sans que cet oracle n'ait accès aux clés privées ni à la phrase de récupération. Cette approche constitue un « élément sécurisé virtuel » (*virtual secure element*) qui vise à protéger contre les attaques physiques, sans nécessiter de puce sécurisée dédiée.