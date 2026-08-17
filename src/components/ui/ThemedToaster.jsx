import React from 'react';
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { FaXmark } from 'react-icons/fa6';

const ThemedToaster = () => (
  <Toaster position="bottom-right" gutter={10} toastOptions={{ duration: 3500 }}>
    {(t) => (
      <ToastBar
        toast={t}
        style={{
          background: 'var(--b1)',
          color: 'var(--bc)',
          borderRadius: '1rem',
          border: '1px solid var(--b3)',
          boxShadow: '0 12px 32px -12px rgba(0,0,0,0.45)',
          fontSize: '0.875rem',
          padding: '0.25rem 0.75rem',
        }}
      >
        {({ icon, message }) => (
          <div className="flex items-center gap-3 w-full">
            <span className="flex items-center justify-center w-6 h-6 shrink-0">{icon}</span>
            <span className="font-medium flex-1">{message}</span>
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-ghost btn-xs btn-circle text-base-content/50"
              aria-label="Tutup notifikasi"
            >
              <FaXmark className="w-3 h-3" />
            </button>
          </div>
        )}
      </ToastBar>
    )}
  </Toaster>
);

export default ThemedToaster;