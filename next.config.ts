import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  images: {
  domains: ["ecommerce.routemisr.com","images.unsplash.com","assets.aceternity.com"],
    

 
},
};

export default nextConfig;
