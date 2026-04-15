---
title: "PRIVATE CHANNEL"
slug: "private-channel"
permalink: /dictionnaire/private-channel/
category: "LIGHTNING NETWORK"
letter: "P"
layout: definition
french_term: "CANAL PRIVÉ"
category_slug: "lightning-network"
prev_in_category:
  title: "POOL - LIGHTNING"
  slug: "pool-lightning"
next_in_category:
  title: "PROBING"
  slug: "probing"
cross_references:
  - title: "PUBLIC CHANNEL"
    slug: "public-channel"
  - title: "CANAL DE PAIMENT"
    slug: "canal-de-paiment"
---

Canal Lightning qui n'est pas annoncé au réseau et donc absent du graphe des nœuds publics. Contrairement à un canal public classique, un canal privé ne diffuse pas de message d'annonce (*channel announcement*) aux autres pairs. Il est invisible pour les nœuds tiers et ne peut pas servir au routage de paiements pour d'autres utilisateurs.

Les canaux privés constituent le type de canal recommandé pour les nœuds qui ne font pas de routage, comme les nœuds embarqués sur mobiles. Pour recevoir un paiement via un canal privé, l'existence du canal et ses paramètres sont révélés au payeur à travers des *routing hints* intégrés dans la facture Lightning.

Le terme « privé » est ici un peu trompeur : il signifie simplement « non annoncé ». Des heuristiques on-chain, comme l'analyse des transactions de financement ou les fermetures forcées, peuvent permettre à un observateur de déduire l'existence de ces canaux, tout comme l'analyse des paiements vers ce nœud. C'est d'ailleurs à cause de ces canaux qu'il est impossible de connaître la taille réelle du Lightning Network, puisque seuls les canaux publics peuvent être comptabilisés avec certitude.
