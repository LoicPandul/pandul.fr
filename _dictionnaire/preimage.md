---
title: "PREIMAGE"
slug: "preimage"
permalink: /dictionnaire/preimage/
category: "CRYPTOGRAPHIE"
letter: "P"
layout: definition
french_term: "PRÉIMAGE"
category_slug: "cryptographie"
prev_in_category:
  title: "POINT GÉNÉRATEUR"
  slug: "point-generateur"
next_in_category:
  title: "PSEUDO-ALÉATOIRE"
  slug: "pseudo-aleatoire"
cross_references:
  - title: "PAYMENT HASH"
    slug: "payment-hash"
  - title: "HTLC"
    slug: "htlc"
math: true
---

En mathématiques, la préimage d'un élément $$y$$ par une fonction $$f$$ est l'ensemble des $$x$$ tels que $$f(x) = y$$. C'est l'opération d'inverser la fonction : remonter de la sortie vers l'entrée.

En cryptographie, ce concept est à la base de la sécurité des fonctions de hachage : la résistance à la préimage impose qu'étant donné un hash $$h$$, il soit computationnellement infaisable de trouver $$m$$ tel que $$H(m) = h$$. La fonction $$H$$ agit comme une fonction à sens unique : facile à calculer, quasi impossible à inverser.

Sur Bitcoin, ce terme revient dès que l'on parle de fonction de hachage, mais il prend un sens plus spécifique sur Lightning, où la préimage désigne la valeur secrète aléatoire dont le hash sert de verrou pour les paiements. Lorsqu'un destinataire émet une invoice, il génère une *preimage* de 32 octets, en calcule le hash SHA-256 (le *payment hash*) et l'inclut dans l'invoice. Les HTLC établis le long de la route du paiement sont verrouillés par ce hash. Le paiement n'est finalisé que lorsque le destinataire révèle la *preimage* au nœud qui le précède sur la route. Celui-ci peut alors débloquer le HTLC correspondant, et la *preimage* se propage en sens inverse, permettant à chaque nœud intermédiaire de réclamer ses fonds. La révélation de la *preimage* constitue ainsi la preuve cryptographique que le paiement a bien été reçu.