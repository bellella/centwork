/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['centennial-market.s3.ap-east-1.amazonaws.com'],
  },
};

export default nextConfig;
