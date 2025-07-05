/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  // Enable standalone output for Docker
  output: 'standalone',
}

module.exports = nextConfig