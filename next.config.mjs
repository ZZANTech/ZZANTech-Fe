import withPWA from 'next-pwa';

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

export default withPWA({
  dest: "public",
  register: process.env.NODE_ENV === "production",
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production"
})(nextConfig);