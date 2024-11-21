// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'ec2-35-179-93-166.eu-west-2.compute.amazonaws.com',
                port: '8000',
                pathname: '/media/**',
            },
        ],
    },
};

export default nextConfig;