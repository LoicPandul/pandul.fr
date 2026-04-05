---
title: "MINAGE FUSIONNÉ AVEUGLE"
slug: "minage-fusionne-aveugle"
permalink: /dictionnaire/minage-fusionne-aveugle/
category: "SIDECHAIN"
letter: "M"
layout: definition
english_term: "BMM - BLIND MERGED MINING"
cross_references:
  - title: "MINAGE FUSIONNÉ"
    slug: "minage-fusionne"
  - title: "DRIVECHAIN"
    slug: "drivechain"
---

Technique de consensus de sidechain permettant aux mineurs de Bitcoin de travailler simultanément sur la chaîne principale et sur une ou plusieurs sidechains, sans pour autant devoir fournir plus de travail de calcul. Contrairement au minage fusionné classique, cette méthode ne nécessite pas de configurer un nouveau nœud pour chaque sidechain exploitée. Dans le cadre du *Blind Merged Mining* (BMM), chaque sidechain est gérée par des opérateurs de nœud indépendants, responsables de la création des blocs et de la récolte des récompenses associées sur la sidechain. En contrepartie, ces opérateurs doivent acheter des preuves de travail auprès des mineurs de la blockchain principale pour valider leurs blocs sur la sidechain. Ainsi, les mineurs de Bitcoin reçoivent leurs récompenses du minage fusionné des sidechains en BTC, directement sur la chaîne principale. Cette méthode, développée par Paul Sztorc pour les drivechains, nécessite l'implémentation du BIP-0301 pour être opérationnelle sur le réseau Bitcoin.