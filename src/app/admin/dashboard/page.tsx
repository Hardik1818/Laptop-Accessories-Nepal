"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, DollarSign, Package, ShoppingCart, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        productsCount: 0,
        recentOrders: [] as any[],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const { data: orders, error: ordersError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            const { count: productsCount } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            if (!ordersError) {
                const totalRevenue = orders?.reduce((acc, order) => acc + (order.total || 0), 0) || 0;
                setStats({
                    totalRevenue,
                    totalOrders: orders?.length || 0,
                    productsCount: productsCount || 0,
                    recentOrders: orders?.slice(0, 5) || [],
                });
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    const statCards = [
        { label: "Total Revenue", value: `NPR ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-blue-400", bg: "bg-blue-400/10", trend: "+12.5%" },
        { label: "Sales Count", value: `+${stats.totalOrders}`, icon: ShoppingCart, color: "text-emerald-400", bg: "bg-emerald-400/10", trend: "+5.2%" },
        { label: "Inventory", value: stats.productsCount, icon: Package, color: "text-amber-400", bg: "bg-amber-400/10", trend: "Stable" },
        { label: "Active Now", value: "Online", icon: Activity, color: "text-rose-400", bg: "bg-rose-400/10", trend: "Live" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500">
                    Dashboard
                </h2>
                <p className="text-slate-400 mt-1">Real-time performance metrics and recent activity.</p>
            </div>

            {/* Stat Grid - 2x2 on Mobile for compactness */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                    <Card key={i} className="bg-slate-900/40 backdrop-blur-md border-slate-800/50 hover:border-slate-700/50 transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                            <CardTitle className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</CardTitle>
                            <div className={`p-1.5 md:p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon className="h-3 w-3 md:h-4 md:w-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-lg md:text-2xl font-black text-white truncate">{stat.value}</div>
                            <div className="flex items-center mt-2 gap-1.5">
                                <span className={`text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.bg} ${stat.color}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:gap-8 md:grid-cols-7">
                {/* Visual Chart Area */}
                <Card className="md:col-span-4 bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                    <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6">
                        <div>
                            <CardTitle className="text-base md:text-lg font-bold">Sales Dynamics</CardTitle>
                            <CardDescription className="text-xs md:text-sm text-slate-500">Revenue over time.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="border-slate-800 text-slate-400 text-[10px] h-6">Weekly</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                        <div className="h-[250px] md:h-[350px] w-full flex flex-col justify-end bg-slate-950/40 rounded-xl border border-slate-800/50 p-4 relative overflow-hidden group">
                            {/* Mock Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6 py-12 pointer-events-none opacity-20">
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-px bg-slate-700" />)}
                            </div>

                            {/* Chart Bars */}
                            <div className="flex items-end justify-between h-full gap-2 relative z-10 pt-8">
                                {[40, 70, 55, 90, 65, 80, 100].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 md:gap-3 group/bar">
                                        <div
                                            className="w-full bg-gradient-to-t from-blue-600/40 to-blue-400 rounded-t-sm md:rounded-t-lg transition-all duration-1000 ease-out group-hover/bar:from-blue-500"
                                            style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                                        />
                                        <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-tighter">Day {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card className="md:col-span-3 bg-slate-900/40 backdrop-blur-md border-slate-800/50 flex flex-col">
                    <CardHeader className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base md:text-lg font-bold">Recent Activity</CardTitle>
                                <CardDescription className="text-xs md:text-sm text-slate-500">Latest transactions.</CardDescription>
                            </div>
                            <a href="/admin/orders" className="text-blue-500 hover:text-blue-400 p-2">
                                <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 md:p-6 pt-0">
                        <div className="space-y-4">
                            {stats.recentOrders.length === 0 ? (
                                <div className="text-center py-8">
                                    <Users className="h-8 w-8 text-slate-800 mx-auto mb-2" />
                                    <p className="text-xs text-slate-500 font-medium">No recent orders.</p>
                                </div>
                            ) : (
                                stats.recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center group gap-3">
                                        {/* Avatar hidden on very small screens, shown on sm+ */}
                                        <div className="hidden sm:flex h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-800 items-center justify-center text-[10px] md:text-xs font-bold text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                            {order.customer_name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <p className="text-xs md:text-sm font-bold text-slate-200 line-clamp-1">{order.customer_name}</p>
                                            <p className="text-[10px] text-slate-500 font-medium tracking-wide truncate">
                                                {new Date(order.created_at).toLocaleDateString()} • {order.payment_method}
                                            </p>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-1 shrink-0">
                                            <div className="text-xs md:text-sm font-black text-white">NPR {order.total.toLocaleString()}</div>
                                            <Badge variant="outline" className={`text-[8px] h-4 px-1 ${order.status === 'New' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' :
                                                'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'
                                                }`}>
                                                {order.status.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
