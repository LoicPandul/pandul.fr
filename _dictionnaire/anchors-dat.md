---
title: "ANCHORS.DAT"
slug: "anchors-dat"
permalink: /dictionnaire/anchors-dat/
category: "RÉSEAU"
letter: "A"
layout: definition
category_slug: "reseau"
prev_in_category:
  title: "ADDRV2"
  slug: "addrv2"
next_in_category:
  title: "ASMAP"
  slug: "asmap"
cross_references:
  - title: "PEERS.DAT"
    slug: "peers-dat"
  - title: "BITCOIN CORE"
    slug: "bitcoin-core"
---

Fichier utilisé dans le client Bitcoin Core pour stocker les adresses IP des nœuds sortants de type *block-relay-only* auxquels un client était connecté avant d'être éteint. `anchors.dat` est donc créé à chaque fois que le nœud est arrêté et supprimé lorsqu'il est relancé. Les nœuds dont les adresses IP sont contenues dans ce fichier sont utilisés pour aider à établir rapidement des connexions lors du redémarrage du nœud.