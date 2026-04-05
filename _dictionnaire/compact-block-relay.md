---
title: "COMPACT BLOCK RELAY"
slug: "compact-block-relay"
permalink: /dictionnaire/compact-block-relay/
category: "RÉSEAU"
letter: "C"
layout: definition
category_slug: "reseau"
prev_in_category:
  title: "COMPACT BLOCK FILTERS"
  slug: "compact-block-filters"
next_in_category:
  title: "DÉCENTRALISATION"
  slug: "decentralisation"
cross_references:
  - title: "BIP-0152"
    slug: "bip-0152"
  - title: "MEMPOOL"
    slug: "mempool"
---

Protocole introduit dans Bitcoin Core en 2016 via le BIP-0152 qui propose une méthode d'économie de bande passante pour les nœuds du réseau. *Compact Block Relay* permet de communiquer les informations des blocs de manière compacte, en se basant sur l'hypothèse que les nœuds ont déjà une grande partie des transactions d'un bloc récent dans leur mempool. Plutôt que de transmettre chaque transaction intégralement, ce qui constituerait un doublon, *Compact Block Relay* propose d'envoyer uniquement de courts identifiants pour les transactions déjà connues des pairs, accompagnés de quelques transactions sélectionnées (notamment la transaction coinbase et celles que le nœud est susceptible de ne pas connaître). Le nœud peut ensuite demander à ses pairs les éventuelles transactions manquantes. *Compact Block Relay* permet ainsi de diminuer la quantité de données échangées lors de la propagation des blocs, ce qui réduit ainsi les pics de bande passante et améliore l'efficacité globale du réseau.