"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Globe, Phone, Mail, MapPin, ShieldCheck, RefreshCcw, Facebook, Instagram, QrCode, Plus, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingQr, setUploadingQr] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('store_settings').select('*');
        if (!error && data) {
            const settingsMap = data.reduce((acc, curr) => ({
                ...acc,
                [curr.key]: curr.value
            }), {});
            setSettings(settingsMap);
        }
        setLoading(false);
    };

    const handleInputChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const keys = Object.keys(settings);
            const upsertData = keys.map(key => ({ key, value: settings[key] }));
            const { error } = await supabase.from('store_settings').upsert(upsertData, { onConflict: 'key' });
            if (error) throw error;
        } catch (error: any) {
            alert("Error saving settings: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, folder: string = 'settings') => {
        if (!e.target.files || e.target.files.length === 0) return;

        // dynamic loading state handling could be improved, but for now we'll just set saving to indicate activity
        setSaving(true);

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${key}_${Math.random()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('store-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('store-assets')
                .getPublicUrl(filePath);

            handleInputChange(key, publicUrl);
        } catch (error: any) {
            alert(`Error uploading ${key}: ` + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500 uppercase italic">
                        Terminal Config
                    </h2>
                    <p className="text-slate-400 mt-1 font-medium">Control the core parameters of your digital workspace.</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="hidden md:flex h-12 px-8 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/40 font-black tracking-tighter italic">
                    {saving ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Save className="mr-3 h-5 w-5" />}
                    COMMIT CHANGES
                </Button>
            </div>

            <div className="grid gap-8">
                {/* Visual Identity & Homepage */}
                <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-black flex items-center gap-3 italic">
                            <div className="p-2 bg-purple-500/10 rounded-lg"><ImageIcon className="h-5 w-5 text-purple-500" /></div>
                            Visual Identity & Homepage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Logo Upload */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Brand Insignia (Logo)</label>
                                <div className="flex items-start gap-4">
                                    {settings.site_logo ? (
                                        <div className="relative h-24 w-24 bg-slate-950 rounded-xl border border-slate-800 p-2 group overflow-hidden">
                                            <div className="relative h-full w-full">
                                                <Image src={settings.site_logo} alt="Logo" fill className="object-contain" />
                                            </div>
                                            <button
                                                onClick={() => handleInputChange('site_logo', '')}
                                                className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="h-24 w-24 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 hover:border-purple-600/30 transition-all group">
                                            <Plus className="h-6 w-6 text-slate-700 group-hover:text-purple-500" />
                                            <span className="text-[8px] mt-1 text-slate-700 font-bold uppercase">Upload</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'site_logo')} />
                                        </label>
                                    )}
                                    <div className="flex-1 text-xs text-slate-500 leading-relaxed pt-2">
                                        Upload your transparent PNG logo. This will be displayed on the navigation bar and footer.
                                    </div>
                                </div>
                            </div>

                            {/* Hero Banner Upload */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Main Framework Background (Hero)</label>
                                <div className="space-y-3">
                                    {settings.hero_banner ? (
                                        <div className="relative h-32 w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group">
                                            <Image src={settings.hero_banner} alt="Hero" fill className="object-cover" />
                                            <button
                                                onClick={() => handleInputChange('hero_banner', '')}
                                                className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="h-32 w-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 hover:border-purple-600/30 transition-all group">
                                            <ImageIcon className="h-8 w-8 text-slate-700 group-hover:text-purple-500" />
                                            <span className="text-[10px] mt-2 text-slate-700 font-bold uppercase">Upload 1920x1080 Asset</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero_banner')} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/50">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Landing Title</label>
                                <Input className="bg-slate-950 border-slate-800 h-11 focus:border-purple-600/50 transition-all font-bold" placeholder="E.g. NEXT GEN GAMING" value={settings.hero_title || ""} onChange={(e) => handleInputChange('hero_title', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Landing Subtitle</label>
                                <Input className="bg-slate-950 border-slate-800 h-11 font-medium" placeholder="Short tagline..." value={settings.hero_subtitle || ""} onChange={(e) => handleInputChange('hero_subtitle', e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* About Page Assets */}
                <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-black flex items-center gap-3 italic">
                            <div className="p-2 bg-pink-500/10 rounded-lg"><ImageIcon className="h-5 w-5 text-pink-500" /></div>
                            About Page Visuals
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Hero Portrait</label>
                                {settings.about_hero ? (
                                    <div className="relative h-48 w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group">
                                        <Image src={settings.about_hero} alt="About Hero" fill className="object-cover" />
                                        <button
                                            onClick={() => handleInputChange('about_hero', '')}
                                            className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="h-48 w-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 hover:border-pink-600/30 transition-all group">
                                        <ImageIcon className="h-8 w-8 text-slate-700 group-hover:text-pink-500" />
                                        <span className="text-[10px] mt-2 text-slate-700 font-bold uppercase">Upload Portrait</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'about_hero')} />
                                    </label>
                                )}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Story / Team Shot</label>
                                {settings.about_story ? (
                                    <div className="relative h-48 w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group">
                                        <Image src={settings.about_story} alt="About Story" fill className="object-cover" />
                                        <button
                                            onClick={() => handleInputChange('about_story', '')}
                                            className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="h-48 w-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 hover:border-pink-600/30 transition-all group">
                                        <ImageIcon className="h-8 w-8 text-slate-700 group-hover:text-pink-500" />
                                        <span className="text-[10px] mt-2 text-slate-700 font-bold uppercase">Upload Landscape</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'about_story')} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* General Info */}
                    <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-black flex items-center gap-3 italic">
                                <div className="p-2 bg-blue-500/10 rounded-lg"><Globe className="h-5 w-5 text-blue-500" /></div>
                                General Intel
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Store Name</label>
                                <Input className="bg-slate-950 border-slate-800 h-11 focus:border-blue-600/50 transition-all font-bold" value={settings.store_name || ""} onChange={(e) => handleInputChange('store_name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Store Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                                    <Input className="bg-slate-950 border-slate-800 h-11 pl-10 focus:border-blue-600/50" value={settings.store_address || ""} onChange={(e) => handleInputChange('store_address', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Phone Number</label>
                                    <Input className="bg-slate-950 border-slate-800 h-11 font-medium" value={settings.store_phone || ""} onChange={(e) => handleInputChange('store_phone', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Email Address</label>
                                    <Input className="bg-slate-950 border-slate-800 h-11 font-medium" value={settings.store_email || ""} onChange={(e) => handleInputChange('store_email', e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Branding / Legal */}
                    <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-black flex items-center gap-3 italic">
                                <div className="p-2 bg-emerald-500/10 rounded-lg"><ShieldCheck className="h-5 w-5 text-emerald-500" /></div>
                                Protocols & Rules
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Assurance Policy (Warranty)</label>
                                <Textarea className="bg-slate-950 border-slate-800 min-h-[92px] resize-none leading-relaxed" value={settings.warranty_policy || ""} onChange={(e) => handleInputChange('warranty_policy', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Redemption Protocol (Return)</label>
                                <Textarea className="bg-slate-950 border-slate-800 min-h-[92px] resize-none leading-relaxed" value={settings.return_policy || ""} onChange={(e) => handleInputChange('return_policy', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Social Logic */}
                    <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-black flex items-center gap-3 italic text-slate-400">
                                <div className="p-2 bg-slate-800 rounded-lg"><Globe className="h-5 w-5 text-slate-400" /></div>
                                Social Extension
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">FB Data Feed</label>
                                <div className="relative">
                                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                                    <Input className="bg-slate-950 border-slate-800 h-11 pl-10" value={settings.facebook_url || ""} onChange={(e) => handleInputChange('facebook_url', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">IG Visual Hub</label>
                                <div className="relative">
                                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-600" />
                                    <Input className="bg-slate-950 border-slate-800 h-11 pl-10" value={settings.instagram_url || ""} onChange={(e) => handleInputChange('instagram_url', e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Financial QR */}
                    <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-black flex items-center gap-3 italic">
                                <div className="p-2 bg-amber-500/10 rounded-lg"><QrCode className="h-5 w-5 text-amber-500" /></div>
                                Financial Gateway
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {settings.payment_qr_url ? (
                                    <div className="relative h-40 w-40 p-2 bg-white rounded-2xl shadow-2xl group overflow-hidden">
                                        <div className="relative h-full w-full">
                                            <Image src={settings.payment_qr_url} alt="Payment QR" fill className="object-cover rounded-lg" />
                                        </div>
                                        <button
                                            onClick={() => handleInputChange('payment_qr_url', '')}
                                            className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="h-40 w-40 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 hover:border-blue-600/30 transition-all group">
                                        <Plus className="h-8 w-8 text-slate-800 group-hover:text-blue-500" />
                                        <span className="text-[10px] mt-2 text-slate-700 font-black uppercase tracking-tighter group-hover:text-slate-400">Inject QR Asset</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'payment_qr_url')} />
                                    </label>
                                )}
                                <div className="flex-1 space-y-2 text-center sm:text-left">
                                    <h4 className="font-bold text-white uppercase italic tracking-tighter">Terminal QR Link</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        Upload your Fonepay or Bank QR token. This asset is strictly utilized for client-side transaction verification at checkout.
                                    </p>
                                    <div className="pt-2">
                                        <Badge variant="outline" className="text-[9px] font-black tracking-widest uppercase border-slate-800 text-slate-500 gap-1.5 flex w-fit">
                                            <ShieldCheck className="h-2.5 w-2.5" />
                                            Secure Protocol
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800 z-50 flex items-center justify-between gap-4">
                <p className="text-xs text-slate-400 font-medium">
                    {Object.keys(settings).length} configs ready
                </p>
                <Button onClick={handleSave} disabled={saving} className="flex-1 shadow-lg shadow-blue-900/20 bg-blue-600 hover:bg-blue-700 font-bold">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    COMMIT CHANGES
                </Button>
            </div>
        </div>
    );
}
