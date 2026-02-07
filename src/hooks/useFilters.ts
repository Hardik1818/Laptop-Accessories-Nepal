"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProductFilters, SortOption } from '@/types/filters';
import {
    filtersToQueryParams,
    queryParamsToFilters,
    getActiveFilters,
    countActiveFilters,
    clearAllFilters,
    removeFilter
} from '@/lib/filterUtils';

export function useFilters(initialFilters: ProductFilters = {}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initialize filters from URL or defaults
    const [filters, setFilters] = useState<ProductFilters>(() => {
        const urlFilters = queryParamsToFilters(searchParams);
        return { ...initialFilters, ...urlFilters };
    });

    // Sync state when URL changes
    useEffect(() => {
        const urlFilters = queryParamsToFilters(searchParams);
        setFilters(prev => ({ ...prev, ...urlFilters }));
    }, [searchParams]);

    // Sync filters to URL
    const syncToURL = useCallback((newFilters: ProductFilters) => {
        const params = filtersToQueryParams(newFilters);
        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newUrl, { scroll: false });
    }, [pathname, router]);

    // Update filters
    const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
        setFilters(prev => {
            const updated = { ...prev, ...newFilters };
            syncToURL(updated);
            return updated;
        });
    }, [syncToURL]);

    // Set price range
    const setPriceRange = useCallback((min?: number, max?: number) => {
        updateFilters({ priceMin: min, priceMax: max });
    }, [updateFilters]);

    // Toggle brand
    const toggleBrand = useCallback((brand: string) => {
        setFilters(prev => {
            const brands = prev.brands || [];
            const updated = brands.includes(brand)
                ? brands.filter(b => b !== brand)
                : [...brands, brand];
            const newFilters = { ...prev, brands: updated.length > 0 ? updated : undefined };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    // Toggle condition
    const toggleCondition = useCallback((condition: 'new' | 'refurbished' | 'used') => {
        setFilters(prev => {
            const conditions = prev.conditions || [];
            const updated = conditions.includes(condition)
                ? conditions.filter(c => c !== condition)
                : [...conditions, condition];
            const newFilters = { ...prev, conditions: updated.length > 0 ? updated : undefined };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    // Set in stock filter
    const setInStock = useCallback((inStock?: boolean) => {
        updateFilters({ inStock });
    }, [updateFilters]);

    // Set warranty filter
    const setHasWarranty = useCallback((hasWarranty?: boolean) => {
        updateFilters({ hasWarranty });
    }, [updateFilters]);

    // Set minimum rating
    const setMinRating = useCallback((rating?: number) => {
        updateFilters({ minRating: rating });
    }, [updateFilters]);

    // Set sort option
    const setSortBy = useCallback((sortBy?: SortOption) => {
        updateFilters({ sortBy });
    }, [updateFilters]);

    // Set search query
    const setSearchQuery = useCallback((query?: string) => {
        updateFilters({ searchQuery: query });
    }, [updateFilters]);

    // Laptop-specific filters
    const toggleProcessorType = useCallback((type: string) => {
        setFilters(prev => {
            const laptop = prev.laptop || {};
            const types = laptop.processorTypes || [];
            const updated = types.includes(type as any)
                ? types.filter(t => t !== type)
                : [...types, type as any];
            const newFilters = {
                ...prev,
                laptop: {
                    ...laptop,
                    processorTypes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    const toggleRamSize = useCallback((size: number) => {
        setFilters(prev => {
            const laptop = prev.laptop || {};
            const sizes = laptop.ramSizes || [];
            const updated = sizes.includes(size)
                ? sizes.filter(s => s !== size)
                : [...sizes, size];
            const newFilters = {
                ...prev,
                laptop: {
                    ...laptop,
                    ramSizes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    const toggleStorageType = useCallback((type: 'ssd' | 'hdd' | 'both') => {
        setFilters(prev => {
            const laptop = prev.laptop || {};
            const types = laptop.storageTypes || [];
            const updated = types.includes(type)
                ? types.filter(t => t !== type)
                : [...types, type];
            const newFilters = {
                ...prev,
                laptop: {
                    ...laptop,
                    storageTypes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    const toggleScreenSize = useCallback((size: number) => {
        setFilters(prev => {
            const laptop = prev.laptop || {};
            const sizes = laptop.screenSizes || [];
            const updated = sizes.includes(size)
                ? sizes.filter(s => s !== size)
                : [...sizes, size];
            const newFilters = {
                ...prev,
                laptop: {
                    ...laptop,
                    screenSizes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    // Desktop-specific filters
    const toggleDesktopCpuType = useCallback((type: string) => {
        setFilters(prev => {
            const desktop = prev.desktop || {};
            const types = desktop.cpuTypes || [];
            const updated = types.includes(type)
                ? types.filter(t => t !== type)
                : [...types, type];
            const newFilters = {
                ...prev,
                desktop: {
                    ...desktop,
                    cpuTypes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    const toggleDesktopRamSize = useCallback((size: number) => {
        setFilters(prev => {
            const desktop = prev.desktop || {};
            const sizes = desktop.ramSizes || [];
            const updated = sizes.includes(size)
                ? sizes.filter(s => s !== size)
                : [...sizes, size];
            const newFilters = {
                ...prev,
                desktop: {
                    ...desktop,
                    ramSizes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    const setDesktopHasGpu = useCallback((hasGPU?: boolean) => {
        setFilters(prev => {
            const desktop = prev.desktop || {};
            const newFilters = {
                ...prev,
                desktop: {
                    ...desktop,
                    hasGPU
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    // Component-specific filters
    const toggleComponentRamType = useCallback((type: string) => {
        setFilters(prev => {
            const component = prev.component || {};
            const types = component.ramTypes || [];
            const updated = types.includes(type)
                ? types.filter(t => t !== type)
                : [...types, type];
            const newFilters = {
                ...prev,
                component: {
                    ...component,
                    ramTypes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    const toggleComponentSsdType = useCallback((type: string) => {
        setFilters(prev => {
            const component = prev.component || {};
            const types = component.ssdTypes || [];
            const updated = types.includes(type)
                ? types.filter(t => t !== type)
                : [...types, type];
            const newFilters = {
                ...prev,
                component: {
                    ...component,
                    ssdTypes: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    const toggleComponentPsuCertification = useCallback((cert: string) => {
        setFilters(prev => {
            const component = prev.component || {};
            const certs = component.psuCertifications || [];
            const updated = certs.includes(cert)
                ? certs.filter(c => c !== cert)
                : [...certs, cert];
            const newFilters = {
                ...prev,
                component: {
                    ...component,
                    psuCertifications: updated.length > 0 ? updated : undefined
                }
            };
            syncToURL(newFilters);
            return newFilters;
        });
    }, [syncToURL]);

    // Clear all filters
    const clearFilters = useCallback(() => {
        const cleared = clearAllFilters();
        setFilters(cleared);
        syncToURL(cleared);
    }, [syncToURL]);

    // Remove specific filter
    const removeSpecificFilter = useCallback((key: string, value: string | number) => {
        const updated = removeFilter(filters, key, value);
        setFilters(updated);
        syncToURL(updated);
    }, [filters, syncToURL]);

    // Get active filters
    const activeFilters = getActiveFilters(filters);
    const activeCount = countActiveFilters(filters);

    return {
        filters,
        updateFilters,
        setPriceRange,
        toggleBrand,
        toggleCondition,
        setInStock,
        setHasWarranty,
        setMinRating,
        setSortBy,
        setSearchQuery,
        toggleProcessorType,
        toggleRamSize,
        toggleStorageType,
        toggleScreenSize,
        clearFilters,
        removeSpecificFilter,
        activeFilters,
        activeCount,
        toggleDesktopCpuType,
        toggleDesktopRamSize,
        setDesktopHasGpu,
        toggleComponentRamType,
        toggleComponentSsdType,
        toggleComponentPsuCertification
    };
}
