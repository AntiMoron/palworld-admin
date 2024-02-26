/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SAVE_FILE_DIR: process.env.SAVE_FILE_DIR,
    RCON_ADMIN_PASSWORD: process.env.RCON_ADMIN_PASSWORD,
    RCON_LOCATION: process.env.RCON_LOCATION,
  },
  publicRuntimeConfig: {
    SAVE_FILE_DIR: process.env.SAVE_FILE_DIR,
    RCON_ADMIN_PASSWORD: process.env.RCON_ADMIN_PASSWORD,
    RCON_LOCATION: process.env.RCON_LOCATION,
  },
  experimental: {
    serverComponentsExternalPackages: ['lodash', 'fs', 'sqlite3', "jsonstream", "knex"],
  },
};

export default nextConfig;
