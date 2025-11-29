/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // proxy API requests to the backend in dev mode
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*" // Proxy to Backend
      }
    ];
  }
};

export default nextConfig;
