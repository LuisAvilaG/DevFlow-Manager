/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // ¡CORREGIDO! 'serverComponentsExternalPackages' ha sido renombrado a 'serverExternalPackages'.
    serverExternalPackages: ['@genkit-ai/ai', '@genkit-ai/core'],
    serverActions: {
      bodySizeLimit: '32mb',
    },
  },
};

export default nextConfig;
