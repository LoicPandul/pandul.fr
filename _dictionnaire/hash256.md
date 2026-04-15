---
title: "HASH256"
slug: "hash256"
permalink: /dictionnaire/hash256/
category: "CRYPTOGRAPHIE"
letter: "H"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "HASH160"
  slug: "hash160"
next_in_category:
  title: "HMAC-SHA512"
  slug: "hmac-sha512"
cross_references:
  - title: "SHA256"
    slug: "sha256"
  - title: "FONCTION DE HACHAGE"
    slug: "fonction-de-hachage"
math: true
---

Fonction cryptographique utilisée pour diverses applications sur Bitcoin. Elle consiste en l'application double de la fonction SHA256 sur les données en entrée. Le message est passé une première fois dans SHA256, et le résultat de cette opération est utilisé comme entrée pour passer une seconde fois dans SHA256. La sortie de cette fonction est donc de 256 bits.
$HASH256(x)\ =\ SHA256(SHA256(x))$