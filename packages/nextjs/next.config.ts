import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4003/api/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.javbus.com',
        port: '',
        pathname: '/**',
        search: '',
        // fixme proxy
      },
    ],
  },
}

export default nextConfig
