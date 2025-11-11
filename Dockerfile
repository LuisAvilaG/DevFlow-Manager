# Dockerfile optimizado para producción de Next.js

# Etapa 1: Instalar dependencias
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Etapa 2: Construir la aplicación
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Etapa 3: Ejecución en producción (usando la salida 'standalone')
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Establece el puerto de la aplicación. Next.js usará este valor.
ENV PORT 3001

# Copia los archivos optimizados de la etapa de construcción.
# 'standalone' copia automáticamente solo lo necesario, resultando en una imagen mucho más pequeña.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expone el puerto que definimos en la variable de entorno
EXPOSE 3001

# Inicia el servidor de Node.js.
CMD ["node", "server.js"]
