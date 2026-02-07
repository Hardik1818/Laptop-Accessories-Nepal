import { useState, useEffect } from "react";
import { ProductReview } from "@/types";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ProductReviewsProps {
    productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<ProductReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from("product_reviews")
                .select("*")
                .eq("product_id", productId)
                .eq("is_approved", true)
                .order("created_at", { ascending: false });

            if (!error && data) {
                setReviews(data);
            }
            setLoading(false);
        };

        fetchReviews();
    }, [productId]);

    if (loading) return <div className="text-slate-400">Loading reviews...</div>;

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800 border-dashed">
                <h3 className="text-lg font-medium text-slate-200 mb-2">No Reviews Yet</h3>
                <p className="text-slate-400 mb-6">Be the first to review this product!</p>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500">
                    Write a Review
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Customer Reviews ({reviews.length})</h2>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500">
                    Write a Review
                </Button>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-slate-700">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.user_name}`} />
                                    <AvatarFallback>{review.user_name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-slate-200">{review.user_name}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-slate-700"}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500">• {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}</span>
                                    </div>
                                </div>
                            </div>
                            {review.verified_purchase && (
                                <div className="flex items-center text-xs font-medium text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-500/20">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Verified Purchase
                                </div>
                            )}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">{review.title}</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">{review.comment}</p>

                        <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                            <button className="flex items-center text-sm text-slate-500 hover:text-blue-400 transition-colors">
                                <ThumbsUp className="h-4 w-4 mr-1.5" />
                                Helpful ({review.helpful_count || 0})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
