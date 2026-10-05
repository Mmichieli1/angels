# Stage 1: Build de l'application React
FROM node:26-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serveur Web Nginx pour la prod/On-Premise
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Configuration Nginx personnalisée pour le routing SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
