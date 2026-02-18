"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Target, Zap, Users, Globe } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function AboutPage() {
    const { settings } = useSettings();

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-8 md:py-20 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left flex-1 max-w-2xl order-2 lg:order-1">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                            Since 2024
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4 md:mb-6 leading-tight">
                            Empowering Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                                Digital Lifestyle
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-10 mx-auto lg:mx-0 max-w-lg font-medium">
                            Laptop Accessories Nepal (LAN) is your destination for elite tech essentials. We operate at the intersection of performance, aesthetics, and accessibility.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full sm:w-auto font-bold text-base shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
                                    Explore Store
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image - Smaller & Tighter */}
                    <div className="relative order-1 lg:order-2 flex-shrink-0 w-full max-w-[300px] md:max-w-[400px]">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2rem] opacity-20 blur-3xl" />
                        <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden border border-border shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] bg-card">
                            <Image
                                src={settings.about_hero || "/about/hero_image.png"}
                                alt="Technician"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Stats/Mission Grid */}
            <div className="container mx-auto px-4 py-12 relative z-30">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-card border border-border p-8 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                        <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Target className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            To bridge the gap between global tech innovations and the Nepali market, providing authentic gear at fair prices.
                        </p>
                    </div>
                    <div className="bg-card border border-border p-8 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                        <div className="h-14 w-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="h-7 w-7 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">The Speed</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We hate waiting too. That's why we offer same-day delivery inside the Ring Road and rapid dispatch nationwide.
                        </p>
                    </div>
                    <div className="bg-card border border-border p-8 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                        <div className="h-14 w-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users className="h-7 w-7 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">The Community</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            More than a store, we are a collective of creators, developers, and gamers building the future of Nepal.
                        </p>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="container mx-auto px-4 py-12 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl opacity-10 blur-2xl" />
                        <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
                            <Image
                                src={settings.about_story || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"}
                                alt="Team working together"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">From a Backpack <br />to a Brand</h2>
                            <div className="h-1.5 w-24 bg-primary rounded-full" />
                        </div>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                            Founded in 2024, LAN started with a simple observation: finding high-quality, specific laptop accessories in Kathmandu was a treasure hunt. You had to visit ten shops just to find one decent sleeve or original adapter.
                        </p>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                            We decided to change that. By curating a catalog of the best brands like Keychron, Logitech, and Apple, and offering a seamless online shopping experience with local payments, we made upgrading your setup effortless.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[
                                "100% Authentic Products",
                                "Official Warranty Support",
                                "Easy Returns Policy",
                                "Expert Tech Support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-foreground font-semibold">
                                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="border-t border-border bg-muted/30">
                <div className="container mx-auto px-4 py-12 lg:py-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-foreground mb-2">5000+</div>
                            <div className="text-sm md:text-base text-muted-foreground font-bold uppercase tracking-wider">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-foreground mb-2">50+</div>
                            <div className="text-sm md:text-base text-muted-foreground font-bold uppercase tracking-wider">Partner Brands</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-foreground mb-2">7</div>
                            <div className="text-sm md:text-base text-muted-foreground font-bold uppercase tracking-wider">Provinces Covered</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-foreground mb-2">24/7</div>
                            <div className="text-sm md:text-base text-muted-foreground font-bold uppercase tracking-wider">AI Support</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
