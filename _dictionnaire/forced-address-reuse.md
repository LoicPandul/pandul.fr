---
title: "FORCED ADDRESS REUSE"
slug: "forced-address-reuse"
permalink: /dictionnaire/forced-address-reuse/
category: "ATTAQUE"
letter: "F"
layout: definition
french_term: "RÉUTILISATION D'ADRESSE FORCÉE"
category_slug: "attaque"
prev_in_category:
  title: "FORCE BRUTE"
  slug: "force-brute"
next_in_category:
  title: "GOLDFINGER"
  slug: "goldfinger"
cross_references:
  - title: "DUST"
    slug: "dust"
  - title: "DUST LIMIT"
    slug: "dust-limit"
---

Attaque qui consiste à envoyer de minuscules quantités de bitcoins à un grand nombre d'adresses de réception. L'objectif de l'attaquant est de pousser les destinataires à regrouper ces sommes avec d'autres UTXOs. L'attaquant suit ensuite les déplacements futurs de ces faibles quantités de bitcoins, dans le but de former des *clusters* d'adresses, c'est-à-dire de déterminer si plusieurs adresses appartiennent à une même entité. En croisant les informations recueillies lors de l'attaque avec d'autres données et heuristiques utilisées dans l'analyse de chaîne, il est possible pour l'attaquant d'identifier certaines entités et les adresses associées. Cette méthode représente une menace uniquement pour la confidentialité des utilisateurs, mais n'affecte pas la sécurité de leurs fonds.

*Le terme original pour décrire cette attaque est « Dusting Attack », mais certains bitcoiners suggèrent plutôt d'utiliser le terme de « forced address reuse », car ils trouvent que le terme de « dust » est ici inapproprié.*