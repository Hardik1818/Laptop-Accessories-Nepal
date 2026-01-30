"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions/email";
import { useSettings } from "@/context/SettingsContext";

export default function ContactPage() {
    const { settings } = useSettings();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await sendContactEmail(formData);
            if (result.success) {
                setIsSubmitted(true);
                setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
            } else {
                setError(result.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-8 lg:py-24 relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-8 md:mb-16 max-w-2xl mx-auto space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Let's Connect</h1>
                    <p className="text-base md:text-lg text-slate-400 max-w-sm md:max-w-none mx-auto">
                        Have a question about your setup? Need help with an order? We would love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-stretch">

                    {/* Contact Form Card */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                                <div className="bg-green-500/20 p-4 rounded-full">
                                    <CheckCircle2 className="h-12 w-12 text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                                <p className="text-slate-400 max-w-sm">
                                    Thank you for reaching out. We've received your message and will get back to you shortly.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-6 border-white/10 hover:bg-white/5"
                                >
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 md:mb-8">
                                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Send us a message</h2>
                                    <p className="text-slate-400 text-sm">We typically reply within 2 hours during business hours.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">First Name</label>
                                            <Input
                                                required
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 h-11"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Last Name</label>
                                            <Input
                                                required
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 h-11"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                                            <Input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 h-11"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Phone Number</label>
                                            <Input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 h-11"
                                                placeholder="+977 98..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Message</label>
                                        <Textarea
                                            required
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 min-h-[150px] resize-none"
                                            placeholder="Tell us what you need help with..."
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-900/20"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" /> Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* Contact Info & Map Placeholder */}
                    <div className="flex flex-col justify-between space-y-8 lg:space-y-12">

                        {/* Info Cards */}
                        <div className="grid gap-4 md:gap-6">
                            <div className="flex items-start gap-4 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="bg-blue-500/20 p-3 rounded-xl shrink-0">
                                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg text-white mb-1">Visit Our Store</h3>
                                    <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-3">
                                        {settings.store_address || "Nacche Galli, New Baneshwor"}<br />
                                        Kathmandu, Nepal <br />
                                        <span className="text-xs text-slate-500 mt-2 block">(Opposite to Eyeplex Mall)</span>
                                    </p>
                                    <Button variant="outline" size="sm" className="h-8 text-xs border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-500/20" asChild>
                                        <a href="https://maps.app.goo.gl/4mkxN8o4vL8Sr1hn9" target="_blank" rel="noopener noreferrer">
                                            View on Map
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="bg-purple-500/20 p-3 rounded-xl shrink-0">
                                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg text-white mb-1">Call Support</h3>
                                    <p className="text-sm md:text-base text-slate-400">
                                        {settings.store_phone || "+977 9800000000"} <br />
                                        <span className="text-xs md:text-sm text-slate-500">Sun - Fri, 10am - 7pm</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="bg-green-500/20 p-3 rounded-xl shrink-0">
                                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg text-white mb-1">Email Us</h3>
                                    <p className="text-sm md:text-base text-slate-400 break-all">
                                        {settings.store_email || "laptopaccessoriesnepal@gmail.com"} <br />
                                        <span className="text-xs md:text-sm text-slate-500">Business inquiries & Bulk orders</span>
                                    </p>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}
