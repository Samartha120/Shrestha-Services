import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

// Initialize Supabase Client using the validated environment parameters
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
