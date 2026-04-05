---
title: "COMPACT BLOCK FILTERS"
slug: "compact-block-filters"
permalink: /dictionnaire/compact-block-filters/
category: "RÉSEAU"
letter: "C"
layout: definition
category_slug: "reseau"
prev_in_category:
  title: "CLEARNET"
  slug: "clearnet"
next_in_category:
  title: "COMPACT BLOCK RELAY"
  slug: "compact-block-relay"
cross_references:
  - title: "BIP-0158"
    slug: "bip-0158"
  - title: "BIP-0157"
    slug: "bip-0157"
---

Mécanisme permettant aux clients légers de vérifier si un bloc contient des transactions les concernant, sans télécharger l'intégralité de la blockchain et sans révéler leurs adresses à un nœud tiers. Contrairement aux filtres de Bloom du BIP-0037, où le client envoie un filtre à un nœud complet (exposant ainsi ses données), ce sont ici les nœuds complets qui génèrent des filtres déterministes pour chaque bloc. Le client les télécharge, les teste localement, puis récupère les blocs complets uniquement en cas de correspondance.

Les filtres sont construits selon le BIP-0158 à l'aide de *Golomb-Coded Sets* (GCS), une structure probabiliste plus compacte que les filtres de Bloom. Le protocole de distribution pair-à-pair est défini dans le BIP-0157, qui introduit des messages dédiés (`getcfilters`, `cfilter`, `getcfheaders`...) ainsi qu'un système d'en-têtes chaînés permettant de vérifier l'authenticité des filtres reçus. Un client disposant d'au moins un pair honnête peut ainsi détecter tout filtre invalide.

Ce mécanisme offre une meilleure confidentialité, puisque les blocs peuvent être téléchargés depuis n'importe quelle source, et réduit la charge de calcul imposée aux nœuds complets. En contrepartie, la bande passante consommée en fonctionnement normal est supérieure à celle du BIP-0037.
