//next.config.js
/** @type {import ('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/mint",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,

  allowedDevOrigins: ["*.ngrok-free.app"],
};

module.exports = nextConfig;
