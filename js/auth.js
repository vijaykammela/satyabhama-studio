/* ═══════════════════════════════════════
   js/auth.js — Authentication
═══════════════════════════════════════ */
const Auth = (() => {
  let currentUser = null;

  /* ── Called by Supabase onAuthStateChange ── */
  function handleSession(session) {
    currentUser = session?.user ?? null;
    if (currentUser) showProfile();
    else showAuthForm();
  }

  /* ── Add Google OAuth UI once ── */
  function ensureGoogleButton() {
    const flow = document.getElementById('authFlow');
    if (!flow || document.getElementById('googleAuthBtn')) return;

    const wrap = document.createElement('div');
    wrap.id = 'googleAuthWrap';
    wrap.style.cssText = 'margin:0 0 20px;';
    wrap.innerHTML = `
      <button type="button" id="googleAuthBtn" aria-label="Continue with Google"
        onclick="Auth.googleLogin()"
        style="width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;border:1px solid rgba(255,255,255,.18);border-radius:2px;background:#fff;color:#222;font:500 14px/1.2 DM Sans,Arial,sans-serif;cursor:pointer;transition:opacity .2s,transform .2s;">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.24z"/>
          <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.75z"/>
          <path fill="#FBBC05" d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.52z"/>
          <path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.22 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.64l3.24 2.52C7.31 7.85 9.46 6.13 12 6.13z"/>
        </svg>
        Continue with Google
      </button>
      <div style="display:flex;align-items:center;gap:10px;margin:16px 0;color:rgba(255,255,255,.45);font:11px/1 DM Sans,Arial,sans-serif;">
        <span style="height:1px;flex:1;background:rgba(255,255,255,.12)"></span><span>OR</span><span style="height:1px;flex:1;background:rgba(255,255,255,.12)"></span>
      </div>`;

    flow.insertBefore(wrap, flow.firstElementChild);
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

  /* ── Google OAuth: new users are registered automatically ── */
  async function googleLogin() {
    if (!DB.isConfigured) {
      currentUser = { email: 'demo@satyabhama.com', user_metadata: { full_name: 'Demo User' } };
      showProfile();
      UI.showToast('Signed in with Google (demo)');
      return;
    }

    const button = document.getElementById('googleAuthBtn');
    if (button) {
      button.disabled = true;
      button.style.opacity = '.65';
    }

    try {
      const { error } = await DB.signInWithGoogle();
      if (error) throw error;
    } catch (error) {
      console.error('Google sign-in failed:', error);
      UI.showToast('Google sign-in failed: ' + (error?.message || 'Please try again'));
      if (button) {
        button.disabled = false;
        button.style.opacity = '1';
      }
    }
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
