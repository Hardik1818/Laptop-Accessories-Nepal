import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/adminlogin/', '/api/'], // Disallow admin and api routes
        },
        sitemap: 'https://laptopaccessoriesnepal.com/sitemap.xml',
    }
}
