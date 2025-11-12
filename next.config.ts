/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eweotvkvzqzxltgzhauh.supabase.co",
        hostname: "res.cloudinary.com", // 👈 allow Cloudinary images
      },
    ],
  },
};

module.exports = nextConfig;
