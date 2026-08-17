import React, { useState } from 'react';
import Modal from '../../ui/Modal.jsx';
import { useCollection } from '../../../data/store.js';
import useConfirm from '../../../hooks/useConfirm.js';
import { FaPlus, FaPen, FaTrashCan, FaMagnifyingGlass, FaArrowRotateLeft } from 'react-icons/fa6';
import { logAudit } from '../../../utils/auth.js';
import toast from 'react-hot-toast';

const FieldInput = ({ field, value, onChange }) => {
  const base = 'input input-bordered input-sm w-full';
  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          className="textarea textarea-bordered w-full"
          rows={field.rows || 3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'number':
      return (
        <input
          type="number"
          className={base}
          value={value ?? ''}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case 'select':
      return (
        <select
          className="select select-bordered select-sm w-full"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    case 'toggle':
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-sm text-base-content/60">{value ? 'Aktif' : 'Nonaktif'}</span>
        </label>
      );
    case 'image':
      return (
        <div className="flex items-center gap-3">
          <img
            src={value || ''}
            alt="preview"
            className="w-12 h-12 rounded-lg object-cover bg-base-200"
          />
          <input
            type="url"
            className={base}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
          />
        </div>
      );
    case 'list':
      return (
        <textarea
          className="textarea textarea-bordered w-full"
          rows={field.rows || 4}
          value={Array.isArray(value) ? value.join('\n') : ''}
          onChange={(e) => onChange(e.target.value.split('\n').filter((l) => l.trim()))}
        />
      );
    default:
      return (
        <input
          type="text"
          className={base}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

const CellValue = ({ field, value }) => {
  switch (field.type) {
    case 'image':
      return <img src={value} alt="" className="w-10 h-10 rounded-lg object-cover bg-base-200" />;
    case 'list':
      return (
        <span className="text-xs badge badge-ghost">{Array.isArray(value) ? value.length : 0} item</span>
      );
    case 'toggle':
      return value ? (
        <span className="badge badge-success badge-sm">Aktif</span>
      ) : (
        <span className="badge badge-neutral badge-sm">Nonaktif</span>
      );
    case 'number':
      return (
        <span className="font-medium">
          {value != null && value !== '' ? `Rp${Number(value).toLocaleString('id-ID')}` : '-'}
        </span>
      );
    default:
      return <span className="line-clamp-1 max-w-[180px]">{String(value ?? '-')}</span>;
  }
};

const AdminCrud = ({ collection, title, fields, addLabel = 'Tambah' }) => {
  const { data, add, update, remove, reset } = useCollection(collection);
  const [confirm, confirmDialog] = useConfirm();
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const openAdd = () => {
    setEditing({});
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing({ ...item });
    setModalOpen(true);
  };

  const save = () => {
    if (!editing) return;
    const missing = fields.find((f) => f.required && !String(editing[f.name] ?? '').trim());
    if (missing) {
      toast.error(`Field "${missing.label}" wajib diisi.`);
      return;
    }
    const item = { ...editing };
    const label = item.name || item.code || item.question || item.id || '';
    if (item.id) {
      update(item.id, item);
      logAudit(`Ubah ${title}`, label);
      toast.success('Data berhasil diperbarui.');
    } else {
      add({ ...item, id: `${collection}_${Date.now()}` });
      logAudit(`Tambah ${title}`, label);
      toast.success('Data berhasil ditambahkan.');
    }
    setModalOpen(false);
  };

  const handleRemove = async (item) => {
    const label = item.name || item.code || item.question || item.id || '';
    const ok = await confirm(`Yakin ingin menghapus "${label}"? Data ini tidak bisa dikembalikan.`, {
      title: 'Hapus Data',
      confirmLabel: 'Hapus',
      variant: 'danger',
    });
    if (!ok) return;
    remove(item.id);
    logAudit(`Hapus ${title}`, label);
    toast.success('Data dihapus.');
  };

  const filtered = search.trim()
    ? data.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      )
    : data;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl font-bold font-display">{title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="search"
              className="input input-sm input-bordered pl-9 w-48"
              placeholder="Cari..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari data"
            />
          </div>
          <button
            className="btn btn-ghost btn-sm tooltip"
            data-tip="Reset ke default"
            onClick={() => {
              logAudit(`Reset ${title}`, 'Data dikembalikan ke default');
              reset();
            }}
          >
            <FaArrowRotateLeft className="w-4 h-4" />
          </button>
          <button className="btn btn-primary btn-sm" onClick={openAdd}>
            <FaPlus className="w-3.5 h-3.5" />
            {addLabel}
          </button>
        </div>
      </div>

      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-lg overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
              <th className="w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={fields.length + 1} className="text-center py-10 text-base-content/50">
                  Belum ada data.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}>
                  {fields.map((field) => (
                    <td key={field.name}>
                      <CellValue field={field} value={item[field.name]} />
                    </td>
                  ))}
                  <td>
                    <div className="flex gap-1">
                      <button
                        className="btn btn-ghost btn-xs btn-circle tooltip"
                        data-tip="Edit"
                        onClick={() => openEdit(item)}
                        aria-label={`Edit ${item.name || item.id}`}
                      >
                        <FaPen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="btn btn-ghost btn-xs btn-circle text-error tooltip"
                        data-tip="Hapus"
                        onClick={() => handleRemove(item)}
                        aria-label={`Hapus ${item.name || item.id}`}
                      >
                        <FaTrashCan className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing?.id ? `Edit ${title}` : `Tambah ${title}`}
      >
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          {fields.map((field) => (
            <div className="form-control" key={field.name}>
              <label className="label">
                <span className="label-text font-semibold">
                  {field.label}
                  {field.required && <span className="text-error"> *</span>}
                </span>
              </label>
              <FieldInput
                field={field}
                value={editing?.[field.name]}
                onChange={(v) => setEditing({ ...editing, [field.name]: v })}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </Modal>

      {confirmDialog}
    </div>
  );
};

export default AdminCrud;