---
title: "RPC - REMOTE PROCEDURE CALL"
slug: "rpc-remote-procedure-call"
permalink: /dictionnaire/rpc-remote-procedure-call/
category: "INFORMATIQUE"
letter: "R"
layout: definition
french_term: "APPEL DE PROCÉDURE À DISTANCE"
cross_references:
  - title: "BITCOIND"
    slug: "bitcoind"
  - title: "BITCOIN CORE"
    slug: "bitcoin-core"
---

Protocole informatique permettant à un programme d'exécuter une procédure sur un autre ordinateur distant, comme si elle était exécutée localement.

Spécifiquement dans le cadre de Bitcoin, on l'utilise pour permettre aux applications d'interagir avec `bitcoind`. Il peut être utilisé pour exécuter des commandes sur un nœud Bitcoin, telles que l'envoi de transactions, la gestion de portefeuilles ou encore l'accès à des informations sur la blockchain. La sécurité de cette interaction est assurée par une authentification via un fichier `.cookie` ou des identifiants, afin que seuls les clients autorisés puissent effectuer des RPC sur le nœud.