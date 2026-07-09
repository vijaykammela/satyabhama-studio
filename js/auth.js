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

  /* ── Email sign-in ── */
  async function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPass').value;

    if (!email || !pass) { UI.showToast('Please fill in all fields'); return; }

    if (!DB.isConfigured) {
      /* Demo mode simulation */
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

  /* ── Google OAuth ── */
  async function googleLogin() {
    if (!DB.isConfigured) {
      currentUser = { email: 'demo@satyabhama.com', user_metadata: { full_name: 'Demo User' } };
      showProfile();
      UI.showToast('Signed in with Google (demo)');
      return;
    }
    await DB.signInWithGoogle();
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
