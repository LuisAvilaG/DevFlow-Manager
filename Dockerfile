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
ENV PORT 3001

# ¡CORREGIDO! Crear un usuario y grupo dedicados para la aplicación.
# Esto es más seguro y soluciona el error de construcción.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia los archivos optimizados, ahora con el usuario y grupo ya creados.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambia al usuario no-root por seguridad.
USER nextjs

EXPOSE 3001

# Inicia el servidor de Node.js.
CMD ["node", "server.js"]
