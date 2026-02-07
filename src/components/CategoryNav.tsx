'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Category } from '@/types';
import * as Icons from 'lucide-react';

interface CategoryNavProps {
    categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleCategory = (categoryId: string) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId);
    };

    const getIcon = (iconName?: string) => {
        if (!iconName) return null;
        const Icon = (Icons as any)[iconName];
        return Icon ? <Icon className="w-4 h-4" /> : null;
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span>Categories</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block bg-slate-950/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-[200]">
                <div className="max-w-7xl mx-auto px-4">
                    <ul className="flex items-center gap-1">
                        {categories.map((category) => (
                            <li key={category.id} className="relative group">
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors rounded-t-lg"
                                >
                                    {getIcon(category.icon)}
                                    <span className="font-medium text-sm">{category.name}</span>
                                    {category.subcategories && category.subcategories.length > 0 && (
                                        <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <div className="absolute left-0 top-full pt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[250]">
                                        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-b-lg shadow-2xl overflow-hidden">
                                            <div className="py-2">
                                                {/* View All Link */}
                                                <Link
                                                    href={`/categories/${category.slug}`}
                                                    className="block px-4 py-3 text-sm font-semibold text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors border-b border-white/10"
                                                >
                                                    View All {category.name}
                                                </Link>

                                                {/* Subcategories */}
                                                <div className="max-h-96 overflow-y-auto">
                                                    {category.subcategories.map((subcategory) => (
                                                        <Link
                                                            key={subcategory.id}
                                                            href={`/categories/${subcategory.slug}`}
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                                                        >
                                                            <span className="text-blue-400/70">
                                                                {getIcon(subcategory.icon)}
                                                            </span>
                                                            <span>{subcategory.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-950 w-80 h-full overflow-y-auto border-r border-white/10">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h2 className="text-lg font-bold text-white">Categories</h2>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-300" />
                            </button>
                        </div>

                        {/* Categories List */}
                        <div className="p-4">
                            {categories.map((category) => (
                                <div key={category.id} className="mb-4">
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="flex items-center justify-between w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            {getIcon(category.icon)}
                                            <span className="font-semibold text-white">
                                                {category.name}
                                            </span>
                                        </div>
                                        {category.subcategories && category.subcategories.length > 0 && (
                                            <ChevronDown
                                                className={`w-4 h-4 text-slate-400 transition-transform ${openCategory === category.id ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        )}
                                    </button>

                                    {/* Subcategories */}
                                    {openCategory === category.id &&
                                        category.subcategories &&
                                        category.subcategories.length > 0 && (
                                            <div className="mt-2 ml-4 space-y-1">
                                                {/* View All Link */}
                                                <Link
                                                    href={`/categories/${category.slug}`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block px-4 py-2 text-sm font-semibold text-blue-400 hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    View All {category.name}
                                                </Link>

                                                {category.subcategories.map((subcategory) => (
                                                    <Link
                                                        key={subcategory.id}
                                                        href={`/categories/${subcategory.slug}`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                                                    >
                                                        {getIcon(subcategory.icon)}
                                                        <span>{subcategory.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
