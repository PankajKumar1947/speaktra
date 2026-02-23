/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/query", "@repo/api-client", "@repo/ui"],
};

export default nextConfig;
