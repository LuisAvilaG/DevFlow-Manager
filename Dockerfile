# Dockerfile para una aplicación Next.js

# Etapa 1: Instalar dependencias
# Usa una imagen base de Node.js ligera. La versión debe coincidir con la de tu entorno de desarrollo.
FROM node:18-alpine AS deps
WORKDIR /app

# Copia package.json y package-lock.json para instalar las dependencias.
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Etapa 2: Construir la aplicación para producción
FROM node:18-alpine AS builder
WORKDIR /app

# Copia las dependencias de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
# Copia el resto del código fuente
COPY . .

# Ejecuta el script de construcción de Next.js
RUN npm run build

# Etapa 3: Ejecución en producción
FROM node:18-alpine AS runner
WORKDIR /app

# Establece el entorno a producción
ENV NODE_ENV=production
# Desactiva la telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Copia los artefactos de construcción de la etapa anterior
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expone el puerto 3000 (el puerto por defecto de Next.js)
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
