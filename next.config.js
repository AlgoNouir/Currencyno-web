/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['currencyno.storage.iran.liara.space'],
    minimumCacheTTL: 600
  },
}

module.exports = nextConfig
