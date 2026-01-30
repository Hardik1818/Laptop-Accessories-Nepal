"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Sparkles, Zap, Bot, User, Terminal, ShoppingCart, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type Message = {
    role: "user" | "assistant";
    content: string;
    matches?: any[];
};

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "NEXUS ONLINE. // Greetings, traveler. I am the LAN AI assistant. How shall we optimize your workstation today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Smooth Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages, isOpen, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error("Network breach detected.");

            const data = await response.json();
            if (!data.content) throw new Error("Empty data stream.");

            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: data.content,
                matches: data.matches
            }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: "SIGNAL INTERRUPTED. // I could not process your query. Please re-synchronize (try again)."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Cinematic Floating Toggle */}
            <Button
                size="icon"
                className={cn(
                    "fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-16 md:w-16 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500 z-50 hover:scale-110 group border-2 border-blue-500/20 overflow-hidden",
                    isOpen
                        ? "rotate-90 scale-0 opacity-0"
                        : "scale-100 opacity-100 bg-slate-950"
                )}
                onClick={() => setIsOpen(true)}
            >
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />
                <Bot className="h-6 w-6 md:h-8 md:w-8 text-blue-500 relative z-10" />
            </Button>

            {/* AI Nexus Window */}
            <div
                className={cn(
                    "fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-32px)] sm:w-[450px] max-h-[85vh] z-50 transition-all duration-500 origin-bottom-right",
                    isOpen
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 translate-y-10 pointer-events-none"
                )}
            >
                <Card className="border-slate-800 shadow-[0_0_80px_rgba(37,99,235,0.1)] bg-slate-950/95 backdrop-blur-2xl overflow-hidden flex flex-col h-[500px] sm:h-[600px] border-t-4 border-t-blue-600">
                    {/* Immersive Header */}
                    <CardHeader className="p-4 md:p-6 bg-slate-950/50 border-b border-slate-800/50 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="bg-blue-600/10 p-2 md:p-2.5 rounded-xl border border-blue-500/20 relative">
                                <Zap className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                                <div className="absolute inset-0 bg-blue-400 blur-lg opacity-20" />
                            </div>
                            <div>
                                <CardTitle className="text-lg md:text-xl font-black italic tracking-tighter uppercase text-white leading-none">
                                    LAN Nexus <span className="text-blue-500 text-[9px] not-italic align-top ml-1 opacity-50">PRO.0</span>
                                </CardTitle>
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mt-2">
                                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(59,130,246,1)]" />
                                    Synchronized
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-500 hover:text-white hover:bg-slate-800/50 h-10 w-10 rounded-xl transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>

                    {/* Infinite Data Stream (Messages) */}
                    <div
                        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-hide no-scrollbar"
                        ref={scrollRef}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex flex-col gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-500",
                                    msg.role === "user" ? "ml-auto max-w-[85%]" : "mr-auto w-full"
                                )}
                            >
                                <div className={cn(
                                    "flex items-center gap-2 mb-1",
                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                                        {msg.role === "user" ? "USER_ID" : "AI_HUB"}
                                    </span>
                                </div>
                                <div
                                    className={cn(
                                        "px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm shadow-xl relative transition-all duration-300",
                                        msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-2xl rounded-tr-none border border-blue-400/20"
                                            : "bg-slate-900/40 text-slate-200 rounded-2xl rounded-tl-none border border-slate-800/50 backdrop-blur-md max-w-[95%]"
                                    )}
                                >
                                    <div
                                        className="leading-relaxed leading-5 md:leading-6"
                                        dangerouslySetInnerHTML={{
                                            __html: msg.content
                                                .replace(/\n/g, '<br/>')
                                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black italic">$1</strong>')
                                        }}
                                    />
                                </div>

                                {/* Matching Product Cards */}
                                {msg.matches && msg.matches.length > 0 && (
                                    <div className="flex gap-3 overflow-x-auto pb-4 pt-2 w-full no-scrollbar">
                                        {msg.matches.map((product) => (
                                            <div key={product.id} className="min-w-[180px] bg-slate-900/60 border border-slate-800/50 rounded-2xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-sm group/card shrink-0">
                                                <div className="relative h-24 w-full bg-slate-950 overflow-hidden">
                                                    {product.images?.[0] ? (
                                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform group-hover/card:scale-110 duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-800"><ShoppingCart className="h-6 w-6" /></div>
                                                    )}
                                                    {product.stock === 0 && (
                                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                                                            <span className="text-[8px] font-black uppercase tracking-tighter text-rose-500 border border-rose-500/30 px-2 py-0.5 rounded-full bg-rose-500/10">Out of Stock</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-3 flex-1 flex flex-col gap-1">
                                                    <h4 className="text-[11px] font-bold text-slate-100 line-clamp-1 uppercase tracking-tighter">{product.name}</h4>
                                                    <div className="text-[13px] font-black text-blue-400 italic">NPR {product.price.toLocaleString()}</div>
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="mt-2 w-full h-8 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                                                    >
                                                        View Asset <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex flex-col gap-2 animate-pulse mr-auto max-w-[85%]">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">Synthesizing...</span>
                                <div className="px-5 py-4 bg-slate-900/40 rounded-2xl rounded-tl-none border border-slate-800/50 h-12 w-32 flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" />
                                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce delay-150" />
                                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce delay-300" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Neural Input Area */}
                    <CardFooter className="p-4 md:p-6 bg-slate-950 border-t border-slate-800/50">
                        <form onSubmit={handleSubmit} className="flex w-full items-center gap-3 md:gap-4">
                            <div className="flex-1 relative group">
                                <Input
                                    placeholder="Enter command..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full h-11 md:h-14 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-700 focus-visible:ring-blue-600 rounded-xl md:rounded-2xl px-4 md:px-5 transition-all text-sm md:text-md font-medium"
                                />
                                <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-slate-800">
                                    <Terminal className="h-4 w-4" />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                size="icon"
                                className="h-11 w-11 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 shrink-0"
                                disabled={isLoading}
                            >
                                <Send className="h-5 w-5 md:h-6 md:w-6" />
                            </Button>
                        </form>
                    </CardFooter>

                    <div className="bg-slate-950 px-8 pb-6 text-[8px] font-bold text-slate-800 uppercase tracking-[0.5em] flex justify-between">
                        <span>// HUB_LOCAL_ENCR_ACTIVE</span>
                        <span>V.2.5.0</span>
                    </div>
                </Card>
            </div>
        </>
    );
}
