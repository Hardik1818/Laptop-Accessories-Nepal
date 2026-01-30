"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Home,
    ShoppingBag,
    LayoutGrid,
    Monitor,
    Keyboard,
    Mouse,
    Settings,
    Info,
    Phone,
    Heart
} from "lucide-react";

const SIDEBAR_ITEMS = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ShoppingBag, label: "Shop All", href: "/shop" },
    { icon: Heart, label: "Favorites", href: "/favorites" }, // Placeholder for now
];

const CATEGORIES = [
    { icon: LayoutGrid, label: "All Categories", href: "/shop" },
    { icon: Monitor, label: "Monitors", href: "/shop?cat=monitors" },
    { icon: Keyboard, label: "Keyboards", href: "/shop?cat=keyboards" },
    { icon: Mouse, label: "Mice", href: "/shop?cat=mice" },
];

const INFO_LINKS = [
    { icon: Info, label: "About Us", href: "/about" },
    { icon: Phone, label: "Contact", href: "/contact" },
    { icon: Settings, label: "Admin Panel", href: "/admin" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 z-50 bg-[#0a0a0a] border-r border-white/10 text-slate-300">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    StreamStore
                </span>
            </div>

            <ScrollArea className="flex-1 px-4">
                <div className="space-y-6 pb-6">

                    {/* Main Menu */}
                    <div>
                        <div className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Menu
                        </div>
                        <div className="space-y-1">
                            {SIDEBAR_ITEMS.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-3 h-11 rounded-xl transition-all duration-200",
                                            pathname === item.href
                                                ? "bg-white/10 text-white font-medium"
                                                : "hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Categories */}
                    <div>
                        <div className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Categories
                        </div>
                        <div className="space-y-1">
                            {CATEGORIES.map((item) => (
                                <Link key={item.label} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-3 h-10 rounded-xl text-slate-400",
                                            pathname === item.href
                                                ? "bg-white/10 text-white"
                                                : "hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Library / Info */}
                    <div>
                        <div className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Library
                        </div>
                        <div className="space-y-1">
                            {INFO_LINKS.map((item) => (
                                <Link key={item.label} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-3 h-10 rounded-xl text-slate-400",
                                            pathname === item.href
                                                ? "bg-white/10 text-white"
                                                : "hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </ScrollArea>

            {/* User Profile / Footer Mock */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                        U
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">Guest User</p>
                        <p className="text-xs text-slate-500">View Profile</p>
                    </div>
                    <Settings className="h-4 w-4 text-slate-500" />
                </div>
            </div>
        </div>
    );
}
