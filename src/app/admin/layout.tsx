"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { logoutAction } from "./actions";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, Laptop, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await logoutAction();
    };

    // If on the login page itself, just render children without sidebar
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="md:p-8 p-6">
                <div className="flex items-center gap-3 group px-2">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/50 transition-transform group-hover:scale-110">
                        <Laptop className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            LAN ADMIN
                        </h1>
                        <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Workspace</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                    return (
                        <Button
                            key={item.name}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start h-11 px-4 transition-all duration-200 group relative",
                                isActive
                                    ? "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            )}
                            asChild
                        >
                            <a href={item.href}>
                                <item.icon className={cn(
                                    "mr-3 h-5 w-5 transition-colors",
                                    isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                                )} />
                                <span className="font-medium">{item.name}</span>
                                {isActive && (
                                    <div className="absolute right-0 top-2 bottom-2 w-1 bg-blue-600 rounded-l-full shadow-[0_0_12px_rgba(37,99,235,0.5)]" />
                                )}
                            </a>
                        </Button>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="rounded-xl bg-slate-950/50 border border-slate-800 p-4 mb-4">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">System Status</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-slate-300">Live & Secure</span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-colors h-11 px-4"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                </Button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-100">
            {/* Background Decorative Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/5 blur-[120px]" />
            </div>

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 hidden md:flex flex-col sticky top-0 h-screen z-20">
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10 flex flex-col min-h-screen overflow-x-hidden">
                {/* Mobile Header */}
                <header className="md:hidden h-16 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl flex items-center px-4 fixed top-0 left-0 right-0 z-30 justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-600 rounded-md">
                            <Laptop className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-white tracking-tight">LAN ADMIN</span>
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-400">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 bg-[#020617] border-slate-800 text-slate-100 w-72 h-full z-[100]">
                            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                </header>

                <div className="max-w-[1600px] mx-auto p-4 pt-20 md:p-8 flex-1 w-full">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
