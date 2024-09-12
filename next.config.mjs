// next.config.js or next.config.mjs
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    sw: "/sw.js", // 앞에 슬래시 추가
    buildExcludes: [/app-build-manifest.json$/, /middleware-manifest.json$/],
    runtimeCaching: [
        {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'offlineCache',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60
                },
            },
        },
    ],
});

const nextConfig = withPWA({
    images: {
        domains: ['images.unsplash.com'],
    },
});

export default nextConfig;