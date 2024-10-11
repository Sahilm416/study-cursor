import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const supa = createSupabaseClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
