"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench, MonitorSmartphone, Cpu, Recycle, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">

            {/* Hero Section */}
            <div className="relative py-16 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-600/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
                        Beyond Selling
                    </span>
                    <h1 className="text-3xl md:text-6xl font-black text-white tracking-tight mb-4 md:mb-6 leading-tight">
                        Expert Repairs & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Component Buyback</span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
                        We don't just sell gear; we keep your workstation running.
                        From motherboard repairs to buying your old parts, we offer trusted hands-on services at our Nacche Galli store.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 space-y-12 md:space-y-20 -mt-8 relative z-20">

                {/* Service 1: Repair Center */}
                <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 lg:opacity-10 pointer-events-none">
                        <Wrench className="w-32 h-32 md:w-64 md:h-64 text-white" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/30">
                                    <MonitorSmartphone className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Repair Center</h2>
                            </div>

                            <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-8">
                                Is your laptop running slow, overheating, or not turning on? Our expert technicians typically diagnose issues within 24 hours. We specialize in chip-level repairs for all major brands.
                            </p>

                            <ul className="space-y-3 md:space-y-4 mb-8">
                                {[
                                    "Chip-level Motherboard Repair",
                                    "Broken Screen Replacement",
                                    "Keyboard & Battery Replacement",
                                    "Hinge & Body Fabrication",
                                    "SSD & RAM Upgrades",
                                    "Thermal Paste & Dust Cleaning"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-400 text-sm md:text-base">
                                        <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-6 mb-8">
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    Pricing Policy
                                </h4>
                                <p className="text-xs md:text-sm text-slate-300">
                                    We do not provide exact repair quotes online or over the phone. Every device must be physically inspected at our store first. Diagnosis is free if you choose to proceed with the repair.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full sm:w-auto">
                                <Button size="lg" className="rounded-xl px-8 bg-white text-slate-950 hover:bg-slate-200 font-bold w-full sm:w-auto">
                                    Visit Store for Diagnosis
                                </Button>
                            </Link>
                        </div>

                        {/* Visual Side */}
                        <div className="relative h-64 md:h-[400px] w-full bg-slate-800 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src="/services/repair_center.jpg"
                                alt="Laptop Repair at LAN"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Service 2: Buyback Program */}
                <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 lg:opacity-10 pointer-events-none">
                        <Recycle className="w-32 h-32 md:w-64 md:h-64 text-green-500" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Visual Side (Left on desktop) */}
                        <div className="relative h-64 md:h-[400px] w-full bg-slate-800 rounded-2xl overflow-hidden border border-white/10 shadow-2xl order-2 lg:order-1">
                            <Image
                                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000"
                                alt="Computer Parts"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-green-600/20 border border-green-500/30">
                                    <Cpu className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Sell Your Components</h2>
                            </div>

                            <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-8">
                                Have an old laptop lying around? Or spare RAM/SSD after an upgrade? We buy used working components and even dead laptops for parts. Turn your e-waste into instant cash.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-bold text-white mb-1 text-sm md:text-base">What we buy</h4>
                                    <p className="text-xs md:text-sm text-slate-400">Laptops (Working/Dead), RAM, SSD, HDD, Monitors, Graphics Cards.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-bold text-white mb-1 text-sm md:text-base">Condition</h4>
                                    <p className="text-xs md:text-sm text-slate-400">Must be non-stolen. We require ID proof for all buyback transactions.</p>
                                </div>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-xl p-6 mb-8">
                                <h4 className="font-bold text-yellow-500 mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <MapPin className="w-4 h-4" />
                                    Valuation Process
                                </h4>
                                <p className="text-xs md:text-sm text-slate-300">
                                    We cannot give a price estimate online. Please bring your device to our store. We will inspect it physically for 10-15 minutes and give you a final cash offer immediately.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="rounded-xl px-8 border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white font-bold w-full sm:w-auto">
                                    Location & Timing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
