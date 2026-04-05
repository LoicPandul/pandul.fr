---
title: "NAT - NETWORK-ADJUSTED TIME"
slug: "nat-network-adjusted-time"
permalink: /dictionnaire/nat-network-adjusted-time/
category: "PROTOCOLE"
letter: "N"
layout: definition
french_term: "TEMPS AJUSTÉ PAR LE RÉSEAU"
cross_references:
  - title: "MTP - MEDIAN TIME PAST"
    slug: "mtp-median-time-past"
  - title: "ENTÊTE DE BLOC"
    slug: "entete-de-bloc"
---

Estimation du temps universel établie sur les horloges des nœuds du réseau. Chaque nœud calcule son NAT en prenant la médiane des différences de temps entre son horloge locale (UTC) et celles des nœuds avec lesquels il est connecté, puis en additionnant son horloge locale avec la médiane de ces différences, jusqu'à un maximum de 70 minutes. Le *network-adjusted time* est donc une médiane du temps des nœuds calculée en local par chaque nœud. Ce référentiel est ensuite utilisé pour vérifier la validité des horodatages des blocs. En effet, pour qu'un bloc soit accepté par un nœud, son horodatage doit se situer entre le MTP (temps médian des 11 derniers blocs minés) et le NAT plus 2 heures :

```text
MTP < Horodatage valide < (NAT + 2h)
```