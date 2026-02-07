// Filter Types for Product Filtering System

export type SortOption =
    | 'price-asc'
    | 'price-desc'
    | 'newest'
    | 'best-selling'
    | 'highest-rated'
    | 'biggest-discount';

export type Condition = 'new' | 'refurbished' | 'used';

export type ProcessorType = 'i3' | 'i5' | 'i7' | 'i9' | 'ryzen-3' | 'ryzen-5' | 'ryzen-7' | 'ryzen-9';

export type StorageType = 'ssd' | 'hdd' | 'both';

export type GraphicsType = 'integrated' | 'dedicated';

export interface UniversalFilters {
    // Price Range
    priceMin?: number;
    priceMax?: number;

    // Brand
    brands?: string[];

    // Condition
    conditions?: Condition[];

    // Availability
    inStock?: boolean;

    // Warranty
    hasWarranty?: boolean;
    warrantyMonths?: number[];

    // Rating
    minRating?: number;
}

export interface LaptopFilters {
    // Processor
    processorTypes?: ProcessorType[];
    processorGenerations?: string[];

    // RAM
    ramSizes?: number[]; // 4, 8, 16, 32

    // Storage
    storageTypes?: StorageType[];
    storageCapacities?: number[]; // 256, 512, 1024

    // Screen
    screenSizes?: number[]; // 13, 14, 15.6, 17

    // Graphics
    graphicsTypes?: GraphicsType[];
    gpuBrands?: string[]; // NVIDIA, AMD, Intel

    // Features
    hasTouchscreen?: boolean;
    operatingSystems?: string[]; // Windows, Linux, DOS

    // Battery (for used)
    batteryHealthMin?: number;
}

export interface DesktopFilters {
    // CPU
    cpuTypes?: string[];

    // RAM
    ramSizes?: number[];

    // GPU
    hasGPU?: boolean;

    // PSU
    psuWattages?: number[]; // 400, 500, 600

    // Case
    caseTypes?: string[];

    // Upgradeable
    isUpgradeable?: boolean;
}

export interface ComponentFilters {
    // RAM specific
    ramTypes?: string[]; // DDR3, DDR4, DDR5
    ramSpeeds?: number[]; // 2400, 3200, 3600
    ramFormFactors?: string[]; // DIMM, SO-DIMM

    // SSD specific
    ssdTypes?: string[]; // SATA, NVMe
    ssdFormFactors?: string[]; // 2.5", M.2

    // PSU specific
    psuCertifications?: string[]; // 80+ Bronze, Silver, Gold
    psuModular?: string[]; // Modular, Semi-Modular, Non-Modular
}

export interface ProductFilters extends UniversalFilters {
    // Category-specific filters
    laptop?: LaptopFilters;
    desktop?: DesktopFilters;
    component?: ComponentFilters;

    // Sorting
    sortBy?: SortOption;

    // Search
    searchQuery?: string;
}

export interface FilterOption {
    value: string | number;
    label: string;
    count?: number;
}

export interface FilterSection {
    id: string;
    title: string;
    type: 'checkbox' | 'radio' | 'range' | 'select';
    options?: FilterOption[];
    min?: number;
    max?: number;
}

export interface ActiveFilter {
    key: string;
    label: string;
    value: string | number;
    displayValue: string;
}
