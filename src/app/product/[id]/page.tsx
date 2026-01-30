"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Truck, ShieldCheck, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProductDetailPage() {
    const params = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!params.id) return;
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", params.id)
                .single();

            if (error) {
                console.error("Error loading product:", error);
                setProduct(null);
            } else {
                setProduct(data);
                // Set initial image
                if (data && data.images && data.images.length > 0) {
                    setSelectedImage(data.images[0]);
                }
            }
            setLoading(false);
        };
        fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 px-4 py-8 md:py-12">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <div className="aspect-[4/5] bg-white/5 rounded-3xl animate-pulse" />
                        <div className="space-y-6 pt-4">
                            <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                            <div className="h-10 w-3/4 bg-white/5 rounded animate-pulse" />
                            <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
                            <div className="space-y-3 pt-6">
                                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
            <h1 className="text-2xl font-bold text-white mb-2">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist.</p>
            <Link href="/shop">
                <Button>Back to Shop</Button>
            </Link>
        </div>
    );

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-6 md:py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Back Button */}
                <Link href="/shop" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-6 md:mb-10 group">
                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to Shop
                </Link>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Visual Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group/image">
                            <Image
                                src={selectedImage || product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700"
                                priority
                            />

                            {/* Navigation Arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const currentIndex = product.images.indexOf(selectedImage || product.images[0]);
                                            const prevIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
                                            setSelectedImage(product.images[prevIndex]);
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/70 z-20"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const currentIndex = product.images.indexOf(selectedImage || product.images[0]);
                                            const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
                                            setSelectedImage(product.images[nextIndex]);
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/70 z-20"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}

                            {isOutOfStock && (
                                <div className="absolute top-4 right-4 z-10">
                                    <Badge variant="destructive" className="text-sm px-3 py-1">Out of Stock</Badge>
                                </div>
                            )}
                        </div>
                        {/* Thumbnails Grid */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-white/20'}`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6 md:space-y-8 pt-2 md:pt-4">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                    {product.category}
                                </Badge>
                                <div className="flex items-center text-xs font-bold text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-500/20">
                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                    Original
                                </div>
                            </div>

                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-[1.1]">
                                {product.name}
                            </h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl md:text-4xl font-bold text-blue-400">
                                    NPR {product.price.toLocaleString()}
                                </span>
                                {product.stock > 0 && product.stock < 5 && (
                                    <span className="text-sm text-red-400 font-medium animate-pulse">
                                        Only {product.stock} left in stock!
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="prose prose-invert prose-p:text-slate-400 prose-p:leading-relaxed max-w-none text-sm md:text-base">
                            <p>{product.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                <span className="block text-xs uppercase font-bold text-slate-500 mb-1">Compatibility</span>
                                <span className="text-sm md:text-base text-slate-200 font-medium">{product.compatibility || "Universal"}</span>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                <span className="block text-xs uppercase font-bold text-slate-500 mb-1">Warranty</span>
                                <span className="text-sm md:text-base text-slate-200 font-medium">{product.warranty || "No Warranty"}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 md:pt-8 space-y-4 sticky bottom-0 bg-slate-950/80 backdrop-blur-lg pb-6 -mx-4 px-4 md:relative md:bg-transparent md:backdrop-blur-none md:pb-0 md:mx-0 md:px-0 z-50">
                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className="flex-1 h-14 text-base md:text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all duration-300 font-bold"
                                    disabled={isOutOfStock}
                                    onClick={() => {
                                        addItem(product);
                                        toast.success(`${product.name} added to cart!`, {
                                            icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
                                            description: "You can view it in your shopping cart.",
                                            duration: 3000,
                                        });
                                    }}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                                </Button>
                            </div>
                            <p className="text-xs text-center text-slate-500">
                                Secure checkout via QR Payment or Cash on Delivery.
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                            <div className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                                    <Truck className="h-4 w-4" />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="block text-sm font-bold text-slate-200">Fast Delivery</span>
                                    <span className="block text-xs text-slate-500 leading-tight">Within Ring Road Kathmandu</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0 mt-0.5">
                                    <ShieldCheck className="h-4 w-4" />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="block text-sm font-bold text-slate-200">Official Warranty</span>
                                    <span className="block text-xs text-slate-500 leading-tight">100% Genuine Parts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
