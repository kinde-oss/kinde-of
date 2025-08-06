// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable SSR (this is default, but explicitly setting it)
    output: undefined, // Don't set to 'export' as that would make it static
    
    // Important for Amplify deployment
    trailingSlash: false,
    
    // Optimize for serverless
    experimental: {
      serverComponentsExternalPackages: [],
    },
    
    // Important for authentication redirects
    async redirects() {
      return [];
    },
  };
  
  module.exports = nextConfig;