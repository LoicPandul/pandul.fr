---
title: "SIGNALING"
slug: "signaling"
permalink: /dictionnaire/signaling/
category: "PROTOCOLE"
letter: "S"
layout: definition
french_term: "SIGNALISATION"
category_slug: "protocole"
prev_in_category:
  title: "SIGHASH_SINGLE | SIGHASH_ACP"
  slug: "sighash-single-sighash-acp"
next_in_category:
  title: "SIGNET"
  slug: "signet"
cross_references:
  - title: "SOFT FORK"
    slug: "soft-fork"
  - title: "MÉTHODE D'ACTIVATION"
    slug: "methode-d-activation"
---

Mécanisme par lequel les mineurs indiquent leur soutien ou leur préparation à une proposition de soft fork sur Bitcoin. Le signaling s'effectue en positionnant un bit spécifique dans le champ `nVersion` de l'en-tête des blocs qu'ils minent, conformément au processus défini par le BIP-0009 (et ses successeurs comme le BIP-0008).

Chaque bit du champ de version peut être associé à une proposition de soft fork distincte. Lorsqu'un mineur positionne le bit correspondant, il signale qu'il a mis à jour son logiciel et qu'il est prêt à appliquer les nouvelles règles.