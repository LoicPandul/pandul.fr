---
title: "HEADERS-FIRST SYNC"
slug: "headers-first-sync"
permalink: /dictionnaire/headers-first-sync/
category: "RÉSEAU"
letter: "H"
layout: definition
french_term: "SYNCHRONISATION ENTÊTES D'ABORD"
cross_references:
  - title: "IBD - INITIAL BLOCK DOWNLOAD"
    slug: "ibd-initial-block-download"
  - title: "NOEUD COMPLET"
    slug: "noeud-complet"
---

Méthode de synchronisation initiale (IBD) introduite dans Bitcoin Core 0.10.0, qui consiste à télécharger d'abord les en-têtes de tous les blocs avant de télécharger les blocs complets eux-mêmes. Cette méthode a remplacé la synchronisation *blocks-first*, utilisée par les versions antérieures de Bitcoin Core, qui téléchargeait les blocs séquentiellement depuis un seul pair.