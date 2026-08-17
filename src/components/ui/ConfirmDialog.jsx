import React from 'react';
import Modal from './Modal.jsx';
import { FaTriangleExclamation, FaCircleQuestion } from 'react-icons/fa6';

const ConfirmDialog = ({
  open,
  title = 'Konfirmasi',
  message,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  variant = 'primary',
  onConfirm,
  onCancel,
}) => {
  const danger = variant === 'danger';

  return (
    <Modal isOpen={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <div className="flex items-start gap-4">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
            danger ? 'bg-error/15 text-error' : 'bg-primary/15 text-primary'
          }`}
        >
          {danger ? (
            <FaTriangleExclamation className="w-5 h-5" />
          ) : (
            <FaCircleQuestion className="w-5 h-5" />
          )}
        </div>
        <p className="text-sm text-base-content/80 leading-relaxed pt-2.5">{message}</p>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button type="button" className={`btn ${danger ? 'btn-error' : 'btn-primary'}`} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;