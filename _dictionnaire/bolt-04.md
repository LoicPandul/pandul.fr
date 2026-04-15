---
title: "BOLT-04"
slug: "bolt-04"
permalink: /dictionnaire/bolt-04/
category: "LIGHTNING NETWORK"
letter: "B"
layout: definition
category_slug: "lightning-network"
prev_in_category:
  title: "BOLT-03"
  slug: "bolt-03"
next_in_category:
  title: "BOLT-05"
  slug: "bolt-05"
cross_references:
  - title: "BOLT"
    slug: "bolt"
  - title: "ROUTAGE EN OIGNON"
    slug: "routage-en-oignon"
---

Spécification qui définit le protocole de routage en oignon du Lightning Network. Elle décrit la construction et le traitement de paquets chiffrés de 1 366 octets contenant une clé éphémère, des instructions de routage imbriquées et un HMAC d'intégrité. Chaque nœud intermédiaire ne voit que le saut suivant, sans connaître l'expéditeur ni le destinataire final.

Le BOLT-04 couvre aussi le *route blinding*, qui masque l'identité des nœuds en aval pour protéger la vie privée du destinataire, et le mécanisme de retour d'erreurs chiffrées qui permet à l'expéditeur d'identifier quel nœud a échoué.