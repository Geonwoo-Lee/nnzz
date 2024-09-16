// next.config.js or next.config.mjs
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "dev",
    sw: "/sw.js",
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
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    productionBrowserSourceMaps: true,
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    env: {
        NEXT_PUBLIC_KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    },
});

export default nextConfig;