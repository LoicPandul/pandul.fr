---
title: "Bitcoin Stamps, UTXO set et fonctionnement d'Utreexo"
date: 2023-04-11
---

# Bitcoin Stamps, UTXO set et fonctionnement d'Utreexo

S'il y a bien un évènement qui a marqué le début de cette année sur Bitcoin, c'est l'arrivée fracassante des NFT au travers du protocole Ordinals. Depuis quelques jours, un nouveau protocole permettant d'ancrer de la donnée sur Bitcoin, appelé « Bitcoin Stamps », commence à gagner en popularité. Son élément de différenciation par rapport au protocole Ordinals est de proposer un ancrage immuable et non élagable. Cela a fait ressurgir des craintes sur la croissance de l'UTXO set des nœuds, un problème que l'on pensait être plus lointain.

Dans cet article, je vous explique le fonctionnement général des Bitcoin Stamps et leur potentiel impact sur l'UTXO set. Puis, nous nous attarderons sur une solution intéressante pour résoudre ce problème d’augmentation de la taille de l’UTXO set nommée « Utreexo ». Je vous explique son intérêt, son fonctionnement et ses inconvénients.

## **Qu’est-ce que le protocole Bitcoin Stamps** **?**

Le protocole Bitcoin Stamps est une méthode pour intégrer des données d'image formatées sur la blockchain Bitcoin en utilisant les sorties de transactions d'une façon quelque peu spéciale !

Le protocole encode le contenu binaire d'une image en une chaîne en base 64 et l'ajoute directement dans la clé d'une transaction au sein d’un « bare multisig ». Ce sont des multisig « nus » 1/3, dans le sens qu’ils sont parfaitement visibles sur la blockchain dès leur création. Une clé est utilisée pour la dépense des fonds, et les deux autres clés sont utilisées pour stocker de la data. Cela est ensuite diffusé avec le protocole Counterparty sur la blockchain Bitcoin. La longueur de la chaîne force Counterparty à ne pas utiliser d’OP_RETURN (élagable) et à découper les données en sorties.

Les données sont conservées de manière immuable, pour toujours, et sont impossibles à supprimer d'un nœud complet. Les Bitcoin Stamps sont numérotés en fonction de l'horodatage de la transaction pour assurer que le répertoire est ordonné chronologiquement, le premier Bitcoin Stamp étant la première transaction à inclure la chaîne « STAMP: » avec une chaîne base 64 valide en suffixe dans la clé, et ainsi de suite. L’objectif de ce protocole est d’utiliser la blockchain Bitcoin pour stocker de l’art, avec une méthode pour forcer la permanence dans le temps.

En comparaison, le protocole Ordinals est bien plus élégant. Les « digitals artefacts » créés n’affectent pas l’UTXO set, et sont élagables. Les nœuds ne sont pas obligés de conserver la donnée générée. Le protocole Stamps se différencie ainsi d’Ordinals en mettant en avant le fait que leurs images ne peuvent pas être élaguées, et restent immuables. Disons-le, c’est une façon déplorable de mettre des données sur Bitcoin. Pour eux, ce n’est pas une erreur, mais bien une fonctionnalité pour se différencier d’Ordinals.

Le fonctionnement de ce protocole crée de multiples UTXO, de manière anormale par rapport à l’utilisation classique de Bitcoin comme système de paiement. À terme, cela risque de faire augmenter trop rapidement la taille de l’UTXO set des nœuds, accélérant ce problème que l’on pensait être plus long à arriver.

Les plus récentes observations ont révélé une forte augmentation du nombre d'UTXO bare multisig dans l'UTXO set des nœuds Bitcoin. En effet, en l'espace de 10 jours, le nombre d'UTXO bare multisig est passé de 450 k à presque 600 k. Cette augmentation est d'autant plus fulgurante que le nombre de bare multisig oscillait doucement entre 400 k et 450 k depuis plus de 5 ans.

## **L’augmentation de la taille de l’UTXO set****.**

L’UTXO set représente l’ensemble des sorties de transaction du système Bitcoin, c’est-à-dire une liste de toutes les pièces existantes. Ce registre est conservé individuellement par chaque nœud Bitcoin afin de pouvoir vérifier rapidement la validité d’une transaction entrante. Lorsque le nœud reçoit une nouvelle transaction en attente de confirmation, ou bien des transactions dans un bloc validé, il vérifie que les UTXO présents en entrées de la transaction font bien partie de son UTXO set. Cela permet d’être sûr que les bitcoins dépensés existent réellement.

