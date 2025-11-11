/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // ¡CORREGIDO! 'serverExternalPackages' se mueve fuera de 'experimental'.
  serverExternalPackages: ['@genkit-ai/ai', '@genkit-ai/core'],
  experimental: {
    serverActions: {
      bodySizeLimit: '32mb',
    },
  },
};

export default nextConfig;
