import { supabase } from './supabase';
import { Category } from '@/types';

// ========================================
// FETCH ALL CATEGORIES
// ========================================

export async function getAllCategories(): Promise<Category[]> {
    try {
        console.log('Fetching categories from Supabase...');
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            return [];
        }

        console.log('Categories fetched successfully:', data?.length || 0);
        // Filter active categories in JavaScript (handles NULL values)
        const activeCategories = data?.filter(cat => cat.is_active !== false) || [];
        console.log('Active categories:', activeCategories.length);
        return activeCategories;
    } catch (error) {
        console.error('Error in getAllCategories:', error);
        return [];
    }
}

// ========================================
// FETCH CATEGORIES WITH HIERARCHY
// ========================================

export async function getCategoriesWithHierarchy(): Promise<Category[]> {
    try {
        const allCategories = await getAllCategories();

        // Separate parent and child categories
        const parentCategories = allCategories.filter((cat) => !cat.parent_id);
        const childCategories = allCategories.filter((cat) => cat.parent_id);

        // Build hierarchy
        const categoriesWithChildren = parentCategories.map((parent) => ({
            ...parent,
            subcategories: childCategories
                .filter((child) => child.parent_id === parent.id)
                .sort((a, b) => (a.display_order || 0) - (b.display_order || 0)),
        }));

        return categoriesWithChildren;
    } catch (error) {
        console.error('Error in getCategoriesWithHierarchy:', error);
        return [];
    }
}

// ========================================
// FETCH CATEGORY BY SLUG
// ========================================

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Error fetching category by slug:', error);
            return null;
        }

        // Client-side check for is_active (handles NULL as true)
        if (data && data.is_active === false) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getCategoryBySlug:', error);
        return null;
    }
}

// ========================================
// FETCH CATEGORY WITH SUBCATEGORIES
// ========================================

export async function getCategoryWithSubcategories(
    slug: string
): Promise<Category | null> {
    try {
        const category = await getCategoryBySlug(slug);
        if (!category) return null;

        // Fetch subcategories
        const { data: subcategories, error } = await supabase
            .from('categories')
            .select('*')
            .eq('parent_id', category.id)
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching subcategories:', error);
            return category;
        }

        return {
            ...category,
            subcategories: subcategories || [],
        };
    } catch (error) {
        console.error('Error in getCategoryWithSubcategories:', error);
        return null;
    }
}

// ========================================
// FETCH PARENT CATEGORIES ONLY
// ========================================

export async function getParentCategories(): Promise<Category[]> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .is('parent_id', null)
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching parent categories:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getParentCategories:', error);
        return [];
    }
}

// ========================================
// FETCH SUBCATEGORIES BY PARENT SLUG
// ========================================

export async function getSubcategoriesByParentSlug(
    parentSlug: string
): Promise<Category[]> {
    try {
        // First get the parent category
        const parent = await getCategoryBySlug(parentSlug);
        if (!parent) return [];

        // Then get its subcategories
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('parent_id', parent.id)
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching subcategories:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getSubcategoriesByParentSlug:', error);
        return [];
    }
}

// ========================================
// GET CATEGORY BREADCRUMB
// ========================================

export async function getCategoryBreadcrumb(slug: string): Promise<Category[]> {
    try {
        const category = await getCategoryBySlug(slug);
        if (!category) return [];

        const breadcrumb: Category[] = [category];

        // If has parent, fetch it
        if (category.parent_id) {
            const { data: parent, error } = await supabase
                .from('categories')
                .select('*')
                .eq('id', category.parent_id)
                .single();

            if (!error && parent) {
                breadcrumb.unshift(parent);
            }
        }

        return breadcrumb;
    } catch (error) {
        console.error('Error in getCategoryBreadcrumb:', error);
        return [];
    }
}

// ========================================
// COUNT PRODUCTS IN CATEGORY
// ========================================

export async function countProductsInCategory(categorySlug: string): Promise<number> {
    try {
        const category = await getCategoryBySlug(categorySlug);
        if (!category) return 0;

        const { count, error } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category', category.name)
            .gt('stock', 0);

        if (error) {
            console.error('Error counting products:', error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Error in countProductsInCategory:', error);
        return 0;
    }
}
