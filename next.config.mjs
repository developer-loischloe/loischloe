/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["node-appwrite"],
    },
    compress: true,
    poweredByHeader: false,
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "swiperjs.com",
            },
            {
                protocol: "https",
                hostname: "cloud.appwrite.io",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
            {
                source: "/_next/static/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=2592000, stale-while-revalidate=86400",
                    },
                ],
            },
            {
                source: "/feed/products.xml",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=3600, stale-while-revalidate=600",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
