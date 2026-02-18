"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X, Laptop, ChevronDown, Home as HomeIcon, Info, Wrench } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
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
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/adminlogin");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const { settings } = useSettings();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

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
                "sticky top-0 z-[200] w-full transition-all duration-300 border-b border-border/40",
                scrolled
                    ? "bg-background/80 backdrop-blur-md py-0 shadow-sm support-[backdrop-filter]:bg-background/60"
                    : "bg-transparent border-transparent py-2"
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

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
                            <div className="flex items-center gap-6 text-sm font-bold tracking-widest uppercase">
                                {/* SHOP with Mega Menu */}
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                                >
                                    <button className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors py-2 font-medium">
                                        Shop
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>

                                <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors relative group py-2 font-medium">
                                    About
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                                </Link>
                                <Link href="/contact" className="text-foreground/80 hover:text-primary transition-colors relative group py-2 font-medium">
                                    Contact
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                                </Link>
                                <Link href="/services" className="text-foreground/80 hover:text-primary transition-colors relative group py-2 font-medium">
                                    Services
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                                </Link>
                            </div>

                            {/* Search */}
                            <form onSubmit={handleSearch} className="relative group max-w-xs w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 h-9 bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 focus:ring-1 focus:ring-primary/20 rounded-full transition-all text-xs text-foreground placeholder:text-muted-foreground"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search Icon (Mobile) */}
                            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 text-muted-foreground hover:text-primary hover:bg-muted/10 rounded-full" onClick={() => setIsMenuOpen(true)}>
                                <Search className="h-5 w-5" />
                            </Button>

                            {/* Services (Replaces Cart) */}
                            <Link href="/services" className="relative group p-2 hover:bg-muted/10 rounded-full transition-colors" aria-label="Services">
                                <Wrench className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-full"
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
                            className="absolute top-full left-0 w-full bg-background/98 backdrop-blur-xl border-b border-border shadow-2xl z-[250]"
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
                                                <div className="text-primary group-hover:text-primary/80 transition-colors">
                                                    {getIcon(category.icon)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">
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
                                                            className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                    {category.subcategories.length > 6 && (
                                                        <Link
                                                            href={`/categories/${category.slug}`}
                                                            className="block text-sm text-primary hover:text-primary/80 transition-colors py-1 font-semibold"
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
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                        <div className="absolute left-0 top-0 h-full w-80 bg-background border-r border-border overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <h2 className="text-lg font-bold text-foreground">Menu</h2>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-muted/10 rounded-lg">
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="p-4 border-b border-border">
                                <form onSubmit={handleSearch} className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products..."
                                        className="pl-10 bg-muted/20 border-input text-foreground placeholder:text-muted-foreground"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </form>
                            </div>

                            {/* Navigation */}
                            <div className="p-4 space-y-2">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <HomeIcon className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-foreground">Home</span>
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
                                                <div className="text-primary">
                                                    {getIcon(category.icon)}
                                                </div>
                                                <span className="font-semibold text-foreground">{category.name}</span>
                                            </Link>
                                            {category.subcategories && category.subcategories.length > 0 && (
                                                <div className="ml-11 space-y-1">
                                                    {category.subcategories.slice(0, 5).map((sub) => (
                                                        <Link
                                                            key={sub.id}
                                                            href={`/categories/${sub.slug}`}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="block text-sm text-muted-foreground hover:text-primary p-2 rounded-lg hover:bg-muted/10 transition-colors"
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
                                <div className="pt-4 space-y-2 border-t border-border/50">
                                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-lg hover:bg-muted/10 transition-colors text-foreground font-semibold">
                                        About
                                    </Link>
                                    <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-lg hover:bg-muted/10 transition-colors text-foreground font-semibold">
                                        Contact
                                    </Link>
                                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-lg hover:bg-muted/10 transition-colors text-foreground font-semibold">
                                        Services
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Navigation (Mobile) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-around py-3 px-4">
                    <Link href="/" className="flex flex-col items-center gap-1 p-1 min-w-[60px] group">
                        <HomeIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-muted-foreground group-hover:text-primary font-medium transition-colors">Home</span>
                    </Link>
                    <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-1 p-1 min-w-[60px] group">
                        <Menu className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-muted-foreground group-hover:text-primary font-medium transition-colors">Menu</span>
                    </button>
                    <Link href="/cart" className="flex flex-col items-center justify-center -mt-6">
                        <div className="relative h-12 w-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 border-4 border-background group hover:scale-105 transition-transform">
                            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-background shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                    <Link href="/shop" className="flex flex-col items-center gap-1 p-1 min-w-[60px] group">
                        <Laptop className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-muted-foreground group-hover:text-primary font-medium transition-colors">Shop</span>
                    </Link>
                    <Link href="/about" className="flex flex-col items-center gap-1 p-1 min-w-[60px] group">
                        <Info className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-muted-foreground group-hover:text-primary font-medium transition-colors">About</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
