---
title: "LIGHTNING NETWORK+"
slug: "lightning-network-plus"
permalink: /dictionnaire/lightning-network-plus/
category: "OUTIL"
letter: "L"
layout: definition
category_slug: "outil"
prev_in_category:
  title: "LIBWALLY-CORE"
  slug: "libwally-core"
next_in_category:
  title: "LIGHTNING TERMINAL"
  slug: "lightning-terminal"
cross_references:
  - title: "LIGHTNING NETWORK"
    slug: "lightning-network"
  - title: "CANAL DE PAIMENT"
    slug: "canal-de-paiment"
---

Lightning Network+ est un service en ligne qui facilite la création de *liquidity swaps* sur le Lightning Network. Plusieurs opérateurs de nœuds se coordonnent pour ouvrir simultanément des canaux de paiement entre eux de manière circulaire, ce qui garantit à chacun de recevoir autant de capacité entrante qu'il en offre. Par exemple, 3 utilisateurs A, B et C se mettent d'accord sur le site LN+ pour un *liquidity swap* de 1M sats : A ouvre un canal de 1M sats vers B, B fait de même vers C, et C ouvre à son tour un canal vers A.

Ce système permet ainsi d'améliorer la connectivité de son nœud Lightning, tout en obtenant autant de liquidité entrante que de liquidité sortante engagée.