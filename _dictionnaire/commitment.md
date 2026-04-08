---
title: "COMMITMENT"
slug: "commitment"
permalink: /dictionnaire/commitment/
category: "RGB"
letter: "C"
layout: definition
french_term: "ENGAGEMENT"
category_slug: "rgb"
prev_in_category:
  title: "CLIENT-SIDE VALIDATION"
  slug: "client-side-validation"
next_in_category:
  title: "CONSIGNMENT"
  slug: "consignment"
cross_references:
  - title: "CLIENT-SIDE VALIDATION"
    slug: "client-side-validation"
  - title: "STATE TRANSITION"
    slug: "state-transition"
math: true
---

Un Commitment (au sens cryptographique) est un objet mathématique, noté $$C$$, dérivé de façon déterministe à partir d'une opération sur une donnée structurée $$m$$ (le message) et d'une valeur aléatoire $$r$$. On écrit :
$
C\ =\ commit(m,\ r)
$

Ce mécanisme comprend deux opérations principales :
* `Commit` : on applique une fonction cryptographique à un message $$m$$ et à un aléa $$r$$ pour produire $$C$$ ;
* `Verify` : on utilise $$C$$, le message $$m$$ et la valeur $$r$$ pour vérifier que ce commitment est correct. La fonction renvoie `Vrai` ou `Faux`.

Un commitment doit respecter deux propriétés :
* `Binding` : il doit être impossible de trouver un couple $$(m', r')$$ avec $$m' \neq m$$ tel que :
$
commit(m',\ r')\ =\ C
$

* `Hiding` : la connaissance de $$C$$ ne doit pas révéler le contenu de $$m$$.

Dans le cas du protocole RGB, un commitment est inclus dans une transaction Bitcoin afin de prouver l'existence d'une certaine information à un instant donné, sans dévoiler cette information elle-même.