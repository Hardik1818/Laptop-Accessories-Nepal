import { ProductFilters, ActiveFilter, SortOption } from '@/types/filters';
import { Product } from '@/types';

/**
 * Convert filters to URL query parameters
 */
export function filtersToQueryParams(filters: ProductFilters): URLSearchParams {
    const params = new URLSearchParams();

    // Price Range
    if (filters.priceMin !== undefined) params.set('priceMin', filters.priceMin.toString());
    if (filters.priceMax !== undefined) params.set('priceMax', filters.priceMax.toString());

    // Brands
    if (filters.brands && filters.brands.length > 0) {
        params.set('brands', filters.brands.join(','));
    }

    // Conditions
    if (filters.conditions && filters.conditions.length > 0) {
        params.set('conditions', filters.conditions.join(','));
    }

    // Availability
    if (filters.inStock !== undefined) params.set('inStock', filters.inStock.toString());

    // Warranty
    if (filters.hasWarranty !== undefined) params.set('hasWarranty', filters.hasWarranty.toString());

    // Rating
    if (filters.minRating !== undefined) params.set('minRating', filters.minRating.toString());

    // Laptop Filters
    if (filters.laptop) {
        const laptop = filters.laptop;
        if (laptop.processorTypes && laptop.processorTypes.length > 0) {
            params.set('processorTypes', laptop.processorTypes.join(','));
        }
        if (laptop.ramSizes && laptop.ramSizes.length > 0) {
            params.set('ramSizes', laptop.ramSizes.join(','));
        }
        if (laptop.storageTypes && laptop.storageTypes.length > 0) {
            params.set('storageTypes', laptop.storageTypes.join(','));
        }
        if (laptop.screenSizes && laptop.screenSizes.length > 0) {
            params.set('screenSizes', laptop.screenSizes.join(','));
        }
        if (laptop.graphicsTypes && laptop.graphicsTypes.length > 0) {
            params.set('graphicsTypes', laptop.graphicsTypes.join(','));
        }
    }

    // Desktop Filters
    if (filters.desktop) {
        const desktop = filters.desktop;
        if (desktop.cpuTypes && desktop.cpuTypes.length > 0) {
            params.set('d_cpu', desktop.cpuTypes.join(','));
        }
        if (desktop.ramSizes && desktop.ramSizes.length > 0) {
            params.set('d_ram', desktop.ramSizes.join(','));
        }
        if (desktop.hasGPU !== undefined) {
            params.set('d_gpu', desktop.hasGPU.toString());
        }
    }

    // Component Filters
    if (filters.component) {
        const component = filters.component;
        if (component.ramTypes && component.ramTypes.length > 0) {
            params.set('c_ramType', component.ramTypes.join(','));
        }
        if (component.ssdTypes && component.ssdTypes.length > 0) {
            params.set('c_ssdType', component.ssdTypes.join(','));
        }
        if (component.psuCertifications && component.psuCertifications.length > 0) {
            params.set('c_psuCert', component.psuCertifications.join(','));
        }
    }

    // Sort
    if (filters.sortBy) params.set('sortBy', filters.sortBy);

    // Search
    if (filters.searchQuery) params.set('q', filters.searchQuery);

    return params;
}

/**
 * Parse URL query parameters to filters
 */
export function queryParamsToFilters(params: URLSearchParams): ProductFilters {
    const filters: ProductFilters = {};

    // Price Range
    const priceMin = params.get('priceMin');
    const priceMax = params.get('priceMax');
    if (priceMin) filters.priceMin = parseInt(priceMin);
    if (priceMax) filters.priceMax = parseInt(priceMax);

    // Brands
    const brands = params.get('brands');
    if (brands) filters.brands = brands.split(',');

    // Conditions
    const conditions = params.get('conditions');
    if (conditions) filters.conditions = conditions.split(',') as any;

    // Availability
    const inStock = params.get('inStock');
    if (inStock) filters.inStock = inStock === 'true';

    // Warranty
    const hasWarranty = params.get('hasWarranty');
    if (hasWarranty) filters.hasWarranty = hasWarranty === 'true';

    // Rating
    const minRating = params.get('minRating');
    if (minRating) filters.minRating = parseFloat(minRating);

    // Laptop Filters
    const processorTypes = params.get('processorTypes');
    const ramSizes = params.get('ramSizes');
    const storageTypes = params.get('storageTypes');
    const screenSizes = params.get('screenSizes');
    const graphicsTypes = params.get('graphicsTypes');

    if (processorTypes || ramSizes || storageTypes || screenSizes || graphicsTypes) {
        filters.laptop = {};
        if (processorTypes) filters.laptop.processorTypes = processorTypes.split(',') as any;
        if (ramSizes) filters.laptop.ramSizes = ramSizes.split(',').map(Number);
        if (storageTypes) filters.laptop.storageTypes = storageTypes.split(',') as any;
        if (screenSizes) filters.laptop.screenSizes = screenSizes.split(',').map(Number);
        if (graphicsTypes) filters.laptop.graphicsTypes = graphicsTypes.split(',') as any;
    }

    // Desktop Filters
    const d_cpu = params.get('d_cpu');
    const d_ram = params.get('d_ram');
    const d_gpu = params.get('d_gpu');

    if (d_cpu || d_ram || d_gpu) {
        filters.desktop = {};
        if (d_cpu) filters.desktop.cpuTypes = d_cpu.split(',');
        if (d_ram) filters.desktop.ramSizes = d_ram.split(',').map(Number);
        if (d_gpu) filters.desktop.hasGPU = d_gpu === 'true';
    }

    // Component Filters
    const c_ramType = params.get('c_ramType');
    const c_ssdType = params.get('c_ssdType');
    const c_psuCert = params.get('c_psuCert');

    if (c_ramType || c_ssdType || c_psuCert) {
        filters.component = {};
        if (c_ramType) filters.component.ramTypes = c_ramType.split(',');
        if (c_ssdType) filters.component.ssdTypes = c_ssdType.split(',');
        if (c_psuCert) filters.component.psuCertifications = c_psuCert.split(',');
    }

    // Sort
    const sortBy = params.get('sortBy');
    if (sortBy) filters.sortBy = sortBy as SortOption;

    // Search
    const searchQuery = params.get('q');
    if (searchQuery) filters.searchQuery = searchQuery;

    return filters;
}

