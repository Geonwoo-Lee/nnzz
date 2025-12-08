// next.config.js or next.config.mjs
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  sw: "/sw.js",
  buildExcludes: [/app-build-manifest.json$/, /middleware-manifest.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
});

const nextConfig = withPWA({
  images: {
    domains: [
      "images.unsplash.com",
      "https://nnzzimage.s3.ap-northeast-2.amazonaws.com",
      "www.notion.so",
      "s3-us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "img.youtube.com"
    ],
    minimumCacheTTL: 300,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  async rewrites() {
    const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://13.209.221.99:8080';
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${apiKey}/:path*`,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    KAKAO_REST_KEY: process.env.KAKAO_REST_KEY,
  },
});

export default nextConfig;
