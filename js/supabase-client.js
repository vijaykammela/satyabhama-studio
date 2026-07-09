// js/supabase-client.js
//
// Shared Supabase client used by login.html, signup.html, and account.html.
// Requires the Supabase JS library loaded first:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
//
// Fill in your real project URL + anon key from Supabase → Project
// Settings → API. Both are safe to expose in client-side code — the anon
// key can only do what your Row Level Security policies allow.

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