Ainsi, le nœud supprime au fur et à mesure les UTXO consommés de son UTXO set, et il ajoute les UTXO créés à son ensemble.

À cause de nombreux facteurs externes (augmentation du prix du bitcoin, adoption progressive…), et de facteurs internes (création de change, CIOH…), le ratio moyen d’UTXO créés par UTXO consommé est déséquilibré. Il y a en moyenne plus d’UTXO créés que d’UTXO consommés dans chaque transaction Bitcoin. Le nombre d’UTXO augmente, et donc la taille de l’UTXO set des nœuds croît irrémédiablement.

> Ce problème est connu depuis plusieurs années. La mise à jour SegWit de 2017 inclut par ailleurs une forme d’incitation à la consolidation en réduisant les frais pour les transactions consommant plus d’inputs et créant moins d’outputs. Cela devait permettre d’endiguer ce phénomène de croissance de l’UTXO set.

Dans le but de pouvoir procéder rapidement, le nœud Bitcoin conserve une partie de cet ensemble d’UTXO dans sa mémoire vive (RAM). Au plus il peut conserver une grande partie de l’UTXO set dans la RAM, au plus il pourra rapidement vérifier la validité des transactions qu’il traite. Ce principe a également un fort impact sur le temps nécessaire pour réaliser l’IBD (Initial Block Download) au lancement d’un nouveau nœud.

Le problème qui se pose devant nous est qu’il existe une forte différence entre la rapidité d’augmentation de l’UTXO set, et l’évolution des capacités de mémoire vive des ordinateurs. Même si l’on considère la loi de Moore sur l’augmentation des capacités des microprocesseurs, on va progressivement arriver à un point où certains utilisateurs défavorisés ne pourront plus faire tourner un nœud Bitcoin à cause des besoins en RAM qu’il requiert. Cela peut aussi affecter la décentralisation des nœuds du système Bitcoin.

Si l'on a besoin de plus de RAM pour faire tourner un nœud, le matériel nécessaire coutera plus cher. Si le matériel coute plus cher, certaines personnes ne pourront plus se l’offrir. Si des personnes ne peuvent plus faire tourner un nœud, il y en aura moins sur Bitcoin. S’il y a moins de nœuds, la distribution du réseau sera moins forte.

Cet UTXO set ne peut pas être partiellement réduit en taille. Chaque nœud doit forcément disposer de la liste de toutes les pièces existantes. Puisque la mémoire vive est une ressource rare, il pourrait être intéressant de trouver un format plus compact pour cet UTXO set. C’est la proposition d’Utreexo.

## **Qu’est-ce qu’Utreexo** **?**

Utreexo est une solution inventée par Tadge Dryja pour compacter l'UTXO set dans les nœuds Bitcoin avec un accumulateur. Elle permet de réduire drastiquement l'espace de stockage requis pour cette fonction.

Utreexo repose sur des arbres de Merkle, une structure de données qui facilite la vérification d’informations dans un format compact. C’est que l’on appelle un accumulateur. C’est une méthode cryptographique pour justifier l’appartenance d’une information donnée à un ensemble plus grand. Dans le cas d’Utreexo, on souhaite pouvoir vérifier que les UTXO dépensés en entrée d’une transaction appartiennent bien à l’ensemble des pièces non dépensées (l’UTXO set).

En utilisant des arbres de Merkle, Utreexo permet de créer une empreinte cryptographique, appelée racine de Merkle, qui condense de manière vérifiable l'ensemble des UTXO. Son principe central est la transformation de l'UTXO set en un arbre de Merkle binaire équilibré. Chaque feuille de l'arbre représente un UTXO, tandis que chaque nœud interne stocke le hachage cryptographique de la concaténation de ses deux enfants. En remontant l'arbre jusqu'à la racine (que l’on appelle également « Top Hash »), on obtient un condensé cryptographique de l'ensemble des UTXO. Les nœuds Utreexo ne stockent ainsi que la racine des arbres de Merkle, au lieu de l’ensemble de tous les UTXO.

