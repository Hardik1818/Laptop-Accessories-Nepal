"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewBlogPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        category: "Tips",
        is_published: true
    });

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase
                .from("blogs")
                .insert([formData]);

            if (error) throw error;

            toast.success("Blog post created successfully!");
            router.push("/adminlogin/blogs");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/adminlogin/blogs">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-800 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic">Write <span className="text-primary">New Article</span></h1>
                    <p className="text-slate-400 mt-1">Fill in the details to publish a new post.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-primary/5">
                <div className="grid gap-8">
                    <div className="space-y-3">
                        <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Article Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. 5 Tips to Keep Your Laptop Fast"
                            className="h-14 text-xl font-bold rounded-2xl bg-slate-950/50 border-slate-700 focus:border-primary/50 transition-all placeholder:text-slate-700"
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            onBlur={generateSlug}
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label htmlFor="slug" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">URL Slug</Label>
                            <div className="relative">
                                <Input
                                    id="slug"
                                    placeholder="article-url-slug"
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
                                    Auto
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Category</Label>
                            <select
                                id="category"
                                className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950/50 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none hover:border-slate-600 transition-colors"
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
                                    placeholder="https://images.unsplash.com/..."
                                    className="h-12 pl-12 rounded-xl bg-slate-950/50 border-slate-700 placeholder:text-slate-700"
                                    value={formData.image}
                                    onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                />
                            </div>
                            {formData.image && (
                                <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                                    <img src={formData.image} className="w-full h-full object-cover" alt="" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="excerpt" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Excerpt / Summary</Label>
                        <Textarea
                            id="excerpt"
                            placeholder="Write a catchy 2-sentence summary..."
                            className="rounded-2xl resize-none min-h-[100px] bg-slate-950/50 border-slate-700 p-4 placeholder:text-slate-700 focus:border-primary/50 transition-all font-medium"
                            value={formData.excerpt}
                            onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="content" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Main Story (HTML)</Label>
                        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-[11px] text-slate-400 mb-2 flex items-center gap-3">
                            <div className="bg-primary/20 p-1.5 rounded-lg">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            <span>Quick Tip: Use <b>&lt;h2&gt;</b> for titles and <b>&lt;p&gt;</b> for body text. Images use <b>&lt;img src="..." /&gt;</b>.</span>
                        </div>
                        <Textarea
                            id="content"
                            placeholder="<p>Start your story here...</p>"
                            className="rounded-2xl min-h-[500px] font-mono text-sm leading-relaxed p-8 bg-slate-950/50 border-slate-700 focus:border-primary/50 transition-all placeholder:text-slate-700"
                            value={formData.content}
                            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-4 py-6 px-4 bg-slate-950/30 rounded-2xl border border-slate-800/50">
                        <input
                            type="checkbox"
                            id="is_published"
                            className="w-5 h-5 accent-primary rounded-lg cursor-pointer"
                            checked={formData.is_published}
                            onChange={e => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                        />
                        <Label htmlFor="is_published" className="cursor-pointer font-bold text-slate-300">Set as Published (Visible to everyone)</Label>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-800 flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="rounded-xl px-8 h-12 font-bold text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                        onClick={() => router.back()}
                    >
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        className="rounded-xl px-12 h-14 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 gap-3 font-black uppercase italic tracking-tighter text-lg transition-transform hover:scale-105 active:scale-95"
                        disabled={isLoading}
                    >
                        <Save className="w-5 h-5" /> {isLoading ? "Syncing..." : "Publish Article"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
