/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // 👈 allow Cloudinary images
      },
    ],
  },
};

module.exports = nextConfig;
