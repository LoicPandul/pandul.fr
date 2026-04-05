---
title: "SHOR"
slug: "shor-algorithme"
permalink: /dictionnaire/shor-algorithme/
category: "INFORMATIQUE"
letter: "S"
layout: definition
english_term: "SHOR'S ALGORITHM"
category_slug: "informatique"
prev_in_category:
  title: "RPC - REMOTE PROCEDURE CALL"
  slug: "rpc-remote-procedure-call"
next_in_category:
  title: "SMT - SPARSE MERKLE TREE"
  slug: "smt-sparse-merkle-tree"
cross_references:
  - title: "ECDSA"
    slug: "ecdsa"
  - title: "SCHNORR"
    slug: "schnorr-protocole"
---

Algorithme quantique inventé en 1994 par Peter Shor permettant de factoriser de grands entiers en produit de nombres premiers en temps polynomial. En réduisant le nombre d'opérations nécessaires pour factoriser des entiers, Shor pourrait rendre impraticables les algorithmes de cryptographie établis sur ce problème mathématique comme RSA. Shor peut être légèrement modifié pour agir sur presque tous les algorithmes qui utilisent une structure de groupe. Il dispose notamment déjà d'une variante efficace sur la cryptographie sur les courbes elliptiques (ECDSA, Schnorr...). Shor et ses proches variantes sont donc efficaces sur les algorithmes de cryptographie asymétrique. À l'heure actuelle, nous ne disposons pas encore d'un ordinateur quantique suffisamment puissant et stable pour exécuter avec succès l'algorithme de Shor.