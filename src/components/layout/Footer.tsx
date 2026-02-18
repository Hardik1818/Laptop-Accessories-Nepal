"use client";

import { useSettings } from "@/context/SettingsContext";

export function Footer() {
    const { settings } = useSettings();
    const storeName = settings.store_name || "Laptop Accessories Nepal";

    return (
        <footer className="border-t border-border bg-background py-8">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-lg text-foreground">{storeName}</h3>
                    <p className="text-sm text-muted-foreground">
                        Premium quality tech gear delivered to your door.
                    </p>
                </div>

                <div className="flex gap-6 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                    <a href="#" className="hover:text-primary transition-colors">Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>

                <div className="text-xs text-muted-foreground/80">
                    &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
