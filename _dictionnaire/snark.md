---
title: "SNARK"
slug: "snark"
permalink: /dictionnaire/snark/
category: "CRYPTOGRAPHIE"
letter: "S"
layout: definition
category_slug: "cryptographie"
prev_in_category:
  title: "SIGNATURE NUMÉRIQUE"
  slug: "signature-numerique"
next_in_category:
  title: "SOMME DE CONTRÔLE"
  slug: "somme-de-controle"
cross_references:
  - title: "STARK"
    slug: "stark"
  - title: "GROTH16"
    slug: "groth16"
---

Système de preuve cryptographique dont l'acronyme signifie *Succinct Non-interactive ARgument of Knowledge*. Un SNARK permet à un prouveur de convaincre un vérificateur qu'une affirmation est vraie, sans interaction et sans révéler les données sous-jacentes, en produisant une preuve de taille très réduite (quelques centaines d'octets) vérifiable en temps constant. Cette concision est l'avantage principal des SNARK par rapport aux STARK. En revanche, la plupart des constructions SNARK, comme Groth16, nécessitent une cérémonie de configuration de confiance (*trusted setup*) spécifique au circuit à prouver. Si les paramètres secrets de cette cérémonie sont compromis, il devient possible de forger de fausses preuves. Les SNARK reposent sur des hypothèses de difficulté liées aux courbes elliptiques et ne sont donc pas intrinsèquement résistants aux attaques quantiques. Dans l'écosystème Bitcoin, les SNARK sont utilisés notamment pour compresser des preuves STARK plus volumineuses avant leur publication on-chain, comme dans le cas du rollup Citrea.