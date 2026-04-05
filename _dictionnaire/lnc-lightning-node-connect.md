---
title: "LNC - LIGHTNING NODE CONNECT"
slug: "lnc-lightning-node-connect"
permalink: /dictionnaire/lnc-lightning-node-connect/
category: "LIGHTNING NETWORK"
letter: "L"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "LIQUIDITY SWAP"
  slug: "liquidity-swap"
next_in_category:
  title: "LND"
  slug: "lnd"
cross_references:
  - title: "LIGHTNING TERMINAL"
    slug: "lightning-terminal"
  - title: "PAIRING PHRASE"
    slug: "pairing-phrase"
---

Protocole développé par Lightning Labs permettant de se connecter à distance à un nœud Lightning via un serveur proxy, sans exposer le nœud directement sur internet. LNC établit une connexion chiffrée de bout en bout entre le client (par exemple Lightning Terminal dans un navigateur) et le nœud, en s'authentifiant à l'aide d'une *pairing phrase*. Ce protocole élimine le besoin de configurer un VPN, d'ouvrir des ports ou de gérer des certificats TLS, ce qui simplifie considérablement l'accès distant à un nœud personnel hébergé derrière un NAT ou un pare-feu.
