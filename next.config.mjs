/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "swiperjs.com"
            },
            {
                protocol: "https",
                hostname: "cloud.appwrite.io"
            }
        ]
    }
};

export default nextConfig;
