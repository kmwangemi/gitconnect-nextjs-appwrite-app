/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    }
  },
  // images: {
  //   domains: ['cdn.discordapp.com'],
  // }
};

export default nextConfig;
