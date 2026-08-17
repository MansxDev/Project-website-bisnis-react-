import React from 'react';
import { FaTrashCan, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa6';
import { useCollection, KEYS } from '../../../data/store.js';
import { logAudit } from '../../../utils/auth.js';
import useConfirm from '../../../hooks/useConfirm.js';
import toast from 'react-hot-toast';

const AdminMessages = () => {
  const { data: messages, update, remove } = useCollection(KEYS.messages);
  const [confirm, confirmDialog] = useConfirm();

  const sorted = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date));

  const toggleRead = (msg) => {
    update(msg.id, { read: !msg.read });
    logAudit(msg.read ? 'Pesan ditandai belum dibaca' : 'Pesan ditandai dibaca', `Dari ${msg.name}`);
  };

  const handleDelete = async (msg) => {
    const ok = await confirm(
      `Yakin ingin menghapus pesan dari ${msg.name}? Pesan ini tidak bisa dikembalikan.`,
      { title: 'Hapus Pesan', confirmLabel: 'Hapus', variant: 'danger' }
    );
    if (!ok) return;
    remove(msg.id);
    logAudit('Pesan dihapus', `Dari ${msg.name}`);
    toast.success('Pesan dihapus.');
  };

  return (
    <div>
      <h2 className="text-xl font-bold font-display mb-6">Pesan Masuk</h2>

      {sorted.length === 0 ? (
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-lg p-10 text-center text-base-content/50">
          Belum ada pesan masuk.
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((msg) => (
            <div
              key={msg.id}
              className={`bg-base-100 border rounded-2xl shadow-lg p-5 ${
                msg.read ? 'border-base-200' : 'border-primary'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!msg.read && <span className="badge badge-primary badge-sm">Baru</span>}
                    <span className="font-bold font-display">{msg.name}</span>
                    <span className="text-sm text-base-content/60">({msg.email})</span>
                  </div>
                  <p className="text-sm font-semibold mt-1">{msg.subject}</p>
                  <p className="text-sm text-base-content/70 mt-2 whitespace-pre-line">{msg.message}</p>
                  <p className="text-xs text-base-content/40 mt-3">
                    {new Date(msg.date).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    className="btn btn-ghost btn-sm btn-circle tooltip"
                    data-tip={msg.read ? 'Tandai belum dibaca' : 'Tandai dibaca'}
                    onClick={() => toggleRead(msg)}
                    aria-label="Ubah status dibaca"
                  >
                    {msg.read ? (
                      <FaEnvelope className="w-4 h-4" />
                    ) : (
                      <FaEnvelopeOpen className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    className="btn btn-ghost btn-sm btn-circle text-error tooltip"
                    data-tip="Hapus"
                    onClick={() => handleDelete(msg)}
                    aria-label="Hapus pesan"
                  >
                    <FaTrashCan className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDialog}
    </div>
  );
};

export default AdminMessages;