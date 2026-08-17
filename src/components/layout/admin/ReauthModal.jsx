import React, { useState } from 'react';
import Modal from '../../ui/Modal.jsx';
import { verify } from '../../../utils/auth.js';
import toast from 'react-hot-toast';

const ReauthModal = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Konfirmasi Password',
  description = 'Untuk alasan keamanan, masukkan password admin Anda untuk melanjutkan.',
}) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    const ok = await verify(password);
    setLoading(false);
    if (ok) {
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setPassword('');
      toast.error('Password salah. Aksi dibatalkan.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-base-content/70 mb-4">{description}</p>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading || !password}>
            {loading ? 'Memverifikasi...' : 'Konfirmasi'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReauthModal;