"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide Navbar/Footer on admin routes
    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && <Navbar />}
            <main className="flex-1 w-full relative">
                {children}
                {!isAdminRoute && <ChatWidget />}
            </main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
