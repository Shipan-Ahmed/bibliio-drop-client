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
  async redirects() {
    return [
      {
       
        source: '/dashboard/reader',
        
        destination: '/dashboard/reader/overview',
       
        permanent: false,
      },
      {
        
        source: '/dashboard/librarian',
        destination: '/dashboard/librarian/overview', 
        permanent: false,
      },
    ];
  },
};

export default nextConfig;