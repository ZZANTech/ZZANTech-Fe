/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "kwjdpavgvqhllxtfeljb.supabase.co" }]
  },
  experimental: {
    esmExternals: "loose"
  }
};

export default nextConfig;
