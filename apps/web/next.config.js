/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@repo/schema",
    "@repo/query",
    "@repo/api-client",
    "@repo/ui",
  ],
};

export default nextConfig;
