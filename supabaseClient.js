import { createClient } from "@supabase/supabase-js";
import { KALDARIUM_SUPABASE_URL, KALDARIUM_SUPABASE_ANON_KEY } from "@env";

const supabaseUrl = KALDARIUM_SUPABASE_URL;
const supabaseAnonKey = KALDARIUM_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
