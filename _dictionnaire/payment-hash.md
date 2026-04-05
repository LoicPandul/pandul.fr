---
title: "PAYMENT HASH"
slug: "payment-hash"
permalink: /dictionnaire/payment-hash/
category: "LIGHTNING NETWORK"
letter: "P"
layout: definition
french_term: "HACHAGE DE PAIEMENT"
cross_references:
  - title: "PREIMAGE"
    slug: "preimage"
  - title: "HTLC"
    slug: "htlc"
---

Empreinte cryptographique de la *preimage* utilisée pour sécuriser un paiement sur le Lightning Network. Lorsqu'un destinataire crée une *invoice*, il génère un secret aléatoire (la *preimage*), en calcule le hash et l'intègre dans l'*invoice*. L'expéditeur construit alors une chaîne de HTLC verrouillés par ce hash le long de la route de paiement. Le paiement n'est finalisé que lorsque le destinataire révèle la *preimage* correspondante, permettant à chaque nœud intermédiaire de débloquer ses fonds successivement.