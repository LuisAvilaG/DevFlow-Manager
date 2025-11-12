# Dockerfile optimizado para producción de Next.js

# Etapa 1: Construcción (incluye instalación de dependencias)
# ¡CORREGIDO! Se usa node:20-alpine para cumplir con los requisitos de las dependencias.
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./

# ¡CORREGIDO! Se usa 'npm ci' que es más rápido y seguro para builds de producción.
# Instala las dependencias exactamente como están en package-lock.json.
RUN npm ci

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Etapa 2: Ejecución en producción
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia los archivos optimizados de la etapa de construcción.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

CMD ["node", "server.js"]
