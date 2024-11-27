// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'ec2-13-48-1-138.eu-north-1.compute.amazonaws.com',
                // port: '8000',
                pathname: '/media/**',
            },
        ],
    },
};

export default nextConfig;