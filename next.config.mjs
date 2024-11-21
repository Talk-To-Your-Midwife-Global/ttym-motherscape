// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
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
    // You can add other configurations here if needed
};