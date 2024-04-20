/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: '/ais-v1',
    experimental: {
        serverActions: {
            allowedOrigins: ["3.15.189.58:3000", "3.12.41.38:3000", "localhost:3000", "ais.personalized-learning.org"],
        },
    },
}

module.exports = nextConfig
