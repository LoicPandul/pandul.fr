---
title: "PROP - PROPORTIONAL"
slug: "prop-proportional"
permalink: /dictionnaire/prop-proportional/
category: "MINAGE"
letter: "P"
layout: definition
category_slug: "minage"
prev_in_category:
  title: "PPS+"
  slug: "pps-plus"
next_in_category:
  title: "PUBLIC POOL"
  slug: "public-pool"
cross_references:
  - title: "SHARES"
    slug: "shares"
---

Méthode de calcul de la rémunération des mineurs dans le contexte des pools de minage. PROP répartit simplement la récompense de bloc parmi les mineurs proportionnellement à leur contribution en *shares*. Le calcul des *shares* débute au dernier bloc trouvé par la pool et termine lorsqu'un nouveau bloc est trouvé. Chaque nouveau bloc remet le compteur de *shares* à zéro. Cette méthode de rémunération permet de refléter directement le travail de chacun.
