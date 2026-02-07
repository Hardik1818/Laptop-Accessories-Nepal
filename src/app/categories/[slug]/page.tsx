import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { ProductCard } from '@/components/product/ProductCard';
import { getCategoryWithSubcategories, getCategoryBreadcrumb, getCategoryBySlug } from '@/lib/categories';
import { Product } from '@/types';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { ActiveFilters } from '@/components/filters/ActiveFilters';
import { getProducts, getPriceRange } from '@/lib/products';
import { queryParamsToFilters } from '@/lib/filterUtils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { ProductSort } from '@/components/filters/ProductSort';

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate metadata for SEO
export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
    const params = await props.params;
    const category = await getCategoryBySlug(params.slug);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: `${category.name} - Laptop Accessories Nepal`,
        description:
            category.description ||
            `Browse our collection of ${category.name.toLowerCase()} at Laptop Accessories Nepal. Quality products with warranty.`,
        openGraph: {
            title: `${category.name} - Laptop Accessories Nepal`,
            description: category.description || `Shop ${category.name.toLowerCase()} in Nepal`,
            images: category.image_url ? [category.image_url] : [],
        },
    };
}

export default async function CategoryPage(props: CategoryPageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { slug } = params;

    const category = await getCategoryWithSubcategories(slug);

    if (!category) {
        notFound();
    }

    // Collect category names (including subcategories) for hierarchical filtering
    const categoryNames = [category.name];
    if (category.subcategories) {
        category.subcategories.forEach(sub => categoryNames.push(sub.name));
    }

    // Parse filters from URL
    const urlSearchParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value === 'string') {
            urlSearchParams.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach(v => urlSearchParams.append(key, v));
        }
    });

    const filters = queryParamsToFilters(urlSearchParams);

    // Fetch products with filters
    const { products, total, facets } = await getProducts({
        categories: categoryNames,
        filters,
        limit: 50
    });

    // Fetch absolute price range for slider
    const priceRange = await getPriceRange(categoryNames);

    // Prepare filter options from facets
    const brandOptions = Object.entries(facets?.brands || {}).map(([label, count]) => ({
        label,
        value: label,
        count
    }));

    const conditionOptions = Object.entries(facets?.conditions || {}).map(([label, count]) => ({
        label,
        value: label,
        count
    }));

    // Fetch breadcrumb
    const breadcrumbCategories = await getCategoryBreadcrumb(slug);
    const breadcrumbItems = breadcrumbCategories.map((cat) => ({
        label: cat.name,
        href: `/categories/${cat.slug}`,
    }));

    const getIcon = (iconName?: string) => {
        if (!iconName) return null;
        const Icon = (Icons as any)[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : null;
    };

    const slugLower = category.slug.toLowerCase();
    const nameLower = category.name.toLowerCase();

    const categoryType = (slugLower.includes('laptop') || nameLower.includes('laptop')) ? 'laptop' :
        (slugLower.includes('desktop') || nameLower.includes('desktop') || slugLower.includes('pc-build')) ? 'desktop' :
            (slugLower.includes('component') || nameLower.includes('component') ||
                slugLower.includes('ram') || nameLower.includes('ram') ||
                slugLower.includes('ssd') || nameLower.includes('ssd') ||
                slugLower.includes('hdd') ||
                slugLower.includes('gpu') || nameLower.includes('graphics') ||
                slugLower.includes('psu') || nameLower.includes('power') ||
                slugLower.includes('case') || nameLower.includes('cabinet') ||
                slugLower.includes('monitor')) ? 'component' : 'other';

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Category Header */}
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 mb-6 shadow-lg border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-blue-400">
                            {getIcon(category.icon)}
                        </div>
                        <h1 className="text-3xl font-bold text-white">{category.name}</h1>
                    </div>
                    {category.description && (
                        <p className="text-slate-300 text-lg">{category.description}</p>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <FilterSidebar
                            initialFilters={filters}
                            priceRange={priceRange}
                            brands={brandOptions}
                            conditions={conditionOptions}
                            categoryType={categoryType}
                            subType={slugLower}
                        />
                    </div>

                    {/* Mobile Filter Drawer */}
                    <div className="lg:hidden mb-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full border-slate-700 bg-slate-900/50 text-slate-300">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filters & Sort
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] bg-slate-950 border-slate-800 p-6 overflow-y-auto">
                                <div className="mt-6">
                                    <FilterSidebar
                                        initialFilters={filters}
                                        priceRange={priceRange}
                                        brands={brandOptions}
                                        conditions={conditionOptions}
                                        categoryType={categoryType}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <ActiveFilters filters={filters} />

                            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4">
                                <h2 className="text-lg md:text-xl font-bold text-white">
                                    {total} Products Found
                                </h2>
                                <ProductSort />
                            </div>
                        </div>

                        {products && products.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
                                {products.map((product: Product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-12 text-center shadow-lg border border-white/10">
                                <p className="text-slate-300 text-lg mb-4">
                                    No products found matching your filters.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-blue-500 text-blue-400 hover:bg-blue-950"
                                >
                                    <Link href={`/categories/${slug}`}>
                                        Clear Filters
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
