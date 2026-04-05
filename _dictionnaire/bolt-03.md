---
title: "BOLT-03"
slug: "bolt-03"
permalink: /dictionnaire/bolt-03/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
cross_references:
  - title: "BOLT"
    slug: "bolt"
  - title: "TRANSACTION D'ENGAGEMENT"
    slug: "transaction-d-engagement"
---

Spécification qui définit les formats exacts des transactions Bitcoin et des scripts utilisés dans les canaux Lightning. Elle détaille la structure de la transaction de financement (sortie P2WSH multisignature 2/2), des transactions d'engagement (*commitment transactions*) qui représentent l'état courant du canal avec leurs sorties `to_local` et `to_remote`, et des transactions HTLC. Le BOLT-03 spécifie également le calcul des frais, les limites de poussière (*dust*), les procédures de dérivation des clés et les poids attendus des transactions pour une estimation correcte des frais.