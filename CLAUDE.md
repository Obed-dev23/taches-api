# Contexte du projet

Ce dépôt est un projet d'apprentissage. Son propriétaire reprend le développement après une pause de plus de 5 ans ; son expérience passée est en Java.

## Comment l'accompagner

- Répondre en français.
- L'objectif est qu'il apprenne et reprenne la main, pas seulement que le code soit écrit : expliquer avant de faire, et le laisser écrire lui-même quand c'est possible.
- Rythme : au début il s'est senti perdu quand trop de choses arrivaient d'un coup ; ensuite (19/11/2026) il a demandé d'accélérer et de « passer aux choses sérieuses ». Désormais : Claude construit les fonctionnalités, puis présente les concepts clés de façon synthétique (pas ligne par ligne), et propose des exercices ciblés. Rester clair et éviter de noyer d'informations.
- Expliquer les notions TypeScript et Node.js par comparaison avec Java (record, Spring, Maven, JUnit).
- Sa machine est sous Windows (PowerShell) : donner les commandes une par une et dire où les taper.
- En début de session, rappeler brièvement où on s'est arrêté et proposer la prochaine étape.

## Feuille de route

Une application de gestion de tâches en trois parties partageant les mêmes données :

1. API (Hono + TypeScript), ce dépôt. Fait : CRUD complet (GET liste, GET :id, POST, PATCH :id, DELETE :id), validation Zod, base PostgreSQL embarquée (PGlite, dossier `donnees/`) via Drizzle ORM avec migrations (`drizzle/`), CORS activé, 8 tests. Reste éventuellement : passer à un vrai serveur PostgreSQL / hébergement.
2. Site web (React + Next.js). À faire.
3. Application mobile (React Native + Expo). À faire.

## Où on en est

- Outils installés sur sa machine : Node.js, npm, Git (installé via winget), Visual Studio Code.
- Copie de travail à utiliser : `C:\Users\ntomb\Documents\GitHub\taches-api`, ouverte dans VS Code (utiliser le terminal intégré de VS Code). Une ancienne copie dans `C:\Users\ntomb\taches-api` est à abandonner.
- Fait : `npm run dev` fonctionne chez lui, l'API répond dans le navigateur. Il a écrit seul une route `GET /bonjour` (non commitée) et réglé un port 3000 occupé.
- Version « sérieuse » de l'API livrée le 19/11/2026 (voir feuille de route). Pour la récupérer, il doit abandonner sa modif locale de `src/app.ts` puis `git pull` et `npm install`.
- Prochaine étape : lui faire tester l'API avec `requetes.http` (extension REST Client), puis passer au site web (Next.js).
- Pièges déjà rencontrés : port 3000 occupé par un ancien serveur (EADDRINUSE), fichier non enregistré (rond blanc dans VS Code), deux copies du projet.

## Commandes

- `npm run dev` : lance le serveur sur le port 3000, avec rechargement automatique.
- `npm test` : lance les tests.
- `npm run typecheck` : vérifie les types.
- `npm run db:generate` : génère une migration SQL après modification de `src/db/schema.ts`.
