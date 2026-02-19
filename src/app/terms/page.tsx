export default function TermsPage() {
    return (
        <div className="bg-background min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-8">
                    Terms & <span className="text-primary">Conditions</span>
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">2. Ordering & Payment</h2>
                        <p>
                            All orders placed through our website are subject to acceptance and availability. Prices are subject to change without notice. We accept various payment methods including cash on delivery and bank transfers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">3. Shipping & Delivery</h2>
                        <p>
                            We aim to deliver products within the estimated timeframe. However, we are not responsible for delays caused by third-party shipping services or other unforeseen circumstances.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">4. Returns & Refunds</h2>
                        <p>
                            If you are not satisfied with your purchase, you may be eligible for a return or exchange within a specified period. Please contact our support team for more information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property</h2>
                        <p>
                            The content, layout, and graphics on this website are owned by Laptop Accessories Nepal. Unauthorized reproduction is prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
                        <p>
                            Laptop Accessories Nepal shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
