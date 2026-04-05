---
title: "SIGNATURE NUMÉRIQUE"
slug: "signature-numerique"
permalink: /dictionnaire/signature-numerique/
category: "CRYPTOGRAPHIE"
letter: "S"
layout: definition
english_term: "DIGITAL SIGNATURE"
category_slug: "cryptographie"
prev_in_category:
  title: "SIGNATURE AVEUGLE"
  slug: "signature-aveugle"
next_in_category:
  title: "SNARK"
  slug: "snark"
cross_references:
  - title: "ECDSA"
    slug: "ecdsa"
  - title: "COURBE ELLIPTIQUE"
    slug: "courbe-elliptique"
---

Preuve cryptographique qui démontre la possession d'une clé privée spécifique, associée à une clé publique unique, sans avoir à la divulguer. Sur Bitcoin, on la construit à l'aide de la clé privée et du hash d'une transaction. Elle atteste la propriété des bitcoins concernés et permet de satisfaire un script qui déverrouille un UTXO. Elle est générée grâce à un algorithme de signature numérique sur courbe elliptique tel qu'ECDSA ou le protocole de Schnorr.