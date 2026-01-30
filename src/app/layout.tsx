import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laptop Accessories Nepal",
  description: "Premium tech accessories for your workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-[#0e0e0e] text-slate-100 min-h-screen flex flex-col`}>
        <SettingsProvider>
          <CartProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
            <Toaster position="bottom-right" theme="dark" richColors />
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
