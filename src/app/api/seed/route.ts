
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const MOCK_PRODUCTS_TO_SEED = [
    // Chargers
    {
        name: "MacBook Charger",
        category: "Chargers",
        price: 5500,
        stock: 10,
        description: "MagSafe 1 / MagSafe 2 (T-Pin or L-Pin). Estimated Price: रू 5,500 – रू 7,500",
        images: ["https://images.unsplash.com/photo-1542393545-facac7050887?q=80&w=800"], // Power brick/cable
        compatibility: "MacBook Air / Pro",
        warranty: "6 Months",
    },
    {
        name: "MacBook USB-C Adapter",
        category: "Chargers",
        price: 4500,
        stock: 10,
        description: "61W / 87W / 96W for newer models. Estimated Price: रू 4,500 – रू 12,500",
        images: ["https://images.unsplash.com/photo-1585338107529-13f953b6f122?q=80&w=800"], // Apple product/adapter vibe
        compatibility: "USB-C MacBooks",
        warranty: "6 Months",
    },
    {
        name: "HP Blue Pin Charger",
        category: "Chargers",
        price: 1200,
        stock: 15,
        description: "65W (4.5mm x 3.0mm tip). Estimated Price: रू 1,200 – रू 2,000",
        images: ["https://images.unsplash.com/photo-1619448375631-413c19e5855f?q=80&w=800"], // Generic cables/tech
        compatibility: "HP Laptops",
        warranty: "6 Months",
    },
    {
        name: "Dell Laptop Charger",
        category: "Chargers",
        price: 1500,
        stock: 15,
        description: "Standard round pin (various wattages). Estimated Price: रू 1,500 – रू 3,000",
        images: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800"], // Cables
        compatibility: "Dell Laptops",
        warranty: "6 Months",
    },
    {
        name: "Surface Charger",
        category: "Chargers",
        price: 4000,
        stock: 8,
        description: "Magnetic connector for Microsoft Surface. Estimated Price: रू 4,000 – रू 6,500",
        images: ["https://images.unsplash.com/photo-1542393545-facac7050887?q=80&w=800"], // Charger close up
        compatibility: "Microsoft Surface",
        warranty: "6 Months",
    },

    // Parts
    {
        name: "Dell Laptop Battery",
        category: "Parts",
        price: 3500,
        stock: 10,
        description: "Internal (e.g., WDX0R) or External (J1KND). Estimated Price: रू 3,500 – रू 5,500",
        images: ["https://images.unsplash.com/photo-1599580479153-61d0f5fc67d9?q=80&w=800"], // Internal electronics
        compatibility: "Dell Laptops",
        warranty: "6 Months",
    },
    {
        name: "Laptop Battery (Other)",
        category: "Parts",
        price: 2500,
        stock: 10,
        description: "HP/Acer/Asus generic replacements. Estimated Price: रू 2,500 – रू 4,500",
        images: ["https://images.unsplash.com/photo-1616845348822-263725b8a6af?q=80&w=800"], // Tech components
        compatibility: "HP, Acer, Asus",
        warranty: "6 Months",
    },
    {
        name: "Laptop Screen",
        category: "Parts",
        price: 6500,
        stock: 5,
        description: '14.0" / 15.6" Slim LED (30-pin/40-pin). Estimated Price: रू 6,500 – रू 15,000',
        images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800"], // Laptop repair/screen
        compatibility: "Universal 14/15.6 inch",
        warranty: "3 Months",
    },
    {
        name: "HDD Caddy",
        category: "Parts",
        price: 600,
        stock: 20,
        description: "9.5mm or 12.7mm (to add 2nd HDD/SSD). Estimated Price: रू 600 – रू 1,200",
        images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800"], // Hardware/SSD context
        compatibility: "Universal Laptop ODD slot",
        warranty: "1 Month",
    },

    // Accessories
    {
        name: "USB 3.0 Hub",
        category: "Accessories",
        price: 400,
        stock: 25,
        description: "4-Port high-speed splitter. Estimated Price: रू 400 – रू 1,200",
        images: ["https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=800"], // USB Hub
        compatibility: "USB-A Devices",
        warranty: "1 Month",
    },
    {
        name: "WD/Hard Drive Case",
        category: "Accessories",
        price: 500,
        stock: 20,
        description: '2.5" SATA to USB 3.0 Enclosure. Estimated Price: रू 500 – रू 1,100',
        images: ["https://images.unsplash.com/photo-1533740566848-5f7d3e0f0f7d?q=80&w=800"], // External HDD
        compatibility: '2.5" SATA HDD/SSD',
        warranty: "1 Month",
    },
    {
        name: "Wireless Mouse",
        category: "Accessories",
        price: 450,
        stock: 30,
        description: "Dell/Logitech/Generic wireless models. Estimated Price: रू 450 – रू 1,500",
        images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800"], // Mouse
        compatibility: "Universal",
        warranty: "6 Months",
    },
    {
        name: "Laptop Keyboard",
        category: "Accessories",
        price: 1200,
        stock: 10,
        description: "Internal replacement (varies by model). Estimated Price: रू 1,200 – रू 2,500",
        images: ["https://images.unsplash.com/photo-1587829741301-3a87ec21c45d?q=80&w=800"], // Keyboard
        compatibility: "Varies",
        warranty: "3 Months",
    },
    {
        name: "Laptop Cooler (L6)",
        category: "Accessories",
        price: 1000,
        stock: 12,
        description: "Dual or Multi-fan cooling pad with LEDs. Estimated Price: रू 1,000 – रू 2,200",
        images: ["https://images.unsplash.com/photo-1555618568-9646c0c27944?q=80&w=800"], // Cooling/Fans
        compatibility: "Universal",
        warranty: "1 Month",
    },
    {
        name: "HDMI to VGA Adapter",
        category: "Accessories",
        price: 350,
        stock: 30,
        description: "Adapter for connecting HDMI laptops to VGA monitors/projectors. Estimated Price: रू 350 – रू 600",
        images: ["https://images.unsplash.com/photo-1638367916964-b0a3c2678684?q=80&w=800"], // Cables/Adapter
        compatibility: "HDMI Output",
        warranty: "1 Month",
    }
];

export async function GET() {
    // SECURITY: Disable seeding in production by default.
    // Uncomment the code below responsibly to re-seed.
    return NextResponse.json({ success: false, message: "Seeding is disabled in this environment." }, { status: 403 });

    /*
    try {
        const { error } = await supabase.from('products').insert(MOCK_PRODUCTS_TO_SEED);
        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: "Seeed completed successfully." });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
    */
}
