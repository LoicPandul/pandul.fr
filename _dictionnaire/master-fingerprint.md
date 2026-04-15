---
title: "MASTER FINGERPRINT"
slug: "master-fingerprint"
permalink: /dictionnaire/master-fingerprint/
category: "PORTEFEUILLE"
letter: "M"
layout: definition
french_term: "EMPREINTE MAÎTRESSE"
category_slug: "portefeuille"
prev_in_category:
  title: "M-OF-N"
  slug: "m-of-n"
next_in_category:
  title: "MINIBITS"
  slug: "minibits"
cross_references:
  - title: "CHEMIN DE DÉRIVATION"
    slug: "chemin-de-derivation"
  - title: "HASH160"
    slug: "hash160"
---

Empreinte de 4 octets (32 bits) de la clé privée maîtresse dans un portefeuille hiérarchique déterministe (HD). Elle est obtenue en calculant le hash `SHA256` de la clé privée maîtresse, suivi d'un hash `RIPEMD160`, procédé désigné par `HASH160` sur Bitcoin. La Master Fingerprint sert à identifier un portefeuille HD, indépendamment des chemins de dérivation, mais en prenant en compte la présence ou non d'une passphrase. C'est une information concise qui permet de faire référence à l'origine d'un ensemble de clés, sans pour autant dévoiler des informations sensibles sur le portefeuille.