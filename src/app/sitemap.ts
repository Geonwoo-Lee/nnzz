// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        // 메인 페이지
        {
            url: 'https://www.nnzz.today',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },

        // 주요 서비스 페이지들
        {
            url: 'https://www.nnzz.today/home',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://www.nnzz.today/location',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://www.nnzz.today/location-request',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://www.nnzz.today/random',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]
}