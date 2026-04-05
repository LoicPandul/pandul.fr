---
title: "HD - HIERARCHICAL-DETERMINISTIC"
slug: "hd-hierarchical-deterministic"
permalink: /dictionnaire/hd-hierarchical-deterministic/
category: "PORTEFEUILLE"
letter: "H"
layout: definition
french_term: "DÉTERMINISTE ET HIÉRARCHIQUE"
cross_references:
  - title: "BIP-0032"
    slug: "bip-0032"
  - title: "BIP-0044"
    slug: "bip-0044"
---

Se dit d'un portefeuille Bitcoin qui utilise une information unique (la graine ou « seed » en anglais) pour générer une multitude de paires de clés publiques et privées de manière séquentielle et reproductible. Cette manière de gérer des clés est définie par le standard BIP-0032. L'avantage principal des portefeuilles HD est qu'ils permettent aux utilisateurs de disposer d'une multitude de paires de clés différentes, notamment afin d'éviter la réutilisation d'adresse, tout en pouvant toutes les régénérer depuis une information unique. On dit de cette structure qu'elle est hiérarchique, car elle permet de créer une organisation en arborescence de multiples clés et adresses à partir d'une seule graine. Et elle est déterministe dans le sens où chaque graine génère toujours la même séquence de clés dans n'importe quel portefeuille conforme à ce système.
