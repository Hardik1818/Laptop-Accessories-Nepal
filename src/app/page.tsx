import { HeroBanner } from "@/components/home/HeroBanner";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ProductCard } from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Revalidating data every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  // Fetch Trending (For now, just the first 4 products)
  const { data: trendingProducts } = await supabase
    .from("products")
    .select("*")
    .limit(4);

  // Fetch New Arrivals (Sorted by newest)
  const { data: newArrivals } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black">
      <HeroBanner />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-8 pb-12 md:pt-16 space-y-20 md:space-y-32">

        {/* Trending Section */}
        <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                Trending <span className="text-blue-500">NOW</span>
              </h2>
              <div className="h-1 w-12 bg-blue-600 rounded-full" />
            </div>
            <Link href="/shop" className="group flex items-center gap-1 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
              Explore All <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {trendingProducts?.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            )) || <p className="text-slate-500">No trending products found.</p>}
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <div className="flex items-end justify-between mb-8 md:mb-12 text-right">
            <Link href="/shop" className="group hidden sm:flex items-center gap-1 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest order-1">
              <ChevronRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Browse New
            </Link>
            <div className="space-y-1 sm:order-2">
              <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                <span className="text-indigo-500">New</span> Arrivals
              </h2>
              <div className="h-1 w-12 bg-indigo-600 rounded-full ml-auto" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {newArrivals?.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            )) || <p className="text-slate-500">No new arrivals found.</p>}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
              View All Arrivals <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
          <ReviewsSection />
        </section>

      </div>
    </div>
  );
}
