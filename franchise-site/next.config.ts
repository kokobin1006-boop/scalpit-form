import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/",
      headers: [{
        // HTML references build-specific assets. Do not reuse an old document
        // after publishing a new build with different chunk filenames.
        key: "Cache-Control",
        value: "no-store, max-age=0",
      }],
    }];
  },
};

export default nextConfig;
