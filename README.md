# ⚔️ Angels

> Un projet de MMORPG 3D isométrique développé en mode _Build in Public_.

## 🗺️ Vision du Projet

**Angels** est un projet d'Action-RPG 3D isométrique orienté performances, architecture modulaire et robustesse. L'objectif est de concevoir un environnement de jeu fluide, reposant sur une séparation stricte entre un backend métier rigoureux et un front-end immersif.

---

## 🛠️ Stack Technique

### **Backend & Architecture**

- **NestJS / Node.js** : Structure modulaire pour l'API métier, la gestion des profils et l'authentification.
- **Java** _(en préparation / co-services)_ : Intégration prévue pour les composants haute performance du futur serveur de jeu.
- **PostgreSQL** : Persistance des données relationnelles (indexation, structures optimisées).

### **Front-End & Rendu**

- **React / Angular** : Single Page Application (SPA) pour l'interface utilisateur.
- **WebGL / Three.js (ou Babylon.js)** : Moteur de rendu 3D isométrique intégré au canvas front.

---

## 📈 État d'Avancement (Roadmap)

Le projet se construit brique par brique. Actuellement, seul le socle de sécurité et d'authentification est fonctionnel.

- [x] **Phase 1 : Socle & Authentification** _(Actuel)_
  - Configuration du projet NestJS et structure modulaire.
  - Implémentation des services d'authentification et de gestion des comptes.
- [ ] **Phase 2 : Gestion des personnages & Inventaire**
  - Modélisation de la base de données PostgreSQL.
  - Endpoints de création et de sélection des personnages.
- [ ] **Phase 3 : Intégration Front & Rendu 3D**
  - Connexion de la SPA React/Angular au backend.
  - Intégration du canvas WebGL pour l'affichage isométrique.
- [ ] **Phase 4 : Temps réel & Multijoueur**
  - Mise en place des WebSockets pour la synchronisation des déplacements et des combats.

---

## 🚀 Installation & Lancement local

### Prérequis

- Node.js (version LTS recommandée)
- PostgreSQL configuré en local ou via Docker

### 1. Cloner le dépôt

```bash
git clone [https://github.com/ton-pseudo/angels.git](https://github.com/ton-pseudo/angels.git)
cd angels-realm
```

### 2. Installer les dépendances du Backend

```bash
cd angels-backend
npm install
```

### 3. Configurer l'environnement

Duplique le fichier .env.example en .env et renseigne tes informations de connexion PostgreSQL et les secrets JWT.

```bash
cp .env.example .env
```

### 4. Lancer le serveur en mode développement

```bash
npm run start:dev
```

---

## 🤝 Contribuer & Suivre l'aventure

Ce projet est open-source et développé publiquement. Si tu es passionné par le développement back-end, le GameDev ou l'architecture logicielle, n'hésite pas à suivre l'évolution, laisser des étoiles ou proposer des idées via les issues !
