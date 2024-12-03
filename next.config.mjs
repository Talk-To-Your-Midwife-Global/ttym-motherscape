// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: `${process.env.NEXT_PUBLIC_HOSTNAME}`,
                // port: '8000',
                pathname: '/media/**',
            },
        ],
    },
};

export default nextConfig;