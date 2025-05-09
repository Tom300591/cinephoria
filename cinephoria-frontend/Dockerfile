# Étape 1 : build Angular
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Étape 2 : serveur avec Node.js
FROM node:20
WORKDIR /app
COPY --from=builder /app/dist/cinephoria-frontend ./dist/cinephoria-frontend
COPY server.js ./
RUN npm install express
EXPOSE 3000
CMD ["node", "server.js"]

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
