// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   /* ✅ config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ecommerce.routemisr.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "assets.aceternity.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // لا تستخدم eslint هنا
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ecommerce.routemisr.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.aceternity.com" },
    ],
  },
  experimental: {
    appDir: true, // لو انت شغال بالـ app directory
  },
};

export default nextConfig;
