/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: '/ais-v1',
    experimental: {
        serverActions: {
            allowedOrigins: ["3.12.41.38:3000", "localhost:3000", "ais.personalized-learning.org"],
        },
    },
}

module.exports = nextConfig
