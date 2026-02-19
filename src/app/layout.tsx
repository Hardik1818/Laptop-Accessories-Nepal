import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://laptopaccessoriesnepal.com'), // Replace with actual domain
  title: {
    default: "Laptop Accessories Nepal | Premium Tech Gear",
    template: "%s | Laptop Accessories Nepal"
  },
  description: "Your destination for premium laptop accessories, mechanical keyboards, and expert repair in Kathmandu. Official distributors for Keychron, Logitech, and more.",
  keywords: ["Laptop Accessories", "Mechanical Keyboards", "Nepal", "Tech Gear", "Repair Services", "Keychron Nepal"],
  openGraph: {
    title: "Laptop Accessories Nepal",
    description: "Premium tech accessories for your workspace in Kathmandu.",
    url: 'https://laptopaccessoriesnepal.com',
    siteName: 'Laptop Accessories Nepal',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Laptop Accessories Nepal",
    description: "Premium tech accessories for your workspace.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <SettingsProvider>
          <CartProvider>
            <NavbarWrapper />
            <ClientLayout>
              {children}
            </ClientLayout>
            <Toaster position="bottom-right" theme="light" richColors />
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
