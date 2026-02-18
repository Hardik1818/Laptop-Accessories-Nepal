"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Info, Plus, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";

export function HeroBanner() {
    const { settings, loading } = useSettings();

    // Default values if not set
    const title = settings?.hero_title || "LAPTOP ACCESSORIES NEPAL";
    const subtitle = settings?.hero_subtitle || "Elevate your workspace with the capital's premium selection of professional gear. Original batteries, keyboards, and ergonomic essentials.";
    const image = settings?.hero_banner || "/services/repair_center.jpg";

    const renderTitle = (text: string) => {
        if (text.includes("LAPTOP ACCESSORIES NEPAL")) {
            return (
                <>
                    LAPTOP <br />
                    ACCESSORIES <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-accent">
                        NEPAL
                    </span>
                </>
            );
        }
        return text;
    };

    if (loading) return <div className="h-[90vh] w-full bg-slate-950 animate-pulse" />;


    return (
        <div className="relative w-full pt-12 pb-20 md:py-32 overflow-hidden bg-background">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

            {/* Glowing Orbs for Depth */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-10 lg:grid-cols-2 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
                        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs md:text-sm text-primary backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2.5 animate-pulse"></span>
                            Restocked & Ready
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.9] uppercase animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                                {renderTitle(title)}
                            </h1>

                            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 px-4 md:px-0">
                                {subtitle}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full h-14 px-10 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-black tracking-tight shadow-xl transition-all hover:scale-105 active:scale-95 text-base shadow-primary/20 group">
                                    SHOP NOW <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/about" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full h-14 px-8 rounded-2xl border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-base backdrop-blur-md">
                                    DISCOVER MORE
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 text-xs md:text-sm text-slate-500 animate-in fade-in duration-1000 delay-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-9 w-9 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-white">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" className="h-full w-full rounded-full" />
                                    </div>
                                ))}
                            </div>
                            <p>Join <span className="text-slate-300 font-bold">5,000+</span> satisfied customers in Nepal</p>
                        </div>
                    </div>

                    {/* Right Column: Visual Showcase */}
                    <div className="relative mx-auto w-full max-w-[450px] lg:max-w-none px-4 md:px-0">
                        {/* Glow Behind Image */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[2.5rem] blur-2xl opacity-40 animate-pulse" />

                        <div className="relative rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-2xl ring-1 ring-border aspect-[4/5] sm:aspect-[16/11]">
                            <Image
                                src={image}
                                alt="Laptop Accessories Nepal Store"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                priority
                            />
                        </div>

                        {/* Mobile Floating Indicator */}
                        <div className="sm:hidden absolute -bottom-2 -right-2 bg-primary p-3 rounded-2xl shadow-xl text-primary-foreground font-bold text-xs ring-4 ring-slate-950 animate-bounce">
                            Top Rated ⭐️
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
