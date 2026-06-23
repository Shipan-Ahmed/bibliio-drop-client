/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows secure dynamic image loading (avatars/covers) from any host
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;