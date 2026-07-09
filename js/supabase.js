/* ═══════════════════════════════════════
   js/supabase.js — Supabase client & data
═══════════════════════════════════════ */
const DB = (() => {
  let client = null;

  const configured =
    CONFIG.SUPABASE_URL &&
    CONFIG.SUPABASE_URL !== 'https://YOUR_PROJECT_ID.supabase.co' &&
    CONFIG.SUPABASE_ANON &&
    CONFIG.SUPABASE_ANON !== 'YOUR_SUPABASE_ANON_KEY';

  function showDbError(message) {
    const grid = document.getElementById('productGrid');
    if (grid) {
      grid.innerHTML = `
        <div style="padding:16px;border:1px solid #f5c2c7;background:#fff3f4;color:#842029;border-radius:12px;">
          ${message}
        </div>
      `;
    }
  }

  async function fetchProducts() {
    try {
      const { data, error } = await client
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const normalised = (data || []).map((p) => ({
        ...p,
        category: (p.category || '').toLowerCase(),
        bg: p.bg_color || '#6A1B9A',
        colors: Array.isArray(p.colors) ? p.colors : JSON.parse(p.colors || '[]'),
        sizes: Array.isArray(p.sizes) ? p.sizes : JSON.parse(p.sizes || '[]'),
      }));

      Products.load(normalised);
    } catch (err) {
      console.error('Products fetch failed:', err);
      showDbError(`Failed to load products: ${err.message}`);
    }
  }

  function init() {
    if (!configured) {
      console.error('Satyabhama: Supabase not configured.');
      showDbError('Supabase is not configured. Update js/config.js with your project URL and anon key.');
      return;
    }

    try {
      client = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON);

      client.auth.onAuthStateChange((_event, session) => {
        if (window.Auth && typeof Auth.handleSession === 'function') {
          Auth.handleSession(session);
        }
      });

      fetchProducts();
    } catch (err) {
      console.error('Supabase init failed:', err);
      showDbError(`Supabase init failed: ${err.message}`);
    }
  }

  async function signInWithEmail(email, password) {
    if (!client) return { error: { message: 'Supabase not initialized' } };
    return client.auth.signInWithPassword({ email, password });
  }

  async function signUpWithEmail(email, password, fullName) {
    if (!client) return { error: { message: 'Supabase not initialized' } };
    return client.auth.signUp({
      email,
      password,
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

  return {
    init,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    isConfigured: configured,
  };
})();
