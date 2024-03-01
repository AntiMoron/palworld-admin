/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "lodash",
      "fs",
      "sqlite3",
      "jsonstream",
      "knex",
    ],
  },
};

export default nextConfig;
