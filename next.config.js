/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // make /about becomes /about/index.html and is routable via /about/.
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
