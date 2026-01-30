"use client";

import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Minus, Upload, ShoppingCart, ShieldCheck, Truck, QrCode, CheckCircle2, PackageCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { sendOrderNotificationEmail } from "@/app/actions/email";
import { toast } from "sonner";

export default function CartPage() {
    const { items, updateQuantity, removeItem, cartTotal, clearCart } = useCart();
    const { settings } = useSettings();
    const [step, setStep] = useState<"cart" | "checkout">("cart");

    // Checkout Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        paymentMethod: "COD" as "COD" | "QR",
    });
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // QR Code Image from settings
    const QR_IMAGE = settings.payment_qr_url || "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?q=80&w=600";

    const router = useRouter();

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let proofUrl = null;

            if (formData.paymentMethod === "QR" && proofFile) {
                const fileName = `${Date.now()}_${proofFile.name.replace(/\s/g, '_')}`;
                // Attempt upload (Requires 'payment_proofs' bucket to exist)
                const { error: uploadError } = await supabase.storage
                    .from('payment_proofs')
                    .upload(fileName, proofFile);

                if (uploadError) {
                    console.warn("Image upload failed (Bucket 'payment_proofs' logic):", uploadError.message);
                    proofUrl = `failed_upload_${fileName}`;
                } else {
                    const { data: publicData } = supabase.storage
                        .from('payment_proofs')
                        .getPublicUrl(fileName);
                    proofUrl = publicData.publicUrl;
                }
            }

            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    customer_name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    payment_method: formData.paymentMethod,
                    total: cartTotal,
                    status: 'New',
                    proof_url: proofUrl,
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = items.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_time: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Send Email Notification (Non-blocking)
            try {
                // Formatting items for the email template
                const formattedItems = items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }));

                await sendOrderNotificationEmail(order, formattedItems);
            } catch (emailErr) {
                console.warn("Email notification failed to send:", emailErr);
                // We don't throw here so the user checkout isn't blocked by email failure
            }

            // Success
            clearCart();
            toast.success("Order placed successfully!", {
                icon: <PackageCheck className="h-4 w-4 text-green-500" />,
                description: "We will contact you shortly to confirm your delivery.",
                duration: 5000,
            });
            router.push("/");

        } catch (error: any) {
            console.error(error);
            toast.error("Failed to place order", {
                description: error.message || "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center max-w-md">
                    <div className="h-24 w-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="h-10 w-10 text-slate-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                    <p className="text-slate-400 mb-8 text-lg">Looks like you haven't added any professional gear yet.</p>
                    <Link href="/shop">
                        <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 font-bold">Start Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 flex items-center gap-3">
                    <span className="bg-blue-600/10 text-blue-500 p-2 rounded-lg">
                        {step === "cart" ? <ShoppingCart className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                    </span>
                    {step === "cart" ? "Shopping Cart" : "Secure Checkout"}
                </h1>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column: Items or Form */}
                    <div className="lg:col-span-2 space-y-6">

                        {step === "cart" ? (
                            // CART VIEW
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="group bg-slate-900/50 hover:bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all duration-300">
                                        <div className="relative h-20 w-20 md:h-24 md:w-24 bg-slate-800 rounded-xl overflow-hidden shrink-0 border border-white/5">
                                            <Image src={item.images[0]} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white text-base md:text-lg truncate mb-1">{item.name}</h3>
                                            <div className="text-blue-400 font-medium">NPR {item.price.toLocaleString()}</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3 mt-2 sm:mt-0">
                                            <div className="flex items-center gap-1 bg-slate-950 rounded-lg p-1 border border-white/10">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 h-9 w-9 rounded-full" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // CHECKOUT FORM VIEW
                            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                        <span className="h-6 w-6 rounded-full bg-blue-600 text-xs flex items-center justify-center">1</span>
                                        Contact Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-400">Full Name</label>
                                            <Input required className="bg-slate-950/50 border-white/10 h-12 text-white placeholder:text-slate-600 focus-visible:ring-blue-500" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-400">Phone Number</label>
                                            <Input required type="tel" className="bg-slate-950/50 border-white/10 h-12 text-white placeholder:text-slate-600 focus-visible:ring-blue-500" placeholder="98XXXXXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-slate-400">Delivery Address</label>
                                            <Input required className="bg-slate-950/50 border-white/10 h-12 text-white placeholder:text-slate-600 focus-visible:ring-blue-500" placeholder="Street Name, City, Landmark" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                        <span className="h-6 w-6 rounded-full bg-blue-600 text-xs flex items-center justify-center">2</span>
                                        Payment Method
                                    </h3>
                                    <div className="p-6 bg-slate-900/50 border border-white/10 rounded-2xl space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                className={`flex-1 cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${formData.paymentMethod === "COD" ? "bg-blue-600/10 border-blue-500 text-blue-400" : "bg-slate-950 border-white/10 text-slate-400 hover:border-white/20"}`}
                                                onClick={() => setFormData({ ...formData, paymentMethod: "COD" })}
                                            >
                                                <Truck className="h-6 w-6" />
                                                <span className="font-bold text-sm">Cash on Delivery</span>
                                            </div>
                                            <div
                                                className={`flex-1 cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${formData.paymentMethod === "QR" ? "bg-blue-600/10 border-blue-500 text-blue-400" : "bg-slate-950 border-white/10 text-slate-400 hover:border-white/20"}`}
                                                onClick={() => setFormData({ ...formData, paymentMethod: "QR" })}
                                            >
                                                <QrCode className="h-6 w-6" />
                                                <span className="font-bold text-sm">Scan & Pay</span>
                                            </div>
                                        </div>

                                        {formData.paymentMethod === "QR" && (
                                            <div className="bg-slate-950/50 rounded-xl p-6 border border-white/10 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
                                                <div className="text-center">
                                                    <p className="text-white font-bold mb-1">Scan to Pay</p>
                                                    <p className="text-xs text-slate-500">Use any banking app or e-wallet</p>
                                                </div>
                                                <div className="relative w-56 h-56 bg-white p-3 rounded-2xl shadow-xl">
                                                    <Image src={QR_IMAGE} alt="Payment QR" fill className="object-cover rounded-xl" />
                                                </div>
                                                <div className="w-full max-w-sm space-y-2">
                                                    <label className="text-sm font-medium text-slate-300 block text-center">Upload Payment Screenshot</label>
                                                    <div className="relative">
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            required
                                                            className="cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 h-12 bg-slate-900 border-white/10 text-slate-300"
                                                            onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                                                        />
                                                        <Upload className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <Card className="bg-slate-900/50 border-white/10 text-slate-100 backdrop-blur-md">
                                <CardHeader className="border-b border-white/5 pb-4">
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="flex justify-between text-sm text-slate-400">
                                        <span>Subtotal ({items.length} items)</span>
                                        <span>NPR {cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-400">
                                        <span>Delivery</span>
                                        <span className="text-green-400 font-medium">Free</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-xl text-white">
                                        <span>Total</span>
                                        <span>NPR {cartTotal.toLocaleString()}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-2 pb-6 sticky bottom-0 bg-slate-900 md:relative md:bg-transparent z-40 -mx-6 px-6 md:mx-0 md:px-0">
                                    {step === "cart" ? (
                                        <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/20" onClick={() => setStep("checkout")}>
                                            Proceed to Checkout
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-900/20"
                                            form="checkout-form"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Processing..." : "Confirm Order"}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>

                            {step === "checkout" && (
                                <Button variant="ghost" className="w-full text-slate-400 hover:text-white" onClick={() => setStep("cart")}>
                                    ← Back to Cart
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
