/* ═══════════════════════════════════════
   js/auth.js — Authentication
═══════════════════════════════════════ */
const Auth = (() => {
  let currentUser = null;
  let googleReady = false;
  let googleInitPromise = null;

  const GOOGLE_CLIENT_ID = '1001273920716-5gam51jcf8gu2n9gr82tu1ar7rpq3hg2.apps.googleusercontent.com';

  /* ── Called by Supabase onAuthStateChange ── */
  function handleSession(session) {
    currentUser = session?.user ?? null;
    if (currentUser) showProfile();
    else showAuthForm();
  }

  /* ── Load Google's browser identity library once ── */
  function loadGoogleIdentityScript() {
    if (googleInitPromise) return googleInitPromise;

    googleInitPromise = new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        googleReady = true;
        resolve();
        return;
      }

      const existing = document.querySelector('script[data-google-identity]');
      if (existing) {
        existing.addEventListener('load', () => {
          googleReady = true;
          resolve();
        }, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.dataset.googleIdentity = 'true';
      script.onload = () => {
        googleReady = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Could not load Google Sign-In'));
      document.head.appendChild(script);
    });

    return googleInitPromise;
  }

  /* ── Create a fresh nonce for Google ID-token sign-in ── */
  async function createGoogleNonce() {
    const raw = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoded = new TextEncoder().encode(raw);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashed = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return { raw, hashed };
  }

  /* ── Add Google Identity Services button once ── */
  async function ensureGoogleButton() {
    const flow = document.getElementById('authFlow');
    if (!flow || document.getElementById('googleAuthWrap')) return;

    const wrap = document.createElement('div');
    wrap.id = 'googleAuthWrap';
    wrap.style.cssText = 'margin:0 0 20px;';
    wrap.innerHTML = `
      <div id="googleAuthBtn" style="width:100%;display:flex;justify-content:center;"></div>
      <div style="display:flex;align-items:center;gap:10px;margin:16px 0;color:rgba(255,255,255,.45);font:11px/1 DM Sans,Arial,sans-serif;">
        <span style="height:1px;flex:1;background:rgba(255,255,255,.12)"></span><span>OR</span><span style="height:1px;flex:1;background:rgba(255,255,255,.12)"></span>
      </div>`;

    flow.insertBefore(wrap, flow.firstElementChild);

    if (!DB.isConfigured) return;

    try {
      await loadGoogleIdentityScript();
      const { raw, hashed } = await createGoogleNonce();
      const button = document.getElementById('googleAuthBtn');
      if (!button || !window.google?.accounts?.id) return;

      button.dataset.googleNonce = raw;

      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          await googleCredentialLogin(response.credential, raw);
        },
        nonce: hashed,
        use_fedcm_for_prompt: true,
      });

      google.accounts.id.renderButton(button, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        width: Math.min(360, Math.max(240, flow.clientWidth || 320)),
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      });

      googleReady = true;
    } catch (error) {
      console.error('Google Identity Services setup failed:', error);
      UI.showToast('Google sign-in is temporarily unavailable');
    }
  }

  async function googleCredentialLogin(credential, rawNonce) {
    const button = document.getElementById('googleAuthBtn');
    if (button) button.style.opacity = '.65';

    try {
      const { data, error } = await DB.signInWithGoogleCredential(credential, rawNonce);
      if (error) throw error;
      if (data?.user) {
        currentUser = data.user;
        showProfile();
        UI.showToast('Welcome!');
      }
    } catch (error) {
      console.error('Google ID-token sign-in failed:', error);
      UI.showToast('Google sign-in failed: ' + (error?.message || 'Please try again'));
      if (button) button.style.opacity = '1';
    }
  }

  /* ── Email sign-in ── */
  async function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPass').value;

    if (!email || !pass) { UI.showToast('Please fill in all fields'); return; }

    if (!DB.isConfigured) {
      currentUser = { email, user_metadata: { full_name: _nameFromEmail(email) } };
      showProfile();
      UI.showToast('Signed in (demo mode)');
      return;
    }

    const { error } = await DB.signInWithEmail(email, pass);
    if (error) UI.showToast('Error: ' + error.message);
    else UI.showToast('Welcome back!');
  }

  /* ── Email register ── */
  async function register() {
    const name  = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass  = document.getElementById('regPass').value;

    if (!name || !email || !pass) { UI.showToast('Please fill in all fields'); return; }
    if (pass.length < 8)          { UI.showToast('Password must be 8+ characters'); return; }

    if (!DB.isConfigured) {
      currentUser = { email, user_metadata: { full_name: name } };
      showProfile();
      UI.showToast(`Welcome, ${name}!`);
      return;
    }

    const { error } = await DB.signUpWithEmail(email, pass, name);
    if (error) UI.showToast('Error: ' + error.message);
    else UI.showToast('Account created — check your email!');
  }

  /* ── Legacy Google entry point kept for existing onclick handlers ── */
  async function googleLogin() {
    if (!DB.isConfigured) {
      currentUser = { email: 'demo@satyabhama.com', user_metadata: { full_name: 'Demo User' } };
      showProfile();
      UI.showToast('Signed in with Google (demo)');
      return;
    }

    // Only prepare the embedded Google button.
    // Do not call google.accounts.id.prompt(), which creates the
    // "Continue as ..." account chooser at the top of the login panel.
    if (!googleReady) await ensureGoogleButton();
  }

  /* ── Sign out ── */
  async function logout() {
    await DB.signOut();
    currentUser = null;
    showAuthForm();
    UI.showToast('Signed out successfully');
  }

  /* ── Tab switching ── */
  function switchTab(tab) {
    ['Login', 'Reg'].forEach(t => {
      document.getElementById('tab'   + t).classList.toggle('active', (tab === 'login' && t === 'Login') || (tab === 'register' && t === 'Reg'));
      document.getElementById('panel' + t).classList.toggle('active', (tab === 'login' && t === 'Login') || (tab === 'register' && t === 'Reg'));
    });
  }

  /* ── UI helpers ── */
  function showAuthForm() {
    document.getElementById('authFlow').style.display = 'block';
    document.getElementById('profileWrap').classList.remove('active');
    ensureGoogleButton();
  }

  function showProfile() {
    document.getElementById('authFlow').style.display = 'none';
    document.getElementById('profileWrap').classList.add('active');
    const name  = currentUser?.user_metadata?.full_name || _nameFromEmail(currentUser?.email) || 'Guest';
    const email = currentUser?.email || '';
    document.getElementById('profileName').textContent   = name;
    document.getElementById('profileEmail').textContent  = email;
    document.getElementById('profileAvatar').textContent = name[0]?.toUpperCase() || 'S';
  }

  function _nameFromEmail(email = '') {
    return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  return { login, register, googleLogin, logout, switchTab, handleSession };
})();
