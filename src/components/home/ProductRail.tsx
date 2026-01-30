"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProductRailProps {
    title: string;
    products: Product[];
}

export function ProductRail({ title, products }: ProductRailProps) {
    return (
        <div className="space-y-4 py-6">
            <div className="flex items-center justify-between px-6 md:px-12">
                <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
                <Link href="/shop" className="text-sm font-medium text-slate-400 hover:text-white flex items-center transition-colors">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
            </div>

            <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex w-max space-x-6 px-6 md:px-12">
                    {products.map((product) => (
                        <div key={product.id} className="w-[280px] shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
        </div>
    );
}
