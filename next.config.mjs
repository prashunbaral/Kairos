/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.pinimg.com',
        },
        {
          protocol: 'https', 
          hostname: 'utfs.io',
        },
        module.exports = {
          experimental: {
            missingSuspenseWithCSRBailout: false,
          },
        }
      ],
    },
  };
  
  export default nextConfig;
  