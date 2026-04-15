---
title: "NOEUD SPV - NOEUD LÉGER"
slug: "noeud-spv-noeud-leger"
permalink: /dictionnaire/noeud-spv-noeud-leger/
category: "PROTOCOLE"
letter: "N"
layout: definition
english_term: "SPV NODE - LIGHTWEIGHT NODE"
category_slug: "protocole"
prev_in_category:
  title: "NOEUD ÉLAGUÉ"
  slug: "noeud-elague"
next_in_category:
  title: "NULL DATA"
  slug: "null-data"
cross_references:
  - title: "SIMPLIFIED PAYMENT VERIFICATION"
    slug: "simplified-payment-verification"
  - title: "ARBRE DE MERKLE"
    slug: "arbre-de-merkle"
---

Un nœud SPV (*Simplified Payment Verification*), parfois nommé « nœud léger », est un client léger d'un nœud Bitcoin qui permet aux utilisateurs de valider les transactions sans avoir à stocker l'intégralité de la blockchain. Au lieu de cela, un nœud SPV stocke seulement les entêtes des blocs, et obtient des informations sur des transactions spécifiques en interrogeant des nœuds complets lorsque nécessaire. Ce principe de vérification est rendu possible par la structure des transactions dans les blocs Bitcoin, qui sont organisées au sein d'un accumulateur cryptographique (Arbre de Merkle).

Cette approche est avantageuse pour les appareils avec des ressources limitées, tels que les téléphones portables. Cependant, les nœuds SPV font confiance aux nœuds complets pour la disponibilité des informations, ce qui implique un niveau de confiance supplémentaire et, par conséquent, une moindre sécurité par rapport aux nœuds complets. Les nœuds SPV ne peuvent pas valider les transactions de manière autonome, mais ils peuvent vérifier si une transaction est incluse dans un bloc en consultant les preuves de Merkle.