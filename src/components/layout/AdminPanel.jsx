import React, { useEffect, useState } from 'react';
import {
  FaLock,
  FaBoxOpen,
  FaLayerGroup,
  FaQuoteLeft,
  FaCircleQuestion,
  FaTicket,
  FaEnvelopeOpenText,
  FaGear,
  FaChartPie,
  FaRightFromBracket,
  FaGlobe,
  FaShieldHalved,
} from 'react-icons/fa6';
import { useStore, KEYS } from '../../data/store.js';
import { useAdminAuth } from '../../hooks/useAdminAuth.js';
import { DEMO_PASSWORD, ensureAuth, lockStatus, logAudit } from '../../utils/auth.js';
import AdminCrud from './admin/AdminCrud.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminMessages from './admin/AdminMessages.jsx';
import AdminSettings from './admin/AdminSettings.jsx';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: <FaChartPie /> },
  { id: 'products', label: 'Produk', icon: <FaBoxOpen /> },
  { id: 'services', label: 'Layanan', icon: <FaLayerGroup /> },
  { id: 'testimonials', label: 'Testimoni', icon: <FaQuoteLeft /> },
  { id: 'faqs', label: 'FAQ', icon: <FaCircleQuestion /> },
  { id: 'promos', label: 'Kupon', icon: <FaTicket /> },
  { id: 'messages', label: 'Pesan', icon: <FaEnvelopeOpenText /> },
  { id: 'settings', label: 'Pengaturan', icon: <FaGear /> },
];

const PRODUCT_FIELDS = [
  { name: 'name', label: 'Nama', type: 'text', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 2 },
  { name: 'price', label: 'Harga (Rp)', type: 'number' },
  {
    name: 'category',
    label: 'Kategori',
    type: 'select',
    options: ['vps', 'bot-wa', 'website'],
  },
  { name: 'image', label: 'URL Gambar', type: 'image' },
  { name: 'features', label: 'Fitur (1 per baris)', type: 'list' },
];

const SERVICE_FIELDS = [
  { name: 'name', label: 'Nama', type: 'text', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 2 },
  { name: 'price', label: 'Harga (Rp)', type: 'number' },
  { name: 'interval', label: 'Interval (mis. /bulan)', type: 'text' },
  { name: 'popular', label: 'Badge "Most Popular"', type: 'toggle' },
  { name: 'features', label: 'Fitur (1 per baris)', type: 'list' },
  { name: 'image', label: 'URL Gambar', type: 'image' },
];

