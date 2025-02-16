/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /index\.html$/,
      loader: 'ignore-loader',
    });
    return config;
  }
  //reactStrictMode: true,
}

module.exports = nextConfig;
