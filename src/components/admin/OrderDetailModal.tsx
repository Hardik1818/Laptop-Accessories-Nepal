"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader as CHeader, CardTitle as CTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Image as ImageIcon, Package, User, MapPin, Phone, CreditCard, ChevronRight, CheckCircle2, Truck, Check, XCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OrderDetailModalProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
    onStatusChange: (orderId: string, newStatus: Order['status']) => void;
}

export function OrderDetailModal({ order, isOpen, onClose, onStatusChange }: OrderDetailModalProps) {
    const [items, setItems] = useState<any[]>([]);
    const [loadingItems, setLoadingItems] = useState(false);

    useEffect(() => {
        if (order && isOpen) {
            fetchOrderItems();
        }
    }, [order, isOpen]);

    const fetchOrderItems = async () => {
        if (!order) return;
        setLoadingItems(true);
        const { data, error } = await supabase
            .from('order_items')
            .select(`
                *,
                products:product_id (name, images)
            `)
            .eq('order_id', order.id);

        if (!error && data) {
            setItems(data);
        }
        setLoadingItems(false);
    };

    if (!order) return null;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'New': return <Package className="h-5 w-5 text-blue-400" />;
            case 'Confirmed': return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
            case 'Delivered': return <Check className="h-5 w-5 text-emerald-500" />;
            case 'Cancelled': return <XCircle className="h-5 w-5 text-rose-500" />;
            default: return <Package className="h-5 w-5 text-slate-400" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-[100dvh] md:h-auto md:max-h-[95vh] w-full overflow-y-auto bg-slate-950 md:bg-slate-950/95 backdrop-blur-2xl border-none md:border md:border-slate-800/50 shadow-none md:shadow-[0_0_100px_rgba(0,0,0,0.8)] p-0 rounded-none md:rounded-xl">
                <div className="relative min-h-screen md:min-h-0 flex flex-col">
                    {/* Immersive Header */}
                    <div className="p-4 md:p-8 border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-transparent shrink-0">
                        <DialogHeader>
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-2 text-center md:text-left">
                                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shrink-0">
                                    {getStatusIcon(order.status)}
                                </div>
                                <div className="flex flex-col items-center md:items-start w-full">
                                    <DialogTitle className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                        Order manifest
                                        <Badge variant="outline" className="text-[10px] font-black tracking-widest uppercase border-slate-800 bg-slate-900 text-slate-500 px-3 h-6">
                                            SEC-{order.id.slice(0, 8)}
                                        </Badge>
                                    </DialogTitle>
                                    <DialogDescription className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">
                                        Authenticated: {new Date(order.created_at).toLocaleString()}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                    </div>

                    <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 flex-1">
                        {/* Main Stream (Manifest Items) */}
                        <div className="lg:col-span-2 space-y-6 md:space-y-8">
                            <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50 overflow-hidden">
                                <CHeader className="p-4 md:p-6 border-b border-slate-800/50">
                                    <CTitle className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                                        <Package className="h-3 w-3" /> Itemized components
                                    </CTitle>
                                </CHeader>
                                <CardContent className="p-0">
                                    {loadingItems ? (
                                        <div className="p-12 text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Accessing data stream...</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-slate-800/30">
                                            {items.map((item) => (
                                                <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-slate-800/20 transition-all">
                                                    <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                                                        <div className="h-14 w-14 md:h-16 md:w-16 bg-slate-950 rounded-xl relative overflow-hidden ring-1 ring-slate-800 shadow-2xl shrink-0">
                                                            {item.products?.images?.[0] ? (
                                                                <Image src={item.products.images[0]} alt={item.products.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110" />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full">
                                                                    <ImageIcon className="h-6 w-6 text-slate-800" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-black italic text-white uppercase tracking-tighter text-sm md:text-lg leading-none mb-1 md:mb-2 line-clamp-2 md:line-clamp-1">{item.products?.name}</div>
                                                            <div className="flex items-center gap-2">
                                                                <Badge className="bg-slate-800 text-[9px] font-black tracking-widest uppercase py-0.5 px-2">QTY: {item.quantity}</Badge>
                                                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Unit {item.price_at_time.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-left md:text-right w-full md:w-auto pl-[4.5rem] md:pl-0 mt-[-0.5rem] md:mt-0">
                                                        <div className="text-blue-400 font-black italic tracking-tighter text-lg md:text-xl">NPR {(item.price_at_time * item.quantity).toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                                <div className="p-4 md:p-6 bg-slate-950/50 flex justify-between items-center border-t border-slate-800/50">
                                    <span className="font-black italic uppercase tracking-tighter text-slate-500 text-xs md:text-sm">Total Value</span>
                                    <div className="text-2xl md:text-3xl font-black italic text-blue-500 tracking-tighter">NPR {order.total.toLocaleString()}</div>
                                </div>
                            </Card>

                            {/* Entity Intelligence */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                                    <CardContent className="p-4 md:p-6 space-y-4">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <User className="h-3 w-3" /> Entity profile
                                        </h3>
                                        <div>
                                            <div className="text-lg md:text-xl font-black italic text-white uppercase tracking-tighter mb-4">{order.customer_name}</div>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3 text-sm text-slate-400 group">
                                                    <MapPin className="h-4 w-4 text-blue-500/50 mt-0.5 group-hover:text-blue-400 transition-colors shrink-0" />
                                                    <span className="font-medium break-words">{order.address}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-slate-400 group">
                                                    <Phone className="h-4 w-4 text-emerald-500/50 group-hover:text-emerald-400 transition-colors shrink-0" />
                                                    <span className="font-medium tracking-widest">{order.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                                    <CardContent className="p-4 md:p-6 space-y-4">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <CreditCard className="h-3 w-3" /> Financial protocol
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gateway</span>
                                                <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/20 font-black tracking-widest text-[9px] px-3">{order.payment_method}</Badge>
                                            </div>
                                            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</span>
                                                <Badge className="bg-emerald-600/10 text-emerald-400 border-emerald-500/20 font-black tracking-widest text-[9px] px-3">{order.status}</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Control Nexus */}
                        <div className="space-y-6 md:space-y-8">
                            <Card className="bg-blue-600/5 border-blue-500/30 overflow-hidden relative group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                                <CHeader className="p-4 md:p-6 pb-2">
                                    <CTitle className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Control module</CTitle>
                                </CHeader>
                                <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                                    {/* Progression Actions */}
                                    {(order.status === 'New' || order.status === 'Payment Pending') && (
                                        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 data-[state=open]:bg-blue-700 font-black italic tracking-tighter text-md uppercase shadow-xl shadow-blue-900/30 transition-all active:scale-95" onClick={() => onStatusChange(order.id, 'Confirmed')}>
                                            Validate Mission / Confirm
                                        </Button>
                                    )}
                                    {order.status === 'Proof Uploaded' && (
                                        <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 font-black italic tracking-tighter text-md uppercase shadow-xl shadow-emerald-900/30 transition-all active:scale-95" onClick={() => onStatusChange(order.id, 'Confirmed')}>
                                            Authorize Payment
                                        </Button>
                                    )}
                                    {order.status === 'Confirmed' && (
                                        <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 font-black italic tracking-tighter text-md uppercase shadow-xl shadow-emerald-900/30 transition-all active:scale-95" onClick={() => onStatusChange(order.id, 'Delivered')}>
                                            Complete Delivery
                                        </Button>
                                    )}

                                    {/* Recovery / Correction Actions */}
                                    {order.status === 'Delivered' && (
                                        <Button variant="outline" className="w-full h-12 border-slate-700 hover:bg-slate-800 text-slate-400 font-black italic tracking-tighter text-sm uppercase" onClick={() => onStatusChange(order.id, 'Confirmed')}>
                                            Revert to Confirmed
                                        </Button>
                                    )}
                                    {order.status === 'Cancelled' && (
                                        <Button variant="outline" className="w-full h-12 border-slate-700 hover:bg-slate-800 text-slate-400 font-black italic tracking-tighter text-sm uppercase" onClick={() => onStatusChange(order.id, 'New')}>
                                            Restore Protocol
                                        </Button>
                                    )}

                                    {/* Destructive Action */}
                                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                                        <Button variant="ghost" className="w-full h-10 text-rose-600 hover:text-rose-400 hover:bg-rose-500/10 text-[10px] font-black uppercase tracking-widest mt-2" onClick={() => onStatusChange(order.id, 'Cancelled')}>
                                            Abort Order
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>

                            {order.payment_method === 'QR' && (
                                <Card className="bg-slate-900/40 border-slate-800/50 overflow-hidden">
                                    <CHeader className="p-4 md:p-6 pb-2">
                                        <CTitle className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center justify-between">
                                            Visible Evidence
                                            <a href={order.proof_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">EXTRACT</a>
                                        </CTitle>
                                    </CHeader>
                                    <CardContent className="p-4 md:p-6">
                                        {order.proof_url ? (
                                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden ring-1 ring-slate-800 group/proof shadow-2xl">
                                                <Image src={order.proof_url} alt="Proof" fill className="object-cover transition-transform duration-500 group-hover/proof:scale-110" />
                                                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover/proof:opacity-100 transition-opacity flex items-center justify-center">
                                                    <ImageIcon className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-12 px-6 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                                                <XCircle className="h-8 w-8 text-rose-500/20 mx-auto mb-2" />
                                                <p className="text-[9px] font-black text-rose-500/50 uppercase tracking-widest">No spectral evidence provided</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="p-4 md:p-8 border-t border-slate-800/50 bg-slate-950/50 shrink-0">
                        <Button type="button" variant="ghost" className="w-full md:w-auto text-slate-500 font-black uppercase tracking-widest text-[10px] h-10 px-8 hover:text-white" onClick={onClose}>
                            Termination Command / Close
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
