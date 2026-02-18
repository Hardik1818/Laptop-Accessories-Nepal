"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Plus, Edit, Trash, Search, Image as ImageIcon, Loader2, Package, ShieldCheck, Cpu, Box, X } from "lucide-react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
        images: [],
        compatibility: "",
        warranty: "",
        is_featured: false,
        is_trending: false,
    });
    const [uploadingImage, setUploadingImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await supabase
            .from('categories')
            .select('*')
            .order('display_order', { ascending: true });

        if (data) {
            // Organize into tree: Parents -> Subcategories
            const parents = data.filter((c: any) => !c.parent_id);
            const tree = parents.map((p: any) => ({
                ...p,
                children: data.filter((c: any) => c.parent_id === p.id)
            }));
            setCategories(tree);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setProducts(data);
        }
        setLoading(false);
    };

    const handleOpenDialog = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                category: "",
                price: 0,
                stock: 0,
                description: "",
                images: [],
                compatibility: "",
                warranty: "",
                is_featured: false,
                is_trending: false,
            });
        }
        setIsDialogOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploadingImage(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('store-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('store-assets')
                .getPublicUrl(filePath);

            setFormData(prev => ({
                ...prev,
                images: [...(prev.images || []), publicUrl]
            }));
        } catch (error: any) {
            alert("Error uploading image: " + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images?.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingProduct) {
                const { id, created_at, ...updateData } = formData;
                const { error } = await supabase
                    .from('products')
                    .update(updateData)
                    .eq('id', editingProduct.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([formData]);
                if (error) throw error;
            }
            await fetchProducts();
            setIsDialogOpen(false);
        } catch (error: any) {
            alert("Error saving product: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setProducts(products.filter(p => p.id !== id));
        } catch (error: any) {
            alert("Error deleting product: " + error.message);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        Inventory
                    </h2>
                    <p className="text-slate-400 mt-1">Manage your catalog of high-performance hardware.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10 bg-slate-900/50 border-slate-800 transition-all h-11"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => handleOpenDialog()} className="h-11 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            {/* Excel-like Table View */}
            <div className="border border-slate-800 rounded-xl overflow-x-auto bg-slate-900/40 backdrop-blur-md">
                <Table className="w-full">
                    <TableHeader className="bg-slate-900/80">
                        <TableRow className="border-slate-800 hover:bg-slate-900/80">
                            <TableHead className="hidden md:table-cell text-slate-400 font-bold uppercase text-[10px] tracking-widest w-[80px]">Image</TableHead>
                            <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pl-4">Product Name</TableHead>
                            <TableHead className="hidden lg:table-cell text-slate-400 font-bold uppercase text-[10px] tracking-widest">Category</TableHead>
                            <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Price (NPR)</TableHead>
                            <TableHead className="hidden sm:table-cell text-slate-400 font-bold uppercase text-[10px] tracking-widest">Stock</TableHead>
                            <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-50">
                                        <Package className="h-12 w-12 text-slate-600 mb-2" />
                                        <p className="text-slate-500 font-medium">No inventory matches your search.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                                    <TableCell className="hidden md:table-cell p-2">
                                        <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                                            {product.images?.[0] ? (
                                                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                            ) : (
                                                <ImageIcon className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-700" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-200 pl-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="line-clamp-1">{product.name}</span>
                                                {product.is_featured && <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md font-bold tracking-wide">HERO</Badge>}
                                                {product.is_trending && <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md font-bold tracking-wide">TREND</Badge>}
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-normal line-clamp-1">{product.description?.substring(0, 50)}...</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <Badge variant="outline" className="text-xs bg-slate-900/50 text-slate-400 border-slate-700 font-normal">
                                            {product.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-blue-400 font-medium whitespace-nowrap">
                                        {product.price.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-1.5 w-1.5 rounded-full", product.stock > 0 ? "bg-emerald-500" : "bg-red-500")} />
                                            <span className={cn("text-xs font-medium", product.stock > 0 ? "text-emerald-500" : "text-rose-500")}>
                                                {product.stock}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)} className="h-8 w-8 text-slate-400 hover:text-white hover:bg-blue-600/20">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Product Editor Modal */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-0 md:p-4 overflow-y-auto animate-in fade-in duration-300">
                    <Card className="w-full max-w-3xl h-[100dvh] md:h-auto bg-slate-900 md:bg-slate-900/50 border-none md:border md:border-slate-800 shadow-none md:shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:max-h-[90vh]">
                        <CardHeader className="p-4 md:p-8 pb-4 relative shrink-0">
                            <Button variant="ghost" size="icon" className="absolute right-4 md:right-6 top-4 md:top-6 rounded-full hover:bg-slate-800/50" onClick={() => setIsDialogOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                            <CardTitle className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                            <CardDescription className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Fill in the details below</CardDescription>
                        </CardHeader>

                        <CardContent className="p-4 md:p-8 pt-4 overflow-y-auto flex-1">
                            <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Basic Information</label>
                                        <Input placeholder="Product Name" required className="bg-slate-950 border-slate-800 text-white h-12 text-lg font-bold placeholder:font-medium transition-all focus:border-blue-600/50" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Category</label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(val) => setFormData({ ...formData, category: val })}
                                            >
                                                <SelectTrigger className="bg-slate-950 border-slate-800 text-white h-11 font-medium italic">
                                                    <SelectValue placeholder="Choose Category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-slate-800 max-h-[300px]">
                                                    {categories.map((parent) => (
                                                        <SelectGroup key={parent.id}>
                                                            <SelectLabel className="text-slate-500 pl-2 py-1.5 text-[10px] uppercase tracking-widest font-black bg-slate-950/50 block w-full">{parent.name}</SelectLabel>
                                                            {parent.children?.map((child: any) => (
                                                                <SelectItem key={child.id} value={child.name} className="pl-4 text-slate-300 focus:bg-blue-600 focus:text-white cursor-pointer py-2">
                                                                    {child.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Stock Quantity</label>
                                            <Input type="number" placeholder="Enter stock amount" required className="bg-slate-950 border-slate-800 text-white h-11 font-medium" value={formData.stock} onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Price (NPR)</label>
                                        <Input type="number" placeholder="Enter price" required className="bg-slate-950 border-slate-800 text-white h-11 font-black text-blue-400" value={formData.price} onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Product Description</label>
                                        <Textarea placeholder="Tell us about this product..." className="bg-slate-950 border-slate-800 text-white h-32 resize-none leading-relaxed" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    </div>
                                    <div className="space-y-3 p-4 border border-slate-800 rounded-xl bg-slate-950/30">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Display Settings</label>
                                        <div className="flex gap-6">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="is_featured"
                                                    checked={formData.is_featured || false}
                                                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                                                    className="border-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                />
                                                <Label htmlFor="is_featured" className="text-sm font-medium text-slate-300">Feature on Homepage</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="is_trending"
                                                    checked={formData.is_trending || false}
                                                    onCheckedChange={(checked) => setFormData({ ...formData, is_trending: checked as boolean })}
                                                    className="border-slate-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                                />
                                                <Label htmlFor="is_trending" className="text-sm font-medium text-slate-300">Mark as Trending</Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Compatibility</label>
                                        <div className="relative">
                                            <Cpu className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                                            <Input placeholder="Works with (e.g. PC, Mobile, Laptops)" className="bg-slate-950 border-slate-800 text-white h-11 pl-10" value={formData.compatibility} onChange={e => setFormData({ ...formData, compatibility: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Warranty Information</label>
                                        <div className="relative">
                                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                                            <Input placeholder="e.g. 1 Year Warranty" className="bg-slate-950 border-slate-800 text-white h-11 pl-10" value={formData.warranty} onChange={e => setFormData({ ...formData, warranty: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Product Images</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {formData.images?.map((img, idx) => (
                                                <div key={idx} className="aspect-square relative rounded-xl border border-slate-800 overflow-hidden group/img shadow-2xl">
                                                    <Image src={img} alt="Product" fill className="object-cover transition-transform group-hover/img:scale-110" />
                                                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1.5 right-1.5 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-all shadow-lg">
                                                        <Trash className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            {(formData.images?.length || 0) < 6 && (
                                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/50 hover:bg-slate-950 hover:border-blue-600/30 cursor-pointer transition-all group overflow-hidden">
                                                    {uploadingImage ? <Loader2 className="h-5 w-5 animate-spin text-blue-500" /> : <Box className="h-5 w-5 text-slate-600 group-hover:text-blue-500" />}
                                                    <span className="text-[10px] mt-2 font-black uppercase text-slate-700 group-hover:text-slate-400 tracking-tighter">Add Image</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                                                </label>
                                            )}
                                        </div>
                                        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center mt-2 italic">Maximum 6 images allowed</p>
                                    </div>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="p-4 md:p-8 pt-0 flex justify-end gap-3 shrink-0">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-slate-500 hover:text-white font-bold h-12 px-6">CANCEL</Button>
                            <Button type="submit" form="product-form" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 px-6 md:px-10 h-12 text-sm md:text-md font-black italic tracking-tighter shadow-xl shadow-blue-900/40">
                                {submitting ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Plus className="mr-3 h-5 w-5" />}
                                {editingProduct ? "UPDATE PRODUCT" : "SAVE PRODUCT"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