Lorsqu'un utilisateur effectue une transaction compatible Utreexo, il fournit à la fois la preuve de possession des UTXO dépensés, et les chemins de Merkle correspondants, qui permettent aux nœuds Utreexo de vérifier l'existence des UTXO dans l'arbre. Cette approche permet aux nœuds de valider les transactions sans avoir à stocker l'intégralité de l'UTXO set.

Prenons un exemple avec un schéma pour comprendre ce mécanisme :

Dans cet exemple, j’ai intentionnellement réduit l’UTXO set à 4 UTXO pour faciliter la compréhension. En réalité, il faut imaginer qu’il existe presque 140 millions d’UTXO sur Bitcoin aujourd’hui.

Sur ce schéma, le nœud Utreexo devrait uniquement conserver en RAM la Racine de Merkle (en orange). S’il reçoit une transaction dépensant l’UTXO n° 3 (en bleu), la preuve consisterait en les éléments suivants :

* L’UTXO 3 ;
* Le HASH 4 ;
* Le HASH 1-2.

Grâce à ces informations transmises par l’émetteur de la transaction, le nœud Utreexo effectue les vérifications suivantes :

* Il calcule l’empreinte de l’UTXO 3, ce qui lui donne HASH 3 ;
* Il concatène HASH 3 avec HASH 4 ;
* Il calcule leur empreinte, ce qui lui donne HASH 3-4 ;
* Il concatène HASH 3-4 avec HASH 1-2 ;
* Il calcule leur empreinte, ce qui lui donne la racine de Merkle.

Si la racine de Merkle qu’il obtient par son processus est la même que la racine de Merkle qu’il stockait dans sa RAM, alors il est persuadé que l’UTXO n° 3 fait bien partie de l’UTXO set.

Un des avantages d'Utreexo est la réduction significative de l'espace de stockage nécessaire pour maintenir l'UTXO set. Les nœuds n'ont plus besoin de stocker l'intégralité de l'UTXO set, mais seulement la racine de l'arbre de Merkle.

Dans la configuration actuelle de Bitcoin (le 8 avril 2023), Utreexo nécessiterait l’utilisation au maximum de 28 arbres de Merkle différents. Puisque l’on utiliserait sûrement la fonction de hachage SHA256 dans ces arbres, chaque racine ferait 256 bits, soit 32 octets. Les nœuds Utreexo ne devraient alors conserver en RAM que 896 octets pour la vérification des UTXO, au lieu de plusieurs gigaoctets dans le système classique avec un UTXO set.

## **Les limites d’Utreexo****.**

Utreexo n’est pas une solution parfaite. Cela nécessite de réaliser certaines concessions.

Il existe deux manières différentes d’utiliser Utreexo sur Bitcoin. Soit, on généralise son utilisation, soit certains utilisateurs de nœuds complets Utreexo devront reposer sur des « Bridge nodes ».

Dans le premier cas, on impose à chaque utilisateur de transférer les données permettant aux nœuds Utreexo de retrouver le chemin de leurs pièces dans les arbres de Merkle. Ainsi, les nœuds Utreexo sont indépendants et ne reposent pas sur d’autres nœuds complets. Les preuves pourraient être mises dans une nouvelle partie spéciale des blocs, stockée uniquement par les nœuds à jour, et le condensat de ces preuves serait ajouté à la transaction coinbase. Cela ressemble un peu à la façon de stocker les témoins dans un bloc avec SegWit.

L’inconvénient de cette méthode est qu’il faut se mettre d’accord sur l’accumulateur utilisé. Dans la proposition de Dryja, on utilise un Arbre de Merkle. À l'avenir, nous trouverons sûrement des méthodes pour créer un accumulateur plus efficace que les arbres de Merkle. Il sera alors compliqué de modifier Bitcoin pour adapter Utreexo à un nouvel accumulateur plus efficace.

L’autre inconvénient de cette technique est qu'elle vient forcément augmenter la taille des blocs et donc affecter à la fois la bande passante et le besoin de stockage des nœuds complets. Or, la bande passante semblait être la ressource à optimiser aujourd’hui pour les nœuds. Il est de ce fait compliqué de faire des concessions pour celle-ci au profit des ressources en RAM dès aujourd'hui.

