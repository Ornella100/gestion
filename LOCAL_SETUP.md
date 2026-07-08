# Guide d'installation locale — UniGest Pro

Ce guide vous explique comment faire tourner le projet sur votre PC (Windows, Mac ou Linux).

---

## Prérequis

| Outil | Version minimale | Lien |
|---|---|---|
| Node.js | 20+ | https://nodejs.org |
| pnpm | 10+ | `npm install -g pnpm` |
| PostgreSQL | 15+ (optionnel pour l'instant) | https://www.postgresql.org/download |

> **Note** : La base de données n'est pas encore requise. Toutes les données affichées sont des données fictives. Vous pouvez lancer le projet sans PostgreSQL.

---

## 1. Installation des dépendances

Depuis la racine du projet :

```bash
pnpm install
```

---

## 2. Configuration des variables d'environnement

### Serveur API (`artifacts/api-server/`)

Copiez le fichier exemple et modifiez-le :

```bash
cp artifacts/api-server/.env.example artifacts/api-server/.env
```

Contenu minimal pour démarrer (sans base de données) :

```env
PORT=8080
SESSION_SECRET=une-cle-secrete-longue-et-aleatoire
LOG_LEVEL=info
```

### Frontend (`artifacts/university-dashboard/`)

Aucune configuration requise pour démarrer. Le proxy Vite redirige `/api` vers `localhost:8080` automatiquement.

---

## 3. Lancer le projet

Ouvrez **deux terminaux** :

**Terminal 1 — Serveur API :**
```bash
cd artifacts/api-server
pnpm dev
# Le serveur écoute sur http://localhost:8080
```

**Terminal 2 — Interface web :**
```bash
cd artifacts/university-dashboard
pnpm dev
# L'interface est accessible sur http://localhost:5173
```

Ouvrez votre navigateur sur **http://localhost:5173**

---

## 4. Ajouter une vraie base de données (optionnel)

### 4a. Créer la base PostgreSQL

```sql
-- Dans psql ou pgAdmin :
CREATE DATABASE university_db;
```

### 4b. Configurer la connexion

Dans `artifacts/api-server/.env`, décommentez et remplissez :

```env
DATABASE_URL=postgresql://postgres:motdepasse@localhost:5432/university_db
```

### 4c. Appliquer le schéma

```bash
cd lib/db
pnpm push
```

---

## Structure du projet

```
University-Insights/
├── artifacts/
│   ├── api-server/        ← Serveur Express (API REST)
│   └── university-dashboard/  ← Interface React + Vite
├── lib/
│   ├── db/                ← Schéma Drizzle ORM (PostgreSQL)
│   └── api-zod/           ← Schémas de validation Zod
└── LOCAL_SETUP.md         ← Ce fichier
```

---

## Résolution des problèmes courants

| Erreur | Cause | Solution |
|---|---|---|
| `pnpm: command not found` | pnpm non installé | `npm install -g pnpm` |
| `Error: PORT ... not provided` | .env manquant | Créez `artifacts/api-server/.env` |
| `ECONNREFUSED localhost:8080` | API non démarrée | Lancez le terminal 1 d'abord |
| `DATABASE_URL must be set` | DB non configurée | Commentez la ligne dans `lib/db/src/index.ts` ou ajoutez DATABASE_URL |
