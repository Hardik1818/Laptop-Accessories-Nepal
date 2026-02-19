"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

export async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!session || session !== adminPassword) {
        throw new Error("Unauthorized: Invalid session");
    }
}

export async function saveCategory(formData: any, editingId?: string) {
    await checkAuth();
    try {
        // Auto-generate slug if empty
        const slug = formData.slug || formData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const finalData = { ...formData, slug };

        if (editingId) {
            const { id, created_at, ...updateData } = finalData;
            const { error } = await supabase
                .from('categories')
                .update(updateData)
                .eq('id', editingId);

            if (error) throw error;
        } else {
            const { error } = await supabase
                .from('categories')
                .insert([finalData]);

            if (error) throw error;
        }

        revalidatePath('/adminlogin/categories');
        return { success: true };
    } catch (error: any) {
        console.error("Server Action Error:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteCategory(id: string) {
    await checkAuth();
    try {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/adminlogin/categories');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
