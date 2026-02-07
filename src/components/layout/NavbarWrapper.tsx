import { getCategoriesWithHierarchy } from '@/lib/categories';
import { NavbarWithMegaMenu } from './NavbarWithMegaMenu';

export async function NavbarWrapper() {
    const categories = await getCategoriesWithHierarchy();

    return <NavbarWithMegaMenu categories={categories} />;
}
