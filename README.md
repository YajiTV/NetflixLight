<div align="center">

# 🎬 NetflixLight

### Une SPA inspirée de Netflix, construite en Vanilla JS & Node.js

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Licence-MIT-green?style=for-the-badge)](LICENSE)

[Fonctionnalités](#-fonctionnalités) • [Démarrage rapide](#-démarrage-rapide) • [Architecture](#-architecture) • [Stack technique](#-stack-technique)

</div>

---

## 🎥 Démo

<div align="center">

<img src="client/assets/video/2026-04-14-16-31-06.gif" alt="Démo NetflixLight" width="800"/>

</div>

---
## 🎯 Fonctionnalités

<table>
<tr>
<td width="50%">

### 🏠 Accueil & Découverte
- **Hero Banner** – Film tendance aléatoire avec backdrop
- **Carrousels multiples** – Tendances, séries populaires, mieux notés, genres
- **Intégration TMDB** – Données en temps réel via l'API The Movie Database
- **Thème sombre / clair** – Bascule persistante entre les sessions

</td>
<td width="50%">

### 🔍 Recherche & Détail
- **Recherche en direct** – Debounce 300ms, sans rechargement de page
- **Page de détail** – Backdrop, synopsis, genres, note, durée / nb saisons
- **Carrousel de casting** – Photos + noms des personnages
- **Contenu similaire** – Recommandations automatiques
- **Modal trailer** – Intégration YouTube avec play/pause/volume

</td>
</tr>
<tr>
<td>

### 🔐 Authentification
- **Inscription sécurisée** – Mot de passe conforme ANSSI (12+ cars, maj/min/chiffre/spécial)
- **Connexion flexible** – Email ou nom d'utilisateur acceptés
- **Cookies de session** – HTTP-only, côté serveur via `express-session`
- **Hachage Argon2id** – Standard de l'industrie pour le stockage des mots de passe

</td>
<td>

### 📋 Watchlist & Profils
- **Toggle Watchlist** – Ajout/suppression depuis n'importe quelle page, retour visuel immédiat
- **Multi-profils** – Jusqu'à 5 profils par compte
- **Sélection de profil** – Écran de sélection style Netflix à la connexion
- **Watchlist par profil** – Listes indépendantes par profil

</td>
</tr>
</table>

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18 ou supérieur
- Une [clé API TMDB](https://www.themoviedb.org/settings/api) gratuite
- Git

### Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd NetflixLight

# Installer les dépendances
npm install

# Créer le fichier d'environnement
cp .env.example .env
```

Renseigner le fichier `.env` :

```env
PORT=3000
TMDB_API_KEY=ta_clé_tmdb_ici
SESSION_SECRET=une_longue_chaine_aleatoire
DB_PATH=./server/data/netflix.db
```

### Lancer l'application

```bash
# Compiler le CSS Tailwind (obligatoire la première fois)
npm run build:css

# Développement (rechargement automatique)
npm run dev

# Production
npm start
```

L'application démarre sur [**http://localhost:3000**](http://localhost:3000) 🎉

### Premiers pas
1. Créer un compte (mot de passe : 12+ caractères avec maj, min, chiffre, spécial)
2. Sélectionner ou créer un profil
3. Explorer les carrousels de la page d'accueil
4. Rechercher un film ou une série
5. Ajouter du contenu à sa watchlist depuis la page de détail

---

## 🛠️ Stack technique

<div align="center">

| Couche | Technologie |
|--------|-------------|
| **Frontend** | Vanilla JS (SPA, History API) |
| **Style** | Tailwind CSS v4 |
| **Backend** | Node.js + Express 4 |
| **Base de données** | SQLite via `better-sqlite3` |
| **Authentification** | `express-session` + cookies HTTP-only |
| **Hachage mot de passe** | Argon2id |
| **Données films/séries** | API REST TMDB |
| **Outillage dev** | Nodemon |

</div>

### Pourquoi Vanilla JS ?
- 🚫 Zéro dépendance framework — manipulation directe du DOM
- ⚡ Navigation instantanée via l'History API (sans rechargement)
- 🎓 Compréhension approfondie des APIs navigateur
- 📦 Pas de build JS — ce qu'on écrit est ce qui s'exécute

---

## 📁 Architecture

```
NetflixLight/
├── client/                     → Frontend (fichiers statiques)
│   ├── index.html              → Point d'entrée HTML unique
│   ├── css/
│   │   ├── input.css           → Source Tailwind (à modifier)
│   │   └── output.css          → CSS compilé (ne pas modifier)
│   └── js/
│       ├── app.js              → Bootstrap : init router + vérif auth
│       ├── core/
│       │   ├── router.js       → Router SPA (History API)
│       │   ├── store.js        → État global (utilisateur courant)
│       │   └── theme.js        → Bascule thème sombre/clair
│       ├── api/
│       │   ├── auth.api.js     → Wrappers fetch pour /api/auth/*
│       │   ├── tmdb.api.js     → Wrappers fetch pour /api/tmdb/*
│       │   └── watchlist.api.js→ Wrappers fetch pour /api/watchlist/*
│       ├── components/
│       │   ├── header.js       → Header persistant + déconnexion
│       │   └── footer.js       → Footer persistant
│       └── pages/
│           ├── home.js         → Hero + carrousels
│           ├── login.js        → Formulaire de connexion
│           ├── register.js     → Formulaire d'inscription
│           ├── search.js       → Recherche avec debounce
│           ├── detail.js       → Détail film/série + casting + trailer
│           ├── watchlist.js    → Grille de la watchlist
│           └── profile.js      → Sélection / gestion des profils
│
├── server/                     → Backend (Node.js + Express)
│   ├── index.js                → Point d'entrée, démarre sur PORT
│   ├── app.js                  → App Express : session, cors, routes
│   ├── config/
│   │   ├── db.js               → Connexion SQLite + création des tables
│   │   └── env.js              → Chargement des variables d'environnement
│   ├── routes/                 → Déclaration des routes
│   ├── controllers/            → Gestionnaires de requêtes (req/res)
│   ├── services/               → Logique métier (auth, appels TMDB)
│   ├── models/                 → Requêtes SQL (synchrones)
│   ├── middleware/
│   │   ├── auth.js             → Garde requireAuth
│   │   └── error-handler.js    → Middleware d'erreur global
│   └── utils/
│       └── async-handler.js    → Wrapper pour routes async
│
├── .env                        → Variables d'environnement (non commité)
├── package.json
└── README.md
```

---

## 🔌 Routes API

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Créer un compte |
| `POST` | `/api/auth/login` | ❌ | Connexion, pose le cookie de session |
| `POST` | `/api/auth/logout` | ✅ | Détruire la session |
| `GET`  | `/api/auth/me` | ✅ | Récupérer l'utilisateur courant |
| `GET`  | `/api/tmdb/home` | ✅ | Tendances + en salle + séries populaires |
| `GET`  | `/api/tmdb/search?q=&page=` | ✅ | Recherche films & séries |
| `GET`  | `/api/tmdb/detail/:mediaType/:id` | ✅ | Détail complet + casting + similaires |
| `GET`  | `/api/watchlist` | ✅ | Récupérer la watchlist |
| `POST` | `/api/watchlist` | ✅ | Ajouter à la watchlist |
| `DELETE` | `/api/watchlist/:mediaId` | ✅ | Retirer de la watchlist |
| `GET`  | `/api/profiles` | ✅ | Lister les profils |
| `POST` | `/api/profiles` | ✅ | Créer un profil (max 5) |
| `DELETE` | `/api/profiles/:id` | ✅ | Supprimer un profil |

---

## 🗄️ Schéma de base de données

```sql
users          — id, username, email, password (argon2), theme, created_at
profiles       — id, user_id, name, avatar, created_at
watchlist      — id, user_id, profile_id, tmdb_id, media_type, title, poster_path, added_at
watch_progress — id, user_id, tmdb_id, media_type, progress, duration, completed
ratings        — id, user_id, tmdb_id, media_type, rating (1-5), created_at
```

---

## 🔒 Sécurité

- Mots de passe hachés avec **Argon2id** (jamais stockés en clair)
- Politique de mot de passe conforme **ANSSI** : 12–128 caractères, maj + min + chiffre + spécial
- Session stockée **côté serveur** — seul l'identifiant de cookie transite en clair
- Cookies **HTTP-only** — inaccessibles depuis JavaScript
- Clé API TMDB jamais exposée au client — tous les appels passent par le backend
- Entrées validées et assainies sur chaque endpoint

---

## 📝 Licence

Ce projet est sous licence MIT — voir le fichier très detaillé [LICENSE](LICENSE).

---

<div align="center">

By Mathys M.K & Enzo A.
</div>
