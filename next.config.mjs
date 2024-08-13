/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "kwjdpavgvqhllxtfeljb.supabase.co" }],
    formats: ["image/avif", "image/webp"]
  },
  experimental: {
    esmExternals: "loose"
  }
};

export default nextConfig;
