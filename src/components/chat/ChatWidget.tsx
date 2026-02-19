"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
// Retain consistent structure but use semantic theme classes
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
        { role: "assistant", content: "Hello! Welcome to Laptop Accessories Nepal. How can I help you find the perfect gear today?" }
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

            if (!response.ok) throw new Error("Network error.");

            const data = await response.json();
            if (!data.content) throw new Error("Empty response.");

            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: data.content,
                matches: data.matches
            }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment."
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
                    "fixed bottom-24 right-4 lg:bottom-6 lg:right-6 h-12 w-12 md:h-16 md:w-16 rounded-full shadow-lg shadow-primary/20 transition-all duration-500 z-[90] hover:scale-110 group border-2 border-white/20 overflow-hidden",
                    isOpen
                        ? "rotate-90 scale-0 opacity-0"
                        : "scale-100 opacity-100 bg-primary text-primary-foreground"
                )}
                onClick={() => setIsOpen(true)}
            >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                <MessageCircle className="h-6 w-6 md:h-8 md:w-8 relative z-10" />
            </Button>

            {/* Support Window */}
            <div
                className={cn(
                    "fixed z-[9999] transition-all duration-500 ease-out",
                    // Mobile: Bottom positioned
                    "bottom-4 right-4 left-4 lg:bottom-24 lg:left-auto lg:right-6",
                    // Width
                    "w-auto lg:w-[380px]",
                    // Height - Responsive constraint to prevent header overlap
                    "h-[min(600px,70vh)] max-h-[calc(100dvh-100px)]",
                    // Animation
                    isOpen
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 translate-y-10 pointer-events-none",
                    // Origin
                    "origin-bottom-right"
                )}
            >
                <Card className="border-border shadow-2xl bg-card/95 backdrop-blur-xl overflow-hidden flex flex-col h-full rounded-2xl border border-border/50">
                    {/* Immersive Header */}
                    <CardHeader className="p-3 lg:p-4 bg-primary text-primary-foreground border-b border-primary/10 flex flex-row items-center justify-between space-y-0 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                <Bot className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-base lg:text-lg font-bold text-white leading-none">
                                    LAN Assistant
                                </CardTitle>
                                <div className="text-[10px] lg:text-xs font-medium text-white/90 flex items-center gap-1.5 mt-1 opacity-90">
                                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                                    Online Now
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 rounded-full transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>

                    {/* Chat Area */}
                    <div
                        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-muted/20"
                        ref={scrollRef}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex flex-col gap-1 max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
                                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-4 py-3 text-sm shadow-sm relative leading-relaxed",
                                        msg.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-md"
                                            : "bg-card text-foreground rounded-2xl rounded-tl-md border border-border"
                                    )}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: msg.content
                                                .replace(/\n/g, '<br/>')
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        }}
                                    />
                                </div>

                                {/* Matching Product Cards */}
                                {msg.matches && msg.matches.length > 0 && (
                                    <div className="flex gap-3 overflow-x-auto pb-2 pt-2 w-full max-w-full no-scrollbar">
                                        {msg.matches.map((product) => (
                                            <div key={product.id} className="min-w-[160px] w-[160px] bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-md shrink-0 transition-transform hover:scale-105">
                                                <div className="relative h-24 w-full bg-muted">
                                                    {product.images?.[0] ? (
                                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ShoppingCart className="h-6 w-6" /></div>
                                                    )}
                                                </div>
                                                <div className="p-3 flex-1 flex flex-col gap-1">
                                                    <h4 className="text-xs font-bold text-foreground line-clamp-1">{product.name}</h4>
                                                    <div className="text-xs font-bold text-primary">NPR {product.price.toLocaleString()}</div>
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="mt-2 w-full h-7 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-[10px] font-bold uppercase flex items-center justify-center gap-1"
                                                    >
                                                        View Product
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
                                <div className="px-4 py-3 bg-card rounded-2xl rounded-tl-md border border-border h-10 w-16 flex items-center justify-center gap-1">
                                    <div className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce" />
                                    <div className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce delay-150" />
                                    <div className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce delay-300" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <CardFooter className="p-3 bg-card border-t border-border">
                        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                            <Input
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-muted/50 border-input text-foreground focus-visible:ring-primary rounded-full px-4 h-11"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-11 w-11 rounded-full bg-primary hover:bg-primary/90 shrink-0 shadow-md transition-transform hover:scale-105 active:scale-95"
                                disabled={isLoading}
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
