"use client";

import { useSettings } from "@/context/SettingsContext";

export function Footer() {
    const { settings } = useSettings();
    const storeName = settings.store_name || "Laptop Accessories Nepal";

    return (
        <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-lg">{storeName}</h3>
                    <p className="text-sm text-slate-500">
                        Premium quality tech gear delivered to your door.
                    </p>
                </div>

                <div className="flex gap-6 text-sm text-slate-500">
                    <a href="#" className="hover:text-slate-900 dark:hover:text-slate-50">Support</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-slate-50">Policy</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-slate-50">Contact</a>
                </div>

                <div className="text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
