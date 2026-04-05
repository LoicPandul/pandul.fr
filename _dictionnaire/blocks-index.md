---
title: "BLOCKS INDEX"
slug: "blocks-index"
permalink: /dictionnaire/blocks-index/
category: "PROTOCOLE"
letter: "B"
layout: definition
category_slug: "protocole"
prev_in_category:
  title: "BLOCKCHAIN"
  slug: "blockchain"
next_in_category:
  title: "BLOCKS/REV*.DAT"
  slug: "blocks-rev-dat"
cross_references:
  - title: "LEVELDB"
    slug: "leveldb"
  - title: "BLK*.DAT"
    slug: "blk-dat"
---

Structure de données LevelDB dans Bitcoin Core qui catalogue des métadonnées sur tous les blocs. Chaque entrée dans cet index renseigne des détails tels que l'identifiant du bloc, sa hauteur dans la blockchain, le pointeur vers le bloc dans la base de données, et d'autres métadonnées. Cette indexation permet de trouver rapidement un bloc stocké en mémoire.