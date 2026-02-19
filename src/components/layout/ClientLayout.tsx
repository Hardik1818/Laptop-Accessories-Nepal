"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide Footer on admin routes
    const isAdminRoute = pathname.startsWith("/adminlogin");

    return (
        <>
            <main className="flex-1 w-full relative pb-28 lg:pb-0">
                {children}
                {!isAdminRoute && (
                    <>
                        <ChatWidget />
                        <WhatsAppButton />
                    </>
                )}
            </main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
