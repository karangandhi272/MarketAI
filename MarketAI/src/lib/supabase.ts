import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iegvfxrzqyxehopwqjug.supabase.co' ;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZ3ZmeHJ6cXl4ZWhvcHdxanVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODA0MjUsImV4cCI6MjA1OTY1NjQyNX0.JKEKioRbYoWNSdrPls3BpPJLM75IVu8CFo-k-kSMeUM';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
