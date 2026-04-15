---
title: "FEE RATE - BITCOIN"
slug: "fee-rate-bitcoin"
permalink: /dictionnaire/fee-rate-bitcoin/
category: "PROTOCOLE"
letter: "F"
layout: definition
french_term: "TAUX DE FRAIS BITCOIN"
category_slug: "protocole"
prev_in_category:
  title: "EXTENSION BLOCK"
  slug: "extension-block"
next_in_category:
  title: "FEE_ESTIMATES.DAT"
  slug: "fee-estimates-dat"
cross_references:
  - title: "FRAIS DE TRANSACTION"
    slug: "frais-de-transaction"
  - title: "FEE RATE - LIGHTNING"
    slug: "fee-rate-lightning"
math: true
---

Mesure du coût unitaire des frais d'une transaction Bitcoin, exprimée en satoshis par octet virtuel (sat/vB). Le *fee rate* détermine la priorité d'une transaction dans le mempool : plus le taux est élevé, plus les mineurs sont incités à l'inclure rapidement dans un bloc. Le montant absolu des frais correspond à la différence entre le total des inputs et le total des outputs d'une transaction. Le *fee rate* est obtenu en divisant ce montant par le poids de la transaction :
$fee\ rate\ (sats/vB) = \frac{frais\ (sats)}{poids\ (vB)}$

Ce taux est choisi librement par l'émetteur de la transaction et fonctionne comme un mécanisme d'enchère. En période de congestion, le *fee rate* minimal pour qu'une transaction soit incluse dans un bloc augmente.