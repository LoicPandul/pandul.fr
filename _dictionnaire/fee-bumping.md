---
title: "FEE BUMPING"
slug: "fee-bumping"
permalink: /dictionnaire/fee-bumping/
category: "PORTEFEUILLE"
letter: "F"
layout: definition
french_term: "AUGMENTATION DES FRAIS"
cross_references:
  - title: "RBF - REPLACE-BY-FEE"
    slug: "rbf-replace-by-fee"
  - title: "CPFP - CHILD PAY FOR PARENT"
    slug: "cpfp-child-pay-for-parent"
---

Ensemble de techniques qui permettent d'augmenter les frais d'une transaction déjà diffusée sur le réseau Bitcoin afin d'accélérer sa confirmation. Lorsqu'une transaction reste bloquée dans les mempools en raison de frais trop faibles par rapport à la demande d'espace dans les blocs, les techniques de fee bumping permettent de réévaluer sa priorité auprès des mineurs.

Les deux méthodes existantes sont le RBF (*Replace-By-Fee*) et le CPFP (*Child Pays For Parent*). Avec le RBF, l'expéditeur crée une nouvelle version de la transaction originale avec des frais plus élevés, ce qui remplace la transaction initiale dans les mempools. Avec le CPFP, le destinataire (ou l'expéditeur via un output de change) crée une transaction enfant qui dépense un output de la transaction bloquée, avec des frais suffisants pour inciter les mineurs à confirmer les deux transactions ensemble.