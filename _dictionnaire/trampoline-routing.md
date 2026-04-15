---
title: "TRAMPOLINE ROUTING"
slug: "trampoline-routing"
permalink: /dictionnaire/trampoline-routing/
category: "LIGHTNING NETWORK"
letter: "T"
layout: definition
french_term: "ROUTAGE TRAMPOLINE"
category_slug: "lightning-network"
prev_in_category:
  title: "TAPROOT CHANNEL"
  slug: "taproot-channel"
next_in_category:
  title: "TRANSACTION D'ENGAGEMENT"
  slug: "transaction-d-engagement"
cross_references:
  - title: "BLINDED PATHS"
    slug: "blinded-paths"
  - title: "ROUTAGE EN OIGNON"
    slug: "routage-en-oignon"
---

Méthode de routage Lightning qui permet à un nœud léger de déléguer la construction du chemin de paiement à un ou plusieurs nœuds intermédiaires spécialisés appelés *trampoline nodes*. C'est particulièrement utile pour les nœuds embarqués mobiles qui ne peuvent pas synchroniser le graphe complet du réseau en raison de contraintes de stockage, de puissance de calcul ou de connectivité intermittente.

L'expéditeur construit un « oignon trampoline » qui identifie les nœuds trampoline par leur identifiant complet. Il route le paiement vers le premier trampoline, qui calcule lui-même la route jusqu'au trampoline suivant ou jusqu'au destinataire. Les nœuds non trampoline sur la route ne nécessitent aucune mise à jour : ils relaient les HTLC comme des paiements classiques. Pour préserver la confidentialité, l'expéditeur peut chaîner au moins deux nœuds trampoline, de sorte qu'aucun d'entre eux ne sache s'il route vers le destinataire final ou vers un autre trampoline. Les nœuds trampoline facturent des frais supplémentaires pour ce service de *pathfinding*. Le routage trampoline peut être combiné avec les *blinded paths* pour masquer l'identité du destinataire, offrant ainsi confidentialité complète même depuis un appareil mobile.