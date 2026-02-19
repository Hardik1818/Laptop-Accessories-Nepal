"use client";

import { useSettings } from "@/context/SettingsContext";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    const { settings } = useSettings();
    const storeName = settings.store_name || "Laptop Accessories Nepal";

    return (
        <footer className="border-t border-border bg-background pt-6 pb-28 lg:pb-8 mt-auto">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-8 text-center md:text-left">

                    {/* Brand Section */}
                    <div className="space-y-3 lg:pr-8">
                        <h3 className="font-black text-2xl text-primary tracking-tighter uppercase italic">{storeName}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
                            Premium tech gear and expert repair services in Kathmandu.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            {settings.facebook_url && (
                                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <Facebook className="w-4 h-4" />
                                </a>
                            )}
                            {settings.twitter_url && (
                                <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            )}
                            {settings.instagram_url && (
                                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            )}
                            {settings.youtube_url && (
                                <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <Youtube className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Links Wrapper for Mobile Side-by-Side */}
                    <div className="grid grid-cols-2 gap-4 md:contents">
                        {/* Shop Links */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground opacity-50">Store</h4>
                            <nav className="flex flex-col gap-2 text-sm text-muted-foreground font-semibold">
                                <Link href="/shop" className="hover:text-primary transition-colors">New Arrivals</Link>
                                <Link href="/shop" className="hover:text-primary transition-colors">All Products</Link>
                                <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                            </nav>
                        </div>

                        {/* Information Links */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground opacity-50">Company</h4>
                            <nav className="flex flex-col gap-2 text-sm text-muted-foreground font-semibold">
                                <Link href="/about" className="hover:text-primary transition-colors">Our Story</Link>
                                <Link href="/policy" className="hover:text-primary transition-colors">Privacy</Link>
                                <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                            </nav>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-3 border-t md:border-none border-border/50 pt-6 md:pt-0">
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground opacity-50">Connect</h4>
                        <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground items-center md:items-start font-semibold">
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-primary" />
                                {settings.contact_phone || "+977 1234567890"}
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-primary" />
                                contact@laptopnepal.com
                            </li>
                            <li className="flex items-center gap-2.5">
                                <MapPin className="w-4 h-4 text-primary" />
                                Kathmandu, Nepal
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-5 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60 uppercase tracking-[0.15em] font-bold">
                    <p>&copy; {new Date().getFullYear()} {storeName}</p>
                    <div className="flex gap-6">
                        <Link href="/policy" className="hover:text-primary">Policy</Link>
                        <Link href="/terms" className="hover:text-primary">Terms</Link>
                        <Link href="/blog" className="hover:text-primary">Blog</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
