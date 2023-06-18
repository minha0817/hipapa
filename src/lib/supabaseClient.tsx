import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gzwroakkfulgmjhijyws.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6d3JvYWtrZnVsZ21qaGlqeXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2Nzk0OTEsImV4cCI6MjAwMjI1NTQ5MX0.hBtLKFdKk0PTl3jplGXvfCql6HPYqDSNxtELK8FAfD0"
);
