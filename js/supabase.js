/* ═══════════════════════════════════════
   js/supabase.js — Supabase client & data
═══════════════════════════════════════ */
const DB = (() => {
  let client = null;
  const configured = CONFIG.SUPABASE_URL !== 'https://YOUR_PROJECT_ID.supabase.co';

  function init() {
    if (!configured) {
      console.info('Satyabhama: Supabase not configured — using demo data.');
      Products.load(DEMO_PRODUCTS);
      return;
    }
    try {
      client = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON);

      /* Listen for auth state changes */
      client.auth.onAuthStateChange((_event, session) => {
        Auth.handleSession(session);
      });

      fetchProducts();
    } catch (err) {
      console.error('Supabase init failed:', err);
      Products.load(DEMO_PRODUCTS);
    }
  }

  /* ── Fetch all products ── */
  async function fetchProducts() {
    try {
      const { data, error } = await client
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      /* Normalise jsonb fields */
      const normalised = data.map(p => ({
        ...p,
        bg:     p.bg_color || '#6A1B9A',
        colors: Array.isArray(p.colors) ? p.colors : (JSON.parse(p.colors || '[]')),
        sizes:  Array.isArray(p.sizes)  ? p.sizes  : (JSON.parse(p.sizes  || '[]')),
      }));

      Products.load(normalised);
    } catch (err) {
      console.error('Products fetch failed:', err.message);
      Products.load(DEMO_PRODUCTS);
    }
  }

  /* ── Auth helpers ── */
  async function signInWithEmail(email, password) {
    if (!client) return { error: { message: 'Demo mode' } };
    return client.auth.signInWithPassword({ email, password });
  }

  async function signUpWithEmail(email, password, fullName) {
    if (!client) return { error: { message: 'Demo mode' } };
    return client.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    });
  }

  async function signInWithGoogle() {
    if (!client) return;
    await client.auth.signInWithOAuth({ provider: 'google' });
  }

  async function signOut() {
    if (!client) return;
    await client.auth.signOut();
  }

  return { init, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, isConfigured: configured };
})();
