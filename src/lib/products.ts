import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { ProductFilters } from '@/types/filters';

interface FetchProductsOptions {
    categories?: string[]; // Filter by category names
    filters?: ProductFilters;
    page?: number;
    limit?: number;
}

interface ProductResult {
    products: Product[];
    total: number;
    facets?: {
        brands: Record<string, number>;
        conditions: Record<string, number>;
        processorTypes?: Record<string, number>;
        ramSizes?: Record<number, number>;
        storageTypes?: Record<string, number>;
        screenSizes?: Record<number, number>;
    };
}

export async function getProducts(options: FetchProductsOptions): Promise<ProductResult> {
    const { categories, filters = {}, page = 1, limit = 20 } = options;

    const applyAllFilters = (q: any) => {
        let query = q;

        // 1. Category Filter
        if (categories && categories.length > 0) {
            query = query.in('category', categories);
        }

        // 2. Universal Filters
        if (filters.priceMin !== undefined) query = query.gte('price', filters.priceMin);
        if (filters.priceMax !== undefined) query = query.lte('price', filters.priceMax);
        if (filters.brands && filters.brands.length > 0) query = query.in('brand', filters.brands);
        if (filters.conditions && filters.conditions.length > 0) query = query.in('condition', filters.conditions);
        if (filters.inStock) query = query.gt('stock', 0);
        if (filters.hasWarranty) query = query.neq('warranty', null).neq('warranty', '');
        if (filters.minRating) query = query.gte('rating', filters.minRating);
        if (filters.searchQuery) query = query.ilike('name', `%${filters.searchQuery}%`);

        // 3. Category Specific Filters
        if (filters.laptop) {
            const laptop = filters.laptop;
            if (laptop.processorTypes && laptop.processorTypes.length > 0) {
                const orConditions = laptop.processorTypes.map(t => `specifications->>processor_type.ilike.%${t}%`).join(',');
                query = query.or(orConditions);
            }
            if (laptop.ramSizes && laptop.ramSizes.length > 0) {
                const orConditions = laptop.ramSizes.map(s => `specifications->>ram_size.eq.${s}`).join(',');
                query = query.or(orConditions);
            }
            if (laptop.storageTypes && laptop.storageTypes.length > 0) {
                const orConditions = laptop.storageTypes.map(t => `specifications->>storage_type.ilike.%${t}%`).join(',');
                query = query.or(orConditions);
            }
            if (laptop.screenSizes && laptop.screenSizes.length > 0) {
                const orConditions = laptop.screenSizes.map(s => `specifications->>screen_size.eq.${s}`).join(',');
                query = query.or(orConditions);
            }
        }

        if (filters.desktop) {
            const desktop = filters.desktop;
            if (desktop.cpuTypes && desktop.cpuTypes.length > 0) {
                const orConditions = desktop.cpuTypes.map(t => `specifications->>cpu_type.ilike.%${t}%`).join(',');
                query = query.or(orConditions);
            }
            if (desktop.ramSizes && desktop.ramSizes.length > 0) {
                const orConditions = desktop.ramSizes.map(s => `specifications->>ram_size.eq.${s}`).join(',');
                query = query.or(orConditions);
            }
            if (desktop.hasGPU !== undefined) {
                query = query.eq('specifications->>has_gpu', desktop.hasGPU);
            }
        }

        if (filters.component) {
            const component = filters.component;
            if (component.ramTypes && component.ramTypes.length > 0) {
                const orConditions = component.ramTypes.map(t => `specifications->>ram_type.eq.${t}`).join(',');
                query = query.or(orConditions);
            }
            if (component.ssdTypes && component.ssdTypes.length > 0) {
                const orConditions = component.ssdTypes.map(t => `specifications->>storage_interface.ilike.%${t}%`).join(',');
                query = query.or(orConditions);
            }
        }

        return query;
    };

    // 1. Facet Query
    const baseFacetQuery = supabase.from('products').select('brand, condition, specifications');
    const { data: facetData } = await applyAllFilters(baseFacetQuery);

    const facets = {
        brands: {} as Record<string, number>,
        conditions: {} as Record<string, number>,
        processorTypes: {} as Record<string, number>,
        ramSizes: {} as Record<number, number>,
        storageTypes: {} as Record<string, number>,
        screenSizes: {} as Record<number, number>,
    };

    facetData?.forEach((product: any) => {
        if (product.brand) facets.brands[product.brand] = (facets.brands[product.brand] || 0) + 1;
        if (product.condition) facets.conditions[product.condition] = (facets.conditions[product.condition] || 0) + 1;

        const specs = product.specifications as any;
        if (specs) {
            if (specs.processor_type) facets.processorTypes![specs.processor_type] = (facets.processorTypes![specs.processor_type] || 0) + 1;
            if (specs.ram_size) facets.ramSizes![Number(specs.ram_size)] = (facets.ramSizes![Number(specs.ram_size)] || 0) + 1;
            if (specs.storage_type) facets.storageTypes![specs.storage_type] = (facets.storageTypes![specs.storage_type] || 0) + 1;
            if (specs.screen_size) facets.screenSizes![Number(specs.screen_size)] = (facets.screenSizes![Number(specs.screen_size)] || 0) + 1;
        }
    });

    // 2. Data Query
    let dataQuery = supabase.from('products').select('*', { count: 'exact' });
    dataQuery = applyAllFilters(dataQuery);

    // Sorting
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price-asc': dataQuery = dataQuery.order('price', { ascending: true }); break;
            case 'price-desc': dataQuery = dataQuery.order('price', { ascending: false }); break;
            case 'newest': dataQuery = dataQuery.order('created_at', { ascending: false }); break;
            case 'highest-rated': dataQuery = dataQuery.order('rating', { ascending: false }); break;
            default: dataQuery = dataQuery.order('created_at', { ascending: false });
        }
    } else {
        dataQuery = dataQuery.order('created_at', { ascending: false });
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await dataQuery.range(from, to);

    if (error) {
        console.error('Error fetching products:', error);
        return { products: [], total: 0 };
    }

    return {
        products: data as Product[],
        total: count || 0,
        facets
    };
}

// Helper to get min/max price for range slider
export async function getPriceRange(categories?: string[]): Promise<{ min: number; max: number }> {
    let query = supabase.from('products').select('price');
    if (categories && categories.length > 0) {
        query = query.in('category', categories);
    }

    const { data } = await query.order('price', { ascending: true }).limit(1);
    const { data: maxData } = await query.order('price', { ascending: false }).limit(1);

    return {
        min: data?.[0]?.price || 0,
        max: Math.max(maxData?.[0]?.price || 0, 500000)
    };
}
