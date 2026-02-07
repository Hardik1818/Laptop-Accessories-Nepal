import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { ProductFilters, SortOption } from '@/types/filters';

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

    // Start base query
    let query = supabase.from('products').select('*', { count: 'exact' });

    // 1. Category Filter
    if (categories && categories.length > 0) {
        query = query.in('category', categories);
    }

    // 2. Universal Filters

    // Price Range
    if (filters.priceMin !== undefined) {
        query = query.gte('price', filters.priceMin);
    }
    if (filters.priceMax !== undefined) {
        query = query.lte('price', filters.priceMax);
    }

    // Brands (OR logic)
    if (filters.brands && filters.brands.length > 0) {
        query = query.in('brand', filters.brands);
    }

    // Conditions (OR logic)
    if (filters.conditions && filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
    }

    // Availability
    if (filters.inStock) {
        query = query.gt('stock', 0);
    }

    // Warranty
    if (filters.hasWarranty) {
        query = query.neq('warranty', null).neq('warranty', '');
    }

    // Rating
    if (filters.minRating) {
        query = query.gte('rating', filters.minRating);
    }

    // Search
    if (filters.searchQuery) {
        query = query.ilike('name', `%${filters.searchQuery}%`);
    }

    // 3. Category Specific Filters (JSONB filtering)

    // Laptop Filters
    if (filters.laptop) {
        const laptop = filters.laptop;

        // Processor Type
        if (laptop.processorTypes && laptop.processorTypes.length > 0) {
            const orConditions = laptop.processorTypes.map(type => `specifications->>processor_type.ilike.%${type}%`).join(',');
            query = query.or(orConditions);
        }

        // Processor Generation
        if (laptop.processorGenerations && laptop.processorGenerations.length > 0) {
            const orConditions = laptop.processorGenerations.map(gen => `specifications->>processor_generation.ilike.%${gen}%`).join(',');
            query = query.or(orConditions);
        }

        // RAM Size
        if (laptop.ramSizes && laptop.ramSizes.length > 0) {
            const orConditions = laptop.ramSizes.map(size => `specifications->>ram_size.eq.${size}`).join(',');
            query = query.or(orConditions);
        }

        // Storage Type
        if (laptop.storageTypes && laptop.storageTypes.length > 0) {
            const orConditions = laptop.storageTypes.map(type => `specifications->>storage_type.ilike.%${type}%`).join(',');
            query = query.or(orConditions);
        }

        // Storage Capacity
        if (laptop.storageCapacities && laptop.storageCapacities.length > 0) {
            const orConditions = laptop.storageCapacities.map(size => `specifications->>storage_capacity.eq.${size}`).join(',');
            query = query.or(orConditions);
        }

        // Screen Size
        if (laptop.screenSizes && laptop.screenSizes.length > 0) {
            const orConditions = laptop.screenSizes.map(size => `specifications->>screen_size.eq.${size}`).join(',');
            query = query.or(orConditions);
        }

        // Graphics Type
        if (laptop.graphicsTypes && laptop.graphicsTypes.length > 0) {
            const orConditions = laptop.graphicsTypes.map(type => `specifications->>graphics_type.ilike.%${type}%`).join(',');
            query = query.or(orConditions);
        }
    }

    // Desktop Filters
    if (filters.desktop) {
        const desktop = filters.desktop;

        // CPU Type
        if (desktop.cpuTypes && desktop.cpuTypes.length > 0) {
            const orConditions = desktop.cpuTypes.map(t => `specifications->>cpu_type.ilike.%${t}%`).join(',');
            query = query.or(orConditions);
        }

        // RAM Size
        if (desktop.ramSizes && desktop.ramSizes.length > 0) {
            const orConditions = desktop.ramSizes.map(size => `specifications->>ram_size.eq.${size}`).join(',');
            query = query.or(orConditions);
        }

        // GPU Presence
        if (desktop.hasGPU !== undefined) {
            query = query.eq('specifications->>has_gpu', desktop.hasGPU);
        }
    }

    // Component Filters
    if (filters.component) {
        const component = filters.component;

        // RAM Types
        if (component.ramTypes && component.ramTypes.length > 0) {
            const orConditions = component.ramTypes.map(t => `specifications->>ram_type.eq.${t}`).join(',');
            query = query.or(orConditions);
        }

        // SSD Types
        if (component.ssdTypes && component.ssdTypes.length > 0) {
            const orConditions = component.ssdTypes.map(type => `specifications->>storage_interface.ilike.%${type}%`).join(',');
            query = query.or(orConditions);
        }

        // PSU Certification
        if (component.psuCertifications && component.psuCertifications.length > 0) {
            const orConditions = component.psuCertifications.map(cert => `specifications->>psu_rating.ilike.%${cert}%`).join(',');
            query = query.or(orConditions);
        }
    }

    // 4. Sorting
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price-asc':
                query = query.order('price', { ascending: true });
                break;
            case 'price-desc':
                query = query.order('price', { ascending: false });
                break;
            case 'newest':
                query = query.order('created_at', { ascending: false });
                break;
            case 'highest-rated':
                query = query.order('rating', { ascending: false, nullsFirst: false });
                break;
            case 'biggest-discount':
                query = query.order('created_at', { ascending: false }); // Fallback
                break;
            case 'best-selling':
                query = query.order('created_at', { ascending: false }); // Fallback
                break;
            default:
                query = query.order('created_at', { ascending: false });
        }
    } else {
        query = query.order('created_at', { ascending: false });
    }

    // 5. Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        return { products: [], total: 0 };
    }

    // 6. Calculate Facets
    const facets = {
        brands: {} as Record<string, number>,
        conditions: {} as Record<string, number>,
        processorTypes: {} as Record<string, number>,
        ramSizes: {} as Record<number, number>,
        storageTypes: {} as Record<string, number>,
        screenSizes: {} as Record<number, number>,
    };

    data?.forEach((product: any) => {
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
