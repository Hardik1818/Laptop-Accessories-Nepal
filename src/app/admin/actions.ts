"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    // In production, these should be environment variables:
    const adminEmail = process.env.ADMIN_EMAIL || "laptopaccessoriesnepal@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log(`[Login Debug] Attempt: ${email} (len=${email.length})`);
    console.log(`[Login Debug] Expected: ${adminEmail} (len=${adminEmail?.length})`);
    console.log(`[Login Debug] Password Match: ${password === adminPassword}`);

    // Simulate secure check (Timing attack resistant comparison is better, but simple equality okay for MVP)
    if (email === adminEmail && password === adminPassword) {
        const cookieStore = await cookies();

        // 1 Day Expiry
        const oneDay = 24 * 60 * 60 * 1000;

        // Set Secure HTTP-Only Cookie with the password as the token for verification
        cookieStore.set("admin_session", adminPassword || "authenticated", {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: oneDay
        });

        return { success: true };
    } else {
        return { success: false, message: "Invalid email or password" };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin");
}
