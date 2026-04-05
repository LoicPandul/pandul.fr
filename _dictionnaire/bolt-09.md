---
title: "BOLT-09"
slug: "bolt-09"
permalink: /dictionnaire/bolt-09/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
cross_references:
  - title: "BOLT"
    slug: "bolt"
---

Spécification qui établit le registre centralisé des *feature bits* utilisés dans le Lightning Network pour signaler les fonctionnalités supportées par chaque nœud. Les fonctionnalités sont annoncées par des *flags* dans les messages `init`, `node_announcement` et `channel_announcement`. Chaque fonctionnalité utilise une paire de bits : le bit pair indique un support obligatoire, le bit impair indique un support optionnel.