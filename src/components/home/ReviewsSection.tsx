"use client";

import { useSettings } from "@/context/SettingsContext";
import { Star, Quote, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Placeholder reviews - In a real app, fetch from Google Places API
const REVIEWS = [
    {
        id: 1,
        author: "Suman Shrestha",
        rating: 5,
        date: "2 months ago",
        text: "Excellent service! I went there to upgrade my laptop RAM and SSD. The staff was very knowledgeable and the price was reasonable. Highly recommended for any laptop upgrades.",
        initial: "S"
    },
    {
        id: 2,
        author: "Pooja Sharma",
        rating: 5,
        date: "1 month ago",
        text: "Great collection of accessories. I bought a mechanical keyboard and a gaming mouse. Quality is top-notch and they provided a warranty card as well.",
        initial: "P"
    },
    {
        id: 3,
        author: "Bibek Thapa",
        rating: 4,
        date: "3 weeks ago",
        text: "Good place for laptop repair. They fixed my screen issue within a day. A bit crowded but worth the wait for the service quality.",
        initial: "B"
    },
    {
        id: 4,
        author: "Anjali Gurung",
        rating: 5,
        date: "4 months ago",
        text: "Best shop in Kathmandu for gaming gear. The owner is very helpful and suggests the right products according to budget.",
        initial: "A"
    }
];

export function ReviewsSection() {
    const { settings } = useSettings();
    const googleMapsUrl = "https://www.google.com/maps/place/Laptop+Accessories+Nepal/@27.7028222,85.3096069";

    return (
        <section className="py-12 md:py-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950/50 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-8 md:mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                        Customer <span className="text-blue-500">Love</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        See what our customers are saying about their experience with Laptop Accessories Nepal.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold text-xl">
                        <span className="text-2xl">4.8</span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <span className="text-slate-400 text-sm font-normal ml-2">(Based on Google Reviews)</span>
                    </div>
                </div>

                {/* Reviews Carousel/Grid */}
                <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory md:snap-none md:overflow-visible no-scrollbar">
                    {REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-300 group min-w-[280px] w-[85vw] md:w-auto snap-center flex-shrink-0"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                        {review.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white leading-tight">{review.author}</h4>
                                        <span className="text-xs text-slate-500">{review.date}</span>
                                    </div>
                                </div>
                                <Quote className="w-8 h-8 text-white/5 group-hover:text-blue-500/20 transition-colors" />
                            </div>

                            <div className="flex text-yellow-500 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-4 h-4",
                                            i < review.rating ? "fill-current" : "text-slate-700"
                                        )}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Location & Map Section */}
                <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Visual Map Container */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[300px] lg:h-[400px] order-2 lg:order-1 relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5539266155523!2d85.3121872!3d27.7028222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19dd547214d5%3A0x3d4e0a6501f3bf7!2sLaptop%20Accessories%20Nepal!5e0!3m2!1sen!2snp!4v1707308761234!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        />
                        {/* Overlay hint to interact */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                            <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">View on Map</span>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center lg:text-left space-y-6 order-1 lg:order-2">
                        <h3 className="text-2xl font-bold text-white">Visit Our Store</h3>
                        <p className="text-slate-400 text-lg">
                            We are located in the heart of Kathmandu. Come visit us to experience our products firsthand, get expert advice, and see why our customers love us.
                        </p>

                        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 inline-block lg:block text-left mb-2">
                            <p className="text-slate-300 text-sm mb-1">
                                <strong className="text-white">Address:</strong> Putalisadak, Kathmandu
                            </p>
                            <p className="text-slate-300 text-sm">
                                <strong className="text-white">Hours:</strong> 10:00 AM - 7:00 PM (Sun-Fri)
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                            >
                                <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                    Get Directions
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 border-slate-700 text-slate-300 hover:text-white hover:bg-white/5"
                            >
                                <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                    Read All Reviews
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
