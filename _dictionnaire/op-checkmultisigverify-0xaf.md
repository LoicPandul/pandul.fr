---
title: "OP_CHECKMULTISIGVERIFY - 0XAF"
slug: "op-checkmultisigverify-0xaf"
permalink: /dictionnaire/op-checkmultisigverify-0xaf/
category: "SCRIPT"
letter: "O"
layout: definition
category_slug: "script"
prev_in_category:
  title: "OP_CHECKMULTISIG - 0XAE"
  slug: "op-checkmultisig-0xae"
next_in_category:
  title: "OP_CHECKSEQUENCEVERIFY - 0XB2"
  slug: "op-checksequenceverify-0xb2"
cross_references:
  - title: "OP_CHECKMULTISIG - 0XAE"
    slug: "op-checkmultisig-0xae"
  - title: "OP_VERIFY - 0X69"
    slug: "op-verify-0x69"
---

Combine un `OP_CHECKMULTISIG` et un `OP_VERIFY`. Il prend plusieurs signatures et clés publiques pour vérifier que `M` parmi `N` signatures sont valides, comme le fait `OP_CHECKMULTISIG`. Puis, à l'instar d'`OP_VERIFY`, si la vérification échoue, le script s'arrête immédiatement avec une erreur. Si la vérification est réussie, le script continue sans pousser de valeur sur la pile. Cet opcode a été supprimé dans Tapscript.