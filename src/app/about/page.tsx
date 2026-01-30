"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Target, Zap, Users, Globe } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function AboutPage() {
    const { settings } = useSettings();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-8 md:py-20 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left flex-1 max-w-2xl order-2 lg:order-1">
                        {/* ... (keep text content same) ... */}
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 md:mb-6 leading-tight">
                            Empowering Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Digital Lifestyle
                            </span>
                        </h1>
                        <p className="text-sm md:text-lg text-slate-400 leading-relaxed mb-6 md:mb-8 mx-auto lg:mx-0 max-w-lg">
                            Laptop Accessories Nepal (LAN) is your destination for elite tech essentials. We operate at the intersection of performance, aesthetics, and accessibility.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 h-10 md:h-12 w-full sm:w-auto font-bold text-sm md:text-base shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                    Explore Store
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image - Smaller & Tighter */}
                    <div className="relative order-1 lg:order-2 flex-shrink-0 w-full max-w-[300px] md:max-w-[400px]">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] opacity-20 blur-2xl" />
                        <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
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
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors h-full">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                            <Target className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            To bridge the gap between global tech innovations and the Nepali market, providing authentic gear at fair prices.
                        </p>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors h-full">
                        <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="h-6 w-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">The Speed</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            We hate waiting too. That's why we offer same-day delivery inside the Ring Road and rapid dispatch nationwide.
                        </p>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors h-full">
                        <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">The Community</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            More than a store, we are a collective of creators, developers, and gamers building the future of Nepal.
                        </p>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="container mx-auto px-4 py-12 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 blur-xl" />
                        <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src={settings.about_story || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"}
                                alt="Team working together"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-6 order-1 lg:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">From a Backpack to a Brand</h2>
                        <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                            Founded in 2024, LAN started with a simple observation: finding high-quality, specific laptop accessories in Kathmandu was a treasure hunt. You had to visit ten shops just to find one decent sleeve or original adapter.
                        </p>
                        <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                            We decided to change that. By curating a catalog of the best brands like Keychron, Logitech, and Apple, and offering a seamless online shopping experience with local payments, we made upgrading your setup effortless.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[
                                "100% Authentic Products",
                                "Official Warranty Support",
                                "Easy Returns Policy",
                                "Expert Tech Support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">5000+</div>
                            <div className="text-sm md:text-base text-slate-500">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                            <div className="text-sm md:text-base text-slate-500">Partner Brands</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">7</div>
                            <div className="text-sm md:text-base text-slate-500">Provinces Covered</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-sm md:text-base text-slate-500">AI Support</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
