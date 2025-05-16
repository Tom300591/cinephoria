# Étape 1 : build Angular
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Étape 2 : serveur avec Node.js
FROM node:20
WORKDIR /app

# Copie des fichiers construits
COPY --from=builder /app/dist/cinephoria-frontend ./dist/cinephoria-frontend
COPY server.js ./

# Installation d'Express (meilleure pratique : utiliser un vrai package.json minimal ici)
RUN npm install express

EXPOSE 3000
CMD ["node", "server.js"]
