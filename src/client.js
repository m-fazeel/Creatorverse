import { createClient } from '@supabase/supabase-js';

const URL = process.env.VITE_SUPABASE_URL;
const API_KEY = process.env.VITE_SUPABASE_KEY;

export const supabase = createClient(URL, API_KEY);