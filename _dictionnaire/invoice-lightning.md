---
title: "INVOICE LIGHTNING"
slug: "invoice-lightning"
permalink: /dictionnaire/invoice-lightning/
category: "LIGHTNING NETWORK"
letter: "I"
layout: definition
french_term: "FACTURE"
category_slug: "lightning-network"
prev_in_category:
  title: "INBOUND CAPACITY"
  slug: "inbound-capacity"
next_in_category:
  title: "JIT CHANNEL"
  slug: "jit-channel"
cross_references:
  - title: "HTLC"
    slug: "htlc"
  - title: "BOLT"
    slug: "bolt"
---

Requête de paiement Lightning générée par le destinataire, qui contient toutes les informations nécessaires pour réaliser la transaction.

Une invoice Lightning contient la destination du paiement sous la forme de la clé publique du nœud destinataire, mais également un préfixe `ln`, le montant, un temps avant expiration, le hachage du secret utilisé dans le cadre des HTLCs, ainsi que d'autres métadonnées, pour certaines optionnelles, comme des options relatives au routage. Ces invoices sont définies par la norme BOLT-11. Une fois payée, une invoice Lightning ne peut plus être réutilisée.