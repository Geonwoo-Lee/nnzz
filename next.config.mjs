const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "test",
    sw: "sw.js",
    buildExcludes: [/app-build-manifest.json$/],
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
    // 여기에 추가적인 Next.js 설정을 넣을 수 있습니다.
    // 예:
    // reactStrictMode: true,
    // images: {
    //   domains: ['example.com'],
    // },
});

module.exports = nextConfig;