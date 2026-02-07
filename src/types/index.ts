// ========================================
// PRODUCT TYPES
// ========================================

export type ProductCondition = 'New' | 'Refurbished' | 'Used';

export type ProductSpecifications = {
    // Laptop-specific
    processor_type?: string; // i3, i5, i7, Ryzen, etc.
    processor_generation?: string;
    ram_size?: number; // GB
    storage_type?: 'SSD' | 'HDD' | 'Both';
    storage_capacity?: number; // GB
    screen_size?: number; // inches
    graphics_type?: 'Integrated' | 'Dedicated';
    gpu_brand?: string;
    has_touchscreen?: boolean;
    battery_health?: number; // percentage (for used)
    operating_system?: string;

    // Desktop-specific
    cpu_type?: string;
    gpu_included?: boolean;
    psu_wattage?: number;
    case_type?: string;
    is_upgradeable?: boolean;

    // Component-specific (RAM)
    ram_type?: 'DDR3' | 'DDR4' | 'DDR5';
    ram_speed?: number; // MHz
    compatible_with?: 'Laptop' | 'Desktop' | 'Both';

    // Component-specific (SSD)
    ssd_type?: 'SATA' | 'NVMe';
    read_write_speed?: string;
    form_factor?: '2.5"' | 'M.2';

    // Component-specific (PSU)
    psu_certification?: '80+ Bronze' | '80+ Silver' | '80+ Gold' | '80+ Platinum';
    is_modular?: boolean;

    // Additional custom specs
    [key: string]: any;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    compatibility?: string;
    warranty?: string;

    // Enhanced fields
    brand?: string;
    condition?: ProductCondition;
    warranty_duration?: number; // in months
    rating?: number; // 0-5
    review_count?: number;
    discount_percentage?: number; // 0-100
    original_price?: number;
    is_featured?: boolean;
    is_trending?: boolean;
    view_count?: number;
    short_specs?: string; // e.g., "8GB RAM | 512GB SSD | i5 10th Gen"
    specifications?: ProductSpecifications;

    created_at?: string;
};

// ========================================
// ORDER TYPES
// ========================================

export type OrderStatus =
    | 'New'
    | 'Payment Pending'
    | 'Proof Uploaded'
    | 'Paid'
    | 'Confirmed'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled';

export type PaymentMethod = 'QR' | 'COD';

export type Order = {
    id: string;
    customer_name: string;
    phone: string;
    address: string;
    total: number;
    status: OrderStatus;
    payment_method: PaymentMethod;
    proof_url?: string;

    // Enhanced fields
    tracking_number?: string;
    estimated_delivery?: string;
    admin_notes?: string;
    customer_email?: string;

    created_at: string;
    updated_at?: string;
};

export type OrderItem = {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price_at_time: number;
    product?: Product; // Populated when fetching with join
};

// ========================================
// CATEGORY TYPES
// ========================================

export type Category = {
    id: string;
    name: string;
    slug: string;
    parent_id?: string;
    icon?: string; // lucide icon name
    description?: string;
    image_url?: string;
    display_order?: number;
    is_active?: boolean;
    created_at: string;

    // Populated when fetching with join
    subcategories?: Category[];
    parent?: Category;
};

// ========================================
// REVIEW TYPES
// ========================================

export type ProductReview = {
    id: string;
    product_id: string;
    user_name: string;
    user_email?: string;
    rating: number; // 1-5
    title?: string;
    comment?: string;
    images?: string[];
    verified_purchase?: boolean;
    helpful_count?: number;
    is_approved?: boolean;
    created_at: string;

    // Populated when fetching with join
    product?: Product;
};

export type GoogleReview = {
    id: string;
    reviewer_name: string;
    reviewer_photo?: string;
    rating: number; // 1-5
    comment?: string;
    review_date?: string;
    cached_at: string;
};

// ========================================
// REPAIR BOOKING TYPES
// ========================================

export type RepairStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';

export type RepairBooking = {
    id: string;
    customer_name: string;
    phone: string;
    email?: string;
    device_type: string; // Laptop, Desktop, Component
    brand?: string;
    model?: string;
    issue_description: string;
    images?: string[];
    preferred_date?: string;
    status: RepairStatus;
    admin_notes?: string;
    estimated_cost?: number;
    actual_cost?: number;
    created_at: string;
    updated_at: string;
};

// ========================================
// SELL COMPONENT REQUEST TYPES
// ========================================

export type ComponentCondition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
export type SellRequestStatus = 'New' | 'Contacted' | 'Accepted' | 'Rejected';

export type SellComponentRequest = {
    id: string;
    component_type: string;
    brand?: string;
    model?: string;
    specifications?: string;
    condition: ComponentCondition;
    images?: string[];
    expected_price?: number;
    contact_name: string;
    contact_phone: string;
    contact_email?: string;
    additional_notes?: string;
    status: SellRequestStatus;
    admin_notes?: string;
    offered_price?: number;
    created_at: string;
};


// ========================================
// STORE SETTINGS TYPES
// ========================================

export type StoreSetting = {
    id: string;
    key: string;
    value: string;
};

export type StoreSettings = {
    store_name?: string;
    store_email?: string;
    store_phone?: string;
    store_address?: string;
    facebook_url?: string;
    instagram_url?: string;
    whatsapp_number?: string;
    google_maps_embed?: string;
    shipping_info?: string;
    return_policy?: string;
    warranty_info?: string;
    [key: string]: string | undefined;
};

// ========================================
// CART TYPES
// ========================================

export type CartItem = {
    product: Product;
    quantity: number;
};

export type Cart = {
    items: CartItem[];
    total: number;
};

// ========================================
// FILTER TYPES
// ========================================

export type PriceRange = {
    min: number;
    max: number;
};

export type ProductFilters = {
    category?: string;
    brand?: string[];
    condition?: ProductCondition[];
    priceRange?: PriceRange;
    inStock?: boolean;
    hasWarranty?: boolean;
    minRating?: number;

    // Laptop-specific filters
    processorType?: string[];
    processorGeneration?: string[];
    ramSize?: number[];
    storageType?: ('SSD' | 'HDD' | 'Both')[];
    storageCapacity?: number[];
    screenSize?: number[];
    graphicsType?: ('Integrated' | 'Dedicated')[];
    gpuBrand?: string[];
    hasTouchscreen?: boolean;
    batteryHealth?: number; // minimum percentage
    operatingSystem?: string[];

    // Desktop-specific filters
    cpuType?: string[];
    gpuIncluded?: boolean;
    psuWattage?: number[];
    caseType?: string[];
    isUpgradeable?: boolean;

    // Component-specific filters
    ramType?: ('DDR3' | 'DDR4' | 'DDR5')[];
    ramSpeed?: number[];
    compatibleWith?: ('Laptop' | 'Desktop' | 'Both')[];
    ssdType?: ('SATA' | 'NVMe')[];
    formFactor?: ('2.5"' | 'M.2')[];
    psuCertification?: string[];
    isModular?: boolean;
};

export type SortOption =
    | 'price_asc'
    | 'price_desc'
    | 'best_selling'
    | 'newest'
    | 'trending'
    | 'most_reviewed'
    | 'biggest_discount';

// ========================================
// API RESPONSE TYPES
// ========================================

export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
};

export type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

