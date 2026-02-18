"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu, X, Laptop, Wrench } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const { settings } = useSettings();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const storeName = settings.store_name || "Laptop Accessories Nepal";
    const nameParts = storeName.split(' ');
    const firstPart = nameParts[0];
    const restParts = nameParts.slice(1).join(' ');

    return (
        <nav className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300 border-b",
            scrolled
                ? "bg-background/80 backdrop-blur-xl border-border py-0 shadow-sm"
                : "bg-transparent border-transparent py-2 px-2"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-12 items-center justify-between gap-4 md:gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {settings.site_logo ? (
                            <div className="relative h-8 w-8 group-hover:rotate-6 transition-transform duration-300">
                                <Image src={settings.site_logo} alt="Logo" fill className="object-contain" />
                            </div>
                        ) : (
                            <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-primary group-hover:rotate-6 transition-transform duration-300">
                                <Laptop className="h-5 w-5 text-primary-foreground" />
                            </div>
                        )}
                        <div className="flex flex-col -space-y-0.5">
                            <span className="text-lg font-black tracking-tighter text-primary uppercase leading-none">
                                {firstPart}
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                {restParts}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links & Search */}
                    <div className="hidden md:flex flex-1 items-center justify-center gap-8">
                        <div className="flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
                            <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors relative group">
                                Shop
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors relative group">
                                About
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors relative group">
                                Contact
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors relative group">
                                Services
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        </div>

                        {/* Integrated Search */}
                        <div className="relative group max-w-xs w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 h-9 bg-muted/50 border-input focus:bg-background focus:border-primary/50 rounded-full transition-all text-xs text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/services" className="relative group p-1.5 hover:bg-muted/50 rounded-full transition-colors" aria-label="Services">
                            <Wrench className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>

                        <Link href="/adminlogin">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden h-8 w-8 text-foreground hover:bg-muted/10 rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Smooth Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-background border-b border-border"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-12 h-12 bg-muted/50 border-input rounded-xl text-foreground text-sm"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all">
                                    Store
                                </Link>
                                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all">
                                    About
                                </Link>
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all">
                                    Contact
                                </Link>
                                <Link href="/services" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all">
                                    Services (Repair/Sell)
                                </Link>
                                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg transition-all">
                                    Cart ({cartCount})
                                </Link>
                            </div>

                            {/* Extra Options */}
                            <div className="flex items-center justify-between px-2 pt-4 border-t border-white/5">
                                <span className="text-xs font-medium text-slate-500">Settings</span>
                                <div className="flex gap-2 text-xs font-bold text-slate-400">
                                    <span>EN / NPR</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
