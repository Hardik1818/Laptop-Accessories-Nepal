"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide Footer on admin routes
    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <>
            <main className="flex-1 w-full relative pb-16 lg:pb-0">
                {children}
                {!isAdminRoute && <ChatWidget />}
            </main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
