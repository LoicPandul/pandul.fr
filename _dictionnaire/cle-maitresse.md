---
title: "CLÉ MAITRESSE"
slug: "cle-maitresse"
permalink: /dictionnaire/cle-maitresse/
category: "PORTEFEUILLE"
letter: "C"
layout: definition
english_term: "MASTER KEY"
category_slug: "portefeuille"
prev_in_category:
  title: "CLÉ ÉTENDUE"
  slug: "cle-etendue"
next_in_category:
  title: "CLÉ PRIVÉE"
  slug: "cle-privee"
cross_references:
  - title: "GRAINE"
    slug: "graine"
  - title: "DÉRIVATION"
    slug: "derivation"
---

Dans le cadre des portefeuilles HD (déterministes et hiérarchiques) la clé privée maîtresse est une clé privée unique dérivée depuis la graine (seed) du portefeuille. Pour obtenir la clé maîtresse, on applique la fonction `HMAC-SHA512` à la graine, en utilisant littéralement les mots « *Bitcoin seed* » comme clé. Le résultat de cette opération donne un output de 512 bits, dont les 256 premiers bits constituent la clé maîtresse, et les 256 bits restants forment le code de chaîne maître. La clé maîtresse et le code de chaîne maître servent de point de départ pour dériver toutes les clés privées et publiques enfants dans l'arborescence du portefeuille HD. La clé privée maîtresse est donc en profondeur 0 de dérivation.

![](/assets/img/dictionnaire/cle-maitresse/image-1.png)