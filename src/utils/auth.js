import { store, KEYS } from '../data/store.js';

const AUTH_KEY = 'mansx_auth';
const SESSION_KEY = 'mansx_admin_session';

/**
 * Sandi awal panel admin.
 *
 * Ditulis terbuka dengan sengaja. Panel ini berjalan sepenuhnya di browser
 * (datanya di localStorage), jadi sandi di sini hanya menghalangi orang iseng
 * membuka panel di perangkat yang sama — bukan pengamanan sungguhan.
 * Menyembunyikannya tidak menambah keamanan apa pun, dan membuat demo ini
 * tidak bisa dicoba orang lain.
 *
 * Setelah masuk, pemakainya wajib menggantinya (lihat `mustChange` di
 * `ensureAuth`). Untuk pemakaian sungguhan, panel admin harus dipindah ke
 * server dengan login yang sebenarnya — lihat catatan di README.
 */
export const DEMO_PASSWORD = 'demo-mansxdev';

const SESSION_MS = 30 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const BASE_LOCK_MS = 30 * 1000;
const MAX_LOCK_MS = 30 * 60 * 1000;
const ITERATIONS = 5000;
const PEPPER = 'mX.kS2!p9#vLzQ7@dF5wN4eT8uY1aH6bR3';

const canHash = () => !!(window.crypto && window.crypto.subtle);

function toHex(buf) {
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function makeSalt() {
  const bytes = new Uint8Array(16);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return toHex(bytes);
}

function fallbackHash(str) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

export async function hashPassword(password, salt) {
  const input = `${PEPPER}::${salt}::${password}`;
  if (canHash()) {
    let bytes = new TextEncoder().encode(input);
    for (let i = 0; i < ITERATIONS; i++) {
      const buf = await window.crypto.subtle.digest('SHA-256', bytes);
      bytes = new Uint8Array(buf);
    }
    return toHex(bytes);
  }
  let out = input;
  for (let i = 0; i < 1000; i++) out = fallbackHash(out + PEPPER);
  return out;
}

function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveAuth(auth) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch {
    // biarkan di memori
  }
}

function issueSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ exp: Date.now() + SESSION_MS }));
  } catch {
    // sessionStorage tidak tersedia
  }
}

export function refreshSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) sessionStorage.setItem(SESSION_KEY, JSON.stringify({ exp: Date.now() + SESSION_MS }));
  } catch {
    // abaikan
  }
}

export function isAuthed() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const t = JSON.parse(raw);
    return !!(t && t.exp > Date.now());
  } catch {
    return false;
  }
}

export function logoutSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // abaikan
  }
}

export function needsPasswordChange() {
  const auth = loadAuth();
  return !!(auth && auth.mustChange);
}

export async function ensureAuth() {
  if (loadAuth()) return;
  const settings = store.get(KEYS.settings);
  const oldPass = (settings && settings.adminPassword) || DEMO_PASSWORD;
  const salt = makeSalt();
  const hash = await hashPassword(oldPass, salt);
  saveAuth({ salt, hash, attempts: 0, lockCount: 0, lockedUntil: 0, mustChange: true });
  if (settings && settings.adminPassword) {
    const { adminPassword, ...rest } = settings;
    store.set(KEYS.settings, rest);
  }
}

export async function login(password) {
  await ensureAuth();
  const auth = loadAuth();
  const now = Date.now();

  if (auth.lockedUntil && auth.lockedUntil > now) {
    const secs = Math.ceil((auth.lockedUntil - now) / 1000);
    logAudit('Login diblokir', `Akun dikunci selama ${secs} detik`);
    return { ok: false, error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${secs} detik.` };
  }

  const hash = await hashPassword(password, auth.salt);
  if (hash === auth.hash) {
    auth.attempts = 0;
    auth.lockedUntil = 0;
    saveAuth(auth);
    issueSession();
    logAudit('Login berhasil', 'Admin masuk ke panel');
    return { ok: true, mustChange: !!auth.mustChange };
  }

  auth.attempts = (auth.attempts || 0) + 1;
  if (auth.attempts >= MAX_ATTEMPTS) {
    auth.lockCount = (auth.lockCount || 0) + 1;
    auth.lockedUntil = now + Math.min(BASE_LOCK_MS * Math.pow(2, auth.lockCount - 1), MAX_LOCK_MS);
    auth.attempts = 0;
    saveAuth(auth);
    logAudit('Akun dikunci', `Gagal login ${MAX_ATTEMPTS}x berturut-turut`);
  } else {
    saveAuth(auth);
    logAudit('Login gagal', `Percobaan ke-${auth.attempts}`);
  }
  return { ok: false, error: 'Password salah.' };
}

export async function verify(password) {
  await ensureAuth();
  const auth = loadAuth();
  const hash = await hashPassword(password, auth.salt);
  return hash === auth.hash;
}

export async function changePassword(oldPass, newPass) {
  if (!newPass || newPass.length < 8) {
    return { ok: false, error: 'Password baru minimal 8 karakter.' };
  }
  if (newPass === oldPass) {
    return { ok: false, error: 'Password baru tidak boleh sama dengan password lama.' };
  }
  const ok = await verify(oldPass);
  if (!ok) return { ok: false, error: 'Password lama salah.' };

  const auth = loadAuth();
  const salt = makeSalt();
  const hash = await hashPassword(newPass, salt);
  saveAuth({
    ...auth,
    salt,
    hash,
    mustChange: false,
    attempts: 0,
    lockCount: 0,
    lockedUntil: 0,
  });
  logAudit('Password diubah', 'Password admin berhasil diganti');
  return { ok: true };
}

export function lockStatus() {
  const auth = loadAuth();
  if (auth && auth.lockedUntil && auth.lockedUntil > Date.now()) {
    return Math.ceil((auth.lockedUntil - Date.now()) / 1000);
  }
  return 0;
}

export function logAudit(action, detail) {
  const list = store.get(KEYS.audit) || [];
  const entry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    action,
    detail: detail || '',
    date: new Date().toISOString(),
  };
  store.set(KEYS.audit, [entry, ...list].slice(0, 100));
}