/**
 * Get active filters as display chips
 */
export function getActiveFilters(filters: ProductFilters): ActiveFilter[] {
    const active: ActiveFilter[] = [];

    // Price Range
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        const min = filters.priceMin ?? 0;
        const max = filters.priceMax ?? '∞';
        active.push({
            key: 'price',
            label: 'Price',
            value: `${min}-${max}`,
            displayValue: `NPR ${min.toLocaleString()} - ${max === '∞' ? max : `NPR ${max.toLocaleString()}`}`
        });
    }

    // Brands
    if (filters.brands && filters.brands.length > 0) {
        filters.brands.forEach(brand => {
            active.push({
                key: 'brand',
                label: 'Brand',
                value: brand,
                displayValue: brand
            });
        });
    }

    // Conditions
    if (filters.conditions && filters.conditions.length > 0) {
        filters.conditions.forEach(condition => {
            active.push({
                key: 'condition',
                label: 'Condition',
                value: condition,
                displayValue: condition.charAt(0).toUpperCase() + condition.slice(1)
            });
        });
    }

    // In Stock
    if (filters.inStock) {
        active.push({
            key: 'inStock',
            label: 'Availability',
            value: 'true',
            displayValue: 'In Stock'
        });
    }

    // Warranty
    if (filters.hasWarranty) {
        active.push({
            key: 'hasWarranty',
            label: 'Warranty',
            value: 'true',
            displayValue: 'With Warranty'
        });
    }

    // Rating
    if (filters.minRating) {
        active.push({
            key: 'minRating',
            label: 'Rating',
            value: filters.minRating,
            displayValue: `${filters.minRating}★ & above`
        });
    }

    // Laptop Filters
    if (filters.laptop) {
        const laptop = filters.laptop;

        if (laptop.processorTypes && laptop.processorTypes.length > 0) {
            laptop.processorTypes.forEach(type => {
                active.push({
                    key: 'processorType',
                    label: 'Processor',
                    value: type,
                    displayValue: type.toUpperCase()
                });
            });
        }

        if (laptop.ramSizes && laptop.ramSizes.length > 0) {
            laptop.ramSizes.forEach(size => {
                active.push({
                    key: 'ramSize',
                    label: 'RAM',
                    value: size,
                    displayValue: `${size}GB`
                });
            });
        }

        if (laptop.storageTypes && laptop.storageTypes.length > 0) {
            laptop.storageTypes.forEach(type => {
                active.push({
                    key: 'storageType',
                    label: 'Storage',
                    value: type,
                    displayValue: type.toUpperCase()
                });
            });
        }

        if (laptop.screenSizes && laptop.screenSizes.length > 0) {
            laptop.screenSizes.forEach(size => {
                active.push({
                    key: 'screenSize',
                    label: 'Screen',
                    value: size,
                    displayValue: `${size}"`
                });
            });
        }
    }

    // Desktop Filters
    if (filters.desktop) {
        const desktop = filters.desktop;
        if (desktop.cpuTypes && desktop.cpuTypes.length > 0) {
            desktop.cpuTypes.forEach(cpu => {
                active.push({ key: 'desktopCpu', label: 'CPU', value: cpu, displayValue: cpu });
            });
        }
        if (desktop.ramSizes && desktop.ramSizes.length > 0) {
            desktop.ramSizes.forEach(ram => {
                active.push({ key: 'desktopRam', label: 'RAM', value: ram, displayValue: `${ram}GB` });
            });
        }
        if (desktop.hasGPU) {
            active.push({ key: 'desktopGpu', label: 'GPU', value: 'true', displayValue: 'Dedicated GPU' });
        }
    }

    // Component Filters
    if (filters.component) {
        const component = filters.component;
        if (component.ramTypes && component.ramTypes.length > 0) {
            component.ramTypes.forEach(type => {
                active.push({ key: 'compRamType', label: 'RAM Type', value: type, displayValue: type });
            });
        }
        if (component.ssdTypes && component.ssdTypes.length > 0) {
            component.ssdTypes.forEach(type => {
                active.push({ key: 'compSsdType', label: 'SSD Type', value: type, displayValue: type });
            });
        }
        if (component.psuCertifications && component.psuCertifications.length > 0) {
            component.psuCertifications.forEach(cert => {
                active.push({ key: 'compPsuCert', label: 'PSU Cert', value: cert, displayValue: cert });
            });
        }
    }

    return active;
}

