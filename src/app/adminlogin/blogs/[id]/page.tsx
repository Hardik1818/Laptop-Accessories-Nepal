"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getBlogById } from "@/lib/blogs";

export default function EditBlogPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        category: "Tips",
        is_published: true
    });

    useEffect(() => {
        const fetchPost = async () => {
            const data: any = await getBlogById(params.id);
            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt || "",
                    content: data.content,
                    image: data.image || "",
                    category: data.category || "Tips",
                    is_published: data.is_published
                });
            } else {
                toast.error("Article not found");
                router.push("/adminlogin/blogs");
            }
            setIsLoading(false);
        };
        fetchPost();
    }, [params.id, router]);

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const { error } = await supabase
                .from("blogs")
                .update({ ...formData, updated_at: new Date().toISOString() })
                .eq("id", params.id);

            if (error) throw error;

            toast.success("Article updated successfully!");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this article forever?")) return;

        try {
            const { error } = await supabase
                .from("blogs")
                .delete()
                .eq("id", params.id);

            if (error) throw error;

            toast.success("Article deleted");
            router.push("/adminlogin/blogs");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (isLoading) return <div className="p-32 text-center uppercase tracking-[0.5em] font-black opacity-10 animate-pulse text-white">Accessing Blog...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/adminlogin/blogs">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-800 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-400" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-primary">Edit Article</h1>
                        <p className="text-slate-400 mt-1 uppercase text-[10px] tracking-widest font-bold">Workspace / Blog / Manage</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10 gap-2 font-black uppercase tracking-tighter italic h-11 px-5 rounded-xl transition-all"
                    onClick={handleDelete}
                >
                    <Trash2 className="w-4.5 h-4.5" /> Delete Story
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-primary/5">
                <div className="grid gap-8">
                    <div className="space-y-3">
                        <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Article Title</Label>
                        <Input
                            id="title"
                            className="h-14 text-xl font-bold rounded-2xl bg-slate-950/50 border-slate-700 focus:border-primary/50 transition-all text-slate-100 placeholder:text-slate-700"
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label htmlFor="slug" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">URL Slug</Label>
                            <div className="relative">
                                <Input
                                    id="slug"
                                    className="h-12 rounded-xl font-mono text-sm bg-slate-950/50 border-slate-700 text-primary"
                                    value={formData.slug}
                                    onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary/10"
                                    onClick={generateSlug}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Category</Label>
                            <select
                                id="category"
                                className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950/50 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none hover:border-slate-600 transition-colors text-slate-100"
                                value={formData.category}
                                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            >
                                <option value="Tips">Tech Tips</option>
                                <option value="Review">Unit Review</option>
                                <option value="Service">Service Update</option>
                                <option value="News">Shop News</option>
                                <option value="Guide">Buying Guide</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="image" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Featured Image URL</Label>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input
                                    id="image"
                                    className="h-12 pl-12 rounded-xl bg-slate-950/50 border-slate-700 text-slate-100 placeholder:text-slate-700"
                                    value={formData.image}
                                    onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                />
                            </div>
                            {formData.image && (
                                <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0 shadow-lg">
                                    <img src={formData.image} className="w-full h-full object-cover" alt="" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="excerpt" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Excerpt / Summary</Label>
                        <Textarea
                            id="excerpt"
                            className="rounded-2xl resize-none min-h-[100px] bg-slate-950/50 border-slate-700 p-4 font-medium text-slate-200 focus:border-primary/50 transition-all"
                            value={formData.excerpt}
                            onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="content" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Main Story (HTML)</Label>
                        <Textarea
                            id="content"
                            className="rounded-2xl min-h-[500px] font-mono text-sm leading-relaxed p-8 bg-slate-950/50 border-slate-700 text-slate-200 focus:border-primary/50 transition-all"
                            value={formData.content}
                            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-4 py-6 px-6 bg-slate-950/30 rounded-2xl border border-slate-800/50">
                        <input
                            type="checkbox"
                            id="is_published"
                            className="w-5 h-5 accent-primary rounded-lg cursor-pointer"
                            checked={formData.is_published}
                            onChange={e => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                        />
                        <Label htmlFor="is_published" className="cursor-pointer font-bold text-slate-100">Make this story live to the public</Label>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-800 flex justify-end gap-5">
                    <Button
                        type="button"
                        variant="ghost"
                        className="rounded-xl px-10 h-12 font-black uppercase tracking-widest text-[10px] text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        className="rounded-xl px-14 h-14 bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 gap-3 font-black uppercase italic tracking-tighter text-lg transition-transform hover:scale-105 active:scale-95"
                        disabled={isSaving}
                    >
                        <Save className="w-5 h-5" /> {isSaving ? "Saving..." : "Update Story"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
