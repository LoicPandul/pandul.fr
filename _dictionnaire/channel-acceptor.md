---
title: "CHANNEL ACCEPTOR"
slug: "channel-acceptor"
permalink: /dictionnaire/channel-acceptor/
category: "LIGHTNING NETWORK"
letter: "C"
layout: definition
cross_references:
  - title: "LND"
    slug: "lnd"
---

Mécanisme de LND permettant de définir une logique personnalisée pour accepter ou refuser automatiquement les demandes d'ouverture de canal entrantes. Lorsqu'un pair distant propose d'ouvrir un canal, la requête est transmise au *channel acceptor* qui répond par `TRUE` ou `FALSE`, accompagné éventuellement d'un message d'erreur à destination de l'initiateur.