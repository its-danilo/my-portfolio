/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // The kinetree Flutter web demo is a static build in public/kinetree-demo.
  async rewrites() {
    return [{ source: '/kinetree-demo', destination: '/kinetree-demo/index.html' }];
  },
};

module.exports = nextConfig;
