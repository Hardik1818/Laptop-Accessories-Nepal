import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Add options to help with schema detection
export const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
        schema: 'public'
    },
    auth: {
        persistSession: false
    }
})

// Log configuration for debugging
if (typeof window === 'undefined') {
    console.log('Supabase Client Configuration:');
    console.log('URL:', supabaseUrl);
    console.log('Key exists:', !!supabaseKey);
    console.log('Schema: public');
}
