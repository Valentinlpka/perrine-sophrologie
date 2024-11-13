/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["kkbfsrminwgsxtxrlhwk.supabase.co"],
  },
  useFileSystemPublicRoutes: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
