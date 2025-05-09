# Cinéphoria

Projet fil rouge pour le titre professionnel **Concepteur Développeur d’Applications (CDA)**.

Cinéphoria est un écosystème d'applications (web, mobile, desktop) destiné à la gestion complète d’un cinéma :
- Films 
- Salles 
- Avis utilisateurs
- Réservations en ligne
- Espaces administrateur, employé et client 

---

## Structure du projet

```
cinephoria/
├── cinephoria-backend/      # API Node.js + Express + MySQL + MongoDB
├── cinephoria-frontend/     # Application Angular
├── cinephoria-desktop/      # Application desktop (à venir)
├── cinephoria-mobile/       # Application mobile (à venir)
```

---

## Technologies utilisées

- **Backend** : Node.js, Express, Sequelize, Mongoose, JWT
- **Frontend Web** : Angular
- **Base relationnelle** : MySQL
- **Base NoSQL** : MongoDB
- **Déploiement prévu** : Fly.io

---

## Lancer le projet en local

### Prérequis
- Node.js 20+
- Angular CLI (`npm install -g @angular/cli`)
- MySQL local ou distant
- MongoDB local ou MongoDB Atlas

### Backend
```bash
cd cinephoria-backend
npm install
npm run dev
```

### Frontend
```bash
cd cinephoria-frontend
npm install
ng serve
```

---

## Variables d’environnement à créer (backend/.env)

```env
PORT=3000
JWT_SECRET=cinephoriaTopSecret2025
MONGO_URI=mongodb://localhost:27017/cinephoria
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=cinephoria
```

---

## Déploiement

> Le backend sera déployé sur [Fly.io](https://fly.io)  
> Le frontend sur Vercel ou autre service adapté  
> MongoDB prévu sur MongoDB Atlas

---

## Liens utiles

- [Trello du projet](https://trello.com/b/xxxxxxxxx/cinephoria) *(à compléter)*
- [Dépôt GitHub](https://github.com/Tom300591/cinephoria)
- [Application en ligne](https://cinephoria.fly.dev) *(à compléter)*

---

## Auteur

**Thomas Laîné** – Projet CDA 2025  
Rendu dans le cadre du TP de fin de parcours CDA (titre RNCP)
