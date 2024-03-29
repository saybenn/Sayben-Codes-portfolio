/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack5: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
    }
    return config
  },
}
