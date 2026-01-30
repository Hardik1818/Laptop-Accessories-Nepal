import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userText = lastMessage.content;

        // 1. Fetch Store Policies/Settings
        let settings: any = {};
        try {
            const { data: settingsData, error: settingsError } = await supabase.from('store_settings').select('*');
            if (settingsError) {
                console.error('Supabase Settings Error:', settingsError);
            } else {
                settings = settingsData?.reduce((acc: any, item: any) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {}) || {};
            }
        } catch (e) {
            console.error('Failed to fetch settings:', e);
        }

        // 2. Keyword Extraction & Product Search
        const keywords = userText.toLowerCase()
            .replace(/[?.,!]/g, '')
            .split(' ')
            .filter((w: string) => w.length > 2);

        let products: any[] = [];
        try {
            if (keywords.length > 0) {
                const searchOr = keywords.map((k: string) => `name.ilike.%${k}%,category.ilike.%${k}%,compatibility.ilike.%${k}%`).join(',');
                const { data: matchedProducts, error: prodError } = await supabase.from('products').select('*').or(searchOr).limit(5);
                if (prodError) {
                    console.error('Supabase Product Search Error:', prodError);
                } else {
                    products = matchedProducts || [];
                }
            }
        } catch (e) {
            console.error('Failed to search products:', e);
        }

        // 3. Prepare AI Context
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                role: 'assistant',
                content: "SIGNAL INTERRUPTED. // Gemini API Key not found. Please configure GEMINI_API_KEY in environment to activate the Neural Nexus. \n\nI found " + products.length + " products matching your query.",
                matches: products
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
            You are "LAN NEXUS", the official AI Shop Assistant for Laptop Accessories Nepal.
            Your job is to assist customers accurately using ONLY the provided data.

            ### STORE POLICIES & INFO:
            - Store Name: ${settings.store_name || 'Laptop Accessories Nepal'}
            - Address: ${settings.business_address || 'Kathmandu, Nepal'}
            - COD Policy: ${settings.cod_policy || 'Available inside Kathmandu Valley.'}
            - Delivery: ${settings.delivery_policy || 'Same day inside ring road.'}
            - Warranty: ${settings.warranty_policy || '7-day replacement for manufacturing defects.'}
            - Payment: ${settings.payment_info || 'Accepts QR and COD.'}
            - Contact: ${settings.store_email || 'laptopaccessoriesnepal@gmail.com'}

            ### SEARCH RESULTS FROM DATABASE (Current Inventory):
            ${products.length > 0 ? JSON.stringify(products.map(p => ({
            name: p.name,
            price: p.price,
            stock: p.stock,
            warranty: p.warranty,
            compatibility: p.compatibility
        }))) : 'NO PRODUCTS FOUND MATCHING THIS QUERY.'}

            ### STRICT RULES:
            1. ONLY answer based on the search results and policies above.
            2. If stock is 0, explicitly say the item is OUT OF STOCK.
            3. NEVER invent prices or features.
            4. If a product is not found, state it clearly and ask for the laptop model or part name to help them better.
            5. Keep the persona: "NEXUS" (Professional, terminal-like, technical, yet helpful).
            6. If compatibility is mentioned (e.g. "for dell"), check if it matches the "compatibility" field. If unsure, ask for the model number.
            7. Response should be concise and formatted with markdown (bolding key info).
            8. Language: Respond in English or Nepali based on the user's language.

            USER QUERY: "${userText}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            role: 'assistant',
            content: text,
            matches: products
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({
            role: 'assistant',
            content: "CRITICAL SYSTEM BREACH. // " + (error.message || "Unknown error in Neural Nexus."),
            matches: []
        }, { status: 200 });
    }
}
