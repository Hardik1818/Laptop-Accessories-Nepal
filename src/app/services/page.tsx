"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench, MonitorSmartphone, Cpu, Recycle, ShieldCheck, Clock, MapPin, GraduationCap, Briefcase, BadgeCheck, Headset } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20">

            {/* Hero Section */}
            <div className="relative py-16 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-amber-500/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
                        Beyond Selling
                    </span>
                    <h1 className="text-3xl md:text-6xl font-black text-foreground tracking-tight mb-4 md:mb-6 leading-tight">
                        Expert Repairs & <br />
                        <span className="text-gradient-premium">Component Buyback</span>
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 font-medium">
                        We don't just sell gear; we keep your workstation running.
                        From motherboard repairs to buying your old parts, we offer trusted hands-on services.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 space-y-12 md:space-y-20 -mt-8 relative z-20">

                {/* Service 1: Repair Center */}
                <div className="bg-card border border-border rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden relative group hover:shadow-primary/5 transition-shadow duration-500">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Wrench className="w-32 h-32 md:w-64 md:h-64 text-foreground" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-orange-100 border border-orange-200">
                                    <MonitorSmartphone className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Repair Center</h2>
                            </div>

                            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-8 font-medium">
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
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm md:text-base font-medium">
                                        <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <Clock className="w-4 h-4 text-primary" />
                                    Pricing Policy
                                </h4>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    We do not provide exact repair quotes online or over the phone. Every device must be physically inspected at our store first. Diagnosis is free if you choose to proceed with the repair.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full sm:w-auto">
                                <Button size="lg" className="rounded-xl px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold w-full sm:w-auto transition-transform hover:scale-105">
                                    Visit Store for Diagnosis
                                </Button>
                            </Link>
                        </div>

                        {/* Visual Side */}
                        <div className="relative h-64 md:h-[400px] w-full bg-muted rounded-2xl overflow-hidden border border-border shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                            <Image
                                src="/services/repair_center.jpg"
                                alt="Laptop Repair at LAN"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                                Expert Hands. Genuine Parts.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service 2: Buyback Program */}
                <div className="bg-card border border-border rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden relative group hover:shadow-green-500/5 transition-shadow duration-500">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Recycle className="w-32 h-32 md:w-64 md:h-64 text-green-600" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Visual Side (Left on desktop) */}
                        <div className="relative h-64 md:h-[400px] w-full bg-muted rounded-2xl overflow-hidden border border-border shadow-inner order-2 lg:order-1 group-hover:scale-[1.02] transition-transform duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000"
                                alt="Computer Parts"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                                Turn Old Gear Into Cash.
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-green-100 border border-green-200">
                                    <Cpu className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Sell Your Components</h2>
                            </div>

                            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-8 font-medium">
                                Have an old laptop lying around? Or spare RAM/SSD after an upgrade? We buy used working components and even dead laptops for parts. Turn your e-waste into instant cash.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                <div className="bg-muted/50 p-4 rounded-xl border border-border hover:bg-background transition-colors">
                                    <h4 className="font-bold text-foreground mb-1 text-sm md:text-base">What we buy</h4>
                                    <p className="text-xs md:text-sm text-muted-foreground font-medium">Laptops (Working/Dead), RAM, SSD, HDD, Monitors, Graphics Cards.</p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-xl border border-border hover:bg-background transition-colors">
                                    <h4 className="font-bold text-foreground mb-1 text-sm md:text-base">Condition</h4>
                                    <p className="text-xs md:text-sm text-muted-foreground font-medium">Must be non-stolen. We require ID proof for all buyback transactions.</p>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                                <h4 className="font-bold text-amber-700 mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <MapPin className="w-4 h-4" />
                                    Valuation Process
                                </h4>
                                <p className="text-xs md:text-sm text-amber-900/80 font-medium">
                                    We cannot give a price estimate online. Please bring your device to our store. We will inspect it physically for 10-15 minutes and give you a final cash offer immediately.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="rounded-xl px-8 border-input text-foreground hover:bg-accent hover:text-accent-foreground font-bold w-full sm:w-auto transition-transform hover:scale-105">
                                    Location & Timing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Service 3: AMC (Annual Maintenance Contract) */}
                <div className="bg-card border border-border rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden relative group hover:shadow-blue-500/5 transition-shadow duration-500">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Briefcase className="w-32 h-32 md:w-64 md:h-64 text-blue-600" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-blue-100 border border-blue-200">
                                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Annual Maintenance (AMC)</h2>
                            </div>

                            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-8 font-medium">
                                Keep your business running without interruptions. We offer comprehensive Annual Maintenance Contracts (AMC) for corporate offices, schools, and institutions. Get priority support and regular checkups for your entire IT infrastructure.
                            </p>

                            <ul className="space-y-3 md:space-y-4 mb-8">
                                {[
                                    "Priority On-site Support",
                                    "Regular Preventive Maintenance",
                                    "Unlimited Remote Helpdesk",
                                    "Software & Network Troubleshooting",
                                    "Data Backup & Security Audits",
                                    "Standby Device during Major Repairs"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm md:text-base font-medium">
                                        <BadgeCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 group-hover:bg-blue-100/50 transition-colors">
                                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <Headset className="w-4 h-4" />
                                    Why Choose Our AMC?
                                </h4>
                                <p className="text-xs md:text-sm text-blue-900/80 font-medium">
                                    Downtime costs money. With our AMC, you get a dedicated support team that prevents issues before they disrupt your work. We cover laptops, desktops, printers, and networking gear.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full sm:w-auto">
                                <Button size="lg" className="rounded-xl px-8 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 font-bold w-full sm:w-auto transition-transform hover:scale-105">
                                    Request a Proposal
                                </Button>
                            </Link>
                        </div>

                        {/* Visual Side */}
                        <div className="relative h-64 md:h-[400px] w-full bg-muted rounded-2xl overflow-hidden border border-border shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1000"
                                alt="IT Annual Maintenance Contract"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                                Zero Downtime. Maximum Productivity.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service 4: Training Program */}
                <div className="bg-card border border-border rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden relative group hover:shadow-primary/5 transition-shadow duration-500">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <GraduationCap className="w-32 h-32 md:w-64 md:h-64 text-foreground" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                                    <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Advanced Training</h2>
                            </div>

                            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-8 font-medium">
                                Master the art of laptop repair with our professional training programs. From basic troubleshooting to advanced chip-level micro-soldering, learn from industry experts in a hands-on environment.
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-1 bg-primary rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm md:text-base">Chip-Level Repairing</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">Advanced schematics reading, multi-meter usage, and BGA reballing techniques.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-1 bg-primary rounded-full opacity-60" />
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm md:text-base">Advance Level Training</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">Comprehensive diagnosis for power issues, BIOS programming, and liquid damage recovery.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-1 bg-primary rounded-full opacity-30" />
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm md:text-base">Laptop Basics & Assembly</h4>
                                        <p className="text-xs md:text-sm text-muted-foreground">Safe disassembly, component identification, and hardware troubleshooting for beginners.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
                                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                                    <span className="text-primary font-bold">Enrollment:</span> New batches start every month. Limited seats per batch to ensure individual attention.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full sm:w-auto">
                                <Button size="lg" className="rounded-xl px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold w-full sm:w-auto transition-transform hover:scale-105">
                                    Inquire About Batches
                                </Button>
                            </Link>
                        </div>

                        {/* Visual Side */}
                        <div className="relative h-64 md:h-[400px] w-full bg-muted rounded-2xl overflow-hidden border border-border shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=1000"
                                alt="Laptop Repair Training"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                                Learn from the Best.
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
