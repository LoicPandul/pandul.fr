---
title: "CANDIDAT - BLOC"
slug: "candidat-bloc"
permalink: /dictionnaire/candidat-bloc/
category: "MINAGE"
letter: "C"
layout: definition
english_term: "CANDIDATE BLOCK"
category_slug: "minage"
prev_in_category:
  title: "CANAAN"
  slug: "canaan"
next_in_category:
  title: "CGMINER"
  slug: "cgminer"
cross_references:
  - title: "PREUVE DE TRAVAIL"
    slug: "preuve-de-travail"
  - title: "NONCE"
    slug: "nonce"
---

Un bloc candidat est un bloc en cours de création par un mineur participant au processus de minage du système Bitcoin. Le bloc candidat est une structure de données temporaire qui contient des transactions en attente d'être confirmées, mais ne dispose pas encore d'une preuve de travail valide (*Proof-of-Work*) pour être ajouté à la blockchain. Le mineur sélectionne les transactions à inclure dans le bloc candidat en fonction de divers facteurs, tels que les frais de transaction associés et les contraintes de taille de bloc. Une fois les transactions sélectionnées, le mineur génère l'entête du bloc, qui comprend la version, un condensat des transactions (racine de Merkle), un horodatage, le hash du bloc précédent, la cible de difficulté et un nonce. Le mineur tente ensuite de trouver un hash de son entête satisfaisant la difficulté cible du moment. Pour ce faire, il modifie le nonce présent dans l'entête. Il peut également modifier d'autres informations présentes dans son bloc candidat. C'est le mécanisme de la preuve de travail. Si le mineur réussit à trouver un hash valide, le bloc candidat devient un bloc valide et est diffusé au réseau pour être ajouté à la blockchain.