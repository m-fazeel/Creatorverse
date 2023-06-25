import { createClient } from '@supabase/supabase-js';

const URL = "https://ltsuerhgiwrvsjfwjgax.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c3VlcmhnaXdydnNqZndqZ2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxMDgwNDIsImV4cCI6MjAwMjY4NDA0Mn0.QVlRTKv2mMMxSjkkApfqPaEuiydcsOiB6p5hpVTa_rQ"

export const supabase = createClient(URL, API_KEY);