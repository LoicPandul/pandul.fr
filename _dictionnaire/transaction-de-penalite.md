---
title: "TRANSACTION DE PÉNALITÉ"
slug: "transaction-de-penalite"
permalink: /dictionnaire/transaction-de-penalite/
category: "LIGHTNING NETWORK"
letter: "T"
layout: definition
english_term: "PENALTY TRANSACTION"
cross_references:
  - title: "FORCE CLOSE"
    slug: "force-close"
  - title: "CHANNEL BREACH"
    slug: "channel-breach"
---

Transaction Bitcoin utilisée sur le Lightning Network pour punir un pair qui a publié une ancienne transaction d'engagement révoquée sur la blockchain. Elle permet à la partie lésée de récupérer la totalité des fonds du canal, y compris la part de l'attaquant.

Le mécanisme repose sur les clés de révocation. Lorsqu'un état du canal est mis à jour, chaque partie remet à l'autre une clé qui permet de dépenser l'intégralité des fonds si l'ancien état venait à être publié. Si un nœud tente de tricher en diffusant un vieil engagement, son pair dispose d'un délai pour détecter la fraude et construire la transaction de pénalité à l'aide de cette clé de révocation. Ce délai est garanti par un timelock `OP_CHECKSEQUENCEVERIFY` sur la sortie du tricheur.

Les *watchtowers* sont des services tiers qui surveillent la blockchain en permanence pour détecter ces fraudes et diffuser les transactions de pénalité au nom des nœuds hors ligne.