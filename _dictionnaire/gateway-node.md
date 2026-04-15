---
title: "GATEWAY NODE"
slug: "gateway-node"
permalink: /dictionnaire/gateway-node/
category: "LIGHTNING NETWORK"
letter: "G"
layout: definition
french_term: "NŒUD PASSERELLE"
category_slug: "lightning-network"
prev_in_category:
  title: "FORCE CLOSE"
  slug: "force-close"
next_in_category:
  title: "GOSSIP"
  slug: "gossip"
cross_references:
  - title: "PRIVATE CHANNEL"
    slug: "private-channel"
  - title: "NOEUD LIGHTNING"
    slug: "noeud-lightning"
---

Nœud de routage Lightning qui exploite des canaux privés (non annoncés) pour créer des opportunités de routage supplémentaires. Contrairement à un nœud de routage classique dont tous les canaux sont publics et visibles dans le graphe du réseau, un *gateway node* maintient également des canaux privés avec d'autres nœuds. Ces canaux ne sont pas diffusés via le protocole de *gossip*, et n'apparaissent donc pas dans la topologie publique du réseau.

L'intérêt d'un *gateway node* se manifeste lorsque d'autres nœuds ouvrent des canaux publics vers lui : ces connexions créent des chemins de paiement transitant par les canaux privés, offrant ainsi des routes alternatives invisibles au reste du réseau. Le *gateway node* agit alors comme un pont entre le réseau public et des nœuds qui ne souhaitent pas exposer leurs canaux.