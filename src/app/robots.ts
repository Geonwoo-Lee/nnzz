import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.nnzz.today'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/setting/', '/edit/'],
      },
      {
        userAgent: 'Yeti', // 네이버 검색봇
        allow: '/',
        disallow: ['/api/', '/admin/', '/setting/', '/edit/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}