/**
 * Count active filters
 */
export function countActiveFilters(filters: ProductFilters): number {
    return getActiveFilters(filters).length;
}

/**
 * Clear all filters
 */
export function clearAllFilters(): ProductFilters {
    return {};
}

/**
 * Remove a specific filter
 */
export function removeFilter(filters: ProductFilters, filterKey: string, filterValue: string | number): ProductFilters {
    const newFilters = { ...filters };

    switch (filterKey) {
        case 'price':
            delete newFilters.priceMin;
            delete newFilters.priceMax;
            break;
        case 'brand':
            if (newFilters.brands) {
                newFilters.brands = newFilters.brands.filter(b => b !== filterValue);
                if (newFilters.brands.length === 0) delete newFilters.brands;
            }
            break;
        case 'condition':
            if (newFilters.conditions) {
                newFilters.conditions = newFilters.conditions.filter(c => c !== filterValue);
                if (newFilters.conditions.length === 0) delete newFilters.conditions;
            }
            break;
        case 'inStock':
            delete newFilters.inStock;
            break;
        case 'hasWarranty':
            delete newFilters.hasWarranty;
            break;
        case 'minRating':
            delete newFilters.minRating;
            break;
        case 'processorType':
            if (newFilters.laptop?.processorTypes) {
                newFilters.laptop.processorTypes = newFilters.laptop.processorTypes.filter(p => p !== filterValue);
                if (newFilters.laptop.processorTypes.length === 0) delete newFilters.laptop.processorTypes;
            }
            break;
        case 'ramSize':
            if (newFilters.laptop?.ramSizes) {
                newFilters.laptop.ramSizes = newFilters.laptop.ramSizes.filter(r => r !== filterValue);
                if (newFilters.laptop.ramSizes.length === 0) delete newFilters.laptop.ramSizes;
            }
            break;
        case 'desktopCpu':
            if (newFilters.desktop?.cpuTypes) {
                newFilters.desktop.cpuTypes = newFilters.desktop.cpuTypes.filter(c => c !== filterValue);
                if (newFilters.desktop.cpuTypes.length === 0) delete newFilters.desktop.cpuTypes;
            }
            break;
        case 'desktopRam':
            if (newFilters.desktop?.ramSizes) {
                newFilters.desktop.ramSizes = newFilters.desktop.ramSizes.filter(r => r !== filterValue);
                if (newFilters.desktop.ramSizes.length === 0) delete newFilters.desktop.ramSizes;
            }
            break;
        case 'desktopGpu':
            if (newFilters.desktop) delete newFilters.desktop.hasGPU;
            break;
        case 'compRamType':
            if (newFilters.component?.ramTypes) {
                newFilters.component.ramTypes = newFilters.component.ramTypes.filter(t => t !== filterValue);
                if (newFilters.component.ramTypes.length === 0) delete newFilters.component.ramTypes;
            }
            break;
        case 'compSsdType':
            if (newFilters.component?.ssdTypes) {
                newFilters.component.ssdTypes = newFilters.component.ssdTypes.filter(t => t !== filterValue);
                if (newFilters.component.ssdTypes.length === 0) delete newFilters.component.ssdTypes;
            }
            break;
        case 'compPsuCert':
            if (newFilters.component?.psuCertifications) {
                newFilters.component.psuCertifications = newFilters.component.psuCertifications.filter(c => c !== filterValue);
                if (newFilters.component.psuCertifications.length === 0) delete newFilters.component.psuCertifications;
            }
            break;
        // Add more cases as needed
    }

    return newFilters;
}

/**
 * Sort products based on sort option
 */
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.sort((a, b) => {
                const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                return dateB - dateA;
            });
        case 'highest-rated':
            return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'biggest-discount':
            return sorted.sort((a, b) => {
                const discountA = a.original_price ? ((a.original_price - a.price) / a.original_price) * 100 : 0;
                const discountB = b.original_price ? ((b.original_price - b.price) / b.original_price) * 100 : 0;
                return discountB - discountA;
            });
        case 'best-selling':
            // This would require sales data - for now, sort by rating
            return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        default:
            return sorted;
    }
}
