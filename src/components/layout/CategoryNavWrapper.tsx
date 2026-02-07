import { getCategoriesWithHierarchy } from '@/lib/categories';
import { CategoryNavClient } from './CategoryNavClient';

export async function CategoryNavWrapper() {
    const categories = await getCategoriesWithHierarchy();

    return <CategoryNavClient categories={categories} />;
}
