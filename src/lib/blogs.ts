import { supabase } from './supabase';
import { BlogPost } from '@/types';

export async function getPublishedBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
    return data as BlogPost[];
}

export async function getBlogBySlug(slug: string) {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching blog by slug:', error);
        return null;
    }
    return data as BlogPost;
}

export async function getAllBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all blogs:', error);
        return [];
    }
    return data as BlogPost[];
}

export async function getBlogById(id: string) {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching blog by id:', error);
        return null;
    }
    return data as BlogPost;
}
