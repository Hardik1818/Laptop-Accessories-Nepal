'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="py-3">
            <ol className="flex items-center gap-2 text-sm">
                {/* Home Link */}
                <li>
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </li>

                {/* Breadcrumb Items */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            {isLast ? (
                                <span className="font-medium text-gray-900" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-gray-600 hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
