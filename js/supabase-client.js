// js/supabase-client.js
//
// Shared Supabase client used by every page on the site.
// Requires the Supabase JS library loaded first:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
//
// IMPORTANT: this file must load BEFORE js/data-supabase.js on every page,
// since data-supabase.js uses the `sbClient` created here.

const SUPABASE_URL = "https://pouqxxucucrptfvmnfzy.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_PUBLIC_KEY_HERE"; // Project Settings → API → anon public

const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
