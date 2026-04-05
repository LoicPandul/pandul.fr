---
title: "OP_CHECKSIG - 0XAC"
slug: "op-checksig-0xac"
permalink: /dictionnaire/op-checksig-0xac/
category: "SCRIPT"
letter: "O"
layout: definition
cross_references:
  - title: "OP_CHECKSIGVERIFY - 0XAD"
    slug: "op-checksigverify-0xad"
  - title: "SCHNORR"
    slug: "schnorr-protocole"
---

Vérifie la validité d'une signature par rapport à une clé publique donnée. Il prend les deux éléments du sommet de la pile : la signature et la clé publique, et évalue si la signature est correcte pour le hachage de la transaction et la clé publique spécifiée. Si la vérification est réussie, il pousse la valeur `1` (vrai) sur la pile, sinon `0` (faux). Cet opcode a été modifié dans Tapscript afin de vérifier des signatures de Schnorr.