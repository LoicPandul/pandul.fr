---
title: "PAY-TO-CONTRACT"
slug: "pay-to-contract"
permalink: /dictionnaire/pay-to-contract/
category: "CRYPTOGRAPHIE"
letter: "P"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "NONCE"
  slug: "nonce"
next_in_category:
  title: "PBKDF2"
  slug: "pbkdf2"
cross_references:
  - title: "SCHNORR"
    slug: "schnorr-protocole"
  - title: "MULTISIG"
    slug: "multisig"
math: true
---

Protocole cryptographique qui permet d'engager des données arbitraires dans une clé publique Bitcoin, de sorte que le paiement effectué vers cette clé constitue simultanément une preuve d'engagement envers ces données.

Le principe repose sur le « tweaking » d'une clé publique : à partir d'une clé publique originale $$P$$ et d'un contrat $$c$$, on calcule une nouvelle clé $$P' = P + H(P \| c) \cdot G$$, où $$H$$ est une fonction de hachage et $$G$$ le point générateur de la courbe. La clé $$P'$$ qui en résulte semble être une clé publique ordinaire, mais elle encode un engagement vérifiable envers le contrat $$c$$. Le payeur peut ensuite prouver à un tiers ce pour quoi il a payé, en révélant la clé originale $$P$$ et le contrat $$c$$, sans que cette preuve soit visible sur la blockchain.