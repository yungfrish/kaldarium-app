import "react-native-url-polyfill/auto";
import { KALDARIUM_SUPABASE_URL, KALDARIUM_SUPABASE_ANON_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { setupURLPolyfill } from "react-native-url-polyfill";

setupURLPolyfill();

const supabaseUrl = KALDARIUM_SUPABASE_URL;
const supabaseAnonKey = KALDARIUM_SUPABASE_ANON_KEY;

// Better put your these secret keys in .env file
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // for example can use @react-native-async-storage/async-storage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
