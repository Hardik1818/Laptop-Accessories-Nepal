"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Truck, ShieldCheck, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ProductSpecs } from "@/components/product/ProductSpecs";
// import { ProductReviews } from "@/components/product/ProductReviews"; // Removed per user request
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
    const params = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("overview");

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
            <div className="min-h-screen bg-background px-4 py-8 md:py-12">
                <div className="container mx-auto max-w-6xl animate-pulse">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <div className="aspect-[4/5] bg-muted/30 rounded-3xl" />
                        <div className="space-y-6 pt-4">
                            <div className="h-8 w-1/3 bg-muted/30 rounded" />
                            <div className="h-4 w-full bg-muted/30 rounded" />
                            <div className="h-12 w-2/3 bg-muted/30 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-muted-foreground px-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
            <p className="mb-6 text-center">The product you are looking for does not exist or has been removed.</p>
            <Link href="/shop">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                    Back to Shop
                </Button>
            </Link>
        </div>
    );

    const isOutOfStock = product.stock <= 0;

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast.success(`${quantity} x ${product.name} added to cart!`, {
            icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
            description: "View your cart to checkout.",
            duration: 3000,
        });
    };

    const shortDesc = product.description.length > 150
        ? product.description.substring(0, 150) + "..."
        : product.description;

    return (
        <div className="min-h-screen bg-background text-foreground py-6 md:py-12 px-4 md:px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Back Button */}
                <Link href="/shop" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-all mb-6 md:mb-10 group">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to Shop
                </Link>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
                    {/* Visual Section - 7/12 for large screens */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-[4/5] md:aspect-square bg-white rounded-[2rem] overflow-hidden border border-border shadow-xl group/image">
                            <Image
                                src={selectedImage || product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
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
                                        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-foreground opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white shadow-lg z-20"
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
                                        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-foreground opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white shadow-lg z-20"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}

                            {isOutOfStock && (
                                <div className="absolute top-6 right-6 z-10">
                                    <Badge className="bg-destructive text-white border-none text-sm px-4 py-1.5 shadow-lg rounded-full">
                                        Out of Stock
                                    </Badge>
                                </div>
                            )}
                        </div>
                        {/* Thumbnails Grid */}
                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={cn(
                                            "relative h-20 w-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all p-0.5 bg-white",
                                            selectedImage === img
                                                ? 'border-primary shadow-md ring-2 ring-primary/10'
                                                : 'border-transparent hover:border-border grayscale hover:grayscale-0'
                                        )}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <div className="relative h-full w-full rounded-xl overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={`${product.name} thumbnail ${i + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section - 5/12 for large screens */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                    {product.category}
                                </Badge>
                                {product.condition && (
                                    <Badge variant="outline" className="text-muted-foreground border-border bg-muted/30 font-medium rounded-full px-3 py-1">
                                        {product.condition}
                                    </Badge>
                                )}
                                <div className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 ml-auto whitespace-nowrap">
                                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                                    AUTHENTIC PRODUCT
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-4 leading-[1.15]">
                                {product.name}
                            </h1>

                            <div className="flex flex-wrap items-baseline gap-4 mb-6">
                                <span className="text-3xl md:text-5xl font-extrabold text-primary">
                                    NPR {product.price.toLocaleString()}
                                </span>
                                {product.original_price && (
                                    <span className="text-xl text-muted-foreground line-through decoration-destructive/50">
                                        NPR {product.original_price.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {!isOutOfStock && product.stock <= 5 && (
                                <p className="text-sm text-destructive font-bold mb-4 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                                    Only {product.stock} units left in stock!
                                </p>
                            )}
                        </div>

                        <div className="p-6 bg-muted/30 rounded-3xl border border-border space-y-4">
                            <h3 className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Quick Overview</h3>
                            <div className="prose prose-sm prose-stone max-w-none text-muted-foreground leading-relaxed">
                                <p>{shortDesc}</p>
                                {product.short_specs && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {product.short_specs.split(',').map((spec, i) => (
                                            <span key={i} className="inline-flex items-center px-2.5 py-1 rounded bg-white text-foreground text-[11px] font-semibold shadow-sm border border-border">
                                                {spec.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-6 pt-4">
                            {!isOutOfStock && (
                                <div className="flex items-center gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Quantity</label>
                                        <QuantitySelector
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            max={product.stock}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <span className="block text-xs font-bold text-muted-foreground tracking-widest uppercase">Stock Status</span>
                                        <span className="text-sm font-semibold text-emerald-600 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Available for delivery
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                <Button
                                    size="lg"
                                    className="w-full h-16 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-300 font-black uppercase tracking-widest"
                                    disabled={isOutOfStock}
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="mr-3 h-6 w-6" />
                                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                                </Button>

                                <p className="text-[11px] text-center text-muted-foreground font-medium uppercase tracking-widest">
                                    Safe & Secure Payments • Cash on Delivery • QR Scan
                                </p>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid md:grid-cols-2 gap-4 pt-8 border-t border-border">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border shadow-sm">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Truck className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="block text-sm font-bold text-foreground">Fast Shipping</span>
                                    <span className="block text-[11px] text-muted-foreground leading-tight uppercase tracking-tight">Across Kathmandu</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border shadow-sm">
                                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="block text-sm font-bold text-foreground">6-12 Months</span>
                                    <span className="block text-[11px] text-muted-foreground leading-tight uppercase tracking-tight">{product.warranty || "Official Warranty"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Information Section */}
                <div className="mb-24">
                    <div className="flex items-center gap-8 border-b border-border mb-8 overflow-x-auto scrollbar-none">
                        {['overview', 'specs'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-4 text-xs font-bold tracking-widest uppercase transition-all relative whitespace-nowrap",
                                    activeTab === tab
                                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab === 'specs' ? 'Technical Specifications' : 'Product Overview'}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[400px] bg-white rounded-[2rem] border border-border p-8 md:p-12 shadow-sm">
                        {activeTab === 'overview' && (
                            <div className="prose prose-stone prose-lg max-w-none text-muted-foreground">
                                <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                            <ProductSpecs product={product} />
                        )}
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="border-t border-border pt-20">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-foreground mb-2">You May Also Like</h2>
                            <p className="text-muted-foreground">Similar products from the {product.category} category</p>
                        </div>
                        <Link href={`/shop?category=${product.category}`}>
                            <Button variant="outline" className="rounded-full border-border hover:bg-muted font-bold text-xs uppercase tracking-widest">
                                View Full Collection
                            </Button>
                        </Link>
                    </div>
                    <RelatedProducts category={product.category} currentProductId={product.id} />
                </div>
            </div>
        </div>
    );
}

