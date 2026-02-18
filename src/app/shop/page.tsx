"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["All", "Cases", "Keyboards", "Mice", "Sleeves", "Adapters"];

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from("products").select("*");
            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Filter Logic (Client-side for now for instant feedback on small catalog)
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header Section */}
            <div className="bg-muted/30 border-b border-border py-8 md:py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-2xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">Shop Collection</h1>
                    <p className="text-muted-foreground max-w-2xl text-sm md:text-lg">
                        Browse our curated selection of premium accessories designed to elevate your workspace.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
                <div className="flex flex-col md:flex-row gap-6 lg:gap-12">

                    {/* Desktop Sidebar */}
                    <aside className="w-64 shrink-0 hidden md:block space-y-8">
                        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-foreground font-semibold">
                                <Filter className="h-5 w-5 text-primary" />
                                <span>Categories</span>
                            </div>
                            <div className="space-y-3">
                                {CATEGORIES.map(cat => (
                                    <div key={cat} className="flex items-center space-x-3 group">
                                        <Checkbox
                                            id={cat}
                                            checked={selectedCategory === cat}
                                            onCheckedChange={() => setSelectedCategory(cat)}
                                            className="border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <label
                                            htmlFor={cat}
                                            className={`text-sm cursor-pointer transition-colors ${selectedCategory === cat ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter Placeholder */}
                        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                            <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                            <div className="flex items-center gap-2 text-sm mb-4">
                                <Input
                                    placeholder="Min"
                                    type="number"
                                    className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                                />
                                <span className="text-muted-foreground">-</span>
                                <Input
                                    placeholder="Max"
                                    type="number"
                                    className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Apply Filter</Button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Search & Mobile Filter Bar */}
                        <div className="sticky top-14 md:static z-40 bg-background/80 backdrop-blur-md md:bg-transparent -mx-4 px-4 py-2 md:p-0 md:mx-0 flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-9 md:pl-10 h-10 md:h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary rounded-xl text-sm md:text-base"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Mobile Filter Sheet */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="md:hidden h-10 w-10 px-0 bg-card border-border text-foreground hover:bg-muted rounded-xl shrink-0">
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="bg-background border-border text-foreground w-[300px]">
                                    <SheetHeader>
                                        <SheetTitle className="text-foreground">Filters</SheetTitle>
                                        <SheetDescription className="text-muted-foreground">Narrow down your search</SheetDescription>
                                    </SheetHeader>
                                    <div className="py-6 space-y-6">
                                        <div>
                                            <h4 className="font-medium mb-4 text-foreground">Categories</h4>
                                            <div className="space-y-3">
                                                {CATEGORIES.map(cat => (
                                                    <div key={cat} className="flex items-center space-x-3">
                                                        <Checkbox
                                                            id={`mobile-${cat}`}
                                                            checked={selectedCategory === cat}
                                                            onCheckedChange={() => setSelectedCategory(cat)}
                                                            className="border-input data-[state=checked]:bg-primary"
                                                        />
                                                        <label htmlFor={`mobile-${cat}`} className="text-sm cursor-pointer text-muted-foreground" onClick={() => setSelectedCategory(cat)}>
                                                            {cat}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="aspect-[4/5] bg-muted/20 rounded-2xl animate-pulse"></div>
                                ))}
                            </div>
                        )}

                        {/* Product Grid */}
                        {!loading && filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border mx-auto max-w-lg">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted border border-border mb-4">
                                    <Search className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                                <p className="text-muted-foreground mb-6 text-sm">Try adjusting your search terms or filters.</p>
                                <Button
                                    variant="outline"
                                    className="border-input text-muted-foreground hover:text-foreground hover:bg-muted h-10 px-6"
                                    onClick={() => { setSearchTerm(""); setSelectedCategory("All") }}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            !loading && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
