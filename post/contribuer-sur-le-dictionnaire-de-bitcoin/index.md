---
title: "Contribuer sur le Dictionnaire de Bitcoin"
date: 2024-07-15
---

# Contribuer sur le Dictionnaire de Bitcoin

Ça y est, le dépôt GitHub du Dictionnaire de Bitcoin est en fin public ! C'est un moment spécial pour moi parce qu'il représente l'aboutissement d'un travail débuté au début de l'année 2023.

Dictionnaire de Bitcoin regroupe pour le moment 764 définitions de termes techniques liés à Bitcoin. Mais j'ai de côté encore environ 200 termes qui doivent être définis, et le but est de tenir à jour ce dictionnaire. Le travail n'est donc pas fini !

Dictionnaire de Bitcoin est un projet ouvert et vos contributions sont les bienvenues. J'ai besoin d'aide dans différents domaines :

* La suggestion de nouveaux termes à ajouter (avec ou sans définition) ;
* La correction d'une définition qui vous semble erronée ou imprécise ;
* La correction d'une faute d'orthographe ou d'une coquille ;
* Toute autre suggestion de modification.

Pour faciliter la collaboration sur ce projet, j'ai décidé de l'héberger sur GitHub. Si vous souhaitez contribuer, vous pouvez donc :

1. Créer votre fork du projet ;
2. Créer une nouvelle branche établie sur la branche main ;
3. Rédiger vos suggestions de modification directement sur votre branche ;
4. Proposer une Pull Request pour fusionner votre branche face à la branche main du dépôt source.

Mais si vous n'êtes pas familier avec l'utilisation de Git et GitHub, mais que vous souhaitez quand même participer à ce projet, pas d'inquiétude, ce tutoriel est fait pour vous. Nous allons voir étape par étape comment proposer des modifications, directement sur l'interface web de GitHub.

La première étape est évidemment d'avoir un compte GitHub. Si vous en avez déjà un, vous pouvez passer cette étape. Si vous ne savez pas comment créer un compte sur GitHub, je vous renvoie vers un autre tutoriel détaillé que j'avais publié sur le site de PlanB Network :

Une fois que vous avez votre compte GitHub, rendez-vous sur le dépôt du Dictionnaire de Bitcoin :

Cliquez sur le dossier /dictionnaire :

Dans ce dossier, vous avez les documents de rédaction du dictionnaire triés par lettre :

Si vous souhaitez ajouter une définition à la lettre A par exemple, ou bien faire un travail de relecture sur cette lettre, cliquez sur le document [A.md](http://A.md) :

Vous arrivez ensuite sur la page GitHub de la lettre A :

Cliquez sur l'icône de crayon en haut à droite :

Si vous n'avez encore jamais contribué sur le Dictionnaire de Bitcoin, vous allez devoir créer votre fork du dépôt original. Faire un fork d'un dépôt consiste à créer une copie de ce dépôt sur votre propre compte GitHub, ce qui vous permet de travailler sur le projet sans affecter le dépôt original. Cliquez sur le bouton Fork this repository :

Vous arrivez ensuite sur la page d'édition de GitHub :

Faites vos modifications du texte pour corriger les erreurs que vous avez repérées. Vous pouvez également ajouter votre définition à sa place en fonction de l'ordre alphabétique. N'ayez pas peur, vous êtes actuellement sur votre propre fork, donc cela ne va rien changer sur le dictionnaire principal pour le moment. Par exemple, ici, imaginons que j'ai modifié le mot « hachage » car il avait une faute d'orthographe :

Une fois vos corrections sur ce document terminées, vous pouvez cliquer sur le bouton vert "Commit Changes...". Un commit est comme une photo instantanée de votre travail à un moment donné, qui permet de garder un historique des changements :

Ajoutez un titre pour vos modifications, ainsi qu'une courte description :

Cliquez sur le bouton vert "Propose changes" :

Vous arrivez ensuite sur une page qui résume tous vos changements :

En descendant, vous pouvez voir les modifications précises que vous avez effectuées :

Si tout vous convient et que vous avez terminé vos modifications sur ce document [A.md](http://A.md), vous pouvez cliquer sur le bouton vert "Create Pull Request" :

Vous arriverez sur la page de la PR. Une Pull Request est une demande envoyée par un contributeur pour indiquer qu'il a poussé des modifications sur une branche dans un dépôt distant et qu'il souhaite que ces modifications soient examinées et potentiellement intégrées (merge) dans la branche principale du dépôt :

Vous pouvez ajouter un titre et une courte description pour votre PR. En contribuant, votre pseudo GitHub sera mentionné tant dans la version en ligne que dans la version imprimée du dictionnaire. Si vous préférez ne pas être cité, ou si vous souhaitez apparaître sous un autre nom que votre pseudo GitHub, veuillez le préciser explicitement dans votre PR :

Si tout vous semble bon, vous pouvez cliquer sur le bouton vert "Create Pull Request" :

Félicitations, votre PR a été envoyée ! Vous pouvez suivre son avancement dans l'onglet "Pull requests" sur le dépôt GitHub du Dictionnaire de Bitcoin :

En plus de ce tutoriel, je vous conseille également de lire [le README](https://github.com/LoicPandul/Dictionnaire-de-Bitcoin/blob/main/README.md) qui est sur la page d'accueil du dépôt GitHub. J'y détaille plus précisément les modifications acceptées ou non, et la manière de contribuer.

Si vous souhaitez simplement demander un nouveau terme sans rédiger sa définition, vous pouvez également ajouter une issue sur GitHub dans l'onglet "Issues". Dans le fichier [Termes en attente.md](https://github.com/LoicPandul/Dictionnaire-de-Bitcoin/blob/main/Termes%20en%20attente.md), vous trouverez tous les termes auxquels j'ai déjà pensé, mais que je n'ai pas encore eu le temps de définir (c'est un peu ma mempool à moi !). Si vous souhaitez contribuer, vous pouvez piocher dans cette liste de mots pour écrire les définitions que vous connaissez. Si vous souhaitez demander l'ajout d'un nouveau terme, avant de me contacter ou d'ouvrir une issue, je vous remercie de bien vouloir vérifier qu'il ne se trouve pas dans cette liste d'attente.

Sur ce dépôt, vous trouverez le dictionnaire décliné en trois formats différents, chacun contenant les mêmes définitions, afin de répondre aux préférences de chacun. Les formats proposés sont les suivants :

**Les contributions doivent se faire uniquement sur le dossier de travail** [**/dictionnaire**](https://github.com/LoicPandul/Dictionnaire-de-Bitcoin/blob/main/dictionnaire)**.** Un script python permet de mettre à jour automatiquement les autres formats.

Merci par avance pour votre aide et vos contributions ! :)
