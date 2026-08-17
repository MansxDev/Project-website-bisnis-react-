import React, { useRef, useState } from 'react';
import {
  FaDownload,
  FaUpload,
  FaTrashCan,
  FaShieldHalved,
  FaKey,
} from 'react-icons/fa6';
import { useCollection, store, KEYS } from '../../../data/store.js';
import {
  changePassword,
  needsPasswordChange,
  logAudit,
} from '../../../utils/auth.js';
import ReauthModal from './ReauthModal.jsx';
import useConfirm from '../../../hooks/useConfirm.js';
import toast from 'react-hot-toast';

const SETTING_FIELDS = [
  { name: 'businessName', label: 'Nama Bisnis' },
  { name: 'tagline', label: 'Tagline' },
  { name: 'phone', label: 'No. WhatsApp (format 628xx)' },
  { name: 'email', label: 'Email' },
  { name: 'instagram', label: 'Link Instagram' },
  { name: 'facebook', label: 'Link Facebook' },
  { name: 'github', label: 'Link GitHub' },
];

const AdminSettings = () => {
  const { data: settings, replace } = useCollection(KEYS.settings);
  const [form, setForm] = useState({ ...settings });
  const fileRef = useRef(null);
  const [confirm, confirmDialog] = useConfirm();

  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwLoading, setPwLoading] = useState(false);

  const [pendingAction, setPendingAction] = useState(null);

  const mustChange = needsPasswordChange();

  const save = () => {
    const { adminPassword, ...clean } = form;
    replace(clean);
    setForm({ ...clean });
    logAudit('Pengaturan disimpan', 'Profil bisnis diperbarui');
    toast.success('Pengaturan tersimpan.');
  };

  const handleExport = () => {
    const payload = store.exportAll();
    if (payload.settings) delete payload.settings.adminPassword;
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mansx-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    logAudit('Backup diekspor', 'File JSON diunduh');
    toast.success('Backup berhasil diunduh.');
  };

  const runImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        store.importAll(payload);
        setForm({ ...store.get(KEYS.settings) });
        logAudit('Data diimpor', 'Backup dipulihkan');
        toast.success('Data berhasil diimpor.');
      } catch {
        toast.error('File JSON tidak valid.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setPendingAction(null);
  };

  const handleImport = async () => {
    const ok = await confirm(
      'Impor akan menimpa seluruh data saat ini. Lanjutkan?',
      { title: 'Konfirmasi Import', confirmLabel: 'Lanjut', variant: 'danger' }
    );
    if (ok) setPendingAction('import');
  };

  const handleReset = async () => {
    const ok = await confirm(
      'Reset semua data ke pengaturan awal? Tindakan ini tidak bisa dibatalkan.',
      { title: 'Konfirmasi Reset', confirmLabel: 'Reset', variant: 'danger' }
    );
    if (ok) setPendingAction('reset');
  };

  const runReset = () => {
    store.resetAll();
    setForm({ ...store.get(KEYS.settings) });
    logAudit('Semua data di-reset', 'Data dikembalikan ke default');
    toast.success('Semua data di-reset ke default.');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
      toast.error('Lengkapi semua kolom password.');
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      toast.error('Konfirmasi password tidak cocok.');
      return;
    }
    setPwLoading(true);
    const res = await changePassword(pwForm.current, pwForm.next);
    setPwLoading(false);
    if (res.ok) {
      setPwForm({ current: '', next: '', confirm: '' });
      toast.success('Password berhasil diubah.');
    } else {
      toast.error(res.error);
    }
  };

  const doPending = () => {
    if (pendingAction === 'reset') runReset();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold font-display mb-6">Pengaturan</h2>

      {mustChange && (
        <div className="alert alert-warning mb-6 flex items-center gap-3 shadow-lg">
          <FaShieldHalved className="w-5 h-5 shrink-0" />
          <div className="text-sm">
            <p className="font-bold">Anda masih menggunakan password default.</p>
            <p>Segera ganti password di bagian Keamanan sebelum melanjutkan.</p>
          </div>
        </div>
      )}

      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="font-bold font-display">Profil Bisnis</h3>
        {SETTING_FIELDS.map((field) => (
          <div className="form-control" key={field.name}>
            <label className="label">
              <span className="label-text font-semibold">{field.label}</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={form[field.name] || ''}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={save}>
            Simpan
          </button>
        </div>
      </div>

      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="font-bold font-display flex items-center gap-2 mb-1">
          <FaShieldHalved className="text-primary" />
          Keamanan
        </h3>
        <p className="text-sm text-base-content/60 mb-4">
          Password disimpan sebagai hash (SHA-256 berulang + salt). Wajib minimal 8 karakter.
        </p>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password Lama</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              value={pwForm.current}
              onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
              autoComplete="current-password"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password Baru</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                value={pwForm.next}
                onChange={(e) => setPwForm({ ...pwForm, next: e.target.value })}
                autoComplete="new-password"
                minLength={8}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Konfirmasi</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                value={pwForm.confirm}
                onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                autoComplete="new-password"
                minLength={8}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-outline" disabled={pwLoading}>
              <FaKey className="w-3.5 h-3.5" />
              {pwLoading ? 'Mengganti...' : 'Ganti Password'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="font-bold font-display mb-4">Data & Backup</h3>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline btn-sm" onClick={handleExport}>
            <FaDownload className="w-3.5 h-3.5" />
            Export JSON
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleImport}>
            <FaUpload className="w-3.5 h-3.5" />
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={runImport}
          />
          <button className="btn btn-outline btn-error btn-sm" onClick={handleReset}>
            <FaTrashCan className="w-3.5 h-3.5" />
            Reset Semua Data
          </button>
        </div>
        <p className="text-xs text-base-content/50 mt-3">
          Export & Import JSON wajib melewati verifikasi password. Password admin tidak pernah
          disertakan dalam file backup.
        </p>
      </div>

      <ReauthModal
        isOpen={pendingAction === 'import'}
        onClose={() => setPendingAction(null)}
        onSuccess={() => fileRef.current?.click()}
        title="Konfirmasi Import"
        description="Anda akan menimpa seluruh data dengan file backup. Verifikasi password untuk melanjutkan."
      />
      <ReauthModal
        isOpen={pendingAction === 'reset'}
        onClose={() => setPendingAction(null)}
        onSuccess={doPending}
        title="Konfirmasi Reset"
        description="Semua data akan dikembalikan ke pengaturan awal. Verifikasi password untuk melanjutkan."
      />

      {confirmDialog}
    </div>
  );
};

export default AdminSettings;