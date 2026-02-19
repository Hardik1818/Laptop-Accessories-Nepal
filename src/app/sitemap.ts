import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://laptopaccessoriesnepal.com'

    // Static routes
    const routes = ['', '/shop', '/services', '/about', '/contact', '/policy', '/terms', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic Categories
    const { data: categories } = await supabase.from('categories').select('slug, updated_at')
    const categoryRoutes = (categories || []).map((category) => ({
        url: `${baseUrl}/categories/${category.slug}`,
        lastModified: new Date(category.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic Products (Limit to recent 1000 for now or fetch all if small)
    const { data: products } = await supabase.from('products').select('slug, updated_at').limit(1000)
    const productRoutes = (products || []).map((product) => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: 'daily' as const,
        priority: 0.6,
    }))

    return [...routes, ...categoryRoutes, ...productRoutes]
}