const TESTIMONIAL_FIELDS = [
  { name: 'name', label: 'Nama', type: 'text', required: true },
  { name: 'role', label: 'Peran/Posisi', type: 'text' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' },
  { name: 'message', label: 'Testimoni', type: 'textarea', required: true },
];

const FAQ_FIELDS = [
  { name: 'question', label: 'Pertanyaan', type: 'text', required: true },
  { name: 'answer', label: 'Jawaban', type: 'textarea', required: true },
];

const PROMO_FIELDS = [
  { name: 'code', label: 'Kode', type: 'text', required: true },
  { name: 'type', label: 'Tipe', type: 'select', options: ['percent', 'fixed'] },
  { name: 'value', label: 'Nilai (persen / Rp)', type: 'number' },
  { name: 'minOrder', label: 'Minimal Belanja (Rp)', type: 'number' },
  { name: 'active', label: 'Status', type: 'toggle' },
];

const AdminLogin = ({ onLogin, loginError }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockLeft, setLockLeft] = useState(lockStatus());

  useEffect(() => {
    if (!lockLeft) return undefined;
    const id = setInterval(() => setLockLeft(lockStatus()), 1000);
    return () => clearInterval(id);
  }, [lockLeft]);

  const submit = async (e) => {
    e.preventDefault();
    if (!input || loading) return;
    setLoading(true);
    await onLogin(input);
    setLoading(false);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center p-4">
      <div className="bg-base-100 border border-base-200 rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-5">
          <FaLock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-display mb-1">Panel Admin</h1>
        <p className="text-sm text-base-content/60 mb-6">
          Masukkan password untuk mengelola data. Sesi otomatis berakhir setelah 30 menit tidak
          aktif.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            disabled={loading || lockLeft > 0}
          />
          {loginError && !lockLeft && (
            <p className="text-sm text-error" role="alert">
              {loginError}
            </p>
          )}
          {lockLeft > 0 && (
            <div className="alert alert-error text-sm flex items-center gap-2">
              <FaShieldHalved className="w-4 h-4 shrink-0" />
              Akun terkunci sementara. Coba lagi dalam {lockLeft} detik.
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading || !input || lockLeft > 0}
          >
            {loading ? 'Memverifikasi...' : 'Masuk'}
          </button>
        </form>

        {/* Sandi demo ditampilkan terbuka: panel ini berjalan di browser dan
            datanya hanya di localStorage, jadi sandi di sini bukan pengamanan
            sungguhan (lihat catatan di src/utils/auth.js). */}
        <div className="mt-6 rounded-xl border border-base-content/10 bg-base-200/60 p-3">
          <p className="text-xs text-base-content/70 leading-relaxed">
            <span className="font-semibold">Mode demo.</span> Sandi awal:{' '}
            <code className="rounded bg-base-300 px-1.5 py-0.5 font-mono">{DEMO_PASSWORD}</code> —
            wajib diganti setelah masuk.
          </p>
          <button
            type="button"
            className="btn btn-xs btn-outline mt-2"
            onClick={() => setInput(DEMO_PASSWORD)}
            disabled={lockLeft > 0}
          >
            Isi sandi demo
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = ({ onExit }) => {
  const messages = useStore(KEYS.messages);
  const { authed, login, logout } = useAdminAuth();
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    ensureAuth();
  }, []);

  const handleLogin = async (password) => {
    const res = await login(password);
    if (res.ok) {
      toast.success('Selamat datang di panel admin!');
      if (res.mustChange) {
        setTab('settings');
        toast('Anda harus mengganti password default sebelum melanjutkan.', { duration: 6000 });
      }
    }
    return res;
  };

  const handleLogout = () => {
    logAudit('Keluar', 'Admin keluar dari panel');
    logout();
  };

  if (!authed) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const unread = messages.filter((m) => !m.read).length;

  const renderTab = () => {
    switch (tab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return (
          <AdminCrud
            collection={KEYS.products}
            title="Produk"
            fields={PRODUCT_FIELDS}
            addLabel="Tambah Produk"
          />
        );
      case 'services':
        return (
          <AdminCrud
            collection={KEYS.services}
            title="Layanan"
            fields={SERVICE_FIELDS}
            addLabel="Tambah Layanan"
          />
        );
      case 'testimonials':
        return (
          <AdminCrud
            collection={KEYS.testimonials}
            title="Testimoni"
            fields={TESTIMONIAL_FIELDS}
            addLabel="Tambah Testimoni"
          />
        );
      case 'faqs':
        return (
          <AdminCrud
            collection={KEYS.faqs}
            title="Pertanyaan Umum"
            fields={FAQ_FIELDS}
            addLabel="Tambah FAQ"
          />
        );
      case 'promos':
        return (
          <AdminCrud
            collection={KEYS.promos}
            title="Kupon Promo"
            fields={PROMO_FIELDS}
            addLabel="Tambah Kupon"
          />
        );
      case 'messages':
        return <AdminMessages />;
      case 'settings':
        return <AdminSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-base-200 border-r border-base-300 shrink-0">
        <div className="p-5 border-b border-base-300 flex items-center gap-2">
          <span className="text-lg font-bold font-display">
            MansX<span className="text-primary">.Dev</span>
          </span>
          <span className="badge badge-primary badge-sm">Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-primary text-primary-content'
                  : 'text-base-content/70 hover:bg-base-300'
              }`}
            >
              <span>{t.icon}</span>
              <span className="flex-1 text-left">{t.label}</span>
              {t.id === 'messages' && unread > 0 && (
                <span className="badge badge-error badge-xs">{unread}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 space-y-1 border-t border-base-300">
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-base-content/70 hover:bg-base-300 transition-colors"
            onClick={onExit}
          >
            <FaGlobe className="w-4 h-4" />
            Lihat Situs
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-error hover:bg-base-300 transition-colors"
            onClick={handleLogout}
          >
            <FaRightFromBracket className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-[1500] bg-base-200/95 backdrop-blur border-b border-base-300">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold font-display">
            MansX<span className="text-primary">.Dev</span> <span className="badge badge-primary badge-sm">Admin</span>
          </span>
          <div className="flex gap-1">
            <button className="btn btn-ghost btn-sm" onClick={onExit}>
              <FaGlobe className="w-4 h-4" />
              Situs
            </button>
            <button className="btn btn-ghost btn-sm text-error" onClick={handleLogout}>
              <FaRightFromBracket className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide px-2 pb-2 gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`btn btn-sm rounded-full flex-nowrap ${
                tab === t.id ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              {t.icon}
              {t.label}
              {t.id === 'messages' && unread > 0 && (
                <span className="badge badge-error badge-xs">{unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-x-hidden md:pt-0 pt-28 p-4 sm:p-6 lg:p-10">
        {renderTab()}
      </main>
    </div>
  );
};

export default AdminPanel;