// next._config.mjs
/** @type {import('next').NextConfig} */

import withPWA from "next-pwa"

const withPWAInit = withPWA({
    dest: 'public',
    register: true,
    disable: false,
    // app router specific optimizations
    skipWaiting: true, // update service worker automatically
    cacheOnFrontEndNav: true, // to cache while navigating with next/link
    reloadOnOnline: true, // update when network is restored
    buildExcludes: [
        /app-build-manifest\.json$/,
    ],
})

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.NEXT_PUBLIC_HOSTNAME}`,
                // port: '8000',
                pathname: '/media/**',
            },

            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',

            },
            {
                protocol: 'https',
                hostname: `api.dicebear.com`,
            }
        ],
    },
};

export default withPWAInit(nextConfig);