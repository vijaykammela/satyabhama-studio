/* ═══════════════════════════════════════
   js/auth.js — Authentication
═══════════════════════════════════════ */
const Auth = (() => {
  let currentUser = null;
  let googleReady = false;
  let googleInitPromise = null;
  let googleRawNonce = null;

  const GOOGLE_CLIENT_ID = '1001273920716-5gam51jcf8gu2n9gr82tu1ar7rpq3hg2.apps.googleusercontent.com';

  function handleSession(session) {
    currentUser = session?.user ?? null;
    if (currentUser) showProfile();
    else showAuthForm();
  }

  function loadGoogleIdentityScript() {
    if (googleInitPromise) return googleInitPromise;

    googleInitPromise = new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      const existing = document.querySelector('script[data-google-identity]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.dataset.googleIdentity = 'true';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Could not load Google Sign-In'));
      document.head.appendChild(script);
    });

    return googleInitPromise;
  }

  async function createGoogleNonce() {
    const raw = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoded = new TextEncoder().encode(raw);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashed = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return { raw, hashed };
  }

  /* Prepare Google Identity Services, but do not render a top/extra button. */
  async function prepareGoogleIdentity() {
    if (!DB.isConfigured || googleReady) return;

    try {
      await loadGoogleIdentityScript();
      const { raw, hashed } = await createGoogleNonce();
      googleRawNonce = raw;

      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          await googleCredentialLogin(response.credential, googleRawNonce);
        },
        nonce: hashed,
        use_fedcm_for_prompt: true,
      });

      googleReady = true;
    } catch (error) {
      console.error('Google Identity Services setup failed:', error);
    }
  }

  async function googleCredentialLogin(credential, rawNonce) {
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
    }
  }

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

  async function register() {
    const name  = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass  = document.getElementById('regPass').value;
    if (!name || !email || !pass) { UI.showToast('Please fill in all fields'); return; }
    if (pass.length < 8) { UI.showToast('Password must be 8+ characters'); return; }

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

  /* Bottom "Continue with Google" button handler. */
  async function googleLogin() {
    if (!DB.isConfigured) {
      currentUser = { email: 'demo@satyabhama.com', user_metadata: { full_name: 'Demo User' } };
      showProfile();
      UI.showToast('Signed in with Google (demo)');
      return;
    }

    try {
      await prepareGoogleIdentity();
      if (window.google?.accounts?.id && googleRawNonce) {
        google.accounts.id.prompt();
      } else {
        UI.showToast('Google sign-in is temporarily unavailable');
      }
    } catch (error) {
      console.error('Google sign-in failed:', error);
      UI.showToast('Google sign-in is temporarily unavailable');
    }
  }

  async function logout() {
    await DB.signOut();
    currentUser = null;
    showAuthForm();
    UI.showToast('Signed out successfully');
  }

  function switchTab(tab) {
    ['Login', 'Reg'].forEach(t => {
      document.getElementById('tab' + t).classList.toggle('active', (tab === 'login' && t === 'Login') || (tab === 'register' && t === 'Reg'));
      document.getElementById('panel' + t).classList.toggle('active', (tab === 'login' && t === 'Login') || (tab === 'register' && t === 'Reg'));
    });
  }

  function showAuthForm() {
    document.getElementById('authFlow').style.display = 'block';
    document.getElementById('profileWrap').classList.remove('active');
    prepareGoogleIdentity();
  }

  function showProfile() {
    document.getElementById('authFlow').style.display = 'none';
    document.getElementById('profileWrap').classList.add('active');
    const name = currentUser?.user_metadata?.full_name || _nameFromEmail(currentUser?.email) || 'Guest';
    const email = currentUser?.email || '';
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileEmail').textContent = email;
    document.getElementById('profileAvatar').textContent = name[0]?.toUpperCase() || 'S';
  }

  function _nameFromEmail(email = '') {
    return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  return { login, register, googleLogin, logout, switchTab, handleSession };
})();
