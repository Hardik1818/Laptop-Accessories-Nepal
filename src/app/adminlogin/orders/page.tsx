"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Order } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Eye, ShoppingCart, User, MapPin, Phone, CreditCard, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OrderDetailModal } from "@/components/admin/OrderDetailModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("All");

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setOrders(data);
        }
        setLoading(false);
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error: any) {
            alert("Failed to update status: " + error.message);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "New": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "Confirmed": return "text-indigo-400 bg-indigo-400/10 border-indigo-400/20";
            case "Delivered": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
            case "Cancelled": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
            default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.includes(searchTerm);
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 max-w-full overflow-x-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500">
                        Orders
                    </h2>
                    <p className="text-slate-400 mt-1">Manage, verify, and fulfill customer requests.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search ID, Name or Phone..."
                        className="pl-10 bg-slate-900/50 border-slate-800 focus:border-blue-500/50 transition-all h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Compact Filter Strip */}
            <div className="flex items-center gap-2 pb-2 overflow-x-auto no-scrollbar mask-gradient-right">
                {["All", "New", "Confirmed", "Delivered", "Cancelled"].map((status) => (
                    <Button
                        key={status}
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilterStatus(status)}
                        className={cn(
                            "rounded-full px-4 font-bold text-[10px] md:text-[11px] uppercase tracking-wider transition-all whitespace-nowrap border border-transparent",
                            filterStatus === status
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500/50"
                                : "text-slate-500 hover:text-white hover:bg-slate-800/50 border-slate-800/50 bg-slate-900/20"
                        )}
                    >
                        {status}
                    </Button>
                ))}
            </div>

            {/* Excel-like Table View */}
            <div className="border border-slate-800 rounded-xl overflow-x-auto bg-slate-900/40 backdrop-blur-md">
                <Table className="w-full">
                    <TableHeader className="bg-slate-900/80">
                        <TableRow className="border-slate-800 hover:bg-slate-900/80">
                            <TableHead className="hidden md:table-cell text-slate-400 font-bold uppercase text-[10px] tracking-widest pl-4">Order ID</TableHead>
                            <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pl-4 md:pl-0">Customer</TableHead>
                            <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
                            <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Total (NPR)</TableHead>
                            <TableHead className="hidden lg:table-cell text-slate-400 font-bold uppercase text-[10px] tracking-widest">Date</TableHead>
                            <TableHead className="hidden xl:table-cell text-slate-400 font-bold uppercase text-[10px] tracking-widest">Payment</TableHead>
                            <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-50">
                                        <ShoppingCart className="h-12 w-12 text-slate-600 mb-2" />
                                        <p className="text-slate-500 font-medium">No orders found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order) => (
                                <TableRow key={order.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors group cursor-pointer" onClick={() => handleViewDetails(order)}>
                                    <TableCell className="hidden md:table-cell font-mono text-xs text-slate-500 pl-4">
                                        #{order.id.slice(-6).toUpperCase()}
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-200 pl-4 md:pl-0">
                                        <div className="flex flex-col">
                                            <span className="text-xs md:text-sm font-bold line-clamp-1">{order.customer_name}</span>
                                            <span className="text-[10px] text-slate-500 font-normal">{order.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn("px-1.5 py-0.5 md:px-2 text-[9px] md:text-[10px] uppercase font-bold tracking-wider border-none whitespace-nowrap", getStatusStyle(order.status))}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs md:text-sm font-black text-white whitespace-nowrap">
                                        {order.total.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell text-xs text-slate-400 font-medium whitespace-nowrap">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                            <CreditCard className="h-3 w-3" /> {order.payment_method}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewDetails(order);
                                            }}
                                            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-blue-600/20"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <OrderDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}
