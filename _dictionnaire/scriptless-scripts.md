---
title: "SCRIPTLESS SCRIPTS"
slug: "scriptless-scripts"
permalink: /dictionnaire/scriptless-scripts/
category: "SCRIPT"
letter: "S"
layout: definition
french_term: "SCRIPTS SANS SCRIPT"
category_slug: "script"
prev_in_category:
  title: "SCRIPT"
  slug: "script"
next_in_category:
  title: "SCRIPTPUBKEY"
  slug: "scriptpubkey"
cross_references:
  - title: "ADAPTOR SIGNATURE"
    slug: "adaptor-signature"
  - title: "SCHNORR"
    slug: "schnorr-protocole"
---

Concept initialement développé par Andrew Poelstra qui permet l'exécution de contrats intelligents sans exposer explicitement la logique du contrat sur la blockchain Bitcoin. Comme le suggère l'appellation « script sans script », l'idée repose sur l'exécution de scripts (ou de contrats) sans recourir explicitement à des scripts. Ces contrats exploitent les propriétés des signatures de Schnorr qui permettent l'usage des *Adaptor Signatures*, notamment pour réaliser des *Atomic Swaps*. Les conditions du contrat sont appliquées et exécutées off-chain par les parties impliquées, qui sont les seules à en connaître les termes. Contrairement aux contrats intelligents classiques, les *Scriptless Scripts* minimisent leur empreinte sur la blockchain, réduisant ainsi le coût de l'opération. Ces contrats sont aussi plus discrets que les contrats intelligents classiques, qui laissent des traces sur la blockchain. Ils ressemblent donc à des transactions ordinaires, ce qui accroît leur anonset.