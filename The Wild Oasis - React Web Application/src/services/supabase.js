import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://koliplszxmmpbmlktoqv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbGlwbHN6eG1tcGJtbGt0b3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NTc3NDQsImV4cCI6MjAzNTUzMzc0NH0.r1xXzcHG9ke34Z-CzseoYRd4AUDbdTIsEYsro_FTAKk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
