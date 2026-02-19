"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSettings } from "@/context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";

export function HeroBanner() {
    const { settings, loading } = useSettings();
    const [[page, direction], setPage] = useState([0, 0]);

    const title = settings?.hero_title || "LAPTOP ACCESSORIES NEPAL";
    const subtitle = settings?.hero_subtitle || "Elevate your workspace with the capital's premium selection of professional gear. Original batteries, keyboards, and ergonomic essentials.";

    // Dynamic Carousel Images from Settings
    const HERO_IMAGES = [
        settings?.hero_banner,
        settings?.hero_banner_2,
        settings?.hero_banner_3,
    ].filter(Boolean) as string[];

    // Fallback if no images are uploaded
    const displayImages = HERO_IMAGES.length > 0 ? HERO_IMAGES : ["/services/repair_center.jpg"];

    const currentImageIndex = Math.abs(page % displayImages.length);

    useEffect(() => {
        if (displayImages.length <= 1) return;

        const timer = setInterval(() => {
            setPage([page + 1, 1]);
        }, 5000);
        return () => clearInterval(timer);
    }, [page, displayImages.length]);

    const nextImage = useCallback(() => {
        setPage([page + 1, 1]);
    }, [page]);

    const prevImage = useCallback(() => {
        setPage([page - 1, -1]);
    }, [page]);

    const paginate = (newIndex: number) => {
        const newDir = newIndex > currentImageIndex ? 1 : -1;
        setPage([newIndex, newDir]);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 1.1
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.9
        })
    };

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

    const CarouselWidget = () => (
        <div className="relative w-full group/carousel">
            {/* Glow Behind Carousel */}
            <div className="absolute -inset-4 md:-inset-10 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] blur-3xl opacity-40 animate-pulse" />

            <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-2xl ring-1 ring-border aspect-[1.2/1] sm:aspect-[16/10] lg:aspect-[16/11]">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={displayImages[currentImageIndex]}
                            alt="Laptop Accessories Nepal Showcase"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Premium Design */}
                <div className="absolute inset-0 flex items-center justify-between px-3 md:px-6 pointer-events-none z-20">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.preventDefault(); prevImage(); }}
                        className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-black/20 hover:bg-primary text-white backdrop-blur-xl border border-white/20 hover:border-primary shadow-2xl transition-all duration-300 pointer-events-auto active:scale-90 opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100"
                    >
                        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.preventDefault(); nextImage(); }}
                        className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-black/20 hover:bg-primary text-white backdrop-blur-xl border border-white/20 hover:border-primary shadow-2xl transition-all duration-300 pointer-events-auto active:scale-90 opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100"
                    >
                        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                    </Button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {displayImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i)}
                            className={`h-2 transition-all duration-500 rounded-full border border-white/20 ${i === currentImageIndex ? "w-10 bg-primary ring-2 ring-primary/20" : "w-2.5 bg-white/40 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    if (loading) return <div className="h-[90vh] w-full bg-slate-950 animate-pulse" />;

    return (
        <div className="relative w-full pt-12 pb-20 md:py-32 overflow-hidden bg-background">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

            {/* Glowing Orbs for Depth */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-12 items-center">

                    {/* Left Column: Context & Mobile Carousel Integration */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">


                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-foreground leading-[0.9] uppercase"
                        >
                            {renderTitle(title)}
                        </motion.h1>

                        {/* MOBILE CAROUSEL: PLACED BETWEEN TITLE AND PARAGRAPH */}
                        <div className="block lg:hidden w-full py-4">
                            <CarouselWidget />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
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
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="pt-6 flex flex-col sm:flex-row items-center gap-4 text-xs md:text-sm text-slate-500"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-9 w-9 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-white">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" className="h-full w-full rounded-full" />
                                    </div>
                                ))}
                            </div>
                            <p>Join <span className="text-slate-300 font-bold">5,000+</span> satisfied customers in Nepal</p>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Showcase (Carousel) - DESKTOP ONLY */}
                    <div className="hidden lg:block lg:col-span-7 relative w-full h-full min-h-[500px]">
                        <CarouselWidget />
                    </div>

                </div>
            </div>
        </div>
    );
}
