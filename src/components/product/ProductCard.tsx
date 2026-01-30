"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const isOutOfStock = product.stock <= 0;
    const { addItem } = useCart();

    const handleAddToCart = () => {
        if (!isOutOfStock) {
            addItem(product);
        }
    };

    return (
        <Card className="group overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 border-white/10 bg-white/5 text-slate-100 hover:bg-white/10">
            <div className="relative aspect-[4/5] w-full bg-slate-900 overflow-hidden">
                {/* Full Card Link Overlay */}
                <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {product.name}</span>
                </Link>

                {isOutOfStock && (
                    <div className="absolute top-2 right-2 z-20 pointer-events-none">
                        <Badge variant="destructive" className="text-[10px] h-5 px-1.5">Out of Stock</Badge>
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none z-0" />

                <Image
                    src={product.images[0] || "/placeholder-product.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Always visible Add to Cart on bottom right */}
                <div className="absolute bottom-3 right-3 z-30">
                    <Button
                        size="icon"
                        className="rounded-full h-8 w-8 md:h-10 md:w-10 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg active:scale-95 transition-transform"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigating to product page
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                        disabled={isOutOfStock}
                    >
                        <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                </div>

                {/* Price Tag Overlay - Bottom Left */}
                <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                    <span className="font-bold text-sm md:text-lg text-white drop-shadow-md">
                        NPR {product.price.toLocaleString()}
                    </span>
                </div>
            </div>

            <CardContent className="flex-1 p-3 md:p-4 bg-slate-900/50 backdrop-blur-sm border-t border-white/5">
                <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wide mb-1 font-medium truncate">
                    {product.category}
                </div>
                <Link href={`/product/${product.id}`} className="block">
                    <h3 className="font-bold text-xs md:text-sm leading-snug line-clamp-2 text-slate-200 group-hover:text-blue-400 transition-colors h-8 md:h-10">
                        {product.name}
                    </h3>
                </Link>
            </CardContent>

            {/* Removed CardFooter button effectively moving action to image hover for cleaner look */}
        </Card>
    );
}
