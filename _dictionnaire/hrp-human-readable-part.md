---
title: "HRP - HUMAN READABLE PART"
slug: "hrp-human-readable-part"
permalink: /dictionnaire/hrp-human-readable-part/
category: "INFORMATIQUE"
letter: "H"
layout: definition
category_slug: "informatique"
prev_in_category:
  title: "HEXADÉCIMAL"
  slug: "hexadecimal"
next_in_category:
  title: "ISSUE"
  slug: "issue"
cross_references:
  - title: "BECH32 ET BECH32M"
    slug: "bech32-et-bech32m"
  - title: "ADRESSE DE RÉCEPTION"
    slug: "adresse-de-reception"
---

Le HRP, pour « *Human Readable Part* » (partie lisible par l'homme), est un composant des adresses de réception bech32 et bech32m (SegWit v0 et SegWit v1). Le HRP fait référence à la portion de l'adresse qui est spécifiquement formatée pour être facilement lue et interprétée par les humains. Prenons l'exemple d'une adresse Bitcoin bech32 :

```text
bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq
```

Dans cette adresse, le `bc` initial représente le HRP. Ce préfixe permet d'identifier en un coup d'œil que cette suite de caractères que l'on nous présente est une adresse Bitcoin et pas autre chose.