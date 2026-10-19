import * as auth from './utils/auth.js';
import { store, KEYS } from './data/store.js';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  auth.logoutSession();
});

test('migrasi dari password lama + login sukses', async () => {
  // Meniru instalasi lama yang menyimpan sandi apa adanya di settings.
  store.set(KEYS.settings, { ...store.get(KEYS.settings), adminPassword: 'sandi-lama-lama' });
  const res = await auth.login('sandi-lama-lama');
  expect(res.ok).toBe(true);
  expect(res.mustChange).toBe(true);
  expect(auth.isAuthed()).toBe(true);
  expect(store.get(KEYS.settings).adminPassword).toBeUndefined();
  const audit = store.get(KEYS.audit);
  expect(audit[0].action).toBe('Login berhasil');
});

test('password salah = gagal', async () => {
  const res = await auth.login('salah');
  expect(res.ok).toBe(false);
  expect(auth.isAuthed()).toBe(false);
});

test('lockout setelah 5 percobaan gagal', async () => {
  let res;
  for (let i = 0; i < 5; i++) {
    res = await auth.login('salah');
  }
  expect(res.ok).toBe(false);
  expect(auth.lockStatus()).toBeGreaterThan(0);
});

test('verify + changePassword + verify password baru', async () => {
  const awal = auth.DEMO_PASSWORD;
  await auth.login(awal);
  const wrong = await auth.verify('salah');
  expect(wrong).toBe(false);
  const bad = await auth.changePassword(awal, '123');
  expect(bad.ok).toBe(false);
  const same = await auth.changePassword(awal, awal);
  expect(same.ok).toBe(false);
  const chg = await auth.changePassword(awal, 'rahasia123');
  expect(chg.ok).toBe(true);
  expect(auth.needsPasswordChange()).toBe(false);
  expect(await auth.verify('rahasia123')).toBe(true);
  expect(await auth.verify(awal)).toBe(false);
});

test('hashPassword deterministik + salt berbeda', async () => {
  const h1 = await auth.hashPassword('abc', 'salt');
  const h2 = await auth.hashPassword('abc', 'salt');
  const h3 = await auth.hashPassword('abc', 'salt2');
  expect(h1).toBe(h2);
  expect(h1).not.toBe(h3);
});