// js/auth.js
// Runs on every page. Toggles the header's account link between
// "Login" (signed out) and "Account" (signed in), and exposes a couple
// of small helpers used by login.html / signup.html / account.html.

async function getCurrentUser() {
  const { data, error } = await sbClient.auth.getUser();
  if (error) return null;
  return data.user;
}

async function refreshAccountNavLink() {
  const link = document.getElementById("nav-account-link");
  if (!link) return;
  const user = await getCurrentUser();
  if (user) {
    link.textContent = "Account";
    link.href = "account.html";
  } else {
    link.textContent = "Login";
    link.href = "login.html";
  }
}

async function requireLogin() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

async function signOutAndRedirect() {
  await sbClient.auth.signOut();
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", refreshAccountNavLink);
