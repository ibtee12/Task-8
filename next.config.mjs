/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Allow user-supplied profile photo URLs (register form / profile update).
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
