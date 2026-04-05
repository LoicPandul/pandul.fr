---
title: "SETTINGS.JSON"
slug: "settings-json"
permalink: /dictionnaire/settings-json/
category: "PROTOCOLE"
letter: "S"
layout: definition
cross_references:
  - title: "BITCOIN CORE"
    slug: "bitcoin-core"
  - title: "GUISETTINGS.INI.BAK"
    slug: "guisettings-ini-bak"
---

Fichier utilisé dans Bitcoin Core pour stocker les paramètres dynamiques définis via l'interface graphique (GUI) ou via les RPCs. Il conserve des informations sur les configurations de l'utilisateur, telles que les portefeuilles ouverts par exemple. Lorsque Bitcoin Core est redémarré, ce fichier permet de rouvrir automatiquement les portefeuilles qui étaient actifs avant la fermeture de l'application. En cas de fermeture d'un portefeuille via l'interface GUI, il est également supprimé de ce fichier, et il ne sera donc pas rouvert automatiquement au prochain démarrage.