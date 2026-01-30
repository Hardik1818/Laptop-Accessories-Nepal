"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu, X, Laptop } from "lucide-react";
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
                ? "bg-slate-950/80 backdrop-blur-xl border-white/10 py-0"
                : "bg-transparent border-transparent py-2"
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
                            <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600 group-hover:rotate-6 transition-transform duration-300">
                                <Laptop className="h-5 w-5 text-white" />
                            </div>
                        )}
                        <div className="flex flex-col -space-y-0.5">
                            <span className="text-lg font-black tracking-tighter text-blue-500 uppercase leading-none">
                                {firstPart}
                            </span>
                            <span className="hidden sm:inline-block text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                                {restParts}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links & Search */}
                    <div className="hidden md:flex flex-1 items-center justify-center gap-8">
                        <div className="flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
                            <Link href="/shop" className="text-slate-400 hover:text-white transition-colors relative group">
                                Shop
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </Link>
                            <Link href="/about" className="text-slate-400 hover:text-white transition-colors relative group">
                                About
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </Link>
                            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors relative group">
                                Contact
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </Link>
                            <Link href="/services" className="text-slate-400 hover:text-white transition-colors relative group">
                                Services
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </Link>
                        </div>

                        {/* Integrated Search */}
                        <div className="relative group max-w-xs w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 h-9 bg-white/5 border-white/5 focus:bg-white/10 focus:border-blue-500/50 rounded-full transition-all text-xs text-white placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/cart" className="relative group p-1.5 hover:bg-white/5 rounded-full transition-colors">
                            <ShoppingCart className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0 -right-0 h-3.5 w-3.5 bg-white text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/admin">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-white hover:bg-white/5 rounded-full">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden h-8 w-8 text-white hover:bg-white/5 rounded-full"
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
                        className="md:hidden overflow-hidden bg-slate-950 border-b border-white/10"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-12 h-12 bg-white/5 border-white/10 rounded-xl text-white text-sm"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                    Store
                                </Link>
                                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                    About
                                </Link>
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                    Contact
                                </Link>
                                <Link href="/services" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                    Services (Repair/Sell)
                                </Link>
                                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between py-3 px-2 text-sm font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all">
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
