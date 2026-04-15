---
title: "NOEUD"
slug: "noeud"
permalink: /dictionnaire/noeud/
category: "PROTOCOLE"
letter: "N"
layout: definition
english_term: "NODE"
category_slug: "protocole"
prev_in_category:
  title: "NESTED SEGWIT"
  slug: "nested-segwit"
next_in_category:
  title: "NOEUD COMPLET"
  slug: "noeud-complet"
cross_references:
  - title: "NOEUD COMPLET"
    slug: "noeud-complet"
  - title: "NOEUD SPV - NOEUD LÉGER"
    slug: "noeud-spv-noeud-leger"
---

Dans le réseau Bitcoin, un nœud est un ordinateur qui exécute un client du protocole Bitcoin (comme Bitcoin Core par exemple). Il participe au réseau en maintenant une copie de la blockchain, en relayant et en vérifiant les transactions et les nouveaux blocs et, optionnellement, en participant au processus de minage. La somme de tous les nœuds Bitcoin représente le réseau Bitcoin en lui-même.

Il existe plusieurs types de nœuds sur Bitcoin, dont les nœuds complets et les nœuds légers. Les nœuds complets conservent une copie intégrale de la blockchain, vérifient toutes les transactions et les blocs selon les règles de consensus, et participent activement à la diffusion de transactions et de blocs sur le réseau. En revanche, les nœuds légers, ou nœuds SPV (*Simple Payment Verification*), ne conservent que les entêtes des blocs et comptent sur les nœuds complets pour obtenir des informations sur les transactions. 

*Certains différencient également les nœuds dits « élagués » (« *pruned node* » en anglais). Ce sont des nœuds complets, qui téléchargent et vérifient tous les blocs depuis le bloc de Genèse, mais qui ne conservent que les blocs les plus récents en mémoire.*