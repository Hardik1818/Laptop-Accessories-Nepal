import { useState, useEffect } from "react";
import { Product } from "@/types";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
    category: string;
    currentProductId: string;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            // Logic: Fetch up to 4 products in same category
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("category", category)
                .neq("id", currentProductId)
                .limit(4);

            if (!error && data) {
                setProducts(data);
            }
            setLoading(false);
        };

        if (category) {
            fetchRelated();
        }
    }, [category, currentProductId]);

    if (loading) return null; // Or skeleton
    if (products.length === 0) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
