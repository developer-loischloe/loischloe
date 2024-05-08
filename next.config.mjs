/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages : ["node-appwrite"]
    },
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
