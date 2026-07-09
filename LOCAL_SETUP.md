# Guide d'installation locale — UniGest Pro

Ce guide vous explique comment faire tourner le projet sur votre PC (Windows, Mac ou Linux).

---

## Prérequis

| Outil | Version minimale | Lien |
|---|---|---|
| Node.js | 20+ |
| pnpm | 10+ | `npm install -g pnpm` |
| XAMPP | Avec MySQL/MariaDB activé |

> **Note** : le projet utilise maintenant la base MySQL/MariaDB `universite` de XAMPP. Les anciennes données fictives servent seulement de secours côté interface si l'API locale est arrêtée.

---

## 1. Installation des dépendances

Depuis la racine du projet :

```bash
pnpm install
```

---

## 2. Préparer la base `universite`

Depuis la racine du projet :

```bash
pnpm run db:setup
```

Cette commande :

- lit les informations existantes dans les fichiers du projet ;
- génère `database/universite.sql` ;
- crée/remplit la base `universite` dans XAMPP/MySQL.

## 3. Lancer le projet en un seul endroit

```bash
pnpm run dev
```

Cette commande lance ensemble :

- l'API PHP MySQL sur `http://localhost:8000/api` ;
- le dashboard React/Vite sur `http://localhost:5174`.

Ouvrez ensuite :

```text
http://localhost:5174
```

## 4. Commandes utiles

```bash
pnpm run db:generate
pnpm run db:import
pnpm --dir artifacts/university-dashboard run build
```

## Structure simplifiée d'utilisation

Vous travaillez depuis la racine du projet :

- `pnpm run db:setup` prépare la base ;
- `pnpm run dev` lance tout ;
- l'interface lit les données depuis XAMPP/MySQL via `api/index.php`.

## Structure technique

```
University-Insights/
├── api/                   ← API PHP qui lit MySQL/XAMPP
├── database/              ← SQL généré pour la base universite
├── scripts/               ← Génération/import DB + lancement unifié
├── artifacts/
│   └── university-dashboard/  ← Interface React + Vite
└── LOCAL_SETUP.md         ← Ce fichier
```

---

## Résolution des problèmes courants

| Erreur | Cause | Solution |
|---|---|---|
| `pnpm: command not found` | pnpm non installé | `npm install -g pnpm` |
| `php` introuvable | PHP/XAMPP non dans le PATH | Lancez depuis XAMPP Shell ou ajoutez `C:\xampp\php` au PATH |
| `mysql.exe` introuvable | XAMPP installé ailleurs | Lancez avec `MYSQL_BIN=chemin\mysql.exe pnpm run db:import` |
| `ECONNREFUSED localhost:8000` | API non démarrée | Lancez `pnpm run dev` |
| Base vide | Import non lancé | Lancez `pnpm run db:setup` |
