---
title: "ZOMBIE CHANNEL"
slug: "zombie-channel"
permalink: /dictionnaire/zombie-channel/
category: "LIGHTNING NETWORK"
letter: "Z"
layout: definition
french_term: "CANAL ZOMBIE"
category_slug: "lightning-network"
prev_in_category:
  title: "ZEUS"
  slug: "zeus"
cross_references:
  - title: "CANAL DE PAIMENT"
    slug: "canal-de-paiment"
---

Canal Lightning considéré comme inactif, généralement parce que le pair distant a subi une défaillance ou n'est plus en ligne depuis une période prolongée. Un *zombie channel* immobilise du capital sans pouvoir être utilisé pour router des paiements, ce qui réduit la liquidité disponible de l'opérateur de nœud. Ce type de canal peut également être problématique en cas de tentative de récupération d'un nœud Lightning via un SCB (*Static Channel Backup*). Il est recommandé de fermer ces canaux lorsqu'il devient improbable que le pair revienne en ligne.
