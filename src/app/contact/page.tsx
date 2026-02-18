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
        <div className="min-h-screen bg-background text-foreground py-8 lg:py-24 relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-8 md:mb-16 max-w-2xl mx-auto space-y-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-2">
                        Get in Touch
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">Let's Connect</h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-sm md:max-w-none mx-auto font-medium">
                        Have a question about your setup? Need help with an order? We would love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-stretch">

                    {/* Contact Form Card */}
                    <div className="bg-card backdrop-blur-md border border-border rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500" />

                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                <div className="bg-green-100 p-5 rounded-full">
                                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground mb-2">Message Sent!</h2>
                                    <p className="text-muted-foreground max-w-sm text-lg">
                                        Thank you for reaching out. We've received your message and will get back to you shortly.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-6 border-input hover:bg-muted"
                                >
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 md:mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Send us a message</h2>
                                    <p className="text-muted-foreground text-sm font-medium">We typically reply within 2 hours during business hours.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">First Name</label>
                                            <Input
                                                required
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-12"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Last Name</label>
                                            <Input
                                                required
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-12"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Email Address</label>
                                            <Input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-12"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Phone Number</label>
                                            <Input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-12"
                                                placeholder="+977 98..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Message</label>
                                        <Textarea
                                            required
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary min-h-[150px] resize-none"
                                            placeholder="Tell us what you need help with..."
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-medium flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-primary-foreground rounded-xl"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" /> Send Message
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
                            <div className="flex items-start gap-5 p-6 md:p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all group">
                                <div className="bg-primary/10 p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg md:text-xl text-foreground mb-2">Visit Our Store</h3>
                                    <p className="text-base text-muted-foreground leading-relaxed mb-4 font-medium">
                                        {settings.store_address || "Nacche Galli, New Baneshwor"}<br />
                                        Kathmandu, Nepal <br />
                                        <span className="text-sm text-primary/80 mt-1 block font-bold">(Opposite to Eyeplex Mall)</span>
                                    </p>
                                    <Button variant="outline" size="sm" className="h-9 text-xs border-primary/30 text-primary hover:text-primary-foreground hover:bg-primary font-bold uppercase tracking-wider" asChild>
                                        <a href="https://maps.app.goo.gl/4mkxN8o4vL8Sr1hn9" target="_blank" rel="noopener noreferrer">
                                            View on Map
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 p-6 md:p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all group">
                                <div className="bg-orange-100 p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg md:text-xl text-foreground mb-2">Call Support</h3>
                                    <p className="text-base text-muted-foreground font-medium">
                                        {settings.store_phone || "+977 9800000000"} <br />
                                        <span className="text-sm text-muted-foreground/70">Sun - Fri, 10am - 7pm</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 p-6 md:p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all group">
                                <div className="bg-amber-100 p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg md:text-xl text-foreground mb-2">Email Us</h3>
                                    <p className="text-base text-muted-foreground break-all font-medium">
                                        {settings.store_email || "laptopaccessoriesnepal@gmail.com"} <br />
                                        <span className="text-sm text-muted-foreground/70">Business inquiries & Bulk orders</span>
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
