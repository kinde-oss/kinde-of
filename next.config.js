/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SSR (this is default, but explicitly setting it)
  output: undefined, // Don't set to 'export' as that would make it static
  
  // Important for Amplify deployment
  trailingSlash: false,
  
  // Optimize for serverless
  serverExternalPackages: [],
  
  // Important for authentication redirects
  async redirects() {
    return [];
  },

  // Ensure proper handling of static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  
  // Enable image optimization
  images: {
    unoptimized: false,
  },
};

module.exports = nextConfig;