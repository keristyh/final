import { createClient } from '@supabase/supabase-js'

const URL = 'https://ygmrudsmpfbhvoenybpx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbXJ1ZHNtcGZiaHZvZW55YnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNzcyMDIsImV4cCI6MjA2MDk1MzIwMn0.arAA1VC2NU3NlqR4DGVnWsgVsYHiOKlLuqVOUQenh2g';

export const supabase = createClient(URL, API_KEY);