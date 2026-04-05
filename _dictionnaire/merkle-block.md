---
title: "MERKLE BLOCK"
slug: "merkle-block"
permalink: /dictionnaire/merkle-block/
category: "PROTOCOLE"
letter: "M"
layout: definition
cross_references:
  - title: "ARBRE DE MERKLE"
    slug: "arbre-de-merkle"
  - title: "BIP-0037"
    slug: "bip-0037"
---

Structure de données utilisée dans le cadre du BIP-0037 (*Transaction Bloom Filtering*) pour fournir une preuve compacte de l'inclusion de transactions spécifiques dans un bloc. C'est notamment utilisé pour les portefeuilles SPV. Le Merkle Block contient l'en-tête de bloc, les transactions filtrées et un arbre de Merkle partiel, permettant aux clients légers de vérifier rapidement si une transaction appartient à un bloc sans télécharger toutes les transactions.