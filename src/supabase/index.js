import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ybprkntjnkejerekxmit.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlicHJrbnRqbmtlamVyZWt4bWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIyMDA0NzUsImV4cCI6MTk3Nzc3NjQ3NX0.Fmj8hRdRN12SNCtcOsH3076uKaXIvlfJ5e0QkxLprKQ';

export default createClient(supabaseUrl, supabaseAnonToken);