Une solution à ce problème serait de ne pas généraliser Utreexo, de laisser les blocs tranquilles, et d’offrir le choix à chaque nœud de l’utiliser ou non. Dans ce second cas, il serait alors bien plus facile de changer d’accumulateur le jour où une méthode plus efficace sera découverte. On peut même imaginer un système ou plusieurs Utreexo différents cohabiteraient avec à chaque fois des Bridges Nodes spécifiques.

L’inconvénient de cette seconde méthode est que les nœuds Utreexo sont forcément dépendants d’autres nœuds complets, disposant de l’UTXO set entier, capables de leur fournir les preuves manquantes.

En effet, il existe deux manières pour un nœud Bitcoin de recevoir des transactions. La première est lorsque le nœud reçoit des transactions en attente de confirmation, et qu’il les ajoute à sa mempool. Dans ce cas, si les preuves Utreexo sont manquantes, le nœud Utreexo peut simplement ignorer la transaction. La seconde manière de recevoir une transaction est lorsqu’elle arrive directement dans un bloc miné. Dans ce cas, si un nœud Utreexo reçoit un bloc valide avec des transactions qui ne disposent pas des preuves Utreexo, il ne pourra pas vérifier la validité de ces transactions. Il sera toutefois obligé d’accepter le bloc, puisqu’il est valide.

Dans ce cas, le protocole de Dryja inclut l’utilisation des « Bridge Nodes ». Ce sont des nœuds qui permettent de faire un pont entre les nœuds classiques avec un UTXO set complet, et les nœuds Utreexo. Lorsqu’un nœud Utreexo reçoit une transaction Bitcoin sans preuve, il peut contacter un Bridge Node pour lui demander de lui fournir la preuve manquante. Le nœud Utreexo n’est donc plus totalement indépendant. Pour faire une comparaison, cela ressemble un peu à la situation actuelle pour le stockage des blocs avec les nœuds légers, dits SPV, qui doivent forcément reposer sur de vrais nœuds complets.

Cette solution pourrait néanmoins être un compromis intéressant. Selon moi, il est préférable que les personnes qui ne seront plus en capacité de faire tourner un Full Node en raison des besoins en RAM puissent quand même faire une vérification complète. Même s’ils ne sont pas entièrement indépendants, un nœud Utreexo leur offre plus de garanties que s’ils ne font tourner aucun nœud. C’est le même type de compromis, dans un autre domaine, que pour les nœuds SPV. Oui, un nœud SPV n’offre pas les mêmes garanties qu’un nœud complet, mais c’est mieux que rien.

Concrètement, un Bridge Node sera un nœud complet, comme actuellement, avec un UTXO set entier et non compacté. Il se mettra à disposition des nœuds Utreexo pour leur calculer des preuves et les leurs transmettre. Il devra disposer d’une certaine puissance afin de pouvoir calculer ces preuves et d’une bande passante suffisante pour les transmettre. Le Bridge Node devra aussi disposer de suffisamment de RAM pour pouvoir stocker tout l’UTXO set classique s’il veut aller vite. Il peut toutefois stocker l’UTXO set dans son SSD, mais cela sera plus lent.

## **Conclusion****.**

Le protocole Bitcoin Stamps permet d'ancrer des images sur Bitcoin grâce à des bare multisig. Par rapport aux Ordinals, les Stamps sont immuables et ne peuvent pas être élagués par les nœuds Bitcoin. Cela fait peser un risque sur la décentralisation du système à cause de la croissance de l'UTXO set des nœuds.

Utreexo est une solution élégante et performante permettant de résoudre les problèmes d'évolutivité liés à la croissance de l'UTXO set des nœuds Bitcoin. Grâce à l'utilisation des arbres de Merkle, Utreexo fournit un mécanisme de vérification compact qui améliore significativement la gestion de la RAM pour les nœuds.

Utreexo n'est cependant pas une solution magique. Elle nécessite de faire des concessions sur d’autres ressources comme la bande passante. Il faudra également choisir si l’on souhaite généraliser l'utilisation des preuves, et les inclure dans un espace spécial des blocs, ou si l’on préfère que les nœuds Utreexo reposent sur des Bridges Nodes.

**Ressources externes et remerciements :**
