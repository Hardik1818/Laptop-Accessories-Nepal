"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu, X, Laptop, ChevronDown, Home as HomeIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import * as Icons from "lucide-react";

interface NavbarWithMegaMenuProps {
    categories: Category[];
}

export function NavbarWithMegaMenu({ categories }: NavbarWithMegaMenuProps) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const { settings } = useSettings();

    useEffect(() => {
        if (isAdminRoute) return; // Don't run scroll logic on admin routes
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAdminRoute]);

    if (isAdminRoute) return null;

    const storeName = settings.store_name || "Laptop Accessories Nepal";
    const nameParts = storeName.split(' ');
    const firstPart = nameParts[0];
    const restParts = nameParts.slice(1).join(' ');

    const getIcon = (iconName?: string) => {
        if (!iconName) return null;
        const Icon = (Icons as any)[iconName];
        return Icon ? <Icon className="w-5 h-5" /> : null;
    };

    return (
        <>
            <nav className={cn(
                "sticky top-0 z-[200] w-full transition-all duration-300 border-b",
                scrolled
                    ? "bg-slate-950/95 backdrop-blur-xl border-white/10 py-0"
                    : "bg-slate-950/80 backdrop-blur-xl border-white/10 py-2"
            )}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex h-14 items-center justify-between gap-4 md:gap-8">

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

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
                            <div className="flex items-center gap-6 text-sm font-bold tracking-widest uppercase">
                                {/* SHOP with Mega Menu */}
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                                >
                                    <button className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors py-2">
                                        Shop
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>

                                <Link href="/about" className="text-slate-300 hover:text-white transition-colors relative group py-2">
                                    About
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                                </Link>
                                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors relative group py-2">
                                    Contact
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                                </Link>
                                <Link href="/services" className="text-slate-300 hover:text-white transition-colors relative group py-2">
                                    Services
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                                </Link>
                            </div>

                            {/* Search */}
                            <div className="relative group max-w-xs w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 h-9 bg-white/5 border-white/10 focus:bg-white/10 focus:border-blue-500/50 rounded-full transition-all text-xs text-white placeholder:text-slate-500"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search Icon (Mobile) */}
                            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 text-slate-300 hover:text-white hover:bg-white/5 rounded-full">
                                <Search className="h-5 w-5" />
                            </Button>

                            {/* Cart */}
                            <Link href="/cart" className="relative group p-2 hover:bg-white/5 rounded-full transition-colors">
                                <ShoppingCart className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User */}
                            <Link href="/admin">
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-white hover:bg-white/5 rounded-full">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden h-9 w-9 text-white hover:bg-white/5 rounded-full"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {isMegaMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full bg-slate-900/98 backdrop-blur-xl border-b border-white/10 shadow-2xl z-[250]"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <div className="container mx-auto px-4 md:px-6 py-8">
                                <div className="grid grid-cols-3 gap-8">
                                    {categories.map((category) => (
                                        <div key={category.id} className="space-y-4">
                                            {/* Category Header */}
                                            <Link
                                                href={`/categories/${category.slug}`}
                                                className="flex items-center gap-3 group"
                                            >
                                                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                                    {getIcon(category.icon)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-500">
                                                        {category.description}
                                                    </p>
                                                </div>
                                            </Link>

                                            {/* Subcategories */}
                                            {category.subcategories && category.subcategories.length > 0 && (
                                                <div className="space-y-1 pl-8">
                                                    {category.subcategories.slice(0, 6).map((sub) => (
                                                        <Link
                                                            key={sub.id}
                                                            href={`/categories/${sub.slug}`}
                                                            className="block text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                    {category.subcategories.length > 6 && (
                                                        <Link
                                                            href={`/categories/${category.slug}`}
                                                            className="block text-sm text-blue-400 hover:text-blue-300 transition-colors py-1 font-semibold"
                                                        >
                                                            View all {category.name} →
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[300] lg:hidden"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                        <div className="absolute left-0 top-0 h-full w-80 bg-slate-950 border-r border-white/10 overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <h2 className="text-lg font-bold text-white">Menu</h2>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
                                    <X className="w-5 h-5 text-slate-300" />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="p-4 border-b border-white/10">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <Input
                                        placeholder="Search products..."
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                    />
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="p-4 space-y-2">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <HomeIcon className="w-5 h-5 text-blue-400" />
                                    <span className="font-semibold text-white">Home</span>
                                </Link>

                                {/* Categories */}
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 py-2">Categories</h3>
                                    {categories.map((category) => (
                                        <div key={category.id} className="space-y-1">
                                            <Link
                                                href={`/categories/${category.slug}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                            >
                                                <div className="text-blue-400">
                                                    {getIcon(category.icon)}
                                                </div>
                                                <span className="font-semibold text-white">{category.name}</span>
                                            </Link>
                                            {category.subcategories && category.subcategories.length > 0 && (
                                                <div className="ml-11 space-y-1">
                                                    {category.subcategories.slice(0, 5).map((sub) => (
                                                        <Link
                                                            key={sub.id}
                                                            href={`/categories/${sub.slug}`}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="block text-sm text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Other Links */}
                                <div className="pt-4 space-y-2 border-t border-white/10">
                                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-lg hover:bg-white/5 transition-colors text-slate-300 font-semibold">
                                        About
                                    </Link>
                                    <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-lg hover:bg-white/5 transition-colors text-slate-300 font-semibold">
                                        Contact
                                    </Link>
                                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-lg hover:bg-white/5 transition-colors text-slate-300 font-semibold">
                                        Services
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Navigation (Mobile) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-slate-950/95 backdrop-blur-xl border-t border-white/10">
                <div className="flex items-center justify-around py-2 px-4">
                    <Link href="/" className="flex flex-col items-center gap-1 p-2 min-w-[60px]">
                        <HomeIcon className="w-5 h-5 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-semibold">Home</span>
                    </Link>
                    <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-1 p-2 min-w-[60px]">
                        <Menu className="w-5 h-5 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-semibold">Categories</span>
                    </button>
                    <Link href="/cart" className="flex flex-col items-center gap-1 p-2 min-w-[60px] relative">
                        <ShoppingCart className="w-5 h-5 text-slate-400" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-3 h-4 w-4 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-semibold">Cart</span>
                    </Link>
                    <Link href="/admin" className="flex flex-col items-center gap-1 p-2 min-w-[60px]">
                        <User className="w-5 h-5 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-semibold">Account</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
