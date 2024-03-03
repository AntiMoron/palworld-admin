/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      "lodash",
      "fs",
      "sqlite3",
      "jsonstream",
      "knex",
      "sha256",
      "jwt",
    ],
  },
};

export default nextConfig;
