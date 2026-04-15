---
title: "PEG-OUT"
slug: "peg-out"
permalink: /dictionnaire/peg-out/
category: "SIDECHAIN"
letter: "P"
layout: definition
french_term: "ANCRAGE SORTANT"
category_slug: "sidechain"
prev_in_category:
  title: "PEG-IN"
  slug: "peg-in"
next_in_category:
  title: "RSK"
  slug: "rsk"
cross_references:
  - title: "SIDECHAIN"
    slug: "sidechain"
  - title: "PEG-IN"
    slug: "peg-in"
---

Mécanisme inverse du peg-in, par lequel des jetons qui circulent sur une sidechain sont détruits afin de libérer les bitcoins correspondants sur la blockchain principale. L'utilisateur initie le processus en envoyant ses jetons vers une adresse de destruction sur la sidechain, ce qui déclenche le déverrouillage des BTC précédemment verrouillés sur la chaîne principale. Le peg-out constitue la seconde étape de l'ancrage bilatéral (*two-way peg*) et permet de revenir à tout moment sur la blockchain Bitcoin. Selon les implémentations, ce processus peut être géré par une fédération de signataires, comme c'est le cas sur Liquid, ou bien de manière automatisée via des preuves cryptographiques.
