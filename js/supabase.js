import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://zkorijqwvfmbrdlhddgv.supabase.co'  // ← tu URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprb3JpanF3dmZtYnJkbGhkZGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNzU3MDMsImV4cCI6MjA5NTY1MTcwM30.DUE_KwY8fWQ8Sgvhcs4YgKIP_8NXuZWLWxloFZmaofQ'                 // ← tu anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)