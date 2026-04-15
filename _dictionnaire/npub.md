---
title: "NPUB"
slug: "npub"
permalink: /dictionnaire/npub/
category: "RÉSEAU"
letter: "N"
layout: definition
category_slug: "reseau"
prev_in_category:
  title: "NOSTR"
  slug: "nostr"
next_in_category:
  title: "NSEC"
  slug: "nsec"
cross_references:
  - title: "NOSTR"
    slug: "nostr"
  - title: "BECH32 ET BECH32M"
    slug: "bech32-et-bech32m"
---

Format d'encodage de la clé publique Nostr en Bech32, défini par le NIP-19. Le préfixe `npub` identifie une clé publique Nostr. La clé publique brute est un nombre de 32 octets sur la courbe secp256k1, dérivé depuis sa clé privée. L'encodage npub ajoute un préfixe lisible par l'humain (`npub1...`), une somme de contrôle pour détecter les erreurs de saisie, et utilise un alphabet excluant les caractères ambigus. La npub constitue l'identifiant public d'un utilisateur Nostr : il peut être partagé librement et permet à quiconque de retrouver le profil et les publications associés. Contrairement au nsec, il ne compromet pas la sécurité du compte s'il est divulgué.