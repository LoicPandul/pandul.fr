---
title: "HMAC-SHA512"
slug: "hmac-sha512"
permalink: /dictionnaire/hmac-sha512/
category: "CRYPTOGRAPHIE"
letter: "H"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "HASH256"
  slug: "hash256"
next_in_category:
  title: "HORODATAGE"
  slug: "horodatage"
cross_references:
  - title: "SHA512"
    slug: "sha512"
  - title: "PBKDF2"
    slug: "pbkdf2"
---

`HMAC-SHA512` est l'acronyme de « *Hash-based Message Authentication Code - Secure Hash Algorithm 512* ». C'est un algorithme cryptographique utilisé pour vérifier l'intégrité et l'authenticité des messages échangés entre deux parties. Il combine la fonction de hachage cryptographique `SHA512` avec une clé secrète partagée pour générer un code d'authentification de message (MAC) unique pour chaque message.

Dans le contexte de Bitcoin, l'utilisation naturelle de `HMAC-SHA512` est légèrement dérivée. On utilise cet algorithme dans le processus de dérivation déterministe et hiérarchique de l'arbre de clés cryptographiques d'un portefeuille. `HMAC-SHA512` est notamment utilisé pour passer de la graine (seed) à la clé maîtresse, puis pour chaque dérivation d'une paire parent vers des paires enfants. On retrouve également cet algorithme au sein d'un autre algorithme de dérivation, nommé `PBKDF2`, utilisé pour passer de la phrase de récupération et de la passphrase à la graine.