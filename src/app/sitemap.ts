// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.nnzz.today',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://www.nnzz.today/home',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        }
    ]
}