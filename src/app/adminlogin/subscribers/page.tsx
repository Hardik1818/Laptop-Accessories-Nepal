"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Trash2, Calendar, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { NewsletterSub } from "@/types";

export default function SubscribersPage() {
    const [subs, setSubs] = useState<NewsletterSub[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchSubs();
    }, []);

    const fetchSubs = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("newsletter_subs")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setSubs(data);
        setIsLoading(false);
    };

    const deleteSub = async (id: string) => {
        if (!confirm("Are you sure you want to remove this subscriber?")) return;

        const { error } = await supabase
            .from("newsletter_subs")
            .delete()
            .eq("id", id);

        if (error) {
            toast.error("Failed to delete subscriber");
        } else {
            setSubs(subs.filter(s => s.id !== id));
            toast.success("Subscriber removed");
        }
    };

    const downloadCSV = () => {
        const headers = ["Email", "Subscribed At"];
        const rows = subs.map(s => [s.email, new Date(s.created_at).toLocaleString()]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubs = subs.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic">Newsletter <span className="text-secondary tracking-tighter">Subscribers</span></h1>
                    <p className="text-slate-400 mt-1">Manage your email list and export audience data.</p>
                </div>
                <Button
                    onClick={downloadCSV}
                    variant="outline"
                    className="rounded-xl gap-2 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-300 transition-all active:scale-95 h-11 px-6 font-bold uppercase tracking-widest text-[10px]"
                >
                    <Download className="w-4 h-4" /> Export CSV
                </Button>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800 bg-slate-800/20">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                        <Input
                            placeholder="Find subscriber..."
                            className="pl-12 rounded-2xl h-12 bg-slate-950/50 border-slate-700 text-slate-200 focus:border-primary/50 focus:ring-primary/20 transition-all placeholder:text-slate-600"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800/30 border-b border-slate-800">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email Address</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Subscribed On</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-300">
                            {isLoading ? (
                                <tr><td colSpan={3} className="px-8 py-20 text-center text-slate-500 italic">Authenticating database connection...</td></tr>
                            ) : filteredSubs.map((sub) => (
                                <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-slate-100 text-base">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-500">
                                        <div className="flex items-center gap-2.5">
                                            <Calendar className="w-4 h-4 opacity-30" />
                                            {new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <Button
                                            onClick={() => deleteSub(sub.id)}
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all active:scale-90"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && filteredSubs.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-8 py-32 text-center text-slate-500">
                                        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-6 border border-slate-700">
                                            <Mail className="w-10 h-10 text-slate-600 focus:scale-110 transition-transform" />
                                        </div>
                                        <p className="font-bold text-slate-300 text-xl tracking-tight">Your audience is empty</p>
                                        <p className="mt-2 text-slate-500">No subscribers match your search term.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-8 py-6 bg-slate-900/80 text-[10px] text-slate-500 border-t border-slate-800 flex items-center justify-between uppercase font-black tracking-widest">
                    <span>Active Mail List</span>
                    <span className="text-slate-300 bg-slate-800 px-3 py-1 rounded-md">{filteredSubs.length} Contacts</span>
                </div>
            </div>
        </div>
    );
}
