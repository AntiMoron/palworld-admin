/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, must-revalidate',
          }
        ],
      },
    ]
  },
  experimental: {
    serverComponentsExternalPackages: [
      "lodash",
      "fs",
      "sqlite3",
      "jsonstream",
      "knex",
      "sha256",
      "jwt",
      "dayjs",
      "chalk",
      "uuid",
    ],
  },
};

export default nextConfig;
