# Contexte du projet

Ce dépôt est un projet d'apprentissage. Son propriétaire reprend le développement après une pause de plus de 5 ans ; son expérience passée est en Java.

## Comment l'accompagner

- Répondre en français.
- L'objectif est qu'il apprenne et reprenne la main, pas seulement que le code soit écrit : expliquer avant de faire, et le laisser écrire lui-même quand c'est possible.
- Avancer lentement, une notion à la fois. Il a signalé s'être senti perdu quand trop de choses arrivaient d'un coup.
- Expliquer les notions TypeScript et Node.js par comparaison avec Java (record, Spring, Maven, JUnit).
- Sa machine est sous Windows (PowerShell) : donner les commandes une par une et dire où les taper.
- En début de session, rappeler brièvement où on s'est arrêté et proposer la prochaine étape.

## Feuille de route

Une application de gestion de tâches en trois parties partageant les mêmes données :

1. API (Hono + TypeScript), ce dépôt. Fait : routes lister, créer, terminer, avec tests. Stockage en mémoire.
2. Site web (React + Next.js). À faire.
3. Application mobile (React Native + Expo). À faire.

## Où on en est

- Outils installés sur sa machine : Node.js, npm, Git (installé via winget), Visual Studio Code.
- Copie de travail à utiliser : `C:\Users\ntomb\Documents\GitHub\taches-api`, ouverte dans VS Code (utiliser le terminal intégré de VS Code). Une ancienne copie dans `C:\Users\ntomb\taches-api` est à abandonner.
- Fait : `npm run dev` fonctionne chez lui, l'API répond dans le navigateur.
- Prochaine étape : lire `src/app.ts` ligne par ligne ensemble. Le bloc `type Tache` a déjà été expliqué ; reprendre au bloc suivant (tableau `taches` et `prochainId`).
- Exercice en attente : ajouter une route `DELETE /taches/:id` en s'inspirant de la route `PATCH`.
- Ensuite : remplacer le stockage en mémoire par PostgreSQL.

## Commandes

- `npm run dev` : lance le serveur sur le port 3000, avec rechargement automatique.
- `npm test` : lance les tests.
