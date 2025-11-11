/** @type {import('next').NextConfig} */
const nextConfig = {
  // ¡AÑADIDO! Esto crea una carpeta '.next/standalone' optimizada para despliegues en Docker.
  output: 'standalone',
  experimental: {
    // Required for Genkit to work.
    serverComponentsExternalPackages: ['@genkit-ai/ai', '@genkit-ai/core'],
    serverActions: {
      bodySizeLimit: '32mb',
    },
  },
};

export default nextConfig;
