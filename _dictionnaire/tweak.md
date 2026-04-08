---
title: "TWEAK"
slug: "tweak"
permalink: /dictionnaire/tweak/
category: "CRYPTOGRAPHIE"
letter: "T"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "STÉGANOGRAPHIE"
  slug: "steganographie"
next_in_category:
  title: "X-ONLY PUBLIC KEYS"
  slug: "x-only-public-keys"
cross_references:
  - title: "P2TR"
    slug: "p2tr"
  - title: "SCHNORR"
    slug: "schnorr-protocole"
math: true
---

Dans le domaine de la cryptographie, « tweaker » une clé publique consiste à modifier cette clé en utilisant une valeur additive appelée le « tweak » de telle sorte qu'elle reste utilisable avec la connaissance de la clé privée d'origine et du tweak. Techniquement, un tweak est une valeur scalaire qui est ajoutée à la clé publique initiale. Si $$P$$ est la clé publique et $$t$$ est le tweak, la clé publique tweaked devient :
$
P' = P + tG
$

Où $$G$$ est le générateur de la courbe elliptique utilisée. Cette opération permet d'obtenir une nouvelle clé publique dérivée de la clé originale tout en conservant certaines propriétés cryptographiques permettant de l'utiliser. Par exemple, on utilise cette méthode pour les adresses Taproot (P2TR) afin de pouvoir dépenser soit en présentant une signature Schnorr de façon traditionnelle, soit en remplissant l'une des conditions énoncées dans un arbre de Merkle, également appelé « MAST ».

![](/assets/img/dictionnaire/tweak/image-1.png)