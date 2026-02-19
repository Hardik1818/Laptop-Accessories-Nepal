"use client";

import { useSettings } from "@/context/SettingsContext";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Pin, Banknote, Landmark, Linkedin } from "lucide-react";

export function Footer() {
    const { settings } = useSettings();
    const storeName = settings.store_name || "Laptop Accessories Nepal";

    return (
        <footer className="border-t border-border bg-background pt-6 pb-28 lg:pb-8 mt-auto">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-8 text-center md:text-left">

                    {/* Brand Section */}
                    <div className="space-y-6 lg:pr-8 text-center flex flex-col items-center">
                        <div>
                            <h3 className="font-black text-2xl text-primary tracking-tighter uppercase italic">{storeName}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto font-medium mt-2">
                                Premium tech gear and expert repair services in Kathmandu.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex justify-center gap-3">
                                <a href={settings.facebook_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a href={settings.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href={settings.tiktok_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                                    </svg>
                                </a>
                                <a href={settings.youtube_url || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                    <Youtube className="w-4 h-4" />
                                </a>
                                {settings.twitter_url && (
                                    <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                )}
                                {settings.pinterest_url && (
                                    <a href={settings.pinterest_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                        <Pin className="w-4 h-4" />
                                    </a>
                                )}
                                {settings.linkedin_url && (
                                    <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}
                            </div>

                            {/* Payment Methods - Aligned with icons */}
                            <div className="flex flex-wrap items-center justify-center gap-2 opacity-80">
                                <div className="h-6 px-2 bg-green-500/10 border border-green-500/20 rounded flex items-center justify-center">
                                    <span className="text-[9px] font-black text-green-600 uppercase tracking-tighter">eSewa</span>
                                </div>
                                <div className="h-6 px-2 bg-purple-500/10 border border-purple-500/20 rounded flex items-center justify-center">
                                    <span className="text-[9px] font-black text-purple-600 uppercase tracking-tighter">Khalti</span>
                                </div>
                                <div className="h-6 px-2 bg-slate-100 border border-slate-200 rounded flex items-center justify-center gap-1.5">
                                    <Banknote className="w-3 h-3 text-slate-700" />
                                    <span className="text-[8px] font-black text-slate-700 uppercase tracking-tighter">COD</span>
                                </div>
                                <div className="h-6 px-2 bg-slate-100 border border-slate-200 rounded flex items-center justify-center gap-1.5">
                                    <Landmark className="w-3 h-3 text-slate-700" />
                                    <span className="text-[8px] font-black text-slate-700 uppercase tracking-tighter">Bank</span>
                                </div>
                            </div>
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
