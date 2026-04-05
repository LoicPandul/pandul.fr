---
title: "EREBUS"
slug: "erebus"
permalink: /dictionnaire/erebus/
category: "ATTAQUE"
letter: "E"
layout: definition
category_slug: "attaque"
prev_in_category:
  title: "ECLIPSE"
  slug: "eclipse"
next_in_category:
  title: "FEE SNIPING"
  slug: "fee-sniping"
cross_references:
  - title: "ASMAP"
    slug: "asmap"
---

Forme très sophistiquée d'attaque contre le réseau Bitcoin qui permet à un fournisseur de services Internet malveillant d'isoler des nœuds Bitcoin spécifiques. C'est donc une forme d'attaque Eclipse. L'attaque Erebus exploite la structure du réseau Internet, en particulier les points de passage obligés (ou « *bottlenecks* ») dans le routage entre les systèmes autonomes (AS). Un attaquant, en contrôlant un système autonome, peut manipuler le trafic réseau pour isoler un nœud Bitcoin du reste du réseau, et ainsi lui faire croire à un faux état de la blockchain (blocs ou transactions non connues par le nœud). Cette isolation peut conduire à des doubles dépenses ou de la censure à l'encontre du nœud isolé. Cette attaque est rendue beaucoup plus difficile depuis la version 0.20.0 de Bitcoin Core et l'introduction d'Asmap.
