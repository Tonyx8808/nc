import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "./",
  },
  
};

module.exports = {
  allowedDevOrigins: ['192.168.1.27'],
}

export default nextConfig;