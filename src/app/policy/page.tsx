import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";

export default function PolicyPage() {
    return (
        <div className="bg-background min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-8">
                    Privacy <span className="text-primary">Policy</span>
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
                        <p>
                            Welcome to Laptop Accessories Nepal. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">2. Information Collection</h2>
                        <p>
                            We collect information when you register on our site, place an order, or subscribe to our newsletter. This includes your name, email address, phone number, and shipping address.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">3. Use of Information</h2>
                        <p>
                            Any information we collect may be used to process transactions, improve our website, and send periodic emails regarding your order or other products and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
                        <p>
                            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">5. Cookies</h2>
                        <p>
                            Our site uses cookies to enhance the user experience. By using our site, you consent to our use of cookies as described in our cookie policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">6. Third-Party Disclosure</h2>
                        <p>
                            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website and conducting our business.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
