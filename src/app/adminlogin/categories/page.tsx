"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Plus, Edit, Trash, Search, Loader2, Layers, X, ChevronRight, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveCategory, deleteCategory } from "./actions";
import * as Icons from "lucide-react";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    const [formData, setFormData] = useState<Partial<Category>>({
        name: "",
        slug: "",
        description: "",
        icon: "Package",
        parent_id: undefined,
        display_order: 0,
        is_active: true
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('display_order', { ascending: true });

        if (!error && data) {
            setCategories(data);
        }
        setLoading(false);
    };

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCategories(newExpanded);
    };

    const handleOpenDialog = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData(category);
        } else {
            setEditingCategory(null);
            setFormData({
                name: "",
                slug: "",
                description: "",
                icon: "Package",
                parent_id: undefined,
                display_order: categories.length,
                is_active: true
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const result = await saveCategory(formData, editingCategory?.id);

            if (!result.success) {
                throw new Error(result.error);
            }

            await fetchCategories();
            setIsDialogOpen(false);
        } catch (error: any) {
            alert("Error saving category: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will not delete products, but they will become uncategorized.")) return;
        try {
            const result = await deleteCategory(id);
            if (!result.success) throw new Error(result.error);
            setCategories(categories.filter(c => c.id !== id));
        } catch (error: any) {
            alert("Error deleting category: " + error.message);
        }
    };

    const renderCategoryRow = (category: Category, depth = 0) => {
        const subcats = categories.filter(c => c.parent_id === category.id);
        const isExpanded = expandedCategories.has(category.id);
        const Icon = (Icons as any)[category.icon || "Package"] || Icons.Package;

        return (
            <div key={category.id} className="space-y-1">
                <div
                    className={`flex items-center justify-between p-3 rounded-lg border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/30 transition-all group`}
                    style={{ marginLeft: `${depth * 2}rem` }}
                >
                    <div className="flex items-center gap-4">
                        {subcats.length > 0 ? (
                            <button onClick={() => toggleExpand(category.id)} className="p-1 hover:bg-slate-700 rounded transition-colors">
                                {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                            </button>
                        ) : (
                            <div className="w-6" />
                        )}
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                            <Icon className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-200">{category.name}</h4>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black italic">{category.slug}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(category)} className="h-8 w-8 text-slate-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)} className="h-8 w-8 text-slate-400 hover:text-rose-400">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {isExpanded && subcats.map(sub => renderCategoryRow(sub, depth + 1))}
            </div>
        );
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    const parentCategories = categories.filter(c => !c.parent_id);

    return (
        <div className="space-y-8 animate-in fade-in duration-700 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500 uppercase italic">
                        Category Architecture
                    </h2>
                    <p className="text-slate-400 mt-1">Organize your hardware into a logical hierarchy.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="h-11 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 font-black tracking-tighter italic">
                    <Plus className="mr-2 h-4 w-4" /> NEW CATEGORY
                </Button>
            </div>

            <div className="space-y-3">
                {parentCategories.length === 0 ? (
                    <Card className="bg-slate-900/50 border-slate-800 py-20 text-center">
                        <Layers className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No categories created yet.</p>
                    </Card>
                ) : (
                    parentCategories.map(cat => renderCategoryRow(cat))
                )}
            </div>

            {/* Category Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
                    <Card className="w-full max-w-xl bg-slate-900 border-slate-800 shadow-2xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-black italic uppercase">{editingCategory ? "Edit Category" : "New Category"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Name</Label>
                                    <Input
                                        required
                                        className="bg-slate-950 border-slate-800 text-white"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Slug (Optional)</Label>
                                    <Input
                                        placeholder="auto-generated"
                                        className="bg-slate-950 border-slate-800 font-mono text-xs text-white"
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Parent Category</Label>
                                        <Select
                                            value={formData.parent_id || "none"}
                                            onValueChange={val => setFormData({ ...formData, parent_id: val === "none" ? undefined : val })}
                                        >
                                            <SelectTrigger className="bg-slate-950 border-slate-800">
                                                <SelectValue placeholder="None (Top Level)" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                                <SelectItem value="none">None (Top Level)</SelectItem>
                                                {categories.filter(c => c.id !== editingCategory?.id && !c.parent_id).map(c => (
                                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Icon (Lucide)</Label>
                                        <Select
                                            value={formData.icon || "Package"}
                                            onValueChange={val => setFormData({ ...formData, icon: val })}
                                        >
                                            <SelectTrigger className="bg-slate-950 border-slate-800">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-slate-800 max-h-[300px] text-white">
                                                {["Package", "Wrench", "Ham", "Hammer", "Settings", "Zap", "Shield", "Cpu", "HardDrive", "Keyboard", "Mouse", "Monitor", "Headphones", "Speaker"].sort().map(icon => (
                                                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Description</Label>
                                    <Textarea
                                        className="bg-slate-950 border-slate-800 h-20 text-white"
                                        value={formData.description || ""}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Display Order</Label>
                                        <Input
                                            type="number"
                                            className="bg-slate-950 border-slate-800 text-white"
                                            value={formData.display_order}
                                            onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-8">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={formData.is_active}
                                            onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                            className="accent-blue-600"
                                        />
                                        <Label htmlFor="is_active" className="text-xs font-bold uppercase tracking-widest text-slate-400">Active</Label>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold text-slate-500">CANCEL</Button>
                            <Button type="submit" form="category-form" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 font-bold italic">
                                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                {editingCategory ? "UPDATE" : "SAVE"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
