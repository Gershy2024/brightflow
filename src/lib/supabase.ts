import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://piztrhqoihaekujrclyt.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpenRyaHFvaWhhZWt1anJjbHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNDk2OTQsImV4cCI6MjEwNjcyNTY5NH0.aQrpU19jHleyg8DWOE2B171IZIz6SPOwW0V9Ha22P4g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
