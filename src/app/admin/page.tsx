"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError("");

        const result = await loginAction(formData);

        if (result.success) {
            router.push("/admin/dashboard");
        } else {
            setError(result.message || "Login failed");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <Card className="w-full max-w-sm bg-slate-900 border-slate-800 text-slate-100 shadow-2xl">
                <CardHeader className="space-y-4 pb-6">
                    <div className="flex justify-center">
                        <div className="p-4 bg-blue-600/20 rounded-full ring-1 ring-blue-500/50">
                            <Lock className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="space-y-2 text-center">
                        <CardTitle className="text-3xl font-bold tracking-tight">Admin Login</CardTitle>
                        <CardDescription className="text-slate-400">
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </div>
                </CardHeader>
                <form action={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="pl-9 bg-slate-950 border-slate-800 focus:border-blue-500 transition-colors h-11"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="bg-slate-950 border-slate-800 focus:border-blue-500 transition-colors h-11"
                            />
                        </div>
                        {error && (
                            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center font-medium animate-in fade-in slide-in-from-top-1">
                                {error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="pt-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base font-medium shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]" type="submit" disabled={loading}>
                            {loading ? "Verifying..." : "Sign In"}
                        </Button>
                    </CardFooter>
                </form>
                <div className="pb-6 text-center space-y-4">
                    <p className="text-xs text-slate-600">Authorized personnel only.</p>
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
                    </Link>
                </div>
            </Card>
        </div>
    );
}
