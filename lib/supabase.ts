// lib/supabase.ts
import {createClient as createSbClient} from '@supabase/supabase-js';

// Only ever use the ANON key in frontend/Next code.
// The service role key must not be exposed to the client.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton (fine for app dir usage)
const singleton = createSbClient(supabaseUrl, supabaseAnon, {
  auth: {persistSession: false}
});

// Named export for places that import { createClient }
export function createClient() {
  return singleton;
}

// Also export the singleton in case some files import { supabase }
export const supabase = singleton;

export type SupabaseClient = ReturnType<typeof createSbClient>;
