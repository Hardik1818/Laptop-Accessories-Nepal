"use client";

import { useSettings } from "@/context/SettingsContext";
import { Star, Quote, ExternalLink, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Placeholder reviews - In a real app, fetch from Google Places API
const REVIEWS = [
    {
        id: 1,
        author: "Anil Shrestha",
        rating: 5,
        date: "7 months ago",
        text: "I recently had a frustrating issue with my Lenovo laptop's housing; it was quite damaged... However, I found this shop and decided to give them a try. the technician was able to repair the housing without needing to replace the entire part! This was incredibly impressive... I highly recommend this for any laptop repair or upgrade.",
        initial: "A"
    },
    {
        id: 2,
        author: "Sameer Kathayat",
        rating: 5,
        date: "a year ago",
        text: "Amazing service, So helpful and polite , Everyone check it out ❤️",
        initial: "S"
    },
    {
        id: 3,
        author: "Manish Gurung",
        rating: 5,
        date: "a year ago",
        text: "Without a doubt this is the best laptop repair shop in Kathmandu! I researched over 10 shops before coming across this shop! Unbeatable price! Best repair! Highly recommended!",
        initial: "M"
    },
    {
        id: 4,
        author: "James Hang Sodemba",
        rating: 5,
        date: "2 years ago",
        text: "one of the best laptop accessories and repair in town",
        initial: "J"
    }
];

export function ReviewsSection() {
    const { settings } = useSettings();
    const googleMapsUrl = "https://maps.app.goo.gl/puxjEva77XMFFmPW8";

    return (
        <section className="pt-12 md:pt-20 pb-0 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase italic">
                        Customer <span className="text-primary">Love</span>
                    </h2>

                    <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold text-xl">
                        <span className="text-2xl">4.8</span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <span className="text-muted-foreground text-sm font-normal ml-2">(Google Rating)</span>
                    </div>
                </div>

                {/* Reviews Carousel/Grid */}
                <div className="flex overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory md:snap-none md:overflow-visible no-scrollbar">
                    {REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className="bg-card backdrop-blur-sm border border-border p-6 rounded-2xl hover:bg-muted/20 hover:border-primary/30 transition-all duration-300 group min-w-[280px] w-[85vw] md:w-auto snap-center flex-shrink-0 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                                        {review.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground leading-tight">{review.author}</h4>
                                        <span className="text-xs text-muted-foreground">{review.date}</span>
                                    </div>
                                </div>
                                <Quote className="w-8 h-8 text-muted-foreground/10 group-hover:text-primary/20 transition-colors" />
                            </div>

                            <div className="flex text-yellow-500 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-4 h-4",
                                            i < review.rating ? "fill-current" : "text-muted"
                                        )}
                                    />
                                ))}
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4 italic">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Write a Review Button directly below cards */}
                <div className="mt-4 text-center">
                    <Button
                        asChild
                        variant="outline"
                        className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all shadow-lg shadow-primary/5"
                    >
                        <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                            Write a Google Review
                        </Link>
                    </Button>
                </div>

                {/* Location & Map Section - Compact */}
                <div className="mt-2 bg-muted/30 rounded-[2.5rem] p-4 md:p-8 border border-border/50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* Map - Occupies 7 cols on lg */}
                        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-border shadow-xl h-[350px] relative group bg-muted">
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
                            {/* Overlay hint */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full">Interactive Map</span>
                            </div>
                        </div>

                        {/* Info & Directions - Occupies 4 cols on lg */}
                        <div className="lg:col-span-4 flex flex-col justify-between py-2">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">
                                    Visit <span className="text-primary">Us</span>
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">Our Location</p>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Putalisadak, Kathmandu</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">Workshop Hours</p>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">10:00 AM - 7:00 PM <br />(Sun - Fri)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className="mt-8 md:mt-0 w-full rounded-2xl h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 font-black uppercase italic tracking-tighter"
                            >
                                <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                    Get Directions
                                    <ExternalLink className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
