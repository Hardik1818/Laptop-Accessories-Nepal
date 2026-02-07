'use client';

import { usePathname } from 'next/navigation';
import CategoryNav from '@/components/CategoryNav';
import { Category } from '@/types';

interface CategoryNavClientProps {
    categories: Category[];
}

export function CategoryNavClient({ categories }: CategoryNavClientProps) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');

    if (isAdminRoute) return null;

    return <CategoryNav categories={categories} />;
}
